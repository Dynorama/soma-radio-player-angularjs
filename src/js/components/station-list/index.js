'use strict';
import StationListController from './station-list.controller';

export default angular.module('SomaPlayer.Components.stationList', [])
  .component('stationList', { controller  : StationListController,
                                bindings  : { stations  : '<' },
                                template  : `
                                            <ul>
                                              <li ng-repeat="station in $ctrl.state.stations">
                                                <station idx=station.idx name=station.name url=station.url on-click="$ctrl.selectStation(stationId)" cover=station.coverImage></station>
                                                </li>
                                            </ul>
  `
  });
