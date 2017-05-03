'use strict';
import PlayButtonController from './play-button.controller';

export default angular.module('SomaPlayer.Components.PlayButton', [])
  .component('playButton', {  controller  : PlayButtonController,
                              bindings    : { onClick : '&' },
                              template    : `<div id="play-pause" ng-click=$ctrl.click()>
                                              <span class="fa-stack fa-lg">
                                                <i class="fa fa-stack-1x" ng-class="{'fa-play': !$ctrl.state.playing && $ctrl.state.paused,'fa-pause': !$ctrl.state.paused && $ctrl.state.playing}"></i>
                                                <i class="fa fa-circle-thin fa-stack-2x"></i>
                                              </span>
                                            </div>`
  })
