'use strict';
import SomaPlayerController from './soma-player.controller'

export default angular.module('SomaPlayer.Components.somaPlayer', [])
  .component('somaPlayer', {  controller  : SomaPlayerController,
                              template    : `<div id="player-info">
                                              <cover-image url=$ctrl.state.stations[$ctrl.state.selectedStation].coverImage></cover-image>
                                              <controls></controls>
                                              <div class="audio"></div>
                                              <div class="container" ng-transclude></div>
                                            </div>`,
                              transclude  : true,
                              bindings    : { size  : '@' } });
