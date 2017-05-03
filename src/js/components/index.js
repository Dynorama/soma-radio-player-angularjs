import Controls from './controls';
import PlayButton from './play-button';
import CoverImage from './cover-image';
import Station from './station';
import SomaPlayer from './soma-player';
import StationList from './station-list';

export default angular.module('SomaPlayer.components', [
  Controls.name,
  PlayButton.name,
  CoverImage.name,
  Station.name,
  SomaPlayer.name,
  StationList.name
]);
