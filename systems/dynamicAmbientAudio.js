class DynamicAmbientAudio {
    audioElement = null;

    constructor() {}

    init() {
        this._initBackground();
    }

    _initBackground() {
        this.audioElement = $("#advanced-dynamic-audio #audio_ambient")[0];
        console.log("Advanced Dynamic Audio: Initialized background audio element",$("#advanced-dynamic-audio #audio_ambient")[0]);
    }

    play(path) {
        this.audioElement.src = path;
        this.audioElement.play();
    }

    stop() {
        this.audioElement.pause();
    }

    fadeout() {
        const fadeout = setInterval(() => {
            if (this.audioElement.volume > 0.1) {
                this.audioElement.volume -= 0.1;
            } else {
                clearInterval(fadeout);
            }
        }, 200);
    }
}

export { DynamicAmbientAudio };
