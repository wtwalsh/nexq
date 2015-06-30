/*****************************************************************************/
/* Stats: Event Handlers */
/*****************************************************************************/
Template.Stats.events({
});

/*****************************************************************************/
/* Stats: Helpers */
/*****************************************************************************/
Template.Stats.helpers({
  roles: function () {
    return Roles.getAllRoles();
  },
  
  countRole: function () {
    return Tasks.find({skill: this.name}).count();
  }
});

/*****************************************************************************/
/* Stats: Lifecycle Hooks */
/*****************************************************************************/
Template.Stats.created = function () {
};

Template.Stats.rendered = function () {
};

Template.Stats.destroyed = function () {
};
