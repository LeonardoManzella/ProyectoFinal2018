import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import moment from 'moment';
import 'moment/locale/es';

if (Meteor.isClient) {
  Meteor.startup(() => {
    TAPi18n.setLanguage('es');
    moment.locale('es');
    var LEVEL_LOG = "log";
    var LEVEL_WARN = "warn";
    var LEVEL_ERROR = "error";
    
    //remap console.log to send to the server
    var clientLogger = console.log;
    console.log = function() {
      clientLogger.apply(this,arguments);
      return Meteor.call('clientLog', LEVEL_LOG, arguments);
    };
    console.warn = function() {
      return Meteor.call('clientLog', LEVEL_WARN, arguments);
    };
     console.error = function() {
      return Meteor.call('clientLog', LEVEL_ERROR, arguments);
    };
    window.onerror = function() {
      return Meteor.call('clientLog', LEVEL_ERROR, arguments);
    };
  });
}
