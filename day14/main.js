const WIDTH = 101;
const HEIGHT = 103;
const HWIDTH = Math.floor(WIDTH / 2);
const HHEIGHT = Math.floor(HEIGHT / 2);

const inBounds = (i, j, arr) => {
  return i >= 0 && i < arr.length && j >= 0 && j < arr[0].length;
}

const findColumn = (arr, height) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === "*") {
        let found = true;
        for (let k = 0; k < height; k++) {
          if (inBounds(i + k, j, arr) && arr[i + k][j] !== "*") {
            found = false;
            break; 
          } else if (!inBounds(i + k, j, arr)){
            found = false;
          }
        }
        if (found)
          return found;
      }
    }
  }
  return false;
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

const ffw = (x, y, dx, dy, s) => {
  return [floorMod(x + dx * s, WIDTH), floorMod(y + dy * s, HEIGHT)];
}

const floorMod = (x, y) => {
  return x - Math.floor(x / y) * y;
}

const getQuad = (x, y) => {
  if (x < HWIDTH && y < HHEIGHT)
    return 0;
  if (x > HWIDTH && y < HHEIGHT)
    return 1;
  if (x > HWIDTH && y > HHEIGHT)
    return 2;
  return 3;
}

const score = (arr) => {
  const quads = [0, 0, 0, 0];
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      if (i === HHEIGHT || j === HWIDTH) {
        continue;
      }
      if (arr[i][j] != 0)
      quads[getQuad(j, i)] += arr[i][j];
    }
  }
  //quads.forEach(console.log)
  return quads.reduce((acc, curr) => acc * curr);
}

const buildGridD = (arr) => {
  for (let i = 0; i < HEIGHT; i++) {
    const row = Array(WIDTH);
    for (let j = 0; j < WIDTH; j++)
      row[j] = " ";
    arr[i] = row;
  }
}

const buildGrid = (arr) => {
  for (let i = 0; i < HEIGHT; i++) {
    const row = Array(WIDTH);
    for (let j = 0; j < WIDTH; j++)
      row[j] = 0;
    arr[i] = row;
  }
}

(async () => {
  const file = await Deno.readTextFile("input.txt");
  console.log(file.trim().split("\n").length);
  const re = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/g;
  const grid = Array(HEIGHT);
  buildGrid(grid);
  file.matchAll(re).map(s => s.splice(1, 5).map(Number)).map(i => ffw(i[0], i[1], i[2], i[3], 100)).forEach(v => grid[v[1]][v[0]]++);
  console.log(score(grid));
  const foo = Array.from(file.matchAll(re).map(s => s.splice(1, 5).map(Number)));
  const shit = new Set();
  for (let s = 0; s < 10404; s++) {
    buildGridD(grid);
    foo.map(i => ffw(i[0], i[1], i[2], i[3], s)).forEach(v => grid[v[1]][v[0]] = "*");
    const a = produceStr(grid);
    if (findColumn(grid, 10)) {
      //shit.add(a);
      await Deno.writeTextFile("answer.txt", a + "\nDay " + s, {append:true})
    }
    //await Deno.writeTextFile("je.txt", a + "\nDay " + s, {append:true})
  }
  console.log(shit.size)
})();
