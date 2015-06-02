// currently all tasks are published
Meteor.publish('tasks', function() {
  return Tasks.find();
});

// currently all skills are published
Meteor.publish('skills', function() {
  return Skills.find();
});

// currently all users are published
Meteor.publish(null, function (){
  return Meteor.users.find();
});

// currently all roles are published
Meteor.publish(null, function (){ 
  return Meteor.roles.find();
});