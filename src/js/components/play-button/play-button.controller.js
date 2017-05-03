import {play, pause} from '../../actions';

export default class PlayButtonController {
  constructor($scope, utils, StateService, PlayerService) {
    this.PlayerService = PlayerService;
    this.StateService = StateService;
    this.utils = utils;
    this.$scope = $scope;
    this.StateService.addChangeListener((state) => {
      this.state = state;
      this.utils.safeApply($scope);
    });

  }
  $onInit() {
    console.log(this);
  }
  click() {
    this.playPause();
  }
  playPause() {
    this.PlayerService.dispatch(
      this.state.playing && !this.state.paused ? pause()
      : play());
  }
}
