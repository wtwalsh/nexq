// add some users for testing
if (Meteor.isServer) {
  Meteor.startup(function() {
    if (!Meteor.users.findOne()) {
      var testId = Accounts.createUser({
        email: process.env.DEFAULT_USER,
        password: process.env.DEFAULT_PASSWORD
      });
      
      Roles.addUsersToRoles(testId, ['admin']);
    }
  });
}