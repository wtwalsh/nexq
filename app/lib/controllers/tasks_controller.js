TasksController = RouteController.extend({
  loadingTemplate: 'Loading',
  
  waitOn: [
    function () {return Meteor.subscribe('pub-tasks', {});},
    function () {return Meteor.subscribe('pub-activities', {});}
  ],
  
  subscriptions: function () {
    this.subscribe('pub-tasks', {});
    this.subscribe('pub-activities', {});
  },

  data: function () {
    // Tasks.findOne({_id: this.params._id});
  },

  list: function () {
    // You can create as many action functions as you'd like.
    // This is the primary function for running your route.
    // Usually it just renders a template to a page. But it
    // might also perform some conditional logic. Override
    // the data context by providing it as an option in the
    // last parameter.
    this.render('Tasks', { /* data: {} */});
  },
  
  promote: function () {
    var curUser = Meteor.user();
    var curTask = Tasks.findOne({_id: this.params._id});
    
    Meteor.call('promoteTask', curUser, curTask);
    Meteor.call('assignTask', curUser);
    Router.go('tasks');
  },
  
  complete: function () {
    var curUser = Meteor.user();
    var curTask = Tasks.findOne({_id: this.params._id});
    
    Meteor.call('completeTask', curUser, curTask);
    Meteor.call('assignTask', curUser);
    Router.go('tasks');
  }
});
