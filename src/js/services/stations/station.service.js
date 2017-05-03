export default class StationsService {
    constructor() {
      'ngInject';
        this.stations = [{
            name: 'ThistleRadio',
            url: 'https://somafm.com/thistle.pls',
            coverImage: 'https://somafm.com/img3/thistle-400.jpg'
        }, {
            name: 'Groove Salad',
            url: 'https://somafm.com/groovesalad.pls',
            coverImage: 'https://somafm.com/img3/groovesalad-400.jpg'
        }, {
            name: 'Drone Zone',
            url: 'https://somafm.com/dronezone.pls',
            coverImage: 'https://somafm.com/img3/dronezone-400.jpg'
        }, {
            name: 'Space Station Soma',
            url: 'https://somafm.com/spacestation.pls',
            coverImage: 'https://somafm.com/img3/spacestation-400.jpg'
        },
        {
          name: 'Secret Agent',
          url: 'https://somafm.com/secretagent.pls',
          coverImage: 'https://somafm.com/img3/secretagent-400.jpg'
        },
        {
          name: 'Folk Forward',
          url: 'https://somafm.com/folkfwd.pls',
          coverImage: 'https://somafm.com/img3/folkfwd-400.jpg'
        },
        {
          name: 'Left Coast 70s',
          url: 'https://somafm.com/seventies320.pls',
          coverImage: 'https://somafm.com/img/seventies400.jpg'
        },
        {
          name: 'Illinois Street Lounge',
          url: 'https://somafm.com/illstreet.pls',
          coverImage: 'https://somafm.com/img3/illstreet-400.jpg'
        }];
    }

    $get($q, utils, DispatcherService, StateService) {
        'ngInject';
        const self = this;

        const createService = () => {
          let Service = Object.create(Object);

          Service = Object.assign(Service, {
            registerDispatch() {
              this.dispathcIndex = DispatcherService.register((action) => {
                let { type, payload } = action;
                switch (type) {
                  case 'SELECT_STATION':
                    this.fetchStation(payload);
                  break;
                  case 'LIST_STATIONS':
                    this.fetchStations();
                  break;
                  default:
                  break;
                }
                return true;
              })
            },
            _mockStations() {
              return self.stations.map((station, idx) => {
                let newStation = utils.createId(station);
                newStation.idx = idx;
                return newStation;
              });
            },
            fetchStation(id) {
              let stations = this._mockStations();

              var selected = stations[id];

              StateService.set('selectedStation', selected.idx);

              return $q.resolve(StateService.get('selectedStation'));
            },
            fetchStations() {
              let stations = this._mockStations();

              StateService.set('stations', stations);

              return $q.resolve(StateService.get('stations'))
            },
            dispatch(action) {
              DispatcherService.dispatch(action);
            }
          });
          Service.registerDispatch();
          return Service;
        }

        return createService();
    }
}
