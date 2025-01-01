type Coordinate = [number, number];
enum Direction {
  N,
  E,
  S,
  W,
}

const CYCLE_DIR: { [key in Direction] } = {
  [Direction.N]: Direction.E,
  [Direction.E]: Direction.S,
  [Direction.S]: Direction.W,
  [Direction.W]: Direction.N,
};

const findGuard = (grid: string[][]): Coordinate => {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      if (grid[x][y] === "^") {
        return [x, y];
      }
    }
  }
  return [-1, -1];
};

const getTile = (grid: string[][], pos: Coordinate): string => {
  return grid[pos[0]][pos[1]];
}

const setTile = (grid: string[][], pos: Coordinate, tile: string) => {
  grid[pos[0]][pos[1]] = tile;
}

const inBounds = (grid: string[][], pos: Coordinate): boolean => {
  return pos[0] >= 0 && pos[0] < grid.length && pos[1] >= 0 &&
    pos[1] < grid[0].length;
};

const nextPos = (pos: Coordinate, dir: Direction): Coordinate => {
  if (dir === Direction.N) {
    return [pos[0] - 1, pos[1]];
  } else if (dir === Direction.E) {
    return [pos[0], pos[1] + 1];
  } else if (dir === Direction.S) {
    return [pos[0] + 1, pos[1]];
  } else {
    return [pos[0], pos[1] - 1];
  }
};

const navigate = (grid: string[][], start: Coordinate): number => {
  let dir: Direction = Direction.N;
  let count: number = 0;
  let pos: Coordinate = start;
  let next: Coordinate = [-1, -1];

  while (inBounds(grid, pos)) {
    count += getTile(grid, pos) === "X" ? 0 : 1;

    next = nextPos(pos, dir);
    while (inBounds(grid, next) && getTile(grid, next) === "#") {
      dir = CYCLE_DIR[dir];
      next = nextPos(pos, dir);
    }

    setTile(grid, pos, "X");
    pos = next;
  }

  return count;
};

const f = (grid: string[][], start: Coordinate): number => {
  let count: number = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      if (grid[x][y] === "^" || grid[x][y] === "#") continue;

      grid[x][y] = "#";

      let dir: Direction = Direction.N;
      let pos: Coordinate = start;
      let next: Coordinate = [-1, -1];
      let anchor: Coordinate = pos;
      const edges: Set<string> = new Set();

      while (inBounds(grid, pos)) {
        next = nextPos(pos, dir);
        if (inBounds(grid, next) && getTile(grid, next) === "#") {
          if (edges.has(JSON.stringify([anchor, pos]))) {
            count++;
            break;
          }

          edges.add(JSON.stringify([anchor, pos]));
          dir = CYCLE_DIR[dir];
          anchor = pos;
        } else {
          pos = next;
        }
      }

      grid[x][y] = ".";
    }
  }

  return count;
};

(async () => {
  const grid: string[][] = (await Deno.readTextFile("input.txt")).split("\n").map((row: string) => row.split);
  const pos: Coordinate = findGuard(grid);
  console.log("Part 1 " + navigate(grid, pos));
  console.log("Part 2 " + f(grid, pos));
})();
