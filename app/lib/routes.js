// prevent unauthorized access to the routes
Router.onBeforeAction(function () {
  if(!Meteor.user()) {
    this.render('AccessDenied');
  }
  else {
    this.next();
  }
}, {only: ['tasks']}) // edit these in the future to be specific to authorizations

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

Router.route('tasks', {
  name: 'tasks',
  controller: 'TasksController',
  action: 'list',
  where: 'client'
});

Router.route('/tasks/create', {
  name: 'taskCreate',
  controller: 'TasksController',
  action: 'create',
  where: 'client'
});

Router.route('/tasks/edit/:_id', {
  name: 'taskEdit',
  controller: 'TasksController',
  action: 'edit',
  where: 'client'
});

Router.route('/tasks/delete/:_id', {
  name: 'taskDelete',
  controller: 'TasksController',
  action: 'delete',
  where: 'client'
});

Router.route('/tasks/complete/:_id', {
  name: 'taskComplete',
  controller: 'TasksController',
  action: 'complete',
  where: 'client'
});

Router.route('/tasks/promote/:_id', {
  name: 'taskPromote',
  controller: 'TasksController',
  action: 'promote',
  where: 'client'
});

Router.route('users', {
  name: 'users',
  controller: 'UsersController',
  action: 'list',
  where: 'client'
});

Router.route('/users/create', {
  name: 'userCreate',
  controller: 'UsersController',
  action: 'create',
  where: 'client'
});

Router.route('/users/edit/:_id', {
  name: 'userEdit',
  controller: 'UsersController',
  action: 'edit',
  where: 'client'
});

Router.route('/users/delete/:_id', {
  name: 'userDelete',
  controller: 'UsersController',
  action: 'delete',
  where: 'client'
});
