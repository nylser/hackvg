
export default class {

  /**
   * Update position
   * Call callback function with new pos.coords object when done
   * or dictionary with error object
   */
  static updatePosition(callback, options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 3000
    }){
    navigator.geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;

      //console.log('Your current position is:');
      //console.log(`Latitude : ${crd.latitude}`);
      //console.log(`Longitude: ${crd.longitude}`);
      //console.log(`More or less ${crd.accuracy} meters.`);
      callback(crd);
    }, (err) => {
      callback(undefined, err)
    }, options);
  }
}