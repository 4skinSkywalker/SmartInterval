export function SmartInterval(asyncFn, delayMs) {
  this.asyncFn = asyncFn;
  this.delayMs = delayMs;
  this.running = false;
}

SmartInterval.prototype.cycle = async function (forced) {
  if (!this.running && !forced) return;
  await this.delay(this.delayMs);
  this.running && (await this.asyncFn());
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
  let timeout;
  return new Promise((res) => {
    timeout = setTimeout(() => res(1), ms);
  }).then(() => clearInterval(timeout));
};

export default SmartInterval;
