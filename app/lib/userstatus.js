// SERVER: Listen for events
if(Meteor.isServer) {
  // listen for user logout events, call the clearAssignments server method
  UserStatus.events.on("connectionLogout", function(fields){
    //console.log("Logout Event");
    //console.log(fields.userId);

    Meteor.call('clearAssignments', Meteor.users.findOne({_id: fields.userId}));
  });

  // listen for user idle events, for now do nothing but in the future maybe logout
  UserStatus.events.on("connectionIdle", function(fields){
    //console.log("Idle Event");
    //console.log(fields.userId);

    //Meteor.call('logoutUser', Meteor.users.findOne({_id: fields.userId}));
  });
}

// CLIENT: Start idle monitor
if(Meteor.isClient) {
  try {
    UserStatus.startMonitor({
      // idle after five minutes, do not count blurring the window as idle
      threshold: 300000,
      idleOnBlur: false
    });
  }
  // not ideal but sometimes startMonitor throws a sync error
  catch (e) {}
}
