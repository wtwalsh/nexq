UsersController = RouteController.extend({
  loadingTemplate: 'Loading',
  
  waitOn: function () {
    return Meteor.subscribe('pub-users', {});
  },
  
  subscriptions: function () {
    this.subscribe('pub-users', {});
  },

  data: function () {
    // Meteor.users.findOne({_id: this.params._id});
  },

  list: function () {
    // You can create as many action functions as you'd like.
    // This is the primary function for running your route.
    // Usually it just renders a template to a page. But it
    // might also perform some conditional logic. Override
    // the data context by providing it as an option in the
    // last parameter.
    this.render('Users', { /* data: {} */});
  },

  edit: function() {
    var targetUser = Meteor.users.findOne({_id: this.params._id});
    this.render('UserEdit', {data: targetUser});
  },
  
  logout: function() {
    var targetUser = Meteor.users.findOne({_id: this.params._id});
    Meteor.call('logoutUser', targetUser);
    Router.go('users');
  }
});
