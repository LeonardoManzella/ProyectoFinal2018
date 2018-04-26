import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import moment from 'moment';
import 'moment/locale/es';

if (Meteor.isClient) {
  Meteor.startup(() => {
    TAPi18n.setLanguage('es');
    moment.locale('es');
  });
}
