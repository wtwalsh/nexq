/*****************************************************************************/
/* Users: Event Handlers */
/*****************************************************************************/
Template.Users.events({
});

/*****************************************************************************/
/* Users: Helpers */
/*****************************************************************************/
Template.Users.helpers({
  usersTableSettings: function() {
    return {
      collection: Meteor.users,
      rowsPerPage: 20,
      fields: [
        {key: 'emails.0.address', label: 'Email', sortOrder: 0, sortDirection: 'ascending'},
        {key: 'createdAt', label: 'Created', fn: function (value, object) {
          return moment(value).format("YYYY MMM DD LT");
        }},
        {key: 'roles', label: 'Skills'},
        {key: '_id', label: 'Status', tmpl: Template.UserStatus},
        {key: '_id', label: 'Edit', headerClass: 'col-sm-1', tmpl: Template.UserEditButton}
      ]
    };
  }
});

Template.UserStatus.helpers({
  statClass: function() {
    if (this.status.idle)
      return "label-warning";
    else if (this.status.online)
      return "label-success";
    else
      return "label-default";
  },
  
  statName: function() {
    if (this.status.idle)
      return "Idle";
    else if (this.status.online)
      return "Online";
    else
      return "Offline";
  }
});


/*****************************************************************************/
/* Users: Lifecycle Hooks */
/*****************************************************************************/
Template.Users.created = function () {
};

Template.Users.rendered = function () {
};

Template.Users.destroyed = function () {
};
