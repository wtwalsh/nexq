// add some users for testing
if (Meteor.isServer) {
  Meteor.startup(function() {
    if (!Meteor.users.findOne()) {
      var testId = Accounts.createUser({
        email: "admin@test.com",
        password: "testpass"
      });
      
      Roles.addUsersToRoles(testId, ['admin', 'Skill1', 'Skill2', 'Skill3']);
    }
  });
}