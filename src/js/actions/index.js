export function listStations() {
  return {  type   : 'LIST_STATIONS' }
}
export function selectStation(id) {
  return {  type     : 'SELECT_STATION',
            payload  : id };
};

export function volumeUp() {
  return {  type    : 'VOLUME_UP',
            payload :  void 0 };
}

export function volumeDown() {
  return {  type     : 'VOLUME_UP',
            payload  :  void 0 };
}

export function setVolume(volume) {
  return {  type     : 'SET_VOLUME',
            payload  : volume };
}

export function play(volume) {
  return {  type: 'PLAY',
            payload:  void 0  };
}

export function pause() {
  return {  type    : 'PAUSE',
            payload : void 0 };
}
