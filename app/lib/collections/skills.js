Skills = new Mongo.Collection('skills');

Skills.attachSchema(
  new SimpleSchema({
    skill: {
      type: String,
      label: "Skill Name",
      index: 1,
      unique: true
    }
  }),
  // params for Skills.attachSchema()
  {
    transform: true,
    replace: true
  }
);


if (Meteor.isServer) {
  // default data for testing
  Meteor.startup(function() {
    if (!Skills.findOne()) {
      var test_skills = [
        {skill: "Skill1"},
        {skill: "Skill2"},
        {skill: "Skill3"}
      ];
      
      test_skills.forEach(function(o) {
        Skills.insert(o);
      })
    }
  });
  
  Skills.allow({
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
