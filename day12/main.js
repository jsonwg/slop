const eq = (s1, s2) => {
  return s1.difference(s2).size === 0;
}

const exc = (set, arr) => {
  for (const c of arr) {
    if (set.has(c)) 
      return false;
  }
  return true;
}

const inc = (set, arr) => {
  for (const c of arr) {
    if (!set.has(c))
      return false;
  return true;
}

const inco = (set, arr) => {
  for (const c of arr) 
    if (set.has(c))
      return true;
  return false;
}

const inct = (set, arr) => {
  let n = 0
  for (const c of arr) 
    if (set.has(c))
      n++;
  return n > 1;
}

const inBounds = (grid, i, j) => {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}

const floodFillRegion = (grid, i, j, plot, seen) => {
  const stack = [];
  const plots = [];
  
  stack.push([i, j])
  while (stack.length > 0) {
    const [i, j] = stack.pop();

    if (!inBounds(grid, i, j) || grid[i][j] !== plot || seen.has(i + " " + j)) 
      continue;
    
    plots.push([i, j])
    seen.add(i + " " + j)
    stack.push([i + 1, j]);
    stack.push([i - 1, j]);
    stack.push([i, j + 1]);
    stack.push([i, j - 1]);
  }

  return plots
}

const findRegions = (grid) => {
  const seen = new Set();
  const regions = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (seen.has(i + " " + j))
        continue
      regions.push(floodFillRegion(grid, i, j, grid[i][j], seen));
    }
  }

  return regions;
}

const findPerimeter = (grid, i, j) => {
  const plot = grid[i][j];
  let perimeter = 4;
  for (const off of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
    const [di, dj] = off;
    const [ni, nj] = [i + di, j + dj];
    if (inBounds(grid, ni, nj) && grid[ni][nj] === plot)
      perimeter--;
  }
  return perimeter
}

const findSides = (grid, region) => {
  if (region.length < 3) 
    return 4;
    
  return region.map(r => findCorners(grid, r[0], r[1])).reduce((s, n) => s + n);
}

const findCorners = (grid, i, j) => {
  let nei = new Set();
  for (const off of [[0, 1, "E"], [1, 0, "S"], [0, -1, "W"], [-1, 0, "N"], [1, 1, "SE"], [1, -1, "SW"], [-1, 1, "NE"], [-1, -1, "NW"]]) {
    const [di, dj, d] = off;
    const [ni, nj] = [i + di, j + dj];
    if (inBounds(grid, ni, nj) && grid[ni][nj] === plot)
      nei.add(d);
  }

  if (nei.size === 1)
    return 2;
  else if (nei.size === 2) {
    if (eq(nei, new Set(["S", "N"]) || eq(nei, new Set(["E", "W"]))))
      return 0;
    else
      return 2;
  } else if (nei.size === 3) {
    if ((inc(nei, ["N", "S"] || inc (nei, ["E", "W"])) && inco(nei, ["NW", "NE", "SW", "SE"])))
      return 0;
    else if (inc(nei, ["N", "W", "NW"]) || inc(nei, ["N", "E", "NE"]) || inc(nei, ["S", "W", "SW"], inc(nei, ["S", "E", "SE"])))
      return 1;
    else //if ((inc(nei, ["N", "S"] && inco(nei, ["E", "W"])) || (inc(nei, ["E", "W"] && inco(nei, ["N", "S"])))))
      return 2;
  } else if (nei.size === 4) {
    if (inc(nei, ["N", "E", "S", "W"])) 
      return 4;
    else if ((inc(nei, ["N", "S"] || inc (nei, ["E", "W"])) && inct(nei, ["NW", "NE", "SW", "SE"])))
      return 0;
    else if ((inc(nei, ["N", "S", "W"] && inco(nei, ["NE", "SE"]))) || (inc(nei, ["N", "S", "E"] && inco(nei, ["NW", "SW"]))) || (inc(nei, ["E", "W", "N"] && inco(nei, ["SW", "SE"]))) || (nei, ["E", "W", "S"] && inco(nei, ["NW", "NE"])))
      return 2;
    else
      return 1;
  } else if (nei.size === 5) {
    if (inc(nei, ["N", "E", "S", "W"]))
      return 3;
    else if (exc(nei, ["S", "SE", "SW"] || exc(nei, ["W", "NW", "SW"])) || exc(nei, ["E", "NE", "SE"]) || exc("N", "NW", "NE"))
      return 0;
    else
      return 4;
    
  } else if (nei.size === 6) {
    
  } else if (nei.size === 7) {
    return 1;
  } else if (nei.size === 8) 
    return 0;
}

const file = await Deno.readTextFile("input.txt");
const input = file.trim().split("\n").map(r => r.split(""));

const regions = findRegions(input);
const p1 = regions.map(r => r.map(p => findPerimeter(input, p[0], p[1])).reduce((s, n) => s + n) * r.length).reduce((s, n) => s + n);
const test = regions.map(r => r.map(p => findPerimeter(input, p[0], p[1])).reduce((s, n) => s + n))
console.log(p1)
console.log(test)
