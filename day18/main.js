const createGrid = (x, y) => {
  const arr = [];
  for (let i = 0; i < y; i++) {
    const row = [];
    for (let j = 0; j < x; j++)
      row.push(1);
    arr.push(row);
  }
  return arr;
}

const inBounds = (grid, i, j) => {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}

const valid = (grid, i, j) => {
  return inBounds(grid, i, j) && grid[i][j];
}

const bfs = (grid, i, j) => {
  const queue = [];
  const paths = [];
  const visited = {};
  for (let r = 0; r < 71; r++)
    for (let c = 0; c < 71; c++)
      visited[r + " " + c] = new Set();
  
  queue.push([[i, j], [], "0 0"]);
  while (queue.length > 0) {
    const [[i, j], seen, last] = queue.shift();
    const coord = i + " " + j;
    if (!valid(grid, i, j) || visited[last].has(coord))
      continue;
    if (i === 70 && j === 70) 
      paths.push(seen.length);
    visited[last].add(coord)
    queue.push([[i + 1, j], [...seen, coord], coord]);
    queue.push([[i - 1, j], [...seen, coord], coord]);
    queue.push([[i, j + 1], [...seen, coord], coord]);
    queue.push([[i, j - 1], [...seen, coord], coord]);
  }

  return paths
}

const file = await Deno.readTextFile("input.txt");
const input = file.trim().split("\n").map(c => c.split(",").map(Number));
const grid = createGrid(71, 71);

for (let i = 0; i < 1024; i++)
  grid[input[i][1]][input[i][0]] = 0;

console.log("Part 1:", Math.min(...bfs(grid, 0, 0)));

for (let i = 1025; i < input.length; i++) {
  const grid = createGrid(71, 71);
  for (let j = 0; j < i; j++) 
    grid[input[j][0]][input[j][1]] = 0;
  if (bfs(grid, 0, 0).length === 0) {
    console.log("Part 2:", input[i - 1]);
    break;
  }
}

