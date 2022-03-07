export const ROW_SIZE = 40
export const COL_SIZE = 100
export const resetGrid = () => {
    let newCellData = {};

    for (const row of Array(ROW_SIZE).keys()) {
        for(const col of Array(COL_SIZE).keys()) {
            const top = [row - 1, col];
            const right = [row, col + 1];
            const bottom = [row + 1, col];
            const left = [row, col - 1];
            const topRight = [row - 1, col + 1];
            const bottomRight = [row + 1, col + 1];
            const bottomLeft = [row + 1, col - 1];
            const topLeft = [row - 1, col - 1];

            newCellData[[row,col]] = {
                neighbours: [top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft],
                isAlive: 0
            }
        }
    }

    return newCellData
}

export const getNeighbours = (neighbours, allCellData) => {
    return neighbours.map(neighbour => {
            if(allCellData[neighbour] !== undefined) {
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
    for (const [key, value] of Object.entries(allCellData)) {

        let shouldLive = value.isAlive

        if (key[0] !== 0 && key[0] !== ROW_SIZE - 1) {
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
        }

        allCellData[key] = {
            ...value,
            isAlive: shouldLive
        }
    }

    setAllCellData(allCellData)
}
