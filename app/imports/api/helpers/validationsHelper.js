import validator from 'validator';
import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';

const initializeNewProjectErrors = () => {
  return {
    name: {rules: ['required'], message: ''},
    executiveUnitId: {rules: ['required'], message: ''},
    auditorTeam: {rules: ['required'], message: ''},
    country: {rules: ['required'], message: ''},
    projectNumber: {rules: ['required'], message: ''},
    executionPeriod: {rules: ['required'], message: ''},
    paymentPeriod: {rules: ['required'], message: ''},
    projectMembers: {rules: ['required'], message: ''},
    totalBudget: {rules: [],
      message: ''},
    counterparty: {rules: ['required', 'numeric'], message: ''},
    FOMINContribution: {rules: ['required', 'numeric'], message: ''}
  };
};

const initializeConfirmRegistrationErrors = () => {
  return {
    password: {rules: ['required'], message: ''},
    confirmPassword: {rules: ['required'], message: ''}
  };
};

const initializeExecutiveUnitErrors = () => {
  return {
    name: {rules: ['required'], message: ''},
    phone: {rules: ['required'], message: ''},
    email: {rules: ['required', 'email'], message: ''},
    website: {rules: ['required'], message: ''},
    country: {rules: ['required'], message: ''},
    province: {rules: [], message: ''},
    city: {rules: ['required'], message: ''},
    street: {rules: ['required'], message: ''},
    streetNumber: {rules: ['required', 'numeric'], message: ''},
    apartment: {rules: [], message: ''}
  };
};

const initializeUserErrors = () => {
  return {
    role: {rules: ['required'], message: ''},
    name: {rules: ['required'], message: ''},
    surname: {rules: ['required'], message: ''},
    phone: {rules: ['required', 'numeric'], message: ''},
    email: {rules: ['required', 'email'], message: ''}
  };
};

const initializeProvidersErrors = () => {
  return {
    socialReason: {rules: ['required'], message: ''},
    cuit: {rules: ['required'], message: ''},
    phone: {rules: ['required'], message: ''},
    email: {rules: ['required', 'email'], message: ''},
  };
};

const initializeBiddingErrors = () => {
  return {selectedProviders: {rules: ['requiredArray'], message: ''}};
};

const initializeCommentErrors = () => {
  return {message: {rules: ['required'], message: ''}};
};

const initializeFileErrors = () => {
  return {file: {rules: ['requiredFile'], message: ''}};
};

const initializeFilesErrors = () => {
  return {file: {rules: ['requiredFiles'], message: ''}};
};

const initializeProjectFileErrors = () => {
  return {
    amount: {rules: ['requiredInvoiceAmount'], message: ''},
    type: {rules: ['required'], message: ''},
    budgetReference: {rules: ['required'], message: ''},
    acquisitionReference: {rules: ['required'], message: ''}
  };
};

const initializeUserProfileErrors = () => {
  return {
    name: {rules: ['required'], message: ''},
    surname: {rules: ['required'], message: ''},
    phone: {rules: ['required'], message: ''},
    email: {rules: ['required', 'email'], message: ''}
  };
};

const validateEmptyField = (value) => {
  return !value || value === "" || value === null;
};

const validateNumeric = (value) => {
  return (typeof value === 'string' && validator.isNumeric(value)) || typeof value === 'number';
};

const checkInvoiceAmount = (field, typeField, nameField, errors) => {
  if (typeField === 'invoice' && !validateNumeric(field)) {
    errors[nameField].message = 'numeric';
  }
  if (typeField === 'invoice' && validateEmptyField(field)) {
    errors[nameField].message = 'empty';
  }

  return errors;
};

const checkEmpty = (field, nameField, errors) => {
  if ((typeof field === 'string' && validateEmptyField(field)) ||
  (typeof field === 'object' && field.length === 0) ||
  (typeof field === 'object' && Object.keys(field).length === 0)) {
    errors[nameField].message = 'empty';
  }
  return errors;
};

const checkEmptyArray = (field, nameField, errors) => {
  let anyFieldEmpty = false;
  if (!field) {
    anyFieldEmpty = true;
  } else {
    field.map(f => {
      if  (validateEmptyField(f)) {
        anyFieldEmpty = true;
      }
    });
  }
  if (anyFieldEmpty || field.length === 0) {
    errors[nameField].message = 'emptyFields';
  }
  return errors;
};

const checkEmptyFiles = (field, nameField, errors) => {
  if (typeof field === 'object' && field.length === 0) {
    errors[nameField].message = 'emptyFiles';
  }
  return errors;
};

const checkFileUpload = (field, nameField, errors) => {
  if (typeof field === 'object' && !field.name) {
    errors[nameField].message = 'emptyFile';
  }
  return errors;
};

const checkNumeric = (field, nameField, errors) => {
  if (!validateNumeric(field)) {
    errors[nameField].message = 'numeric';
  }
  return errors;
};

const checkTotal = (formData, nameField, fields, errors) => {
  let total = 0;
  fields.map((field) => {
    if (formData[field] && validateNumeric(formData[field])) {
      total += parseInt(formData[field], 10);
    }
  });
  if (total !== parseInt(formData[nameField], 10)) {
    errors[nameField].message = 'total';
  }
  return errors;
};

const checkEmail = (field, nameField, errors) => {
  if (typeof field === 'string' && !validator.isEmail(field)) {
    errors[nameField].message = 'email';
  }
  return errors;
};

const getProjectErrors = (formData, errors) => {

  let newErrors = Object.assign({}, errors);

  const errorKeys = Object.keys(newErrors);

  errorKeys.map((errorKey) => {
    newErrors[errorKey].rules.map((rule) => {
      if (newErrors[errorKey].message === '') {
        if (typeof rule === 'string') {
          if (rule === 'required') {
            newErrors = checkEmpty(formData[errorKey], errorKey, newErrors);
          }
          if (rule === 'requiredInvoiceAmount') {
            newErrors = checkInvoiceAmount(formData[errorKey], formData.type, errorKey, newErrors);
          }
          if (rule === 'numeric') {
            newErrors = checkNumeric(formData[errorKey], errorKey, newErrors);
          }
          if (rule === 'requiredFile') {
            newErrors = checkFileUpload(formData[errorKey], errorKey, newErrors);
          }
          if (rule === 'requiredFiles') {
            newErrors = checkEmptyFiles(formData[errorKey], errorKey, newErrors);
          }
          if (rule === 'email') {
            newErrors = checkEmail(formData[errorKey], errorKey, newErrors);
          }
          if (rule === 'requiredArray') {
            newErrors = checkEmptyArray(formData[errorKey], errorKey, newErrors);
          }
        } else if (typeof rule === 'object') {
          if (rule.name === 'total') {
            newErrors = checkTotal(formData, errorKey, rule.fields, newErrors);
          }
        }
      }
    });
  });

  let hasErrors = false;

  errorKeys.map((errorKey) => {
    if (newErrors[errorKey].message !== '') {
      hasErrors = true;
    }
  });

  const allErrors = { hasErrors, newErrors };

  return allErrors;
};

const getErrorMessage = (error) => {
  if (error === 'empty') {
    return TAPi18n.__('error.emptyField');
  } else if (error === 'emptyFields') {
    return TAPi18n.__('error.emptyFields');
  } else if (error === 'numeric') {
    return TAPi18n.__('error.numericField');
  } else if (error === 'total') {
    return TAPi18n.__('error.sumField');
  } else if (error === 'emptyFile' || error === 'emptyFiles') {
    return TAPi18n.__('error.emptyFile');
  } else if (error === 'email') {
    return TAPi18n.__('error.email');
  } else if (error === 'format') {
    return TAPi18n.__('error.format');
  } else if (error === 'notMatchingPasswords') {
    return TAPi18n.__('error.passwordsDontMatch');
  } else if (error === 'invalidPublicKeyLength') {
    return TAPi18n.__('error.invalidPublicKeyLength');
  } else if (error.indexOf('duplicate') !== -1) {
    return TAPi18n.__('error.duplicateFieldStart') + error.split(' ')[1] +
      TAPi18n.__('error.duplicateFieldEnd');
  } else {
    return '';
  }
};

const parseMongoFileError = (error) => {
  let reason = 'file';
  let detail = error.toString();
  throw new Meteor.Error(404, reason, detail);
};

const parseMongoError = (error) => {
  let reason = '';
  let detail = '';
  if (validator.contains(error.toString(), "already exists")) {
    reason = 'duplicate key';
    if (validator.contains(error.toString().toLowerCase(), "email")) {
      detail = 'email';
    }
  } else {
    reason = 'server error';
    detail = error.toString();
  }
  throw new Meteor.Error(404, reason, detail);
};

const checkServerError = (error, errors) => {
  const newErrors = Object.assign({}, errors);
  if (validator.equals(error.reason.toString(), "duplicate key")) {
    newErrors[error.details].message = 'duplicate ' + error.details;
  } if (validator.equals(error.reason.toString(), "file")) {
    newErrors.file.message = 'format';
    console.log('File format error: ' + error.details);
  } else {
    console.log(error.reason + ": " + error.details);
  }
  return newErrors;
};

const displayServerError = (error) => {
  //  to do: show toast message
  console.log(error.reason + ": " + error.details);
};

const displayFileError = (error) => {
  //  to do: show toast message
  console.log(error);
};

export const validationsHelper = {
  getProjectErrors,
  getErrorMessage,
  validateEmptyField,
  initializeNewProjectErrors,
  initializeConfirmRegistrationErrors,
  initializeExecutiveUnitErrors,
  initializeUserErrors,
  initializeCommentErrors,
  initializeFileErrors,
  initializeFilesErrors,
  initializeUserProfileErrors,
  parseMongoError,
  parseMongoFileError,
  checkServerError,
  displayServerError,
  displayFileError,
  initializeProjectFileErrors,
  initializeProvidersErrors,
  initializeBiddingErrors
};
