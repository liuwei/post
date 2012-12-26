/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-11-15
 * Time: 下午2:48
 * To change this template use File | Settings | File Templates.
 */
Meteor.startup(function () {
    if (Posts.find().count() === 0) {
        var data = [
            {name: "Meteor Principles",
                model: {
                    "vertices" : [
                        -0.5, 0.5, 0.5,
                        -0.5,-0.5, 0.5,
                        0.5,-0.5, 0.5,
                        0.5, 0.5, 0.5,
                        0.5,-0.5,-0.5,
                        0.5, 0.5,-0.5,
                        -0.5,-0.5,-0.5,
                        -0.5, 0.5, -0.5
                    ],

                    "indices"  : [
                        0,1,2,0,2,3,
                        3,2,4,3,4,5,
                        5,4,6,5,6,7,
                        0,3,7,7,3,5,
                        7,6,1,7,1,0,
                        1,6,4,1,4,2],

                    "scalars"  : [
                        1.0,0.0,0.0,1.0,
                        0.0,1.0,0.0,1.0,
                        0.0,0.0,1.0,1.0,
                        1.0,1.0,0.0,1.0,
                        1.0,0.0,1.0,1.0,
                        0.0,1.0,1.0,1.0,
                        0.0,0.0,0.0,1.0,
                        1.0,1.0,1.0,1.0
                    ],

                    "diffuse"  : [1.0,0.0,0.0,1.0]
                }
            },
            {name: "Languages",
                model: {
                    "vertices" : [
                        -0.5, 1, 0.5,
                        -0.5,-0.5, 0.5,
                        0.5,-0.5, 0.5,
                        0.5, 0.5, 0.5,
                        0.5,-0.5,-0.5,
                        0.5, 0.5,-0.5,
                        -0.5,-0.5,-0.5,
                        -0.5, 0.5, -0.5
                    ],

                    "indices"  : [
                        0,1,2,0,2,3,
                        3,2,4,3,4,5,
                        5,4,6,5,6,7,
                        0,3,7,7,3,5,
                        7,6,1,7,1,0,
                        1,6,4,1,4,2],

                    "scalars"  : [
                        1.0,0.0,0.0,1.0,
                        0.0,1.0,0.0,1.0,
                        0.0,0.0,1.0,1.0,
                        1.0,1.0,0.0,1.0,
                        1.0,0.0,1.0,1.0,
                        0.0,1.0,1.0,1.0,
                        0.0,0.0,0.0,1.0,
                        1.0,1.0,1.0,1.0
                    ],

                    "diffuse"  : [1.0,0.0,0.0,1.0]
                }
            },
            {name: "Favorite Scientists",
                model: {
                    "vertices" : [
                        -0.5, 0.5, 1,
                        -0.5,-0.5, 0.5,
                        0.5,-0.5, 0.5,
                        0.5, 0.5, 0.5,
                        0.5,-0.5,-0.5,
                        0.5, 0.5,-0.5,
                        -0.5,-0.5,-0.5,
                        -0.5, 0.5, -0.5
                    ],

                    "indices"  : [
                        0,1,2,0,2,3,
                        3,2,4,3,4,5,
                        5,4,6,5,6,7,
                        0,3,7,7,3,5,
                        7,6,1,7,1,0,
                        1,6,4,1,4,2],

                    "scalars"  : [
                        1.0,0.0,0.0,1.0,
                        0.0,1.0,0.0,1.0,
                        0.0,0.0,1.0,1.0,
                        1.0,1.0,0.0,1.0,
                        1.0,0.0,1.0,1.0,
                        0.0,1.0,1.0,1.0,
                        0.0,0.0,0.0,1.0,
                        1.0,1.0,1.0,1.0
                    ],

                    "diffuse"  : [1.0,0.0,0.0,1.0]
                }
            }
        ];


        for (var i = 0; i < data.length; i++) {
            var timestamp = (new Date()).getTime();
            var post_id = Posts.insert({
                name: data[i].name,
                timestamp: timestamp
            });
            var model = data[i].model;
            Models.insert({
                post_id: post_id,
                vertices: model.vertices,
                indices: model.indices,
                scalars: model.scalars,
                diffuse: model.diffuse
            });
        }
//        Posts.insert({
//            when: Date("2011-09-19T02:10:11.3Z"),
//            who: "way",
//            title: "No Free Lunch",
//            text: "This is the text of the post.  It could be very long.",
//            tags: [ "business", "ramblings" ],
//            votes: 5,
//            comments: [
//                { who: "jane", when: Date("2011-09-19T04:00:10.112Z"), comment: "I agree." },
//                { who: "meghan", when: Date("2011-09-20T14:36:06.958Z"), comment: "You must be joking.  etc etc ..." }
//            ],
//        });
    }

});

