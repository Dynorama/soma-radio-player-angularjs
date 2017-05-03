import PlaylistService from './playlist';
import PlayerService from './player';
import StateService from './state';
import StationsService from './stations';
import DispatcherService from './dispatcher';

export default angular.module('SomaPlayer.Services', [
  PlaylistService.name,
  PlayerService.name,
  StateService.name,
  StationsService.name,
  DispatcherService.name
]);
