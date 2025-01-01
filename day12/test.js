const stupidHas = (region, i, j) => {
  for (const [ri, rj] of region)
    if (ri === i && rj === j)
      return true;
  return false;
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
  return region.map(r => findCorners(grid, r[0], r[1], region)).reduce((s, n) => s + n);
}

const findCorners = (grid, i, j, region) => {
  let corners = 0;
  let nei = new Set();
  for (const off of [[0, 1, "E"], [1, 0, "S"], [0, -1, "W"], [-1, 0, "N"], [1, 1, "SE"], [1, -1, "SW"], [-1, 1, "NE"], [-1, -1, "NW"]]) {
    const [di, dj, d] = off;
    const [ni, nj] = [i + di, j + dj];
    if (inBounds(grid, ni, nj) && stupidHas(region, ni, nj))
      nei.add(d);
  }

  if (nei.has("N") && nei.has("W") && !nei.has("NW"))
    corners++;
  if (nei.has("N") && nei.has("E") && !nei.has("NE"))
    corners++;
  if (nei.has("S") && nei.has("W") && !nei.has("SW"))
    corners++;
  if (nei.has("S") && nei.has("E") && !nei.has("SE"))
    corners++;
  if (!nei.has("N") && !nei.has("W"))
    corners++;
  if (!nei.has("N") && !nei.has("E"))
    corners++;
  if (!nei.has("S") && !nei.has("W"))
    corners++;
  if (!nei.has("S") && !nei.has("E"))
    corners++;

  return corners;
}

const file = await Deno.readTextFile("input.txt");
const input = file.trim().split("\n").map(r => r.split(""));

const regions = findRegions(input);
const p1 = regions.flatMap(r => r.map(p => findPerimeter(input, p[0], p[1]) * r.length)).reduce((s, n) => s + n);
const p2 = regions.flatMap(r => findSides(input, r) * r.length).reduce((s, n) => s + n);

console.log(`Part 1: ${p1}`);
console.log(`Part 2: ${p2}`);
