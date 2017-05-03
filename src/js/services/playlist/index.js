'use strict';
import PlaylistService from './playlist.service';

export default angular.module('SomaPlayer.Services.PlaylistService', [])
    .provider('PlaylistService', PlaylistService);
