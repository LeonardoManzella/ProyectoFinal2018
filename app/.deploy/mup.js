module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '178.128.229.73',
      username: 'digital_ocean',
      // pem: './path/to/pem'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'botigo',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://178.128.229.73',
      //mongodb://<dbuser>:<dbpassword>@<mongo_instance_url>:<port>/<dbname>
      //MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_URL: 'mongodb://178.128.229.73:27059/meteor',
      //MONGO_OPLOG_URL: 'mongodb://mongodb/local',
      PORT: 4000,
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },

    deployCheckPort: 4000,
    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  // mongo: {
  //   version: '3.4.1',
  //   servers: {
  //     one: {}
  //   }
  // },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mywebsite.com,www.mywebsite.com',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'email@domain.com'
  //   }
  // }
};
