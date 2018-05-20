import { Meteor } from 'meteor/meteor';

export const fileTypes = [
  {
    id: "invoice",
    name: "fileTypes.invoice",
    i18n: true
  },
  {
    id: "tdr",
    name: "fileTypes.tdr",
    i18n: true
  },
  {
    id: "et",
    name: "fileTypes.et",
    i18n: true
  },
  {
    id: "contract",
    name: "fileTypes.contract",
    i18n: true
  },
  {
    id: "finalReport",
    name: "fileTypes.finalReport",
    i18n: true
  },
  {
    id: "advances",
    name: "fileTypes.advances",
    i18n: true
  },
  {
    id: "price",
    name: "fileTypes.price",
    i18n: true
  }
];

export const fileTypesProvider = [
  {
    id: "invoice",
    name: "fileTypes.invoice",
    i18n: true
  },
  {
    id: "price",
    name: "fileTypes.price",
    i18n: true
  },
  {
    id: "finalReport",
    name: "fileTypes.finalReport",
    i18n: true
  },
  {
    id: "advances",
    name: "fileTypes.advances",
    i18n: true
  }
];

export const fileTypesByUser = {
  executiveDirector: [
    "tdr",
    "et",
    "contract",
    "finalReport",
    "paymentProof"
  ],
  administrativeAssistant: [
    "tdr",
    "et",
    "contract",
    "finalReport"
  ],
  provider: [
    "invoice",
    "advances",
    "price",
    "contract",
    "finalReport",
    "resume"
  ],
  administrator: [
  ]
};

export const canUploadFile = function() {
  return Object.keys(fileTypesByUser).indexOf(Meteor.user().roles[0]) >= 0;
};

export const getFileTypesByUser = function() {
  return  canUploadFile() ? fileTypesByUser[Meteor.user().roles[0]] : undefined;
};

export const getFileTypesForPayment = function() {
  return ["finalReport", "advances", "invoice", "paymentProof"];
};

