import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Meteor } from 'meteor/meteor';
import MainLayout from '../../imports/ui/components/MainLayout';
import Activity from '../../imports/ui/components/activityComponents/Activity';
import Login from '../../imports/ui/components/login/Login';
import UserPage from '../../imports/ui/components/userComponents/UserPage';
import UserProfile from '../../imports/ui/components/userComponents/UserProfile';
import ConfirmRegistration from '../../imports/ui/components/login/ConfirmRegistration';
import allowedRoutesByRole from './allowedRoutesByRole';
import NotFound from '../../imports/ui/components/NotFound';
import Pending from '../../imports/ui/components/login/Pending';
import Binnacle from '../../imports/ui/components/binnacle/Binnacle'
import TasksBoard from '../../imports/ui/components/task/TasksBoard'
import Expert from '../../imports/ui/components/expert/Expert'
import Chart from '../../imports/ui/components/chart/Chart'
import RemindersContainer from '../../imports/ui/containers/remindersContainer/RemindersContainer';
import ExpertChatbot from '../../imports/ui/components/expertChatbot/ExpertChatbot';
import Canvas from '../../imports/ui/components/canvas/Canvas';

export const DEFAULT_ROUTE = 'home';
const publicRoutes = [DEFAULT_ROUTE, 'login', 'profile', 'pending', 'notFound'];

const mustBeAuthenticated = function mustBeAuthenticated() {
  const userId = Meteor.userId();
  const user = Meteor.user();
  if (!userId) {
    FlowRouter.go('login');
    return;
  }
  if (user.personalInformation.status !== 'approved') {
    FlowRouter.go('pending');
  }
};

const mustBeAllowedToAccessRoute = function(route) {
  const user = Meteor.user();
  if (!user) {
    return;
  }
  const userRole = user.roles[0];
  if (allowedRoutesByRole[userRole].indexOf(route.route.name) < 0 ) {
    FlowRouter.go('notFound');
    return;
  }
};

FlowRouter.notFound = {
  action: function() {
    FlowRouter.go('notFound');
  }
};

FlowRouter.wait();
Tracker.autorun(function() {
  if (Meteor.isClient) {
    const userSubs = Meteor.subscribe('userData');
    if (userSubs.ready() &&
      !FlowRouter._initialized
    ) {
      return FlowRouter.initialize();
    }
  }
  return true;
});

FlowRouter.triggers.enter([mustBeAuthenticated], { except: ['login', 'confirmRegistration'] });

FlowRouter.triggers.enter([mustBeAllowedToAccessRoute], {except: publicRoutes});

FlowRouter.route('/', {
  name: 'home',
  action: function() {
    mount(MainLayout, {content: <Activity/>});
  }
});

FlowRouter.route('/usersList', {
  name: 'usersList',
  action: function() {
    mount(MainLayout, {content: <UserPage/>});
  }
});

FlowRouter.route('/pending', {
  name: 'pending',
  action: function() {
    mount(Pending);
  }
})

FlowRouter.route('/tasksBoard', {
  name: 'tasksBoard',
  action: function() {
    mount(MainLayout, {content: <TasksBoard/>});
  }
})

FlowRouter.route('/binnacle', {
  name: 'binnacle',
  action: function() {
    mount(MainLayout, {content: <Binnacle/>});
  }
})

FlowRouter.route('/expert', {
  name: 'expert',
  action: function() {
    mount(MainLayout, {content: <Expert/>});
  }
})

FlowRouter.route('/chatbot', {
  name: 'chatbot',
  action: function() {
    mount(MainLayout, {content: <ExpertChatbot/>});
  }
})

FlowRouter.route('/chart', {
  name: 'chart',
  action: function() {
    mount(MainLayout, {content: <Chart/>});
  }
})

FlowRouter.route('/reminders', {
  name: 'reminders',
  action: function() {
    mount(MainLayout, {content: <RemindersContainer/>});
  }
});

FlowRouter.route('/canvas', {
  name: 'canvas',
  action: function() {
    mount(MainLayout, {content: <Canvas/>});
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action: function() {
    mount(Login);
  },
  triggersEnter: [function(context, redirect) {
    const userId = Meteor.userId();
    if (userId) {
      FlowRouter.go(DEFAULT_ROUTE);
      return;
    }
  }]
});

FlowRouter.route('/profile', {
  name: 'profile',
  action: function() {
    mount(MainLayout, {content: <UserProfile/>});
  }
});

FlowRouter.route('/notFound', {
  name: 'notFound',
  action: function() {
    mount(NotFound);
  }
});

FlowRouter.route('/confirmRegistration/:refcode/', {
  name: 'confirmRegistration',
  action: function(params) {
    console.log('params', params);
    Meteor.call('validateRegistrationRefcode', params.refcode, (err, res) => {
      if (err) {
        console.log('There has been an error', err);
      }
      if (res) {
        mount(ConfirmRegistration, {
          refcode: params.refcode
        });
      } else {
        console.log('refcode not validated');
        mount(NotFound);
      }
    });
  }
});
