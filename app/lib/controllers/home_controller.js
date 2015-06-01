HomeController = RouteController.extend({
  layoutTemplate: 'MasterLayout',

  subscriptions: function() {
    // test
    this.subscribe('tasks', {});
    this.subscribe('skills', {});
  },

  action: function() {
    this.render('Home');
  }
});
