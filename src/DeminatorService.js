class DeminatorService {
  constructor(url){
    this.url = url;
  }

  getRoom(room){
    return fetch(this.url+"/"+room)
    .then(resp=> console.log(resp));
  }

  getGrid() {
    var grid = [];
    fetch(this.url, { mode: "cors" })
      .then((res) => res.json())
      .then((dem) => {
        let g = dem.grid;
        this.setState({
          width: g.width,
          height: g.height,
        });
  
        Object.entries(g.cells).forEach((entry) => {
          let key = entry[0];
          let value = entry[1];
          const pos = this.getPos(key);
  
          grid[pos] = {
            isOpen: value.open,
            isMine: value.mine,
            value: value.mine ? -1 : 0,
          };
        });
      });
    this.setState({
      cells: grid,
    });
    this.calculCells();
  }

  getBombs() {
  }

  getBombsTest(nb, width, height) {
    var bombs = Array(nb);
    for (let i = 0; i < nb; i++) {
      bombs[i] = { x: getRandomInt(width), y: getRandomInt(height) };
    }
    return bombs;
  }
}

function getRandomInt(max) {
  return (Math.random() * max)|0;
}

function getPos(key) {
  const coord = key.split(",");
  const pos = parseInt(coord[0]) * this.state.width + parseInt(coord[1]);
  console.log(pos);
  return pos;
}

function getCoord(pos) {
  const x = pos / this.state.width;
  const y = pos % this.state.width;
  return x + "," + y;
}

export default DeminatorService;
