class GameOfLife {
    /*
    functions
    1. create 2 2d arrays with zeros(active/inactive)
    2. fill active array randomly with ones and zeros
    3. set color for cell
    4. coint neighbours
    5.update generation
    6 clear canvas

    */
    constructor() {
        this.cell_size = 2;
        this.dead_color = `#181818`;
        this.alive_color = `#FFF`;
        this.cell_in_colums = Math.floor(canvas.width / this.cell_size);
        this.cell_in_rows = Math.floor(canvas.height / this.cell_size);

        this.active_array = [];
        this.inactive_array = [];

        this.arrayInitialization = () => {
            for (let i = 0; i < this.cell_in_rows; i++) {
                this.active_array[i] = [];
                for (let j = 0; j < this.cell_in_colums; j++) {
                    this.active_array[i][j] = 0;
                }
            }
            this.inactive_array = this.active_array
        };

        this.arrayRandomize = () => {
            for (let i = 0; i < this.cell_in_rows; i++) {
                for (let j = 0; j < this.cell_in_colums; j++) {
                    this.active_array[i][j] = (Math.random() > 0.5) ? 1 : 0;
                }
            }

        };

        this.fillArray = () => {
            for (let i = 0; i < this.cell_in_rows; i++) {
                for (let j = 0; j < this.cell_in_colums; j++) {
                    let color;
                    if (this.active_array[i][j] == 1) color = this.alive_color;
                    else color = this.dead_color;
                    ctx.fillStyle = color;
                    ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);

                }
            }
        };

        this.setCellValueHelper = (row, col) => {
            try {
                return this.active_array[row][col];
            }
            catch {
                return 0;
            }
        };

        this.countNeighbours = (row, col) => {
            let total_neighbours = 0;
            total_neighbours += this.setCellValueHelper(row - 1, col - 1);
            total_neighbours += this.setCellValueHelper(row - 1, col);
            total_neighbours += this.setCellValueHelper(row - 1, col + 1);
            total_neighbours += this.setCellValueHelper(row, col - 1);
            total_neighbours += this.setCellValueHelper(row, col + 1);
            total_neighbours += this.setCellValueHelper(row + 1, col - 1);
            total_neighbours += this.setCellValueHelper(row + 1, col);
            total_neighbours += this.setCellValueHelper(row + 1, col + 1);
            return total_neighbours;
        };

        this.updateCellValue = (row, col) => {
            const total = this.countNeighbours(row, col);
            if (total > 4 || total < 3) return 0;
            else if (this.active_array[row][col] === 0 && total === 3) {
                return 1;
            }
            else return this.active_array[row][col];

        };
        this.updateLifeCycle = () => {
            for (let i = 0; i < this.cell_in_rows; i++) {
                for (let j = 0; j < this.cell_in_colums; j++) {
                    let new_state = this.updateCellValue(i, j)
                    this.inactive_array[i][j] = new_state;

                }
            }
            this.active_array = this.inactive_array
        };

        this.gameSetUp = () => {
            this.arrayInitialization();
        };

        this.runGame = () => {
            this.updateLifeCycle();
            this.fillArray();
        };

    }
}