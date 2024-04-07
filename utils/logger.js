class Logger {
    constructor(DEBUG_PREFIX) {
        this.DEBUG_PREFIX = DEBUG_PREFIX;
    }

    globalstyle = "border-radius: 5px; padding: 0 5px;"

    types = {
        log: '',
        error: 'color: red; font-weight: bold; background-color: #fdd;' + this.globalstyle,
        warn: 'color: orange; font-weight: bold; background-color: #ffdd99;' + this.globalstyle,
        info: 'color: blue; font-weight: bold; background-color: #99ddff;' + this.globalstyle,
        debug: 'color: green; font-weight: bold; background-color: #99ff99;' + this.globalstyle,
    };

    currentTime() {
        const date = new Date().toLocaleTimeString();
        return `[${date}]`;
    }

    logstart(type) {
        return `${this.DEBUG_PREFIX} ${this.currentTime()} [${type.toUpperCase()}]`;
        // console.groupCollapsed(`%c${DEBUG_PREFIX} ${this.currentTime()} [${type}]`, this.types[type]);
    }

    log(...args) {
        console.log(`%c${this.logstart("log")}`, this.types.log, ...args);
    }

    error(...args) {
        console.error(`%c${this.logstart("error")}`, this.types.error, ...args);
    }

    warn(...args) {
        console.warn(`%c${this.logstart("warn")}`, this.types.warn, ...args);
    }

    info(...args) {
        console.info(`%c${this.logstart("info")}`, this.types.info, ...args);
    }

    debug(...args) {
        console.debug(`%c${this.logstart("debug")}`, this.types.debug, ...args);
    }
}

export { Logger };
