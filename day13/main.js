import { lusolve, bignumber } from "mathjs"

const parseDigits = (str) => {
  const nums = [];
  let buffer = "";
  
  for (const c of str) {
    if (!"0123456789".includes(c)) {
      nums.push(Number(buffer));
      buffer = "";
    } else {
      buffer += c;
    }
  }

  return nums.filter(x => x);
}

const parseFile = (file) => {
  const parsed = [];
  let buffer = "";
  
  for (const row of file) {
    if (row === "") {
      parsed.push(parseDigits(buffer));
      buffer = "";
    } else {
      buffer += row + "\n";
    }
  }

  return parsed;
}

const findCheapest = (machine) => {
  const [dx1, dy1, dx2, dy2, x, y] = machine;
  let cost = Number.MAX_VALUE;

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const [cx, cy] = [dx1 * i + dx2 * j, dy1 * i + dy2 * j];
      if (cx === x && cy === y) {
        cost = Math.min(cost, i * 3 + j);
      }
    }
  }

  return cost;
}

const isInt = (x) => {
  return Math.floor(x) == x;
}

const solve = (machine) => {
  const [x1, y1, x2, y2, x, y] = machine.map(x => bignumber(x));
  const A = [[x1, x2], [y1, y2]];
  const b = [x, y];
  return lusolve(A, b)
}

const file = await Deno.readTextFile("input.txt");
const input = parseFile(file.split("\n"));
const fixed = input.map(m => [m[0], m[1], m[2], m[3], m[4] + 10000000000000, m[5] + 10000000000000]);

const p1 = input.map(findCheapest).filter(x => x !== Number.MAX_VALUE).reduce((s, n) => s + n);
const p2 = fixed.map(solve).map(m => [Number(m[0][0]), Number(m[1][0])]).filter(m => isInt(m[0]) && isInt(m[1])).reduce((s, n) => s + BigInt(n[0]) * 3n + BigInt(n[1]), 0n);

console.log(`Part 1: ${p1}`);
console.log(`Part 2: ${p2}`);

