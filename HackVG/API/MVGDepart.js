// Which trains depart from given station


export default class {

  constructor(station){
    this.station = station;
  }

  /**
   * Fetch list of nearby stations for given position
   * and return it to callback
   */
  departings(callback){
    // Special authentication key of mvg for json fetching
    auth_head = new Headers();
    auth_head.append("X-MVG-Authorization-Key", "5af1beca494712ed38d313714d4caff6");
    time_prev = -30;

    fetch(
      `https://www.mvg.de/fahrinfo/api/departure/${this.station.id}?footway=${time_prev}`,
    {
      method: 'GET',
      headers: auth_head
    }).then(
      (response) => response.json()
    ).then(
      (list) => callback(list.servingLines, list.departures)
    ).catch((error)=>{
      callback(undefined, error);
    });
  }
}