HomeController = RouteController.extend({
  layoutTemplate: 'MasterLayout',

  subscriptions: function() {
    this.subscribe('tasks', {});
  },

  action: function() {
    this.render('Home');
  }
});
