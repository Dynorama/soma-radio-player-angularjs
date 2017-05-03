import {
  compose
} from '../factories/utils/utils.factory.js'

// TODO Use Audio Web API like this:
/*
const composePromise = (...fns) => args => fns.reduceRight((composed, f) => {
  return Promise.resolve(composed).then(f);
}, args);

const context = new AudioContext;
const source = context.createBufferSource();
const getBuffer = data => data.arrayBuffer();
const getAudioData = context => data => context.decodeAudioData(data)
const digestBuffer = source => buffer => {
  source.buffer = buffer;
  return source;
}

const connectBuffer = destination => source => {
  source.connect(destination);
  return source;
}

const start = (time = 0) => source => {
  source.start(time)
  return source
};

const process = composePromise(
  start(0),
  connectBuffer(context.destination),
  digestBuffer(source),
  getAudioData(context),
  getBuffer
);

const getUrl = url => () => fetch(url)
  .then(process)
  .catch(e => console.log(e));

const load = getUrl("http://jplayer.org/audio/mp3/RioMez-01-Sleep_together.mp3");

load();
*/

function Player() {
  if (!(this instanceof Player)) return new Player();

  this.initialized = false;
  window.audioplayer = this;
  return this;
}

Player.prototype.buildElement = function () {
  const element = document.createElement('audio');
  return element;
}

Player.prototype.getContainer = function (container) {
  return document.querySelector(container);
}

Player.prototype.appendElementToContainer = function (container, element) {
  container.appendChild(element);
  return container;
}

Player.prototype.initialize = function(container) {
  this.element = this.buildElement();
  this.container = this.appendElementToContainer(
      this.getContainer(container),
      this.element
    );

  this._sourceElement = this.container.innerHTML;
  this.container.innerHTML = null;
  this.container.id = this.container.id || `soma-radio-player-${Date.now()}`;
  this.id = this.container.id;
  this._cacheVolume;
}

Player.prototype.destroy = function() {
  this.container.innerHTML = null;
  this.element = null;

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

Player.prototype.pause = function() {
  if (this.element.paused) return;
  this.element.pause();
  return this;
}

Player.prototype.play = function() {
  if (!this.element.paused) return;
  this.element.play();
  return this;
}

Player.increment = function(factor = 0) {
  return (value) => value + factor;
}

Player.decrement = function(factor = 0) {
  return (value) => value - factor;
}

Player.clamp = function(top, bottom) {
  return (value) => Math.min(Math.max(value, bottom), top);
}

Player.prototype.volumeUp = function() {
  const incrementBetweenLimits = compose(Player.clamp(1.0, 0.0), Player.increment(0.1))
  this.setVolume(incrementBetweenLimits);
  return this;
}

Player.prototype.volumeDown = function() {
  const decrementBetweenLimits = compose(Player.clamp(1.0, 0.0), Player.decrement(0.1))
  this.setVolume(decrementBetweenLimits);
  return this;
}

Player.prototype.setVolume = function(volume) {
  if (typeof volume == 'function') {
    this.element.volume = volume(this.element.volume);
  } else {
    this.element.volume = volume;
  }
  return this.element.volume
}

Player.prototype.mute = function() {
  this._cacheVolume = this.element.volume;

  this.setVolume(0);
  return this;
}

Player.prototype.unmute = function() {
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
