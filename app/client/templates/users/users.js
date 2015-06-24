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
        {key: 'emails.0.address', label: 'Email', sortOrder: 0, sortDirection: 'ascending'},
        {key: 'createdAt', label: 'Created', fn: function (value, object) {
          return moment(value).format("YYYY MMM DD LT");
        }},
        {key: 'roles', label: 'Skills'},
        {key: '_id', label: 'Edit', headerClass: 'col-sm-1', tmpl: Template.UserEditButton}
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
