const MOVES =  {
  "^": [-1, 0],
  "v": [1, 0],
  "<": [0, -1],
  ">": [0, 1],
};

const findRobot = (grid) => {
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++)
      if (grid[i][j] === "@")
        return [i, j];
  return [-1, -1];
}

const inBounds = (grid, i, j) => {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}

const valid = (grid, i, j ) => {
  return inBounds(grid, i, j) && grid[i][j] !== "#";
}

const swap = (grid, i, j, k, l) => {
  const tmp = grid[i][j];
  grid[i][j] = grid[k][l];
  grid[k][l] = tmp;
}

const deepCopy = (grid) => {
  const copy = [];
  for (const row of grid)
    copy.push([...row]);
  return copy;
}

const replace = (grid, other) => {
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++)
      grid[i][j] = other[i][j]
}

const canMove = (grid, i, j, di, dj) => {
  if (valid(grid, i, j)) {
    if (grid[i][j] === ".") {
      return true;
    } else {
      return move(grid, i, j, di, dj);
    }
  } else {
    return false;
  }
}

const move = (grid, i, j, di, dj) => {
  const [ni, nj] = [i + di, j + dj];

  if (canMove(grid, ni, nj, di, dj)) {
    swap(grid, i, j, ni, nj);
    return true;
  }
  return false;
}

const canBigMove = (grid, i, j, di, dj) => {
  if (valid(grid, i, j)) {
    if (grid[i][j] === ".") {
      return true;
    } else {
      return bigMove(grid, i, j, di, dj);
    }
  } 
  return false;
}

const bigMove = (grid, i, j, di, dj) => {
  const [ni, nj] = [i + di, j + dj];
  const copy = deepCopy(grid);

  if (valid(grid, ni, nj)) {
    if (grid[ni][nj] === "[" && dj === 0) {
      if (!canBigMove(grid, ni, nj, di, dj) || !canBigMove(grid, ni, nj + 1, di, dj)) {
        replace(grid, copy);
        return false;
      }
    } else if (grid[ni][nj] === "]" && dj === 0) {
      if (!canBigMove(grid, ni, nj - 1, di, dj) || !canBigMove(grid, ni, nj, di, dj)) {
        replace(grid, copy);
        return false;
      }
    } else if (!canBigMove(grid, ni, nj, di, dj)) {
      return false;
    }
  } else {
    return false;
  }

  swap(grid, i, j, ni, nj);
  return true;
}

const moveAll = (wh, dirs) => {
  let [i, j] = findRobot(wh);
  for (const d of dirs) {
    const [di, dj] = MOVES[d];
    if (move(wh, i, j, di, dj))
      [i, j] = [i + di, j + dj];
  }
}

const bigMoveAll = (wh, dirs) => {
  let [i, j] = findRobot(wh);
  for (const d of dirs) {
    const [di, dj] = MOVES[d];
    if (bigMove(wh, i, j, di, dj))
      [i, j] = [i + di, j + dj];
  }
}

const scoreWarehouse = (wh) => {
  let score = 0;
  for (let i = 0; i < wh.length; i++)
    for (let j = 0; j < wh[0].length; j++)
      if (wh[i][j] === "O" || wh[i][j] === "[")
        score += 100 * i + j;
  return score;
}

const expandWarehouse = (wh) => {
  return wh.map(r => r.flatMap(x => {
    switch (x) {
      case "#":
        return ["#", "#"];
      case "O":
        return ["[", "]"];
      case "@":
        return ["@", "."];
      default:
        return [".", "."];
    }
  }))
}

const whFile = await Deno.readTextFile("map.txt");
const dirsFile = await Deno.readTextFile("dirs.txt");

const wh = whFile.trim().split("\n").map(r => r.split(""));
const expanded = expandWarehouse(wh);
const dirs = dirsFile.trim().split("\n").reduce((s, ss) => s + ss);

moveAll(wh, dirs)
console.log(`Part 1: ${scoreWarehouse(wh)}`);
bigMoveAll(expanded, dirs)
console.log(`Part 2: ${scoreWarehouse(expanded)}`);

