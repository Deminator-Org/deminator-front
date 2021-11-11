import DeminatorUtil from "./DeminatorUtil";

const DEFAULT_WIDTH = 10;
const DEFAULT_HEIGHT = 10;
const DEFAULT_MINE_NB = 10;

class DeminatorService {
  constructor(url){
    this.url = url;
  }

  getGame(pos = -1){
    const width = DEFAULT_WIDTH;
    const height = DEFAULT_HEIGHT;
    const mines = this.getminesTest(DEFAULT_MINE_NB, DEFAULT_WIDTH, DEFAULT_HEIGHT, pos);
    const grid = DeminatorUtil.generateGrid(DEFAULT_WIDTH, DEFAULT_HEIGHT, mines);
    return {width, height, grid};
  }

  getminesTest(nb, width, height, pos) {
    var cantor = Array(nb+1);
    if(pos < 0){
      cantor[nb] = getCantorNumber(pos);
    }
    var mines = Array(nb);
    for (let i = 0; i < nb; i++) {
      let x = getRandomInt(width);
      let y = getRandomInt(height) ;
      let cant = getCantorNumber(x, y);
      if(cantor.includes(cant)){
        i--;
        continue;
      }
      cantor[i] = cant;
      mines[i] = { x: x, y: y };
    }
    return mines;
  }
}

function getCantorNumber(x, y){
  return 1 / 2 * (x+y)*(x+y+1)+y;
}

function getRandomInt(max) {
  return (Math.random() * max)|0;
}

/*function getPos(key) {
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
*/
export default DeminatorService;
