Assignments = new Mongo.Collection('assignments');

Activities.attachSchema(
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
      label: "Account ID"
    },
    
    accountType: {
      type: String, 
      label: "Account Type"
    },
    
    username: {
      type: String,
      label: "User Email"
    }
  }),
  {
    transform: true,
    replace: true
  }
);
