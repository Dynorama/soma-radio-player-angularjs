import immutable from 'immutable';
import EventEmmiter from 'events';

export default class StateService{
  constructor() {}
  $get() {
    'ngInject';
    const self = this;
    const createService = () => {
      let Service = Object.create(EventEmmiter.prototype);
      let _initialState = {
        stations: [],
        selectedStation : 0,
        playing: false,
        paused: true
      };

      let _store = immutable.fromJS(_initialState);
      let _currentState = _store.slice();

      Service = Object.assign(Service, {
        set(key, value) {
          let retValue;

          if (typeof key === 'object') {
            _store = _store.mergeDeep(key);
            retValue = _store;
          } else {
            _store = _store.set(key, value);
            retValue = _store.get(key);
          }

          this.emitChange();
          return retValue;
        },
        get(key) {
          if (key) {
            return _store.get(key);
          }

          return _store.toJSON();
        },
        _setupListeners() {},
        addChangeListener(callback) {
          this.on('change', callback);
        },
        emitChange() {
          if (_store.equals(_currentState)) {
            return;
          }
          this.emit('change', this.get(), _currentState.toJSON());
          _currentState = _store.slice();
        },
      });

      return Service;
    }

    return createService();
  }
}
