const A = "A"
const U = "^"
const D = "v"
const L = "<"
const R = ">"

const adj = {
  0: [[A, R], [2, U]],
  1: [[2, R], [4, U]],
  2: [[1, L], [3, R], [5, U], [0, D]],
  3: [[2, L], [6, U], [A, D]],
  4: [[5, R], [7, U], [1, D]],
  5: [[4, L], [6, R], [8, U], [2, D]],
  6: [[5, L], [9, U], [3, D]],
  7: [[8, R], [4, D]],
  8: [[7, L], [9, R], [5, D]],
  9: [[8, L], [6, D]],
  A: [[0, L], [3, U]],
}

const mA = {
  A: [[]],
  [U]: [[L]],
  [D]: [[L, D], [D, L]],
  [L]: [[D, L, L], [L, L, D]],
  [R]: [[D]],
};

const mU = {
  A: [[R]],
  [U]: [[]],
  [D]: [[D]],
  [L]: [[L, D], [D, L]],
  [R]: [[R, D], [D, R]],
};

const mD = {
  A: [[R, U], [U, R]],
  [U]: [[U]],
  [D]: [[]],
  [L]: [[L]],
  [R]: [[R]],
};

const mL = {
  A: [[R, R, U], [U, R, R]],
  [U]: [[R, U], [U, R]],
  [D]: [[R]],
  [L]: [[]],
  [R]: [[R, R]],
};

const mR = {
  A: [[U]],
  [U]: [[L, U], [U, L]],
  [D]: [[L]],
  [L]: [[L, L]],
  [R]: [[]],
};

const m = {
  A: mA,
  [U]: mU,
  [D]: mD,
  [L]: mL,
  [R]: mR,
}

const keyBFS = (start, target) => {
  const queue = [];
  const paths = [];
  const seen = new Set()

  queue.push([start, ""]);
  while (queue.length > 0) {
    const curr = queue.shift(); 
    if (curr[0] === target) {
      paths.push(curr[1] + A);
    } else {
      for (const k of adj[curr[0]]) {
        if (!seen.has(k[0])) {
          queue.push([k[0], curr[1] + k[1]])
        }
      }
    }
    seen.add(curr[0]);
  }
  return paths;
}

const keySeq = (input) => {
  let start = A;
  let paths = [""];
  for (const c of input) {
    paths = paths.flatMap(x => keyBFS(start, c).map(y => x + y))
    start = c;
  }
  return paths;
}

const expand = (s) => {
  let start = A;
  let exp = [""]
  for (const c of s) {
    exp = exp.flatMap(x => m[start][c].map(p => x + p.join("") + A));
    start = c;
  }
  return exp;
}

let dumb = new Map();

const rec = (s, n) => {
  if (n === 0) {
    console.log(s)
    return s.length;
  } else if (dumb.has(JSON.stringify([s, n]))) {
    return dumb.get(JSON.stringify([s, n]))
  }

  const e = expand(s);
  const min = minLen(e.map(s =>s.split(A).map(s => rec(s + A, n -1))));
  dumb.set(JSON.stringify([s, n]), min)
  return min;
}

const filterExpand = (s) => {
  let start = A;
  let exp = [""]
  for (const c of s) {
    exp = exp.flatMap(x => m[start][c].map(p => x + p.join("") + A));
    start = c;
  }
  return minLen(exp);
}

const minLen = (arr) => {
  let min = Number.MAX_VALUE;
  for (const e of arr) {
    if (e.length < min) {
      min = e.length;
    }
  }
  return min;
}

const file = await Deno.readTextFile("input.txt"); 
const input = file.trim().split("\n");
//const keys = input.map(c => c.split("").map(x => x !== A ? Number(x) : x));
//const layer0 = keys.map(keySeq)
rec("<A", 20)
dumb.values().forEach(console.log)
//const d2 = layer0.map(r => Math.min.apply(null, r.flatMap(expand).flatMap(filterExpand))).map((x, i) => x * Number(input[i].split("A")[0])).reduce((s, n) => s + n);
//console.log("Part 1", d2)
