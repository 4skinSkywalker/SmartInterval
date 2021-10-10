function SmartInterval(asyncFn, delayMs) {
    this.asyncFn = asyncFn;
    this.delayMs = delayMs;

    this.running = false;
}

SmartInterval.prototype.cycle = async function (forced) {
    await this.asyncFn();
    await this.delay(this.delayMs);
    if (!forced && this.running) this.cycle();
};

SmartInterval.prototype.start = function () {
    if (this.running) return;
    this.running = true;
    this.cycle();
};

SmartInterval.prototype.stop = function () {
    if (this.running) this.running = false;
};

SmartInterval.prototype.forceExecution = function () {
    if (this.running) this.cycle(true);
};

// This function is just an arbitrary delay to be used with async/await pattern
SmartInterval.prototype.delay = function (ms) {
    return new Promise(res =>
        setTimeout(() => res(1), ms)
    );
};

module.exports = SmartInterval;