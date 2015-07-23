/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/
Meteor.methods({
  /*
   * Example:
   *
   * '/app/items/insert': function (item) {
   * }
   */
  updateSkills: function(doc) {
    var user = Meteor.users.findOne(doc.editUserId);
    Roles.setUserRoles(user, doc.selectedSkills);

    return;
  },
  
  completeTask: function(user, task) {
    // console.log(user._id + " attempting to complete " + task._id);
    
    // create an activity record for completing the task
    var completeAct = {
      accountId: task.accountId,
      accountType: task.skill,
      username: user.emails[0].address,
      activityType: "Complete"
    };

    Activities.insert(completeAct);
    // console.log(completeAct);
    
    // remove the task from the task collection
    Tasks.remove(task._id);
    return;
  },
  
  promoteTask: function(user, task) {
    // console.log(user._id + " attempting to promote " + task._id);

    // create an activity record for promoting the task
    var promoteAct = {
      accountId: task.accountId,
      accountType: task.skill,
      username: user.emails[0].address,
      activityType: "Promote"
    };

    Activities.insert(promoteAct);
    // console.log(promoteAct);
    
    // promote the task by removing the assignedTo field and setting priority to -1
    Tasks.update(task._id, {$unset: {assignedTo: ""}, $set: {priority: -1}});
    return;
  },
  
  assignTask: function(user) {
    var skills = Roles.getRolesForUser(user);
    var curTask = Tasks.findOne({assignedTo: user._id});
    var nextTask = Tasks.findOne({skill: {$in:skills}, assignedTo: null}, {sort: {priority: 1, note: 1}});
    
    // check if already assigned a task
    if (typeof curTask === 'undefined') {
      // check if there is an available task for the user, if so assign it
      if (!(typeof nextTask === 'undefined')) {
        // assign the task by setting the assignedTo property to the user's ID
        Tasks.update(nextTask, {$set: {assignedTo: user._id}});
        
        // create an assignment record
        var nextAssignment = {
          accountId: nextTask.accountId,
          accountType: nextTask.skill,
          username: user.emails[0].address,
          activityType: "Assign"
        };
        
        Activities.insert(nextAssignment);
      }
      else {
        // console.log("No available task to assign")
        return;
      }
    }
    else {
      // console.log("Already assigned a task - skipping assignment")
      return;
    }
  },
  
  clearAssignments: function(user) {
    Tasks.update({assignedTo: user._id},
                 {$unset: {assignedTo: ""}},
                 {multi:true});    
  },
  
  logoutUser: function(user) {
    // clear any assignments
    Meteor.call('clearAssignments', user);

    // log the user out by clearing the Meteor login tokens for this user
    Meteor.users.update(user, {$set: { "services.resume.loginTokens" : [] }});
    return;
  },
  
  deleteUser: function(user) {
    Meteor.users.remove(user);
  }
});
