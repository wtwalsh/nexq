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

    accountId: {
      type: Number,
      label: "Account ID",
    },
    
    skill: {
      type: String, 
      label: "Skill",
    },
    
    note: {
      type: String,
      label: "Note",
      optional: true
    },
    
    priority: {
      type: Number,
      label: "Priority",
      index: 1,
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
  // set up Restivus API
  Restivus.configure({
    useAuth: true,
    prettyJson: true
  });
  
  Restivus.addCollection(Tasks, {
    excludedEndpoints: [
      'deleteAll'
    ],
    routeOptions: {
      authRequired: true,
      roleRequired: 'admin'
    }
  });
  
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
