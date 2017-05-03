'use strict';

class DispatcherServiceProvider {
  $get() {
    const createService = () => {
      let _callbacks = [];
      let _promises = [];
      let _history = [];
      let _isDispatching = false;
      let Service = {
        register(callback) {
          _callbacks.push(callback);
          return _callbacks.length - 1;
        },

        dispatch(payload) {
          let resolves = [];
          let rejects = [];

          _promises = _callbacks.map((_, i) => {
            return new Promise((resolve, reject) => {
              resolves[i] = resolve;
              rejects[i] = reject;
            });
          });

          _callbacks.forEach((callback, i) => {
            Promise.resolve(callback(payload)).then(() => {
              if (!this.isDispatching()) {
                this.startDispatch();
                _history.push(payload);
                resolves[i](payload);
              } else {
                console.log(`There is another dispatch running`);
              };
            }, () => {
              rejects[i](new Error('Dispatcher callback unsuccessful'));
            });
          });

          this.stopDispatch();

          _promises = [];
        },

        isDispatching() {
          return this._isDispatching;
        },
        startDispatch() {
          this._isDispatching = true;
        },
        stopDispatch() {
          this._isDispatching = false;
        }
      };

      window.showHistory = (function () {
        console.table(_history);
      }).bind(window);

      return Service;
    };

    return createService();
  }
}

export default DispatcherServiceProvider;
