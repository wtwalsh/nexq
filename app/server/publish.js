// publish all tasks to admins, only assigned tasks to normal users
Meteor.publish('pub-tasks', function() {
  if (Roles.userIsInRole(this.userId, ['Admin']))
    return Tasks.find({});
  else
    return Tasks.find({assignedTo: this.userId}, {sort: {priority: 1}});
});

// publish all users to admins, only current user to normal user
Meteor.publish('pub-users', function (){
  if (Roles.userIsInRole(this.userId, ['Admin']))
    return Meteor.users.find();
  else
    return Meteor.users.find({_id: this.userId});
});

// publish all activities to admins, none at the moment to normal useres
Meteor.publish('pub-activities', function (){
  if (Roles.userIsInRole(this.userId, ['Admin']))
    return Activities.find({});
  else
    return []; // for now, activities are not published to regular users, this may change if users need to view last activity
});

// currently all roles are published
Meteor.publish(null, function (){ 
  return Meteor.roles.find();
});
