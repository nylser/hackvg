
export default class {

  constructor(latitude, longtitude){
    this.latitude = latitude;
    this.longtitude = longtitude;
  }

  /**
   * Fetch list of nearby stations for given position
   * and return it to callback
   */
  nearbyStations(callback){
    // Special authentication key of mvg for json fetching
    auth_head = new Headers();
    auth_head.append("X-MVG-Authorization-Key", "5af1beca494712ed38d313714d4caff6");

    fetch(
      `https://www.mvg.de/fahrinfo/api/location/nearby?latitude=${this.latitude}&longitude=${this.longtitude}`,
    {
      method: 'GET',
      headers: auth_head
    }).then(
      (response) => response.json()
    ).then(
      (list) => callback(list.locations)
    ).catch((error)=>{
      callback(undefined, error);
    });
  }
}