////////// Posts //////////

Template.posts.posts = function () {
    return Posts.find();
};

Template.posts.events({

    'click #inc': function () {

        var inputText = document.getElementById("new-post");
        console.log(Meteor.userId());

        Posts.insert({
            when: Date("2011-09-19T02:10:11.3Z"),
            who:  Meteor.userId(),
            title: "No Free Lunch",
            text: inputText.value,
            tags: [ "business", "ramblings" ],
            votes: 5,
            comments: [
                { who: "jane", when: Date("2011-09-19T04:00:10.112Z"), comment: "I agree." },
                { who: "meghan", when: Date("2011-09-20T14:36:06.958Z"), comment: "You must be joking.  etc etc ..." }
            ]
        });
    }
});


