const allowedRoutesByRole = {
  entrepreneur: ['binnacle', 'tasksBoard', 'expert', 'chart', 'chatbot', 'canvas', 'planList',
    'swot', 'risks', 'calendar'],
  administrator: ['binnacle', 'tasksBoard', 'expert', 'usersList', 'chart', 'chatbot', 'reminders',
    'canvas', 'planList', 'swot', 'risks', 'calendar'],
  adminAdmin: ['binnacle', 'tasksBoard', 'expert', 'usersList', 'chart', 'chatbot', 'reminders',
    'canvas', 'planList', 'swot', 'risks', 'calendar'] //For demo and emergency maintanance
};

export default allowedRoutesByRole;
