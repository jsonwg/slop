const CARDINAL = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const CHEAT = [[2, 0], [-2, 0], [0, 2], [0, -2], [1, 1], [1, -1], [-1, 1], [-1, -1]];

const find = (grid, target) => {
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid.length; j++)
      if (grid[i][j] === target)
        return [i, j];
  return [-1, -1];
}

const distMap = (grid) => {
  const dist = new Map();
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid.length; j++)
      dist.set(i + " " + j, Number.MAX_VALUE);
  return dist;
}

const inBounds = (grid, i, j) => {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}

const valid = (grid, i, j) => {
  return inBounds(grid, i, j) && grid[i][j] !== "#";
}

const getNeighbors = (grid, pos, offs = CARDINAL) => {
  const [i, j] = pos;
  const neighbors = [];
  for (const off of offs) {
    const [di, dj] = off;
    const [ni, nj] = [i + di, j + dj];
    if (valid(grid, ni, nj))
      neighbors.push([ni, nj]);
  }
  return neighbors;
}

const djikshitra = (grid, start) => {
  const dists = distMap(grid);
  const visited = new Set();
  const pq = [];
  
  dists.set(start[0] + " " + start[1], 0);
  pq.push([0, start]);
  while (pq.length > 0) {
    pq.sort((a, b) => b[0] - a[0])
    const [dist, pos] = pq.pop();
    const [i, j] = pos;

    if (visited.has(i + " " + j))
      continue;

    visited.add(i + " " + j);
    for (const [ni, nj] of getNeighbors(grid, pos)) {
      const ndist = dists.get(ni + " " + nj);
      if (dist + 1 < ndist) {
        dists.set(ni + " " + nj, dist + 1);
        pq.push([dist + 1, [ni, nj]]);
      }
    }
  }
  
  return dists;
}

const coordWithin = (grid, start, max) => {
  const ends = [];
  const [i, j] = start;

  for (let di = -max; di <= max; di++) {
    for (let dj = -max; dj <= max; dj++) {
      const [ni, nj] = [i + di, j + dj];
      const dist = (Math.abs(di) + Math.abs(dj));
      if (dist <= 20 && valid(grid, ni, nj)) {
        ends.push([ni, nj, dist]);
      }
    }
  }
  
  return ends;
}

const cheat = (grid, start, dists) => {
  const queue = [];
  const cheats = [];
  const visited = new Set();
  
  queue.push(start)
  while (queue.length > 0) {
    const [i, j] = queue.shift();

    if (visited.has(i + " " + j)) 
      continue;

    for (const [ni, nj] of getNeighbors(grid, [i, j], CHEAT)) {
      cheats.push(dists.get(ni + " " + nj) - dists.get(i + " " + j) - 2);
    }

    visited.add(i + " " + j);
    for (const [ni, nj] of getNeighbors(grid, [i, j])) {
      queue.push([ni, nj]);
    }
  }

  return cheats;
}

const bigCheat = (grid, start, dists) => {
  const queue = [];
  const cheats = new Map();
  const visited = new Set();
  
  queue.push(start)
  while (queue.length > 0) {
    const [i, j] = queue.shift();

    if (visited.has(i + " " + j)) 
      continue;

    for (const [ni, nj, dist] of coordWithin(grid, [i, j], 20)) {
      const saved = dists.get(ni + " " + nj) - dists.get(i + " " + j) - dist;
      const curr = `${i} ${j} ${ni} ${nj}`;
      if (cheats.has(curr) && cheats.get(curr < saved))
        cheats.set(curr, saved);
      else
        cheats.set(curr, saved);
    }

    visited.add(i + " " + j);
    for (const [ni, nj] of getNeighbors(grid, [i, j])) {
      queue.push([ni, nj]);
    }
  }

  return [...cheats.values()];

}

const file = await Deno.readTextFile("input.txt");
const grid = file.trim().split("\n").map(r => r.split(""));

const end = find(grid, "E");
const start = find(grid, "S");
const dists = djikshitra(grid, end);

console.log(`Part 1: ${cheat(grid, end, dists).filter(x => x >= 100).length}`);
console.log(`Part 2: ${bigCheat(grid, end, djikshitra(grid, end)).filter(x => x >= 100).length}`);
