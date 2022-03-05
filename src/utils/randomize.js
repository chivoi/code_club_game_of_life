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