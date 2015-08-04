/*
* WebcamView
* Manages the creation, rendering, and download of the Meme image.
*/
MEME.WebcamView = Backbone.View.extend({

    initialize: function(options) {
        this.canvas = options.canvas;
        this.polyfillBrowser();
        if (!navigator.getUserMedia) {
            $('.m-webcam').hide();
        }
    },

    polyfillBrowser: function () {
        if (!HTMLVideoElement.prototype.srcObject) {
            Object.defineProperty(HTMLVideoElement.prototype, 'srcObject', {
                get: function() {
                    return this.mozSrcObject || this._srcObject;
                },
                set: function(stream) {
                    if (this.mozSrcObject) {
                        this.mozSrcObject = stream;
                    } else {
                        this._srcObject = stream;
                        this.src = URL.createObjectURL(stream);
                    }
                }
            });
        }
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    },

    events: {
        'click #use-webcam': 'startWebcam'
    },

    startWebcam: function () {
        if (!navigator.getUserMedia) {
            return;
        }

        var video = MEME.$('#webcam-view video')[0],
            model = this.model,
            canvas = this.canvas;

        navigator.getUserMedia({
    		video: true,
    		audio: false
    	}, function(stream) {
    		video.srcObject = stream;

            var startVideoRender = function () {
                if (video.videoHeight && !video.height) {
                    video.height = video.videoHeight;
                    video.width = video.videoWidth;
                    model.background = video;
                }
                canvas.render();
                setTimeout(startVideoRender, 50);
            };

            video.onplay = startVideoRender;

            MEME.$('#use-webcam, .dropzone').hide();
    	}, function(err) {
    		console.err('Error getting webcam stream', err);
    	});
    }
});
