// disable account creation, should only be performed by an admin
// future functionality
/*Accounts.config({
  forbidClientAccountCreation: true
});*/

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
      
      Roles.addUsersToRoles(defaultId, ['admin']);
    }
        
    // create some testing tasks
    if (!Tasks.findOne()) {
      var test_tasks = [
        {accountId: 100, skill: "Skill1", note: "This is a note", priority: 10},
        {accountId: 101, skill: "Skill2", note: "This is a note", priority: 10},
        {accountId: 102, skill: "Skill3", note: "This is a note", priority: 10},
        {accountId: 103, skill: "Skill1", note: "This is a note", priority: 11},
        {accountId: 104, skill: "Skill2", note: "This is a note", priority: 12},
        {accountId: 105, skill: "Skill3", note: "This is a note", priority: 13},
        {accountId: 106, skill: "Skill1", note: "This is a note", priority: 14},
        {accountId: 107, skill: "Skill2", note: "This is a note", priority: 15},
        {accountId: 108, skill: "Skill3", note: "This is a note", priority: 16},
        {accountId: 109, skill: "Skill1", note: "This is a note", priority: 17}
      ];
      
      test_tasks.forEach(function(o) {
        Tasks.insert(o);
      })
    }
  });
}
