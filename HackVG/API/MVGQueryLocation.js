export default class {
  constructor(query) {
    this.query = query;
  }

  /**
   * Fetch list of matches for possible locations
   */
  query_location(callback) {
    auth_head = new Header();
    auth_head.append("X-MVG-Authorization-Key", "5af1beca494712ed38d313714d4caff6");

    fetch(`https://www.mvg.de/fahrinfo/api/location/queryWeb?q=${this.query}`, {
      method: "GET",
      headers: auth_head,
    }).then((response) => response.json()
    ).then((list) => callback(list.locations)
    ).catch((error) => {
      callback(undefined, error);
    });
  }
}