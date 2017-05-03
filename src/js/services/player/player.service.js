import Player from '../../player';

export default class PlayerService {
  constructor() {}
  $get(StateService, DispatcherService) {
    'ngInject';
    const createService = () => {
      let Service = Object.create(Object);

      Service = Object.assign(Service, {
        registerDispatch() {
          this.dispathcIndex = DispatcherService.register((action) => {
            let {
              type,
              payload
            } = action;
            switch (type) {
              case 'VOLUME_UP':
                this.volumeUp();
                break;
              case 'VOLUME_DOWN':
                this.volumeDown();
                break;
              case 'SET_VOLUME':
                this.setVolume(payload);
                break;
              case 'PLAY':
                this.play();
                break;
              case 'PAUSE':
                this.pause();
                break;
              default:
                break;
            }
            return true;
          });
        },
        player: new Player(),
        play() {
          this.player.play();
          StateService.set({
            paused: false,
            playing: true
          });
        },
        pause() {
          this.player.pause();
          StateService.set({
            paused: true,
            playing: false
          });
        },
        volumeUp() {
          let newVolume = this.player.volumeUp();
          StateService.set('volume', newVolume)
        },
        volumeDown() {
          let newVolume = this.player.volumeDown();
          StateService.set('volume', newVolume)
        },
        setVolume() {
          let newVolume = this.player.setVolume();
          StateService.set('volume', newVolume)
        },
        dispatch(action) {
          DispatcherService.dispatch(action);
        }

      });

      Service.registerDispatch();

      return Service;
    }

    return createService();
  }
}
