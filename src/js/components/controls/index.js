'use strict';
import ControlsController from './controls.controller';

export default angular.module('SomaPlayer.Components.Controls', [])
  .component('controls', {  controller  : ControlsController,
                            template    : `<div id="controls">
                                            <div id="prev" ng-click="$ctrl.selectPrevious()">
                                            <span class="fa-stack fa-lg">
                                              <i class="fa fa-step-backward fa-stack-1x"></i>
                                              <i class="fa fa-circle-thin fa-stack-2x"></i>
                                              </span>
                                              </div>
                                              <play-button on-click=$ctrl.playPause()></play-button>
                                              <div id="next" ng-click="$ctrl.selectNext()">
                                              <span class="fa-stack fa-lg">
                                                <i class="fa fa-step-forward fa-stack-1x"></i>
                                                <i class="fa fa-circle-thin fa-stack-2x"></i>
                                              </span>
                                            </div>
                                          </div>`
  })
