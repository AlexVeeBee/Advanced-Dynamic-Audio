import { Logger } from "./logger.js";
const log = new Logger('<Advanced Dynamic Audio>');

class AdvancedDynamicAudioError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AdvancedDynamicAudioError';
    }
}

class WorkshopError extends Error {
    constructor(message) {
        super(message);
        this.name = 'WorkshopError';
    }
}


const tryCatch = (fn, callback = (error = null) => {
    log.error("Caught error:", error);
}) => {
    try {
        fn();
    } catch (error) {
        callback(error);
    }
};

export { tryCatch };
export { AdvancedDynamicAudioError, WorkshopError };

