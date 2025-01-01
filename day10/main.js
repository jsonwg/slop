const get = (map, i, j) => {
  return inBounds(map, i, j) ? map[i][j] : null;
};

const inBounds = (map, i, j) => {
  return i >= 0 && i < map.length && j >= 0 && j < map[0].length;
};

const findTrails = (map, curr, last, i, j) => {
  if (curr - last !== 1 || curr === null)
    return 0;
  if (curr === 9)
    return 1;
  return findTrails(map, get(map, i + 1, j), curr, i + 1, j) +
    findTrails(map, get(map, i - 1, j), curr, i - 1, j) +
    findTrails(map, get(map, i, j + 1), curr, i, j + 1) +
    findTrails(map, get(map, i, j - 1), curr, i, j - 1);
};

const findPaths = (map, curr, last, i, j) => {
  return findPathsHelper(map, curr, last, i, j, new Set());
}

const findPathsHelper = (map, curr, last, i, j, cache) => {
  if (curr - last !== 1 || curr === null) 
    return 0;
  if (curr === 9 && !cache.has(i + "" + j)) {
    cache.add(i + "" + j);
    return 1;
  }
  return findPathsHelper(map, get(map, i + 1, j), curr, i + 1, j, cache) +
    findPathsHelper(map, get(map, i - 1, j), curr, i - 1, j, cache) +
    findPathsHelper(map, get(map, i, j + 1), curr, i, j + 1, cache) +
    findPathsHelper(map, get(map, i, j - 1), curr, i, j - 1, cache);
};

const file = await Deno.readTextFile("input.txt");
const map = file.trim().split("\n").map((r) => r.split("").map(Number));
const starts = map.flatMap((r, i) => r.map((c, j) => c === 0 ? { i, j } : 0)).filter((x) => x);

console.log("Part 1", starts.map(s => findPaths(map, 0, -1, s.i, s.j)).reduce((s, n) => s + n))
console.log("Part 2", starts.map(s => findTrails(map, 0, -1, s.i, s.j)).reduce((s, n) => s + n))

