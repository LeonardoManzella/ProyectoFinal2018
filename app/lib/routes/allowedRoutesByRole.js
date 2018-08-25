const allowedRoutesByRole = {
  entrepreneur: ['tasksBoard', 'chart', 'chatbot', 'canvas', 'planList',
    'swot', 'risks', 'calendar'],
  administrator: ['tasksBoard', 'usersList', 'chart', 'chatbot', 'reminders',
    'canvas', 'planList', 'swot', 'risks', 'calendar'],
  adminAdmin: ['tasksBoard', 'usersList', 'chart', 'chatbot', 'reminders',
    'canvas', 'planList', 'swot', 'risks', 'calendar'] //For demo and emergency maintanance
};

export default allowedRoutesByRole;
