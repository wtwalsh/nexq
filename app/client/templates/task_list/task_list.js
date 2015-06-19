/*****************************************************************************/
/* TaskList: Event Handlers */
/*****************************************************************************/
Template.TaskList.events({
});

/*****************************************************************************/
/* TaskList: Helpers */
/*****************************************************************************/
Template.TaskList.helpers({
  tableSettings: function() {
    return {
      collection: Tasks,
      fields: [
        {key: 'priority', label: 'Priority', hidden: true, sort: 'asc'},
        {key: 'accountId', label: 'Account ID', fn: function (acct) {
          // replace Safestring with acct if you want to use number vs. a link
          // change link in settings.json
          return new Spacebars.SafeString(Meteor.settings.public.accountUrl+acct+'" target="_blank">'+acct+'</a>');
        }},
        {key: 'skill', label: 'Skill'},
        {key: 'note', label: 'Note'},
        {key: 'assignedTo', label: 'Assigned'},
        {key: '_id', headerClass: 'col-sm-1', tmpl: Template.TaskListComplete},
        {key: '_id', headerClass: 'col-sm-1', tmpl: Template.TaskListPromote}
      ]
    };
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
