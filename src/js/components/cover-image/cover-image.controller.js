export default class CoverImageController {
  constructor(utils) {
    this.utils = utils;
  }
  $onInit() {
    if (this.playerCtrl) {
      const size = this.playerCtrl.size;
      this.utils.styleElement('cover-image', `width: ${size}; height: ${size}`);
    }
  }
}
