// publish all tasks to admins, only assigned tasks to users
Meteor.publish('pub-tasks', function() {
  if (Roles.userIsInRole(this.userId, ['admin']))
    return Tasks.find({});
  else
    return Tasks.find({assignedTo: this.userId}, {sort: {priority: 1}});
});

// currently all users are published
Meteor.publish(null, function (){
  return Meteor.users.find();
});

// currently all roles are published
Meteor.publish(null, function (){ 
  return Meteor.roles.find();
});
