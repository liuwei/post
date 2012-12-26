// posts -- server

Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.publish("posts", function () {
    return Posts.find();
});

Meteor.publish("models", function () {
    return Models.find();
});
