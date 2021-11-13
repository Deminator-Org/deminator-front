class DeminatorUtil{
    static DIRS = [
        (x, width, height) => !((x + 1)%width)?-1:x + 1,
        (x, width, height) => (x + width>=width*height)?-2:x + 1 + width,
        (x, width, height) => (x + width>=width*height)?-1:x + width,
        (x, width, height) => !((x)%width)?-2:x - 1 + width,
        (x, width, height) => !((x)%width)?-1:x-1,
        (x, width, height) => ((x - width)<0)?-2:x - 1 - width,
        (x, width, height) => ((x - width)<0)?-1:x-width,
        (x, width, height) => (!((x + 1)%width) || (x - width)<0)?-1:x + 1 - width,
    ];

    static generateEmptyGrid(width, height){
        return Array(height * width).fill(null).map(()=>({value:0, isOpen:false}));
    }

    static generateGrid(width, height, mines) {
        var grid = this.generateEmptyGrid(width, height);
       
        mines.forEach((mine) => {
            var pos = mine.x * width + mine.y;
            grid[pos].value = -1;
            DeminatorUtil.forAroundCel(pos, (posPlus)=>grid[posPlus].value !== -1, (posPlus)=>grid[posPlus].value+=1, width, height);
        });
        return grid;
    }

    static forAroundCel(pos, condition, func, width, height){
        for (let i = 0; i < DeminatorUtil.DIRS.length; i++) {
            let posPlus = this.DIRS[i](pos, width, height);
            if(posPlus < 0){
                i += -posPlus;
                continue;
            }
            if(condition(posPlus)){
                func(posPlus);
            }
        }
    }

    static isCompleted(pos, grid, width, height){
        let value = grid[pos].value;
        this.forArountCel(pos, (posPlus)=>grid[posPlus].isOpen && grid[posPlus].value === -1,()=>value--)

        return value === 0;
    }
}


export default DeminatorUtil;