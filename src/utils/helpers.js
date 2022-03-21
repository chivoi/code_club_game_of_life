export const ROW_SIZE = 20
export const COL_SIZE = 40
export const resetGrid = () => {
    let newCellData = {};

    for (const row of Array(ROW_SIZE).keys()) {
        for (const col of Array(COL_SIZE).keys()) {
            const top = [row - 1, col];
            const right = [row, col + 1];
            const bottom = [row + 1, col];
            const left = [row, col - 1];
            const topRight = [row - 1, col + 1];
            const bottomRight = [row + 1, col + 1];
            const bottomLeft = [row + 1, col - 1];
            const topLeft = [row - 1, col - 1];

            let neighbours = [top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft]

            let valuesToRemove = new Set()

            if (row - 1 < 0) {
                valuesToRemove.add(top)
                valuesToRemove.add(topLeft)
                valuesToRemove.add(topRight)
            }

            if (row + 1 >= ROW_SIZE) {
                valuesToRemove.add(bottom)
                valuesToRemove.add(bottomLeft)
                valuesToRemove.add(bottomRight)
            }

            if (col - 1 < 0) {
                valuesToRemove.add(left)
                valuesToRemove.add(topLeft)
                valuesToRemove.add(bottomLeft)
            }

            if (col + 1 >= COL_SIZE) {
                valuesToRemove.add(right)
                valuesToRemove.add(topRight)
                valuesToRemove.add(bottomRight)
            }

            neighbours = neighbours.filter((i) => !Array.from(valuesToRemove).includes(i))

            newCellData[[row, col]] = {
                row: row,
                col: col,
                neighbours: neighbours,
                isAlive: 0,
                numLiveNeighbours: 0,
            }
        }
    }

    return newCellData
}

export const getNeighbours = (neighbours, allCellData) => {
    return neighbours.map(neighbour => {
        if (allCellData[neighbour] !== undefined) {
            return allCellData[neighbour].isAlive
        }
        return 0
    }
    )
}


export const randomize = (allCellData) => {
    let newCellData = {};

    for (const [key, value] of Object.entries(allCellData)) {
        newCellData[key] = {
            ...value,
            isAlive: Math.round(Math.random())
        }
    }

    return newCellData;
}

export const calculateNextState = (allCellData, setAllCellData) => {
    // Only compute for live cells
    const liveCellCoords = Object.entries(allCellData).filter(([_key, val]) => val.isAlive);
    const cellsToEvaluate = [...liveCellCoords.map(([coord, cellData]) => [[[cellData.row, cellData.col], cellData], ...cellData.neighbours.map((neighbourCoord) => [neighbourCoord, allCellData[neighbourCoord]])])].flat()

    for (const [key, value] of cellsToEvaluate) {

        let shouldLive = value.isAlive

        const numLiveNeighbours = getNeighbours(value.neighbours, allCellData).filter((cell) => cell === 1).length

        if (value.isAlive) {
            if (!(numLiveNeighbours === 2 || numLiveNeighbours === 3)) {
                shouldLive = 0
            }
        } else {
            if (numLiveNeighbours === 3) {
                shouldLive = 1
            }
        }

        allCellData[key] = {
            ...value,
            isAlive: shouldLive
        }
    }

    setAllCellData(allCellData)
}
