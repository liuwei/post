////////// Posts //////////

Template.posts_template.posts = function () {
    return Posts.find();
};

Template.posts_template.events({

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

Template.posts_template.selected = function () {
    return Session.equals('post_id', this._id) ? 'selected' : '';
};

Template.posts_template.events ({
    'click': function () {
        alert("hahhah"+this._id);
//        Session.set("selected_post", this._id);
//        Router.setPost(this._id);
        runWebGLApp();
    }
});

//Template.posts_template.rendered = filepicker.constructWidget(document.getElementById('picker'));

//Template.posts_model.rendered = runWebGLApp();

//Template.posts_model.aReactiveHelper = function() {
////    var someValue = Session.get('someValue');
//    invokeAfterLoad();
////    return someValue;
//};
//
//var invokeAfterLoad = function () {
//    Meteor.defer(function () {
//        runWebGLApp();
//    });
//};

// ID of currently selected list
Session.set('post_id', null);

// Subscribe to 'posts' collection on startup.
// Select a list once data has arrived.
Meteor.subscribe('posts', function () {
    if (!Session.get('post_id')) {
        var post = Posts.findOne();
        if (post)
            Router.setPost(post._id);
    }
});

Meteor.autosubscribe(function () {
    var post_id = Session.get('post_id');
    if (post_id)
        Meteor.subscribe('model', post_id);
});

////////// Tracking selected list in URL //////////

var ModelRouter = Backbone.Router.extend({
    routes: {
        ":post_id": "main"
    },
    main: function (post_id) {
        Session.set("post_id", post_id);
    },
    setPost: function (post_id) {
        this.navigate(post_id, true);
    }
});

Router = new ModelRouter;


var gl = null; // WebGL context
var prg = null; // The program (shaders)
var c_width = 0; // Variable to store the width of the canvas
var c_height = 0; // Variable to store the height of the canvas

var coneVertexBuffer = null; //The vertex buffer for the cone
var coneIndexBuffer = null; // The index buffer for the cone

var indices = [];
var vertices = [];

var mvMatrix = mat4.create(); // The Model-View matrix
var pMatrix = mat4.create(); // The projection matrix

/**
 * The program contains a series of instructions that tell the Graphic Processing Unit (GPU)
 * what to do with every vertex and fragment that we pass it. (more about this on chapter 3)
 * The vertex shader and the fragment shader together are called the program.
 */
function initProgram() {
    alert("initProgram " + gl);
    var fgShader = utils.getShader(gl, 'shader-fs');
    var vxShader = utils.getShader(gl, 'shader-vs');

    prg = gl.createProgram();
    gl.attachShader(prg, vxShader);
    gl.attachShader(prg, fgShader);
    gl.linkProgram(prg);

    if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
        alert('Could not initialise shaders');
    }

    gl.useProgram(prg);

    prg.vertexPositionAttribute = gl.getAttribLocation(prg, 'aVertexPosition');
    prg.pMatrixUniform          = gl.getUniformLocation(prg, 'uPMatrix');
    prg.mvMatrixUniform         = gl.getUniformLocation(prg, 'uMVMatrix');
}

/**
 * Creates the buffers that contain the geometry of the cone
 */
function initBuffers() {

    vertices =[1.5, 0, 0,
        -1.5, 1, 0,
        -1.5, 0.809017,	0.587785,
        -1.5, 0.309017,	0.951057,
        -1.5, -0.309017, 0.951057,
        -1.5, -0.809017, 0.587785,
        -1.5, -1, 0,
        -1.5, -0.809017, -0.587785,
        -1.5, -0.309017, -0.951057,
        -1.5, 0.309017,	-0.951057,
        -1.5, 0.809017,	-0.587785];

    indices = [0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 5,
        0, 5, 6,
        0, 6, 7,
        0, 7, 8,
        0, 8, 9,
        0, 9, 10,
        0, 10, 1];

    //The following code snippet creates a vertex buffer and binds data to it
    coneVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


    coneIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coneIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

}

/**
 * Draws the scene
 */
function drawScene(){

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0,0,c_width, c_height);

    mat4.perspective(45, c_width / c_height, 0.1, 10000.0, pMatrix);
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [0.0, 0.0, -5.0]);

    gl.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);

    gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexBuffer);
    gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prg.vertexPositionAttribute);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coneIndexBuffer);
    gl.drawElements(gl.LINE_LOOP, indices.length, gl.UNSIGNED_SHORT,0);
}

/**
 * Render Loop
 */
function renderLoop() {
    requestAnimFrame(renderLoop);
    drawScene();
}

/**
 * Executes the WebGL application
 * This function is invoked on the onLoad event of the web page.
 */
function runWebGLApp(){
    //Obtains a WebGL context
    gl = utils.getGLContext('canvas-element-id');
    alert("initProgram " + gl);
    //Initializes the program (shaders). More about this on chapter 3!
    initProgram();
    //Initializes the buffers that we are going to use to draw the cone (vertex buffer and index buffer)
    initBuffers();
    //Renders the scene!
    renderLoop();
}