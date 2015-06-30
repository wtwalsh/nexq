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
        {key: 'assignedTo', label: 'Assigned', fn: function (id) {
          var u = Meteor.users.findOne(id)
          
          if (!(typeof u === 'undefined')) {
            u = u.emails[0].address;
            u = u.substr(0, u.indexOf('@'));
            return u;
          }
          else
            return;
        }},
        {key: '_id', label: 'Last Completed', fn: function (value, object) {
          var t = Activities.findOne({accountId: object.accountId, accountType: object.skill}, {sort: {createdAt: -1}});
          
          if (!(typeof t === 'undefined')) {
            var u = t.username
            u = u.substr(0, u.indexOf('@'));
            return moment(t.createdAt).format("MMM DD LT") + ", " + u;
          }
          else
            return;
        }},
        {key: '_id', label: 'Complete', headerClass: 'col-sm-1', tmpl: Template.TaskCompleteButton},
        {key: '_id', label: 'Promote', headerClass: 'col-sm-1', tmpl: Template.TaskPromoteButton}
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
