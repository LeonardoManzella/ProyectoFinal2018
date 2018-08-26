const allowedRoutesByRole = {
  entrepreneur: ['binnacle', 'tasksBoard', 'expert', 'chart', 'chatbot', 'canvas', 'planList',
    'swot', 'risks', 'calendar', 'paypal'],
  administrator: ['binnacle', 'tasksBoard', 'expert', 'usersList', 'chart', 'chatbot', 'reminders',
    'canvas', 'planList', 'swot', 'risks', 'calendar', 'paypal'],
  adminAdmin: ['binnacle', 'tasksBoard', 'expert', 'usersList', 'chart', 'chatbot', 'reminders',
    'canvas', 'planList', 'swot', 'risks', 'calendar', 'paypal'] //For demo and emergency maintanance
};

export default allowedRoutesByRole;
