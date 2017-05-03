import { compose } from '../factories/utils/utils.factory.js'

function Player() {
    if (!(this instanceof Player)) return new Player();

    this.initialized = false;
    window.audioplayer = this;
    return this;
}

Player.prototype.initialize = function(container) {
    this.element = document.createElement('audio');
    this.container = document.querySelector(container);

    this.container.appendChild(this.element);

    this._sourceElement = this.container.innerHTML;
    this.container.innerHTML = null;
    this.container.id = this.container.id || `soma-radio-player-${Date.now()}`;
    this.id = this.container.id;
    this._cacheVolume;
}

Player.prototype.destroy = function() {
    this.container.innerHTML = null;

    return this;
}

Player.prototype.build = function() {
    this.container.innerHTML = this._sourceElement;
    this.element = this.container.children[0];
    this.element.autoplay = false;
    this.element.loop = false;

    this._setupListeners();

    return this;
}

Player.prototype.reset = function() {
    this.destroy()
        .build();

    return this;
}

Player.prototype.pause = function () {
  if (this.element.paused) return;
  this.element.pause();
  return this;
}

Player.prototype.play = function () {
  if (!this.element.paused) return;
  this.element.play();
  return this;
}

Player.increment = function (factor = 0) {
  return (value) => value + factor;
}

Player.decrement = function (factor = 0) {
  return (value) => value - factor;
}

Player.clamp = function (top, bottom) {
  return (value) => Math.min(Math.max(value, bottom), top);
}

Player.prototype.volumeUp = function () {
  const incrementBetweenLimits = compose(Player.clamp(1.0, 0.0), Player.increment(0.1))
  this.setVolume(incrementBetweenLimits);
  return this;
}

Player.prototype.volumeDown = function () {
  const decrementBetweenLimits = compose(Player.clamp(1.0, 0.0), Player.decrement(0.1))
  this.setVolume(decrementBetweenLimits);
  return this;
}

Player.prototype.setVolume = function (volume) {
  if (typeof volume == 'function') {
    this.element.volume = volume(this.element.volume);
  } else {
    this.element.volume = volume;
  }
  return this.element.volume
}

Player.prototype.mute = function () {
  this._cacheVolume = this.element.volume;

  this.setVolume(0);
  return this;
}

Player.prototype.unmute = function () {
  this.setVolume(this._cacheVolume || 0.5);
  return this;
}

Player.prototype._setupListeners = function() {
    if (!this.element) return;
}

Player.prototype.addSource = function(src) {
    let source = document.createElement('source');

    source.src = src;
    this.element.appendChild(source);

    return this;
}

Player.prototype.getAttribute = function(name) {
  const node = this.element.attributes[name];
  if (node !== undefined) return node.nodeValue === "" ? true : node.nodeValue;
}

export default Player;
