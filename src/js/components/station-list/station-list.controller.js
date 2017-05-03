import {
  listStations,
  selectStation
} from '../../actions';

export default class StationListController {
  constructor($scope, utils, PlayerService, StationsService, StateService) {
    'ngInject';
    this.PlayerService = PlayerService;
    this.StationsService = StationsService;
    this.$scope = $scope;
    this.StateService = StateService;
    this.StateService.addChangeListener((state) => {
      this.state = state;
      utils.safeApply($scope);
    });
  }
  selectStation(stationId) {
    this.StationsService.dispatch(selectStation(stationId));
  }
  $onInit() {
    this.StationsService.dispatch(listStations());
  }
}
