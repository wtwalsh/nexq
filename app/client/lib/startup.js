if (Meteor.isClient) {
// create a hook to run just before the submit of the skills autoform to add the selected userId
  Meteor.startup(function() {
    // define the hooks in a hooks object
    var skillsHooks = {
      before: {
        method: function(doc) {
          var userId = Session.get('editingUser');
          doc.editUserId = userId;
          return doc; // synchronous, success
          // return false synchronous, cancel
        }
      }
    }
    
    // add the hooks to the form
    AutoForm.hooks({
      skillsForm: skillsHooks
    });
  });
}