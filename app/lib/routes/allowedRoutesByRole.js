const allowedRoutesByRole = {
  entrepreneur: ['tasksBoard', 'chart', 'chatbot', 'canvas', 'planList',
    'swot', 'risks', 'calendar','reviewInterview', 'payment'],
  administrator: ['tasksBoard', 'usersList', 'adminChart', 'adminChatbot', 'reminders', 'adminReviewInterview',
    'adminCanvas', 'adminPlanList', 'adminSwot', 'adminRisks', 'calendar','reviewInterview', 'adminHome'],
  adminAdmin: ['tasksBoard', 'usersList', 'chart', 'chatbot', 'reminders',
    'canvas', 'planList', 'swot', 'risks', 'calendar','reviewInterview', 'adminHome'] //For demo and emergency maintanance
};

export default allowedRoutesByRole;
