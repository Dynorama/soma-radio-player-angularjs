'use strict';
import PlayerService from './player.service';

export default angular.module('SomaPlayer.Services.Player', [])
  .provider('PlayerService', PlayerService);
