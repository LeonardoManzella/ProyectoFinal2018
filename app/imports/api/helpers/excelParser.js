import XLSX from 'xlsx';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';

const getBudgetRowName = (number) => {
  switch (number) {
    case 0:
      return 'name';
    case 1:
      return 'fomin';
    case 2:
      return 'counterpart';
    default:
      return 'total';
  }

};

const acquisitionPlanHeaderDataMapper = {
  country: 'C3',
  projectNumber: 'F4',
  planPeriod: 'F5',
  executiveAgency: 'G3',
  preparedBy: 'I3',
  projectName: 'I4',
  exchangeRateDate: 'I5',
  exchangeRate: 'N5',
  sector: 'O3',
  revisionLimit: 'G6',
  goodsAndServicesBudget: 'K6',
  consultancyBudget: 'T6'
};

const acquisitionPlanComponentsListDataMapper = {
  itemNumber: 'B',
  budgetComponentReference: 'C',
  budgetItemReference: 'D',
  budgetSubitemReference: 'E',
  description: 'F',
  hasBeenCriticised: 'G',
  acquisitionMethod: 'H',
  acquisitionRevision: 'I',
  "estimatedTotalBalance.monthPeriod": 'J',
  "estimatedTotalBalance.usdAmount": 'K',
  "accumulatedUntilPreviousSemesterBalance.monthPeriod": 'L',
  "accumulatedUntilPreviousSemesterBalance.usdAmount": 'M',
  "currentSemesterBalance.monthPeriod": 'N',
  "currentSemesterBalance.usdAmount": 'O',
  estimatedStartDate: 'P',
  status: 'Q',
  "fundingSource.bid": 'R',
  "fundingSource.other": 'S',
  projectManagerReview: 'T',
  comments: 'U',
};

const parseYesNoValues = function(value) {
  if (value === 'Si' || value === 'No') {
    return value === 'Si';
  }
  return value;
};

const getWorksheetValue = function(worksheet, key) {
  return worksheet[key] ? parseYesNoValues(worksheet[key].v) : '';
};

const parseAcquisitionPlan = (file, callback) => {
  try {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, {type: 'binary'});
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsedExcel = {};

        if (workbook.SheetNames[0] !== 'Plan Adquisiciones') {
          throw new Meteor.Error(404, 'wrong format');
        }

        _.forIn(acquisitionPlanHeaderDataMapper, (value, key) => {
          parsedExcel[key] = getWorksheetValue(worksheet, value);
        });

        const indexRow = 'B';
        let baseIndex = 14;
        parsedExcel.components = [];
        let componentType = 'individualConsultancy';

        while (getWorksheetValue(worksheet, indexRow + baseIndex) !== 'SUBTOTAL BIENES Y SERVICIOS DISTINTOS DE CONSULTORÍA') {
          if (getWorksheetValue(worksheet, indexRow + baseIndex) === 'SUBTOTAL CONSULTORIAS INDIVIDUALES') {
            componentType = 'goodsAndServices';
            baseIndex += 3;
            continue;
          }
          const componentToAdd = {
            estimatedTotalBalance: {},
            accumulatedUntilPreviousSemesterBalance: {},
            currentSemesterBalance: {},
            fundingSource: {},
            componentType
          };

          _.forIn(acquisitionPlanComponentsListDataMapper, (value, key) => {
            if (key.indexOf('.') > 0) {
              const splitKey = key.split('.');
              componentToAdd[splitKey[0]][splitKey[1]] = getWorksheetValue(worksheet, value + baseIndex);
            } else {
              const worksheetValue = getWorksheetValue(worksheet, value + baseIndex);
              if (key === 'status' && worksheetValue === 'Planificada'){
                componentToAdd[key] = 'pending';
              } else {
                componentToAdd[key] = worksheetValue;
              }
            }
          });
          parsedExcel.components.push(componentToAdd);
          baseIndex++;
        }
        callback(parsedExcel);
      } catch (exception) {
        callback('', exception);
      }
    };

    reader.readAsBinaryString(file);
  } catch (exception) {
    callback('', exception);
  }
};

const parseSummary = (workbook) => {
  const summaryPage = 2;
  const numberOfColumns = 4;
  let iterations = 0;
  let columnNumber = 0;
  let worksheet = workbook.Sheets[workbook.SheetNames[summaryPage]];
  const budgetComponents = [];
  const budgetComponent = {};
  const totalBudget = {};
  for (let z in worksheet) {
    /* all keys that do not begin with "!" correspond to cell addresses */
    if (z[0] === '!') {
      continue;
    }
    if (iterations >= numberOfColumns) {
      budgetComponent[getBudgetRowName(columnNumber)] = worksheet[z].v;
      if (columnNumber === numberOfColumns - 1) {
        columnNumber = 0;
        if (budgetComponent.name.indexOf('Componente') !== -1) {
          const information = budgetComponent.name.split(':');
          budgetComponent.name = information[0];
          budgetComponent.description = information[1];
          budgetComponents.push(Object.assign({}, budgetComponent));
        } else if (budgetComponent.name.indexOf('Total General') !== -1) {
          totalBudget.total = Object.assign({}, budgetComponent);
          delete totalBudget.total.description;
        } else if (budgetComponent.name.indexOf('% de financiamiento') !== -1) {
          totalBudget.financing = Object.assign({}, budgetComponent);
          delete totalBudget.financing.description;
        } else {
          const newBudgetComponent = Object.assign({}, budgetComponent);
          delete newBudgetComponent.description;
          budgetComponents.push(Object.assign({}, newBudgetComponent));
        }
      } else {
        columnNumber++;
      }
    }
    iterations++;
  }
  return {budgetComponents, totalBudget};
};

const parseDetailedBudget = (workbook, budgetComponentsSummary) => {
  const budgetComponents = Object.assign([], budgetComponentsSummary);
  const detailedBudget = 0;
  let worksheet = workbook.Sheets[workbook.SheetNames[detailedBudget]];
  let currentRow = 5;
  let componentItems = [];
  let componentSubitems = [];
  const component = {};
  const componentItem = {};
  const componentSubitem = {};
  const componentNumberColumn = 'D';
  const itemNumberColumn = 'E';
  const subitemNumberColumn = 'F';
  const descriptionColumn = 'G';
  let budgetComponentsIndex = 0;
  let componentNumber = worksheet[componentNumberColumn + currentRow].v.toString();
  let itemNumber = worksheet[itemNumberColumn + (currentRow + 1)].v.toString();
  while (worksheet[componentNumberColumn + currentRow] && worksheet[componentNumberColumn + currentRow].v[0] !== '!'
    && budgetComponents.length > budgetComponentsIndex) {
    if (worksheet[componentNumberColumn + currentRow].v.toString() === componentNumber &&
      worksheet[itemNumberColumn + currentRow].v.toString() === '0' &&
      worksheet[subitemNumberColumn + currentRow].v.toString() === '0') {
      component.componentNumber = worksheet[componentNumberColumn + currentRow].v.toString();
      component.itemNumber = worksheet[itemNumberColumn + currentRow].v.toString();
      component.subitemNumber = worksheet[subitemNumberColumn + currentRow].v.toString();
      component.name = worksheet[descriptionColumn + currentRow].v.toString();
    } else if (worksheet[componentNumberColumn + currentRow].v.toString() === componentNumber &&
      worksheet[itemNumberColumn + currentRow].v.toString() === itemNumber &&
      worksheet[subitemNumberColumn + currentRow].v.toString() === '0') {
      componentItem.componentNumber = worksheet[componentNumberColumn + currentRow].v.toString();
      componentItem.itemNumber = worksheet[itemNumberColumn + currentRow].v.toString();
      componentItem.subitemNumber = worksheet[subitemNumberColumn + currentRow].v.toString();
      componentItem.name = worksheet[descriptionColumn + currentRow].v.toString();
    } else if (worksheet[componentNumberColumn + currentRow].v.toString() === componentNumber &&
      worksheet[itemNumberColumn + currentRow].v.toString() === itemNumber &&
      worksheet[subitemNumberColumn + currentRow].v.toString() !== '0') {
      componentSubitem.componentNumber = worksheet[componentNumberColumn + currentRow].v.toString();
      componentSubitem.itemNumber = worksheet[itemNumberColumn + currentRow].v.toString();
      componentSubitem.subitemNumber = worksheet[subitemNumberColumn + currentRow].v.toString();
      componentSubitem.name = worksheet[descriptionColumn + currentRow].v.toString();
      componentSubitems.push(Object.assign({}, componentSubitem));
    } else if (worksheet[componentNumberColumn + currentRow].v.toString() === componentNumber &&
      worksheet[itemNumberColumn + currentRow].v.toString() !== 0 &&
      worksheet[itemNumberColumn + currentRow].v.toString() !== itemNumber) {
      componentItem.subitems = Object.assign([], componentSubitems);
      componentItems.push(Object.assign({}, componentItem));
      componentSubitems = [];
      itemNumber = worksheet[itemNumberColumn + currentRow] ? worksheet[itemNumberColumn + currentRow].v.toString() : '';
      componentItem.componentNumber = worksheet[componentNumberColumn + currentRow].v.toString();
      componentItem.itemNumber = worksheet[itemNumberColumn + currentRow].v.toString();
      componentItem.subitemNumber = worksheet[subitemNumberColumn + currentRow].v.toString();
      componentItem.name = worksheet[descriptionColumn + currentRow].v.toString();
    } else {
      componentItem.subitems = Object.assign([], componentSubitems);
      componentItems.push(Object.assign({}, componentItem));
      component.items = Object.assign([], componentItems);
      budgetComponents[budgetComponentsIndex].detailedBudget = Object.assign({}, component);
      budgetComponentsIndex++;
      componentSubitems = [];
      componentItems = [];
      componentNumber = worksheet[componentNumberColumn + currentRow].v.toString();
      itemNumber = worksheet[itemNumberColumn + (currentRow + 1)] ? worksheet[itemNumberColumn + (currentRow + 1)].v.toString() : '';
      component.componentNumber = worksheet[componentNumberColumn + currentRow].v.toString();
      component.itemNumber = worksheet[itemNumberColumn + currentRow].v.toString();
      component.subitemNumber = worksheet[subitemNumberColumn + currentRow].v.toString();
      component.name = worksheet[descriptionColumn + currentRow].v.toString();
    }
    currentRow++;
  }
  if (budgetComponents.length > budgetComponentsIndex) {
    if (componentItem.componentNumber.startsWith(componentNumber)) {
      componentItem.subitems = Object.assign([], componentSubitems);
      componentItems.push(Object.assign({}, componentItem));
    }
    component.items = Object.assign([], componentItems);
    budgetComponents[budgetComponentsIndex].detailedBudget = Object.assign({}, component);
  }
  return budgetComponents;
};

const parseBudgets = (file, callback) => {
  try {
    let reader = new FileReader();
    reader.onload = function(e) {
      try {
        let data = e.target.result;
        let workbook = XLSX.read(data, {type: 'binary'});
        /* Get worksheet */
        const parsedSummary = parseSummary(workbook);
        const budgetComponentsSummary = parsedSummary.budgetComponents;
        const totalBudget = parsedSummary.totalBudget;
        const budgetComponents = parseDetailedBudget(workbook, budgetComponentsSummary);
        callback(budgetComponents, totalBudget);
      } catch (exception) {
        callback('', '', exception);
      }
    };
    reader.readAsBinaryString(file);
  } catch (exception) {
    callback('', '', exception);
  }
};

const ExcelParser = {
  parseBudgets,
  parseAcquisitionPlan
};

export default ExcelParser;
