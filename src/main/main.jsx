import React, { useState } from 'react';
import puzzleProcess from './logic'
import './main.css';

function PuzzleContent() {
    let textInput = React.createRef();
    const [n, setCount] = useState(0);

    let cTable = [];
    let cRow = [];
    let cColumn = [];
    let pTable = [];
    let pRow = [];
    let pColumn = [];
    let mRow = [];
    let mColumn = [];
    let puzzleProcessObj = null;
    let output = [];
    let possible = [];
    let complete = [];
    if (n > 0) {
        puzzleProcessObj = new puzzleProcess(n);
        output = puzzleProcessObj.matrixGenerator();
        possible = puzzleProcessObj.possiblePathCalculation();
        complete = puzzleProcessObj.shortestPathCalculation();
        for (let index = 0; index < n; index++) {
            mColumn = [];
            for (let index2 = 0; index2 < n; index2++) {
                mColumn.push(<td className={"td-" + output[index][index2]}>&nbsp;</td>)
            }
            mRow.push(<tr>{mColumn}</tr>);
        }

        pTable.push(<div>Total possible path : {possible.length}</div>)
        for (let indexT = 0; indexT < possible.length; indexT++) {
            let output1 = possible[indexT];
            pRow = [];
            for (let index = 0; index < n; index++) {
                pColumn = [];
                for (let index2 = 0; index2 < n; index2++) {
                    pColumn.push(<td className={"td-" + isAvailable(output1, index, index2, output[index][index2], 2)}>&nbsp;</td>)
                }
                pRow.push(<tr>{pColumn}</tr>);
            }
            pTable.push(<div> <span className="color-content">Shortest possible path :{indexT + 1}</span><br></br><table className="tableContent" border="1"><tbody>{pRow}</tbody></table></div>);
        }

        if (!pTable || pTable.length <= 0) {
            pTable.push(<div>Oops ..! no shortepossible path</div>)
        } else {
            cTable.push(<div>Total possible shortest path : {complete && complete.length}</div>)
            cTable.push(<div>Shortest node travelled  : { complete[0] && complete[0].length}</div>)
            for (let indexT = 0; indexT < complete.length; indexT++) {
                let output1 = complete[indexT];
                cRow = [];
                for (let index = 0; index < n; index++) {
                    cColumn = [];
                    for (let index2 = 0; index2 < n; index2++) {
                        cColumn.push(<td className={"td-" + isAvailable(output1, index, index2, output[index][index2], 1)}>&nbsp;</td>)
                    }
                    cRow.push(<tr>{cColumn}</tr>);
                }
                cTable.push(<div> <span className="color-content">Shortest possible path :{indexT + 1}</span><br></br><table className="tableContent" border="1"><tbody>{cRow}</tbody></table></div>);
            }
            if (!cTable || cTable.length <= 0) {
                cTable.push(<div>Oops ..! no possible path</div>)
            }
        }
    }
    function isAvailable(elementArr, row, column, value, type) {
        for (let index = 0; index < elementArr.length; index++) {
            if (elementArr[index].row === row && elementArr[index].column === column) {
                if (type == 1) {
                    return 3
                } else {
                    return 4;
                }
            }
        }
        return value
    }
    function handleChange(event) {
        console.log(textInput.current.value);
        setCount(textInput.current.value);
    }
    return (
        <div className="mainContainer">
            Enter matrix size
            <input ref={textInput} type="number" min="2" max="100" />
            Generated matrix
            <button className="btn" onClick={handleChange}>Generate matrix</button>
            <table className="tableContent" border="1">
                <tbody>
                    {mRow}
                </tbody>
            </table>
            <b>Possible path details</b>
            {pTable}
            <br ></br>
            <br ></br>
            <br ></br>
            <b>Possible shortest path details</b>
            {cTable}
        </div>)
}

export default PuzzleContent;