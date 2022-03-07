export const clearGrid = () => {
    return new Array(40).fill(0).map(row => new Array(40).fill(0));
}

export const getNeighbours = ([row, col], grid) => {
    const top = [row - 1, col];
    const right = [row, col + 1];
    const bottom = [row + 1, col];
    const left = [row, col - 1];
    const topRight = [row - 1, col + 1];
    const bottomRight = [row + 1, col + 1];
    const bottomLeft = [row + 1, col - 1];
    const topLeft = [row - 1, col - 1];

    const neighbours = [top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft];

    return neighbours.map(neighbour => grid[neighbour[0]][neighbour[1]])
}


export const randomize = (grid) => {
    const randomCase = Math.round(Math.random());
    let newGrid;

    if (randomCase === 0) {
        // This fills in the whole rows
        newGrid = new Array(40)
            .fill(Math.round(Math.random()))
            .map(row => new Array(40)
                .fill(Math.round(Math.random())))
    } else {
        // This fills in random cell by cell
        newGrid = grid.map(row => row.map(item => item = Math.round(Math.random())));
    }

    return newGrid;
}