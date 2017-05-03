'use strict';
import StationsService from './station.service';
import utils from '../../factories/utils';

export default angular.module('SomaPlayer.Services.StationsService', [])
    .provider('StationsService', StationsService)
