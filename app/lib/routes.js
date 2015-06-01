Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client'
});

Router.route('/create_task', {
  name: 'createTask',
  controller: 'CreateTaskController',
  action: 'action',
  where: 'client'
});

Router.route('/task_list', {
  name: 'taskList',
  controller: 'TaskListController',
  action: 'action',
  where: 'client'
});

// prevent unauthorized access to the routes
Router.onBeforeAction(function () {
  if(!Meteor.user()) {
    this.render('AccessDenied');
  }
  else {
    this.next();
  }
}, {only: ['createTask', 'taskList']}) // edit these in the future to be specific to authorizations
