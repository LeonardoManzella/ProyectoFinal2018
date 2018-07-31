const allowedRoutesByRole = {
  entrepreneur: ['binnacle', 'tasksBoard', 'expert', 'chart', 'chatbot', 'canvas', 'planList',
    'swot', 'risks'],
  administrator: ['binnacle', 'tasksBoard', 'expert', 'usersList', 'chart', 'chatbot', 'reminders',
    'canvas', 'planList', 'swot', 'risks'],
  adminAdmin: ['binnacle', 'tasksBoard', 'expert', 'usersList', 'chart', 'chatbot', 'reminders',
    'canvas', 'planList', 'swot', 'risks'] //For demo and emergency maintanance
};

export default allowedRoutesByRole;
