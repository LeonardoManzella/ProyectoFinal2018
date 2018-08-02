/********************
******* USERS *******
********************/

db.getCollection('users').remove({});

db.getCollection('users').insert([
  {
    "_id": "WazBtJffQp3po9z2u",
    "createdAt": ISODate("2018-01-23T19:11:06.578Z"),
    "services": {
      "password": {
        "bcrypt": "$2a$10$rcSqSWZ7hWLniyw2JFAxJurE9nTHntOv/X6GjZVqq5qF4j1nwlNZC"
      },
      "resume": {
        "loginTokens": [ 
          {
            "when": ISODate("2018-01-24T21:01:10.281Z"),
            "hashedToken": "/9bhrE7nZ+1E2aa7c6Ytd8tiTw/bjzI2i8tMevjUEJs="
          }
        ]
      }
    },
    "roles": ["administrator"],
    "emails": [ 
      {
        "address": "admin@emprendimientos.com",
        "verified": false
      }
    ],
    "personalInformation": {
      "name": "Diego",
      "surname": "Bresler",
      "phone": "1234",
      "status": "approved"
    }
  },
  {
    "_id": "VazBtJffQD3po9z2u",
    "createdAt": ISODate("2018-01-23T19:11:06.578Z"),
    "services": {
      "password": {
        "bcrypt": "$2a$10$rcSqSWZ7hWLniyw2JFAxJurE9nTHntOv/X6GjZVqq5qF4j1nwlNZC"
      },
      "resume": {
        "loginTokens": []
      }
    },
    "roles": ["adminAdmin"],
    "emails": [ 
      {
        "address": "admin@admin.com",
        "verified": false
      }
    ],
    "personalInformation": {
      "name": "Maintanance",
      "surname": "Admin",
      "phone": "1234",
      "status": "approved"
    }
  },
  {
    "_id" : "WazBtJffQp3po9z2e",
    "createdAt" : ISODate("2018-01-23T19:11:06.578Z"),
    "services" : {
        "password" : {
            "bcrypt" : "$2a$10$rcSqSWZ7hWLniyw2JFAxJurE9nTHntOv/X6GjZVqq5qF4j1nwlNZC"
        },
        "resume" : {
            "loginTokens" : []
        }
    },
    "roles" : [ 
        "entrepreneur"
    ],
    "emails" : [ 
        {
            "address" : "emprendedor@emprendimientos.com",
            "verified" : false
        }
    ],
    "personalInformation" : {
        "name" : "Emprendedor",
        "surname" : "1",
        "phone" : "1234",
        "status" : "approved"
    }
  }
]);

/******************
**** ACTIVITIES ***
*******************/

db.getCollection('activities').remove({});

db.getCollection('activities').insert([
  {
    "type" : "user",
    "extraTitle" : "activityNames.welcomeMessage",
    "title": "",
    "createdBy" : "activityNames.BID",
    "actionDescription": "te envió este mensaje",
    "createdAt" : ISODate("2018-01-23T21:01:10.281Z"),
    "userId": "WazBtJffQp3po9z2u"
  },
  {
    "type" : "user",
    "extraTitle" : "activityNames.welcomeMessage",
    "title": "",
    "createdBy" : "activityNames.BID",
    "actionDescription": "te envió este mensaje",
    "createdAt" : ISODate("2018-01-23T21:01:10.281Z"),
    "userId": "WazBtJffQp3po9z2q"
  },
  {
    "type" : "user",
    "extraTitle" : "activityNames.welcomeMessage",
    "title": "",
    "createdBy" : "activityNames.BID",
    "actionDescription": "te envió este mensaje",
    "createdAt" : ISODate("2018-01-23T21:01:10.281Z"),
    "userId": "WddBtJffQp3po9z2q"
  },
  {
    "type" : "user",
    "extraTitle" : "activityNames.welcomeMessage",
    "title": "",
    "createdBy" : "activityNames.BID",
    "actionDescription": "te envió este mensaje",
    "createdAt" : ISODate("2018-01-23T21:01:10.281Z"),
    "userId": "xazBtJffQp3po9z2q"
  },
  {
    "type" : "user",
    "extraTitle" : "activityNames.welcomeMessage",
    "title": "",
    "createdBy" : "activityNames.BID",
    "actionDescription": "te envió este mensaje",
    "createdAt" : ISODate("2018-01-23T21:01:10.281Z"),
    "userId": "xazBtJffQp87b21be"
  },
  {
    "type" : "user",
    "extraTitle" : "activityNames.welcomeMessage",
    "title": "",
    "createdBy" : "activityNames.BID",
    "actionDescription": "te envió este mensaje",
    "createdAt" : ISODate("2018-01-23T21:01:10.281Z"),
    "userId": "xazBtJff4nn7b21be"
  },
  {
    "type" : "user",
    "extraTitle" : "activityNames.welcomeMessage",
    "title": "",
    "createdBy" : "activityNames.BID",
    "actionDescription": "te envió este mensaje",
    "createdAt" : ISODate("2018-01-23T21:01:10.281Z"),
    "userId": "x5zBtJffQp3sb21be"
  },
  {
    "type" : "role",
    "roles": ["administrator"],
    "extraTitle": "activityNames.user",
    "title": "Agustin Rosas",
    "createdBy": "WazBtJffQp3po9z2u",
    "actionDescription": "activityNames.addedUser",
    "createdAt" : ISODate("2018-01-24T21:01:10.281Z")
  },
  {
    "type" : "role",
    "roles": ["administrator"],
    "extraTitle": "activityNames.user",
    "title": "Nicole Kirby",
    "createdBy": "WazBtJffQp3po9z2u",
    "actionDescription": "activityNames.addedUser",
    "createdAt" : ISODate("2018-01-24T21:01:10.281Z")
  },
  {
    "type" : "role",
    "roles": ["administrator"],
    "extraTitle": "activityNames.user",
    "title": "John Lemon",
    "createdBy": "WazBtJffQp3po9z2u",
    "actionDescription": "activityNames.addedUser",
    "createdAt" : ISODate("2018-01-24T21:01:10.281Z")
  },
  {
    "type" : "role",
    "roles": ["administrator"],
    "extraTitle": "activityNames.user",
    "title": "Juan Pichu",
    "createdBy": "WazBtJffQp3po9z2u",
    "actionDescription": "activityNames.addedUser",
    "createdAt" : ISODate("2018-01-24T21:01:10.281Z")
  },
  {
    "type" : "project",
    "title" : "Desarrollo de un modelo de conversión de residuos forestales en energía para cubrir necesidades básicas de población vulnerable en el minicipio de San Carlos de Bariloche",
    "descriptions": ["Desarrollo de un modelo de conversión de residuos forestales en energía para cubrir necesidades básicas de población vulnerable en el minicipio de San Carlos de Bariloche"],
    "createdBy" : "WazBtJffQp3po9z2u",
    "actionDescription": "creó un nuevo proyecto",
    "projectId": "nNqwTJsQWSYu6P855",
    "createdAt" : ISODate("2018-01-24T21:01:10.281Z"),
    "projectType": "projectView"
  },
  {
    "type" : "project",
    "title" : "Presupuesto Budget_sample.xlsx",
    "createdBy" : "WazBtJffQp3po9z2u",
    "actionDescription": "adjuntó un presupuesto",
    "projectName": "Desarrollo de un modelo de conversión de residuos forestales en energía para cubrir necesidades básicas de población vulnerable en el minicipio de San Carlos de Bariloche",
    "descriptions": ["Desarrollo de un modelo de conversión de residuos forestales en energía para cubrir necesidades básicas de población vulnerable en el minicipio de San Carlos de Bariloche"],
    "projectId": "nNqwTJsQWSYu6P855",
    "hash": "2342432",
    "createdAt" : ISODate("2018-01-24T21:01:10.281Z"),
    "projectType": "projectBudget"
  },
  {
    "type" : "project",
    "title" : "Factura B238.pdf",
    "createdBy" : "xazBtJffQp3po9z2q",
    "actionDescription": "adjuntó un archivo",
    "projectId": "nNqwTJsQWSYu6P855",
    "projectName": "Desarrollo de un modelo de conversión de residuos forestales en energía para cubrir necesidades básicas de población vulnerable en el minicipio de San Carlos de Bariloche",
    "descriptions": ["Desarrollo de un modelo de conversión de residuos forestales en energía para cubrir necesidades básicas de población vulnerable en el minicipio de San Carlos de Bariloche"],
    "hash": "hscieu45hsckshrnmkdn456",
    "createdAt" : ISODate("2018-01-24T21:01:10.281Z"),
    "projectType": "documentation"
  },
  {
    "type" : "project",
    "title" : "Contrato Y258.pdf",
    "createdBy" : "WazBtJffQp3po9z2u",
    "actionDescription": "adjuntó un archivo",
    "projectId": "nNqwTJsQWSYu6P855",
    "projectName": "Desarrollo de un modelo de conversión de residuos forestales en energía para cubrir necesidades básicas de población vulnerable en el minicipio de San Carlos de Bariloche",
    "descriptions": ["Desarrollo de un modelo de conversión de residuos forestales en energía para cubrir necesidades básicas de población vulnerable en el minicipio de San Carlos de Bariloche"],
    "hash": "ddcieu45hsckshrnmkdn456",
    "createdAt" : ISODate("2018-01-24T21:01:10.281Z"),
    "projectType": "documentation"
  },
  {
    "type": "project",
    "title": "La Panaderia SA",
    "createdBy": "xazBtJffQp3po9z2q",
    "actionDescription": "activityNames.addedProvider",
    "descriptions": ["Desarrollo de un modelo de conversión de residuos forestales en energía para cubrir necesidades básicas de población vulnerable en el minicipio de San Carlos de Bariloche"],
    "projectId": "nNqwTJsQWSYu6P855",
    "projectType": "providers",
    "createdAt" : ISODate("2018-01-24T21:01:10.281Z")
  }
]);

db.getCollection('boards').remove({});

db.getCollection('boards').insert([
  {
    "_id" : "5XjQShYGkwrqfsreJ",
    "lanes" : [ 
        {
            "id" : "lane1",
            "title" : "Planned Tasks",
            "label" : "2/2",
            "cards" : [ 
                {
                    "id" : "Card1",
                    "title" : "Write Blog",
                    "description" : "Can AI make memes",
                    "label" : "30 mins",
                    "laneId" : "lane1"
                }, 
                {
                    "title" : "New card",
                    "id" : "03c948c0-4a8c-11e8-9eb7-737aee0472a8",
                    "laneId" : "lane1"
                }
            ],
            "currentPage" : 1
        }, 
        {
            "id" : "lane2",
            "title" : "Completed",
            "label" : "0/0",
            "cards" : [ 
                {
                    "id" : "Card2",
                    "title" : "Pay Rent",
                    "description" : "Transfer via NEFT",
                    "label" : "5 mins",
                    "metadata" : {
                        "sha" : "be312a1"
                    },
                    "laneId" : "lane2"
                }
            ],
            "currentPage" : 1
        }
    ]
}
])