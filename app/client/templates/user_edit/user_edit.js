/*****************************************************************************/
/* UserEdit: Event Handlers */
/*****************************************************************************/
Template.UserEdit.events({
});

/*****************************************************************************/
/* UserEdit: Helpers */
/*****************************************************************************/
Template.UserEdit.helpers({
  beforeRemove: function() {
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete user: "' + doc.emails[0].address + '"?')) {
        // this is not working due to permissions, try a method call
        // this.remove(); 
        Meteor.call('deleteUser', doc);
        Router.go('users');
      }
    }
  },
  
  userEmail: function() {
    return this.emails[0].address;
  },
  
  userSkills: function() {
    Session.set('editingUser', this._id);
    return Roles.getRolesForUser(this._id);
  },
  
  userEditSchema: function() {
    var schema = new SimpleSchema({
      selectedSkills: {
        type: [String],
        optional: true,
        autoform: {
          options: function() {
            return Roles.getAllRoles().map(function (c) {
              return {label: c.name, value: c.name};
            });
          }
        }
      },
      
      editUserId: {
        type: String,
        optional: true
      }
    });
    
    return schema;
  }
});

/*****************************************************************************/
/* UserEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.UserEdit.created = function () {
};

Template.UserEdit.rendered = function () {
};

Template.UserEdit.destroyed = function () {
};
