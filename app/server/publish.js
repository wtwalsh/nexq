// currently all tasks are published
Meteor.publish('tasks', function() {
  return Tasks.find();
});

// currently all skills are published
Meteor.publish('skills', function() {
  return Skills.find();
});