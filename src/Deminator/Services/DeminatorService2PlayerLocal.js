import DeminatorUtil from "../DeminatorUtil";

const DEFAULT_WIDTH = 10;
const DEFAULT_HEIGHT = 10;
const DEFAULT_MINE_NB = 10;

class DeminatorService {
  constructor(width = 0, height = 0, nbMines = 0){
    this.width = width===0?DEFAULT_WIDTH:width;
    this.height = height===0?DEFAULT_HEIGHT:height;
    this.nbMines = nbMines===0?DEFAULT_MINE_NB:nbMines;
    this.player = 0;
    this.score = [0, 0];
  }

  getGameSetup(){
    const grid = DeminatorUtil.generateEmptyGrid(this.width, this.height);
    return {width: this.width, height: this.height, grid: grid, firstClick: true, player:1};
  }

  initGame(pos){
    const mines = this.getminesTest(DEFAULT_MINE_NB, DEFAULT_WIDTH, DEFAULT_HEIGHT, pos);
    this.grid = DeminatorUtil.generateGrid(DEFAULT_WIDTH, DEFAULT_HEIGHT, mines);
  }

  getminesTest(nb, width, height, pos) {
    var cantor = Array(nb+1);
    if(pos < 0){
      cantor[nb] = getCantorNumberWithPos(pos, width);
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

  onClick(pos){
    if(!this.grid[pos].isOpen){
      this.openCel(pos);
    }
    if(this.grid[pos].value === -1){
      this.score[this.player]++;
    }
    else{
      this.player = this.player === 0 ? 1:0;
    }
    return {width: this.width, height: this.height, grid: this.grid, firstClick: false, player:this.player};
  }

  onRightClick(pos){
    if(!this.grid[pos].isOpen){
      this.grid[pos].display = "flag";
    }
  }

  openCel(pos){
    this.grid[pos].player = this.player;
    this.grid[pos].isOpen = true;
    if(this.grid[pos].value === 0){
      DeminatorUtil.forAroundCel(pos, (posPlus)=>!this.grid[posPlus].isOpen, (posPlus)=>this.openCel(posPlus), this.width, this.height);
    }

  }
}

function getCantorNumber(x, y){
  return 1 / 2 * (x+y)*(x+y+1)+y;
}

function getCantorNumberWithPos(pos, width) {
  const coord = getCoord(pos, width);
  return getCantorNumber(coord.x, coord.y);
}

function getCoord(pos, width){
  const x = pos/width;
  const y = pos%width;
  return {x, y};
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
