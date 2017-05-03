import CoverImageController from './cover-image.controller';
export default angular.module('SomaPlayer.Components.coverImage', [])
  .component('coverImage', {  controller  : CoverImageController,
                              bindings    : { url         : '<'  },
                              require     : { playerCtrl  : '?^soma-player' },
                              template    : `<div>
                                              <img src="{{$ctrl.url}}"/>
                                            </div>`
  })
