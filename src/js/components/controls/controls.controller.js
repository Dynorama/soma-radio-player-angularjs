import {selectStation} from '../../actions';

export default class ControlsController {
  constructor($scope, PlayerService, utils, StationsService, StateService) {
    'ngInject';
    this.PlayerService = PlayerService;
    this.StationsService = StationsService;
    this.StateService = StateService;

    this.StateService.addChangeListener((state) => {
      this.state = state;
      utils.safeApply($scope);
    });
  }
  selectPrevious() {
    let nextStation = this.state.selectedStation - 1 || 0;

    this.StationsService.dispatch(selectStation(nextStation));
  }
  selectNext() {
    let nextStation = this.state.selectedStation + 1 || 0;

    this.StationsService.dispatch(selectStation(nextStation));

  }
}
