export default class StationController {
    constructor(StationsService, PlaylistService, PlayerService) {
        'ngInject';
        this.PlaylistService = PlaylistService;
        this.PlayerService = PlayerService;
        this.StationsService = StationsService;
    }
    click({id}) {
      this.onClick({ stationId: id});
    }
}
