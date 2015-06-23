/*****************************************************************************/
/* Tasks: Event Handlers */
/*****************************************************************************/
Template.Tasks.events({
});

/*****************************************************************************/
/* Tasks: Helpers */
/*****************************************************************************/
Template.Tasks.helpers({
  tasksTableSettings: function() {
    return {
      collection: Tasks,
      fields: [
        {key: 'priority', label: 'Priority', hidden: true, sortOrder: 0, sortDirection: 'ascending'},
        {key: 'accountId', label: 'Account ID', fn: function (acct) {
          // replace Safestring with acct if you want to use number vs. a link
          // change link in settings.json
          return new Spacebars.SafeString(Meteor.settings.public.accountUrl+acct+'" target="_blank">'+acct+'</a>');
        }},
        {key: 'skill', label: 'Skill'},
        {key: 'note', label: 'Note'},
        {key: 'assignedTo', label: 'Assigned'},
        {key: '_id', label: 'C', headerClass: 'col-sm-1', tmpl: Template.TaskCompleteButton},
        {key: '_id', label: 'P', headerClass: 'col-sm-1', tmpl: Template.TaskPromoteButton}
      ]
    };
  }
});

/*****************************************************************************/
/* Tasks: Lifecycle Hooks */
/*****************************************************************************/
Template.Tasks.created = function () {
};

Template.Tasks.rendered = function () {
};

Template.Tasks.destroyed = function () {
};
