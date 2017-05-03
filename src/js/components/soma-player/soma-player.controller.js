export default class SomaPlayerController {
  constructor($scope, utils, StateService, PlayerService, PlaylistService) {
    'ngInject';
    this.$scope = $scope;
    this.PlayerService = PlayerService;
    this.PlaylistService = PlaylistService;
    this.StateService = StateService;
    this.utils = utils;

    this.StateService.addChangeListener((newState, oldState) => {
      const [ oldStation, newStation ] = [ newState.selectedStation, oldState.selectedStation ];

      this.state = newState;
      this.station = this.state.stations[this.state.selectedStation];

      if (this.station.id) {
        if (!this.state.playing || oldStation !== newStation) {
          this.loadStation(this.station, this.state.playing);
        }
      };

      this.utils.safeApply($scope);
    });

  }

  $onInit() {
    this.utils.styleElement('soma-player', `width: ${this.size}`);
    this.PlayerService.player.initialize('.audio');
  }

  loadStation(station, continuePlaying = true) {
    return this.PlaylistService.fetchPlaylist(station.url).then((data) => {
      const player = this.PlayerService.player;

      player.reset().addSource(data.File1);
      if (continuePlaying || player.getAttribute('autoplay')) {
        player.play();
      }
    });
  }
}
