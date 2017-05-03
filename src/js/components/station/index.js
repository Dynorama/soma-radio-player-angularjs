'use strict';
import StationController from './station.controller';

export default angular.module('SomaPlayer.Components.station', [])
  .component('station', { controller  : StationController,
                          bindings    : { idx     : '<',
                                          name    : '<',
                                          url     : '<',
                                          cover   : '<',
                                          onClick : '&' },
                          template: `<div class="wrapper" ng-click="$ctrl.click({id: $ctrl.idx})">
                                      <div class="img-container"><img src="{{ $ctrl.cover }}"/></div><div>{{ $ctrl.name }}</div>
                                    </div>`})
