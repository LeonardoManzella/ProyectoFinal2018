const allowedRoutesByRole = {
  entrepreneur: ['tasksBoard', 'chart', 'chatbot', 'canvas', 'planList',
    'swot', 'risks', 'calendar','reviewInterview'],
  administrator: ['tasksBoard', 'usersList', 'chart', 'chatbot', 'reminders',
    'canvas', 'planList', 'swot', 'risks', 'calendar','reviewInterview'],
  adminAdmin: ['tasksBoard', 'usersList', 'chart', 'chatbot', 'reminders',
    'canvas', 'planList', 'swot', 'risks', 'calendar','reviewInterview'] //For demo and emergency maintanance
};

export default allowedRoutesByRole;
