Tasks = new Mongo.Collection('tasks');

Tasks.attachSchema(
  new SimpleSchema({
  // Force value to be current date (on server) upon insert and prevent updates thereafter
    createdAt: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date();
        }
        else if (this.isUpsert) {
          return {$setOnInsert: new Date()};
        }
        else {
          this.unset();
        }
      }
    },

    // Force value to be current date (on server) upon update and don't allow it to be set upon insert
    updatedAt: {
      type: Date,
      autoValue: function() {
        if (this.isUpdate) {
          return new Date();
        }
      },
      denyInsert: true,
      optional: true
    },

    name: {
      type: String,
      label: "Name",
      index: 1,
      unique: true
    },

    accountId: {
      type: Number,
      label: "Account ID",
    },
    
    skill: {
      type: String, 
      label: "Skill",
      //allowedValues: ['Skill-1', 'Skill-2', 'Skill-3']
      // unfortunately, since this cannot be dynamic we will need to control in the form
    },

    status: {
      type: String,
      label: "Status",
      //allowedValues: ['Unworked', 'Completed']
    },

    priority: {
      type: Number,
      label: "Priority",
      index: 1,
      optional: true
    },
    
    note: {
      type: String,
      label: "Note",
      optional: true
    },

    assignedTo: {
      type: String,
      label: "Assigned To",
      optional: true
    }

  }),
  // params for Tasks.attachSchema()
  {
    transform: true,
    replace: true
  }
);

if (Meteor.isServer) {
  Tasks.allow({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });
}
