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
      fields: [
        {key: 'emails.0.address', label: 'Email'},
        {key: 'createdAt', label: 'Created', sortOrder: 0, sortDirection: 'ascending'},
        {key: 'roles', label: 'Skills'},
        {key: '_id', label: 'Edit', headerClass: 'col-sm-1', tmpl: Template.UserEdit}
      ]
    };
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
