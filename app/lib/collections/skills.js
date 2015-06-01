Skills = new Mongo.Collection('skills');

Skills.attachSchema(
  new SimpleSchema({
    name: {
      type: String,
      label: "Skill Name",
      index: 1,
      //unique: true
    }
  }),
  // params for Skills.attachSchema()
  {
    transform: true,
    replace: true
  }
);


if (Meteor.isServer) {
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
