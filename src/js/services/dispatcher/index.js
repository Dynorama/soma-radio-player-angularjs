import angular from 'angular';
import DispatcherServiceProvider from './dispatcher.service';

export default angular.module('SomaPlayer.Services.Dispatcher', [])
  .provider('DispatcherService', DispatcherServiceProvider);
