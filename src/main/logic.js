export default class puzzleProcess {
    matrix = [];
    n = 0;
    blockerCellTotalCount = 0;
    complete = [];
    shortestPath = [];
    blockerCell = [];
    constructor(_matrixLenth) {
        this.n = _matrixLenth;
        this.randomDetailsGenerator();
        this.blockerGenerator();
        this.matrixGenerator();
    }
    randomDetailsGenerator() {
        // do {
        //     this.n = Math.floor((Math.random() * 10) + 1)
        // } while (this.n === 0 || this.n === 1);
        do {
            this.blockerCellTotalCount = Math.floor((Math.random() * (this.n - 1)) + 1);
        } while (this.blockerCellTotalCount === 0);
    }
    blockerGenerator() {
        this.blockerCell = [];
        for (let index = 0; index < this.blockerCellTotalCount; index++) {
            let tempRowIndex = Math.floor((Math.random() * (this.n - 1)) + 1);
            let tempColumnIndex = Math.floor((Math.random() * (this.n - 1)) + 1);
            this.blockerCell.push({ row: tempRowIndex, column: tempColumnIndex });
        }
    }
    cellStatus(row, column) {
        for (let index = 0; index < this.blockerCell.length; index++) {
            const element = this.blockerCell[index];
            if ((row === 0 && column === 0) || (row === this.n - 1 && column === this.n - 1)) {
                return 'x';
            }
            else if (element.row === row && element.column === column) {
                return 0;
            }
        }
        return 1;
    }
    matrixGenerator() {
        this.matrix = [];
        for (let row = 0; row < this.n; row++) {
            this.matrix.push([]);
            for (let column = 0; column < this.n; column++) {
                this.matrix[row][column] = this.cellStatus(row, column);
            }
        }
        return this.matrix;
    }
    possiblePathCalculation() {
        this.complete = [];
        let s = [[{ row: 0, column: 0 }]];
        do {
            let tempS = JSON.parse(JSON.stringify(s));
            for (let index = 0; index < tempS.length && index < s.length; index++) {
                let tempFlag = false;
                let tempArrE = JSON.parse(JSON.stringify(s[index]));
                let lastElement = tempArrE[tempArrE.length - 1];
                if (lastElement.row % 2 !== 0) {
                    if ((lastElement.column - 1 >= 0) && (this.matrix[lastElement.row][lastElement.column - 1] === 1 || this.matrix[lastElement.row][lastElement.column - 1] === 'x')) {
                        tempFlag = true;
                        s[index].push({ row: lastElement.row, column: lastElement.column - 1 });
                    }
                    if ((lastElement.row + 1) <= this.n - 1 && (this.matrix[lastElement.row + 1][lastElement.column] === 1 || this.matrix[lastElement.row + 1][lastElement.column] === 'x')) {
                        if (tempFlag) {
                            s.push(tempArrE);
                            let tempIndex = s.length - 1;
                            s[tempIndex].push({ row: lastElement.row + 1, column: lastElement.column });
                        } else {
                            s[index].push({ row: lastElement.row + 1, column: lastElement.column });
                            tempFlag = true;
                        }
                    }
                } else {
                    if ((lastElement.column + 1) <= this.n - 1 && (this.matrix[lastElement.row][lastElement.column + 1] === 1 || this.matrix[lastElement.row][lastElement.column + 1] === 'x')) {
                        tempFlag = true;
                        s[index].push({ row: lastElement.row, column: lastElement.column + 1 });
                    }
                    if ((lastElement.row + 1) <= this.n - 1 && (this.matrix[lastElement.row + 1][lastElement.column] === 1 || this.matrix[lastElement.row + 1][lastElement.column] === 'x')) {

                        if (tempFlag) {
                            s.push(tempArrE);
                            let tempIndex = s.length - 1;
                            s[tempIndex].push({ row: lastElement.row + 1, column: lastElement.column });
                        } else {
                            tempFlag = true;
                            s[index].push({ row: lastElement.row + 1, column: lastElement.column });
                        }
                    }
                }
                if (!tempFlag) {
                    let tempArr = [];
                    for (let index2 = 0; index2 < s.length; index2++) {
                        if (index2 !== index) {
                            tempArr.push(s[index2]);
                        }
                    }
                    s = JSON.parse(JSON.stringify(tempArr));;
                }

            }
            for (let index = 0; index < s.length; index++) {
                const element = s[index];
                if (element[element.length - 1].row === this.n - 1 && element[element.length - 1].column === this.n - 1) {
                    this.complete.push(element);
                    let tempArr = [];
                    for (let index2 = 0; index2 < s.length; index2++) {
                        if (index2 !== index) {
                            tempArr.push(s[index2]);
                        }
                    }
                    s = JSON.parse(JSON.stringify(tempArr));
                }
            }
        } while (s.length > 0)
        console.log("Possible path");
        return this.complete;
    }
    shortestPathCalculation() {
        let shortSize = 10000000000000;
        this.shortestPath = [];
        if (this.complete && this.complete.length > 0) {
            this.complete.forEach(element => {
                if (element && element.length <= shortSize) {
                    shortSize = element.length;
                    this.shortestPath.push(element);
                }
            });
            console.log("shortest path length =>", shortSize);
        } else {
            console.log("No possible path");
        }
        return this.shortestPath;
    }
}
