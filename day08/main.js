const findAntennas = (grid) => {
  const antennas = new Map();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const tile = grid[i][j];
      if (tile !== ".") {
        if (antennas.has(tile)) {
          antennas.get(tile).push([i, j]); 
        } else {
          antennas.set(tile, [[i, j]]);
        }
      }
    }
  }
  return antennas;
}

const inBounds = (grid, i, j) => {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}

const findAnti = (grid, antennas) => {
  const anti = new Set();
  for (const v of antennas.values()) {
    for (const [i, j] of v) {
      for (const [k, l] of v) {
        if (i !== k && j !== l) {
          const [ai, aj] = [k - (i - k), l - (j - l)];
          if (inBounds(grid, ai, aj))
            anti.add(ai + " " + aj);
        }
      }
    }
  }
  return anti.size;
}

const findAllAnti = (grid, antennas) => {
  const anti = new Set();
  for (const v of antennas.values()) {
    for (const [i, j] of v) {
      for (const [k, l] of v) {
        if (i !== k && j !== l) {
          const [di, dj] = [i - k, j - l];
          let [ai, aj] = [k - di, l - dj];
          anti.add(k + " " + l);
          while (inBounds(grid, ai, aj)) {
            anti.add(ai + " " + aj);
            [ai, aj] = [ai - di, aj - dj];
          }
        }
      }
    }
  }
  return anti.size;
}

const file = await Deno.readTextFile("input.txt");
const input = file.trim().split("\n").map(r => r.split(""));

const antennas = findAntennas(input);
console.log(`Part 1: ${findAnti(input, antennas)}`);
console.log(`Part 2: ${findAllAnti(input, antennas)}`);
