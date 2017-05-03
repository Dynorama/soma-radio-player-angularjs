// const stations = [{
//     name: 'ThistleRadio',
//     url: 'https://somafm.com/thistle.pls',
//     coverImage: 'https://somafm.com/img3/thistle-400.jpg'
// }, {
//     name: 'Groove Salad',
//     url: 'https://somafm.com/groovesalad.pls',
//     coverImage: 'https://somafm.com/img3/groovesalad-400.jpg'
// }, {
//     name: 'Drone Zone',
//     url: 'https://somafm.com/dronezone.pls',
//     coverImage: 'https://somafm.com/img3/dronezone-400.jpg'
// }, {
//     name: 'Space Station Soma',
//     url: 'https://somafm.com/spacestation.pls',
//     coverImage: 'https://somafm.com/img3/spacestation-400.jpg'
// }]
//
// const utils = {
//     tupleListToObj(tupleList) {
//         return tupleList.reduce((obj, keyValue) => {
//             if (keyValue[0] && keyValue[0] != undefined) {
//                 obj[keyValue[0]] = keyValue[1] || ''
//             }
//             return obj
//         }, {})
//     },
//     getElement(elm) {
//         if (typeof elm === "string") {
//             return document.querySelector(elm)
//         }
//         return element
//     },
//     createId(obj) {
//       let newObj = Object.assign({}, obj)
//
//       newObj.id = btoa(JSON.stringify(newObj))
//
//       return newObj
//     }
// }
//
// function StationList(stations) {
//     if (!stations) throw new Error('Must define station')
//
//     if (!(this instanceof StationList)) return new StationList(stations)
//
//     this.stations = stations.map((station) => utils.createId(station))
//                             .map((station) => new Station(station))
//
//     return this
// }
//
// StationList.prototype.build = function() {
//     let rootElm = document.createDocumentFragment()
//     let list    = document.createElement('ul')
//
//     this.stations.forEach(function(station) {
//         list.appendChild(station.build().element)
//     })
//
//     rootElm.appendChild(list)
//     document.body.appendChild(rootElm)
//
//     return this
// }
//
// function Station(data) {
//     if (!data) throw new Error('Must define station')
//     if (!(this instanceof Station)) return new Station(data)
//
//     for (k in data) {
//         this[k] = data[k];
//     }
//
//     return this
// }
//
// Station.prototype.build = function() {
//     let li          = document.createElement('li');
//     let stationInfo = document.createElement('div');
//     let innerHTML   = `
//         <img src="${this.coverImage}" alt="${this.name}"/>
//         <span data-url="${this.url}">${this.name}</span>`;
//
//     stationInfo.innerHTML = innerHTML
//     li.appendChild(stationInfo)
//     li.id = this.id
//     this.element = li
//
//     return this
// }
//
// function PlaylistParser({
//     url,
//     type
// } = {
//     url: '',
//     type: 'audio/x-scpls'
// }) {
//     if (!(this instanceof PlaylistParser)) return new PlaylistParser({
//         url,
//         type
//     })
//
//     this.url      = url
//     this.type     = type
//     this._request = null
//     this._raw     = ''
//
//     return this
// }
//
// PlaylistParser.prototype._buildRequest = function(url = this.url, {
//     method,
//     headers
// } = {}) {
//     let requestHeaders = new Headers()
//
//     method  = method || 'GET'
//     headers = headers || {}
//
//     Object.keys(headers).map((headerName) => {
//         requestHeaders.append(headerName, headers[headerName])
//     })
//
//     const request = new Request(url, {
//         method,
//         headers
//     })
//
//     return request
// }
//
// PlaylistParser.prototype.fetch = function() {
//     if (!this.url) {
//         throw new Error('Please add an url')
//     }
//
//     this.request = this._buildRequest(this.url)
//
//     return fetch(this.request).then((response) => {
//       this._raw = response.text()
//       return Promise.resolve(this._raw)
//     })
// }
//
// PlaylistParser.prototype.parse = function(text) {
//     const data = text.split('\n').slice(1)
//     this._data = utils.tupleListToObj(data.map((field) => {
//         return field.split('=')
//     }))
//     return Promise.resolve(this._data)
// }
//
// function Player(container) {
//     if (!container) throw new Error('I need a container')
//     if (!(this instanceof Player)) return new Player(container)
//
//     this.element   = document.createElement('audio')
//     this.container = utils.getElement(container)
//
//     this.container.appendChild(this.element)
//
//     this._sourceElement      = this.container.innerHTML
//     this.container.innerHTML = null
//     this.container.id        = this.container.id || `soma-radio-player-${Date.now()}`
//     this.id                  = this.container.id
//
//     return this
// }
//
// Player.prototype.destroy = function() {
//     this.container.innerHTML = null
//
//     return this
// }
//
// Player.prototype.build = function() {
//     this.container.innerHTML = this._sourceElement;
//     this.element             = this.container.children[0];
//     this.element.autoplay    = true
//     this.element.loop        = true
//
//     this._setupListeners();
//
//     return this
// }
//
// Player.prototype.reset = function() {
//     this.destroy()
//         .build()
//
//     return this
// }
//
// Player.prototype._setupListeners = function () {
//   if (!this.element) return;
// }
//
// Player.prototype.addSource = function(src) {
//     let source = document.createElement('source')
//
//     source.src = src
//     this.element.appendChild(source)
//
//     return this
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//     let audioContainer = document.querySelector('.audio')
//     let contentType    = 'audio/x-scpls'
//     let player         = new Player('.audio')
//     let stationList    = new StationList(stations)
//
//     stationList.build().stations.forEach(function(station) {
//         station.element.addEventListener('click', function(evt) {
//             let parser = new PlaylistParser({
//                 url    : station.url,
//                 type   : contentType
//             });
//
//             parser.fetch()
//               .then(text => parser.parse(text))
//               .then(data => {
//                 player.reset()
//                   .addSource(data.File1)
//                   .addSource(data.File2)
//               })
//             })
//         })
// })

//
// function Player(container) {
//     if (!container) throw new Error('I need a container')
//     if (!(this instanceof Player)) return new Player(container)
//
//     this.element   = document.createElement('audio')
//     this.container = utils.getElement(container)
//
//     this.container.appendChild(this.element)
//
//     this._sourceElement      = this.container.innerHTML
//     this.container.innerHTML = null
//     this.container.id        = this.container.id || `soma-radio-player-${Date.now()}`
//     this.id                  = this.container.id
//
//     return this
// }
//
// Player.prototype.destroy = function() {
//     this.container.innerHTML = null
//
//     return this
// }
//
// Player.prototype.build = function() {
//     this.container.innerHTML = this._sourceElement;
//     this.element             = this.container.children[0];
//     this.element.autoplay    = true
//     this.element.loop        = true
//
//     this._setupListeners();
//
//     return this
// }
//
// Player.prototype.reset = function() {
//     this.destroy()
//         .build()
//
//     return this
// }
//
// Player.prototype._setupListeners = function () {
//   if (!this.element) return;
// }
//
// Player.prototype.addSource = function(src) {
//     let source = document.createElement('source')
//
//     source.src = src
//     this.element.appendChild(source)
//
//     return this
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//     let audioContainer = document.querySelector('.audio')
//     let contentType    = 'audio/x-scpls'
//     let player         = new Player('.audio')
//     let stationList    = new StationList(stations)
//
//     stationList.build().stations.forEach(function(station) {
//         station.element.addEventListener('click', function(evt) {
//             let parser = new PlaylistParser({
//                 url    : station.url,
//                 type   : contentType
//             });
//
//             parser.fetch()
//               .then(text => parser.parse(text))
//               .then(data => {
//                 player.reset()
//                   .addSource(data.File1)
//                   .addSource(data.File2)
//               })
//             })
//         })
// })
