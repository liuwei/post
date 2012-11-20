/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-11-15
 * Time: 下午2:48
 * To change this template use File | Settings | File Templates.
 */
Meteor.startup(function () {
    if (Posts.find().count() === 0) {
        Posts.insert({
            when: Date("2011-09-19T02:10:11.3Z"),
            who: "way",
            title: "No Free Lunch",
            text: "This is the text of the post.  It could be very long.",
            tags: [ "business", "ramblings" ],
            votes: 5,
            comments: [
                { who: "jane", when: Date("2011-09-19T04:00:10.112Z"), comment: "I agree." },
                { who: "meghan", when: Date("2011-09-20T14:36:06.958Z"), comment: "You must be joking.  etc etc ..." }
            ]
        });
    }
});
