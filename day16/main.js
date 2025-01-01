import util from "node:util"; 

const N = 0;
const E = 1;
const S = 2;
const W = 3;

const TURN = {
  [N]: {
    [N]: 0,
    [E]: 1,
    [S]: 2,
    [W]: 1,
  },
  [E]: {
    [N]: 1,
    [E]: 0,
    [S]: 1,
    [W]: 2,
  },
  [S]: {
    [N]: 2,
    [E]: 1,
    [S]: 0,
    [W]: 1,
  },
  [W]: {
    [N]: 1,
    [E]: 2,
    [S]: 1,
    [W]: 0,
  }
}

const inBounds = (grid, i, j) => {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}

const validPos = (grid, i, j) => {
  return inBounds(grid, i, j) && grid[i][j] !== "#";
}

const scoreFromDirs = (dirs) => {
  const walked = dirs.length - 1;
  let changes = 0;
  for (let i = 0; i < dirs.length - 1; i++) {
    console.log(TURN[dirs[i]][dirs[i + 1]])
    changes += TURN[dirs[i]][dirs[i + 1]]
  }
  console.log(dirs.length)
  return changes * 1000 + walked;
}

const bfs = (grid, i, j, dir) => {
  const queue = [];
  const paths = [];
  const visited = {};
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < grid[0].length; c++)
      visited[r + " " + c] = new Set();
  console.log(visited)

  queue.push([[i, j], [dir], i + " " + j, []]);
  while (queue.length > 0) {
    const [[i, j], dirs, last, seen] = queue.shift();
    const coord = i + " " + j;
    if (!validPos(grid, i, j) || visited[last].has(coord))
      continue;
    if (grid[i][j] === "E") {
      paths.push([dirs, seen]);
    } else {
      visited[last].add(coord)
      queue.push([[i - 1, j], [...dirs, N], coord, [...seen, coord]]);
      queue.push([[i, j + 1], [...dirs, E], coord, [...seen, coord]]);
      queue.push([[i + 1, j], [...dirs, S], coord, [...seen, coord]]);
      queue.push([[i, j - 1], [...dirs, W], coord, [...seen, coord]]);
    }
  }

  return paths
}

const navigate = (grid, i, j, dir) => {
  const navigateHelper = (grid, i, j, dir, score, dirs, scores, seen) => {
    if (!validPos(grid, i, j)) {
      return;
    }
    if (seen.has(i + " " + j)) {
      return;
    }
    if (grid[i][j] === "E") {
      console.log(dirs)
      console.log(dirs.length)
      return scores.push(score);
    }

    if (i === 5 && j === 2) 
      console.log(dirs)

    seen.add(i + " " + j);

    navigateHelper(grid, i - 1, j, N, score + 1 + TURN[dir][N] * 1000, [...dirs, dir], scores, seen);
    navigateHelper(grid, i, j + 1, E, score + 1 + TURN[dir][E] * 1000, [...dirs, dir], scores, seen);
    navigateHelper(grid, i + 1, j, S, score + 1 + TURN[dir][S] * 1000, [...dirs, dir], scores, seen);
    navigateHelper(grid, i, j - 1, W, score + 1 + TURN[dir][W] * 1000, [...dirs, dir], scores, seen);
  }

  const scores = [];
  const seen = new Set();
  navigateHelper(grid, i, j, dir, 0, [], scores, seen);
  seen.forEach(s => {
    const c = s.split(" ");
    grid[Number(c[0])][Number(c[1])] = "@"
  })
  return scores;
}

 
const produceStr = (arr) => {
  let pic = "";
  for (const row of arr) {
    for (const c of row)
      pic += c;
    pic += "\n"
  }
  return pic;
}

const getNeighborDist = (grid, i, j, dir) => {
  const neighbors = [];
  for (const off of [[-1, 0, N], [0, 1, E], [1, 0, S], [0, -1, W]]) {
    const [di, dj, d] = off;
    const [ni, nj] = [i + di, j + dj];
    if (validPos(grid, ni, nj)) 
      neighbors.push([TURN[dir][d] * 1000 + 1, ni, nj, d]);
  }
  return neighbors
}

const dfs = (grid, start, dir, end, maxDist) => {
  const stack = []
  const paths = []
  
  stack.push([0, start, dir, [start[0] + " " + start[1]], new Set()])
  while (stack.length > 0) {
    const [dist, [i, j], dir, path, seen] = stack.pop();
    const pos = i + " " + j;

    if (seen.has(pos) || dist > maxDist)
      continue;

    if (i === end[0] && j === end[1]) {
      paths.push(path);
      continue;
    }

    seen.add(pos)
    for (const [neiDist, neiI, neiJ, neiDir] of getNeighborDist(grid, i, j, dir)) {
      const newDist = neiDist + dist;
      const newPath = [...path, neiI + " " + neiJ];
      stack.push([newDist, [neiI, neiJ], neiDir, newPath, new Set(seen)])
    }
  }

  return paths;
}

const file = await Deno.readTextFile("smallest_input.txt");
const grid = file.trim().split("\n").map(s => s.split(""));
const start = grid.flatMap((r, i) => r.map((c, j) => c === "S" ? { i, j } : null)).filter(x => x)[0];
const end = grid.flatMap((r, i) => r.map((c, j) => c === "E" ? { i, j } : null)).filter(x => x)[0];

//console.log(dfs(grid, [start.i, start.j], E, [end.i, end.j], 11048))
//console.log(new Set(dfs(grid, [start.i, start.j], E, [end.i, end.j], 7036).flatMap(x => x)));
console.log(new Set(dfs(grid, [start.i, start.j], E, [end.i, end.j], 11048).flatMap(x => x)).size);

//console.log(start)
//console.log(produceStr(grid))
//console.log(bfs())
//console.log(produceStr(grid))
//console.log(util.inspect(bfs(grid, start.i, start.j, E), { maxArrayLength: null }));
//const [[dirs, seen]] = bfs(grid, start.i, start.j, E);
//console.log(scoreFromDirs(dirs));

//seen.forEach(s => {
  //const c = s.split(" ");
  //grid[Number(c[0])][Number(c[1])] = "@"
//})

//console.log(produceStr(grid))
//console.log(scoreFromDirs(dirs))
//console.log(seen.length)
