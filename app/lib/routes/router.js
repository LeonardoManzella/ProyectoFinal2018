import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Meteor } from 'meteor/meteor';
import MainLayout from '../../imports/ui/components/MainLayout';
import Activity from '../../imports/ui/components/activityComponents/Activity';
import UserPage from '../../imports/ui/components/userComponents/UserPage';
import UserProfile from '../../imports/ui/components/userComponents/UserProfile';
import ConfirmRegistration from '../../imports/ui/components/login/ConfirmRegistration';
import allowedRoutesByRole from './allowedRoutesByRole';
import NotFound from '../../imports/ui/components/NotFound';
import Pending from '../../imports/ui/components/login/Pending';
import Binnacle from '../../imports/ui/components/binnacle/Binnacle'
import TasksBoard from '../../imports/ui/components/task/TasksBoard'
import NumericProjectionContainer from '../../imports/ui/containers/numericProjectionContainers/NumericProjectionContainer'
import RemindersContainer from '../../imports/ui/containers/remindersContainer/RemindersContainer';
import SuggestionsChatbot from '../../imports/ui/components/suggestionsChatbot/SuggestionsChatbot';
import PlanContainer from '../../imports/ui/containers/userTasksContainers/PlanContainer';
import CanvasContainer from '../../imports/ui/containers/canvasContainers/CanvasContainer';
import SwotContainer from '../../imports/ui/containers/swotAndRisksContainers/SwotContainer';
import RisksContainer from '../../imports/ui/containers/swotAndRisksContainers/RisksContainer';
import HomePage from '../../imports/ui/components/HomePage';
import ExpertChatbot from '../../imports/ui/components/expertChatbot/ExpertChatbot.jsx'
import PaymentPage from '../../imports/ui/components/payment/PaymentPage.jsx'
import Calendar from '../../imports/ui/components/calendar/Calendar.jsx'
import ReviewInterview from '../../imports/ui/components/expertChatbot/ReviewInterview'
import EntrepreneurList from '../../imports/ui/components/entrepreneurList/EntrepreneurList';

export const DEFAULT_ROUTE = 'home';
const publicRoutes = [DEFAULT_ROUTE, 'landing', 'profile', 'pending', 'notFound'];
const allowedRoutesByEntrepreneurStatus = {
  pendingChatbot: ['chatbot', 'reviewInterview'],
  pendingAreas: ['canvas', 'chatbot', 'reviewInterview'],
  pendingPlans: ['planList', 'canvas', 'chatbot', 'reviewInterview']
};

const isEntrepreneurAndIsntApproved = (status) => {
  return Roles.userIsInRole(Meteor.userId(), ['entrepreneur']) &&
    Object.keys(allowedRoutesByEntrepreneurStatus).includes(status);
}

const verifyNotAllowedRouteByEntrepreneurStatus = (routeName) => {
  const user = Meteor.user();
  if (!user) return true;
  const status = user.personalInformation.status;
  return isEntrepreneurAndIsntApproved(status) &&
    !allowedRoutesByEntrepreneurStatus[status].includes(routeName);
}

const mustBeAuthenticated = function mustBeAuthenticated() {
  const userId = Meteor.userId();
  const user = Meteor.user();
  if (!userId) {
    FlowRouter.go('landing');
    return;
  }
  if (user.personalInformation.status === 'pending') {
    FlowRouter.go('pending');
  }
};

const mustBeAllowedToAccessRoute = function(route) {
  const user = Meteor.user();
  if (!user) {
    return;
  }
  const userRole = user.roles[0];
  if (allowedRoutesByRole[userRole].indexOf(route.route.name) < 0 
    || verifyNotAllowedRouteByEntrepreneurStatus(route.route.name)) {
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

FlowRouter.triggers.enter([mustBeAuthenticated], { except: ['landing', 'confirmRegistration'] });

FlowRouter.triggers.enter([mustBeAllowedToAccessRoute], {except: publicRoutes});

FlowRouter.route('/', {
  name: 'home',
  action: function(params) {
    const status =  Meteor.user() ?  Meteor.user().personalInformation.status :  Meteor.user();
    if (isEntrepreneurAndIsntApproved(status)) {
      FlowRouter.go(allowedRoutesByEntrepreneurStatus[status][0]);
    } else if (Roles.userIsInRole(Meteor.userId(), ['entrepreneur'])) {
      mount(MainLayout, {content: <Binnacle/>});
    } else { 
      mount(MainLayout, {content: <EntrepreneurList/>});
    }
  }
});

FlowRouter.route('/landing', {
  name: 'landing',
  action: function() {
    if (Meteor.user()) {
      FlowRouter.go('home');
    } else {
      mount(HomePage);
    }
  },
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

FlowRouter.route('/calendar', {
  name: 'calendar',
  action: function() {
    mount(MainLayout, {content: <Calendar/>});
  }
})

FlowRouter.route('/chatbot', {
  name: 'chatbot',
  action: function() {
    mount(MainLayout, {content: <ExpertChatbot/>});
  }
})

FlowRouter.route('/payment', {
    name: 'payment',
    action: function() {
        mount(MainLayout, {content: <PaymentPage/>});
    }
})

FlowRouter.route('/reviewInterview', {
  name: 'reviewInterview',
  action: function() {
    mount(MainLayout, {content: <ReviewInterview/>});
  }
})


FlowRouter.route('/chart', {
  name: 'chart',
  action: function() {
    mount(MainLayout, {content: <NumericProjectionContainer/>});
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
    mount(MainLayout, {content: <CanvasContainer/>});
  }
});

FlowRouter.route('/planList', {
  name: 'planList',
  action: function(params, queryParams) {
    mount(MainLayout, {content: <PlanContainer planName={queryParams.planName}/>});
  }
});

FlowRouter.route('/swot', {
  name: 'swot',
  action: function() {
    mount(MainLayout, {content: <SwotContainer/>});
  }
});

FlowRouter.route('/risks', {
  name: 'risks',
  action: function() {
    mount(MainLayout, {content: <RisksContainer/>});
  }
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

FlowRouter.route('/:userId', {
  name: 'adminHome',
  action: function(params) {
    if (params.userId) {
      mount(MainLayout, {content: <Binnacle userId={params.userId}/>});
    } else { 
      mount(MainLayout, {content: <EntrepreneurList/>});
    }
  }
});

FlowRouter.route('/:userId/chatbot', {
  name: 'adminChatbot',
  action: function(params) {
    mount(MainLayout, {content: <ExpertChatbot userId={params.userId}/>});
  }
});
FlowRouter.route('/:userId/reviewInterview', {
  name: 'adminReviewInterview',
  action: function(params) {
    mount(MainLayout, {content: <ReviewInterview userId={params.userId}/>});
  }
})
FlowRouter.route('/:userId/canvas', {
  name: 'adminCanvas',
  action: function(params) {
    mount(MainLayout, {content: <CanvasContainer userId={params.userId}/>});
  }
});
FlowRouter.route('/:userId/planList', {
  name: 'adminPlanList',
  action: function(params, queryParams) {
    mount(MainLayout, {content: <PlanContainer planName={queryParams.planName} userId={params.userId}/>});
  }
});
FlowRouter.route('/:userId/swot', {
  name: 'adminSwot',
  action: function(params) {
    mount(MainLayout, {content: <SwotContainer userId={params.userId}/> } );
  }
});
FlowRouter.route('/:userId/risks', {
  name: 'adminRisks',
  action: function(params) {
    mount(MainLayout, {content: <RisksContainer userId={params.userId}/>});
  }
});
FlowRouter.route('/:userId/chart', {
  name: 'adminChart',
  action: function(params) {
    mount(MainLayout, {content: <NumericProjectionContainer userId={params.userId}/>});
  }
});