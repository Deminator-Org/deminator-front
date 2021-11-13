import DeminatorUtil from "./DeminatorUtil";

class DeminatorService {
  constructor(url){
    this.url = url;
  }

  getGame(){
    //const game = this.demService.getmines();
    //const grid = this.generateGrid(game.width, game.height, game.mines)
    return 
  }

  setRoom(room){
    this.room = room;
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

  generateGrid(width, height, mines) {
    var grid = this.generateEmptyGrid(width, height);
   
    mines.forEach((mine) => {
      var pos = mine.x * width + mine.y;
      grid[pos].value = -1;
      DeminatorUtil.forAroundCel(pos, (posPlus)=>grid[posPlus].value !== -1, (posPlus)=>grid[posPlus].value+=1, width, height);
    });
    return grid;
  }

  getmines() {
    let width, height, mines;
    fetch(this.url, { mode: "cors" })
      .then((res) => res.json())
      .then((dem) => {
        width = dem.game.width;
        height = dem.game.height;
        mines = dem.game.mines;
      });
    return {width, height, mines};
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
