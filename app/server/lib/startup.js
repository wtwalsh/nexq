// disable account creation, should only be performed by an admin
// future functionality
/*Accounts.config({
  forbidClientAccountCreation: true
});*/

// set initial assignment on login
Accounts.onLogin(function(user) {
  Meteor.call('assignTask', user.user);
});

// create default account using environment variables and default skills using settings.json
if (Meteor.isServer) {
  Meteor.startup(function() {   
    // default skills setup
    if (!Roles.getAllRoles().fetch().length) {
      Meteor.settings.public.defaultSkills.forEach(function(o) {
        Roles.createRole(o.skill);
      });
    }    
    
    // default user
    if (!Meteor.users.findOne()) {
      var defaultId = Accounts.createUser({
        email: process.env.DEFAULT_USER,
        password: process.env.DEFAULT_PASSWORD
      });
      
      Roles.addUsersToRoles(defaultId, ['Admin']);
    }
        
    // create some testing tasks
    if (!Tasks.findOne()) {
      var test_tasks = [
        {accountId: 100, skill: "LP", note: "This is a note", priority: 10},
        {accountId: 101, skill: "LP", note: "This is a note", priority: 10},
        {accountId: 102, skill: "LP", note: "This is a note", priority: 10},
        {accountId: 103, skill: "LP", note: "This is a note", priority: 11},
        {accountId: 104, skill: "LP", note: "This is a note", priority: 12},
        {accountId: 105, skill: "LP", note: "This is a note", priority: 13},
        {accountId: 106, skill: "LP", note: "This is a note", priority: 14},
        {accountId: 107, skill: "LP", note: "This is a note", priority: 15},
        {accountId: 108, skill: "LP", note: "This is a note", priority: 16},
        {accountId: 109, skill: "LP", note: "This is a note", priority: 17}
      ];
      
      test_tasks.forEach(function(o) {
        Tasks.insert(o);
      })
    }
  });
}
