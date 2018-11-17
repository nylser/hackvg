export default class {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  /**
   * Fetch list of connections: from -> to
   */
  connections(callback) {
    auth_head = new Headers();
    auth_head.append("X-MVG-Authorization-Key", "5af1beca494712ed38d313714d4caff6");

    fetch(`https://mvg.de/fahrinfo/api/routing/?fromStation=${this.from}&toStation=${this.to}`, {
      method: "GET",
      headers: auth_head,
    }).then((response) => response.json()
    ).then((list) => callback(list.connectionList)
    ).catch((error) => {
      callback(undefined, error);
    });
  }
}