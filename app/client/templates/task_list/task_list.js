/*****************************************************************************/
/* TaskList: Event Handlers */
/*****************************************************************************/
Template.TaskList.events({
});

/*****************************************************************************/
/* TaskList: Helpers */
/*****************************************************************************/
Template.TaskList.helpers({
  tasks: function() {
    return Tasks.find();
  },

  lastActivity: function() {
    // include activity and timestamp
    return "123";
  },

  countActivities: function() {
    return "123";
  }
});

/*****************************************************************************/
/* TaskList: Lifecycle Hooks */
/*****************************************************************************/
Template.TaskList.created = function () {
};

Template.TaskList.rendered = function () {
};

Template.TaskList.destroyed = function () {
};
