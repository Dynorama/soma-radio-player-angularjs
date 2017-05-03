import angular from 'angular';
import Components from './components';
import Services from './Services';
import Factories from './Factories';

angular.module('SomaPlayer', [
  Components.name,
  Services.name,
  Factories.name
]);
