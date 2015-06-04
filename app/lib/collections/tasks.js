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
      allowedValues: ['New', 'Completed', 'Promoted', 'Pushed']
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
  
  // default data for testing
  Meteor.startup(function() {
    if (!Tasks.findOne()) {
      var test_tasks = [
        {accountId: 100, skill: "Skill1", status: "New", note: "This is a note", priority: 10},
        {accountId: 101, skill: "Skill2", status: "New", note: "This is a note", priority: 10},
        {accountId: 102, skill: "Skill3", status: "New", note: "This is a note", priority: 10},
        {accountId: 103, skill: "Skill1", status: "New", note: "This is a note", priority: 11},
        {accountId: 104, skill: "Skill2", status: "New", note: "This is a note", priority: 12},
        {accountId: 105, skill: "Skill3", status: "New", note: "This is a note", priority: 13},
        {accountId: 106, skill: "Skill1", status: "New", note: "This is a note", priority: 14},
        {accountId: 107, skill: "Skill2", status: "New", note: "This is a note", priority: 15},
        {accountId: 108, skill: "Skill3", status: "New", note: "This is a note", priority: 16},
        {accountId: 109, skill: "Skill1", status: "New", note: "This is a note", priority: 17}
      ];
      
      test_tasks.forEach(function(o) {
        Tasks.insert(o);
      })
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
