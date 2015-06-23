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
    console.log(user._id + " attempting to complete " + task._id);
    
    // create an activity record for completing the task
    var completeAct = {
      accountId: task.accountId,
      accountType: task.skill,
      username: user.emails[0].address,
      activityType: "Complete"
    };

    Activities.insert(completeAct);
    console.log(completeAct);
    
    // remove the task from the task collection
    Tasks.remove(task._id);
    return;
  },
  
  assignTask: function(user) {
    var skills = Roles.getRolesForUser(user);
    var nextTask = Tasks.findOne({skill: {$in:skills}}, {sort: {priority: 1}})
    
    if (typeof nextTask === 'undefined') {
      console.log("No tasks to assign.");
    }
    else {
      console.log("Assigning " + nextTask._id + " to " + user.emails[0].address);
      // TODO if already assigned an account, do not assign another one
      // find a way to unassign accounts on logout
      Tasks.update(nextTask, {$set: {assignedTo: user._id}});
    }
    
    return;
  }
});
