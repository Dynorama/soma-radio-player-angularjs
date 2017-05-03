export default class PlaylistService {
    constructor() {}

    $get($http, utils) {
        'ngInject';
        const self = this;

        const parse = (text) => {
            const data = text.split('\n').slice(1);

            let returnValue = utils.tupleListToObj(data.map((field) => {
                return field.split('=')
            }));

            return Promise.resolve(returnValue);
        };

        const createService = () => {
          let Service = Object.create(Object);

          Service = Object.assign(Service, {
            fetchPlaylist(url) {
              return $http.get(url).then((response) => {
                  return parse(response.data);
              });
            }
          });

          return Service;
        };

        return createService();
    }
}
