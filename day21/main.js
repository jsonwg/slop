const A = "A"
const U = "^"
const D = "v"
const L = "<"
const R = ">"

const ADJ = {
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

const MA = {
  A: [[]],
  [U]: [[L]],
  [D]: [[L, D], [D, L]],
  [L]: [[D, L, L]],
  [R]: [[D]],
};

const MU = {
  A: [[R]],
  [U]: [[]],
  [D]: [[D]],
  [L]: [[D, L]],
  [R]: [[R, D], [D, R]],
};

const MD = {
  A: [[R, U], [U, R]],
  [U]: [[U]],
  [D]: [[]],
  [L]: [[L]],
  [R]: [[R]],
};

const ML = {
  A: [[R, R, U]],
  [U]: [[R, U]],
  [D]: [[R]],
  [L]: [[]],
  [R]: [[R, R]],
};

const MR = {
  A: [[U]],
  [U]: [[L, U], [U, L]],
  [D]: [[L]],
  [L]: [[L, L]],
  [R]: [[]],
};

const M = {
  A: MA,
  [U]: MU,
  [D]: MD,
  [L]: ML,
  [R]: MR,
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
      for (const k of ADJ[curr[0]]) {
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

const subSeqs = (seq) => {
  const seqs = []
  let buffer = ""
  for (const k of seq) {
    buffer += k;
    if (k === A) {
      seqs.push(buffer);
      buffer = "";
    }
  }
  return seqs;
}

const expand = (s) => {
  let start = A;
  let exp = [""]
  for (const c of s) {
    exp = exp.flatMap(x => M[start][c].map(p => x + p.join("") + A));
    start = c;
  }
  return exp;
}

const minSeq = (s, n) => {
  if (n === 0) {
    return s.length;
  } 
  
  const id = JSON.stringify([s, n]);

  if (minSeq.cache.has(id)) {
    return minSeq.cache.get(id)
  }

  const min = Math.min(...expand(s).map(e =>subSeqs(e).map(s => minSeq(s, n - 1)).reduce((s, n) => s + n)));

  minSeq.cache.set(id, min)
  return min;
}

const file = await Deno.readTextFile("input.txt"); 
const input = file.trim().split("\n");
const keys = input.map(c => c.split("").map(x => x !== A ? Number(x) : x));
const layer0 = keys.map(keySeq)
minSeq.cache = new Map();

console.log("Part 1", layer0.map(seq => Math.min(...seq.map(ss => minSeq(ss, 2)))).map((x, i) => x * Number(input[i].split("A")[0])).reduce((s, n) => s + n));
console.log("Part 2", layer0.map(seq => Math.min(...seq.map(ss => minSeq(ss, 25)))).map((x, i) => x * Number(input[i].split("A")[0])).reduce((s, n) => s + n));

