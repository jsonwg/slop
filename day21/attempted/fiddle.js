const U = "U";
const D = "D";
const L = "L";
const R = "R";
const A = "A";

const mA = {
  A: [],
  U: [L],
  D: [L, D],
  L: [D, L, L],
  R: [D],
};

const mU = {
  A: [R],
  U: [],
  D: [D],
  L: [L, D],
  R: [R, D],
};

const mD = {
  A: [R, U],
  U: [U],
  D: [],
  L: [L],
  R: [R],
};

const mL = {
  A: [R, R, U],
  U: [R, U],
  D: [R],
  L: [],
  R: [R, R],
};

const mR = {
  A: [U],
  U: [L, U],
  D: [L],
  L: [L, L],
  R: [],
};

const m = {
  A: mA,
  U: mU,
  D: mD,
  L: mL,
  R: mR,
}

const file = await Deno.readTextFile("input.txt");

const input = [
  [L, U, U, A, U, R, A, D, D, A, D, A],
  [L, U, A, U, U, A, R, D, D, A, D, A],
  [U, U, A, L, L, U, A, R, D, D, D, A, R, A],
  [U, U, L, L, A, R, A, U, R, A, D, D, D, A],
  [L, U, A, L, U, U, A, R, R, A, D, D, D, A],
]

const example = [
  [L, A, U, A, U, U, R, A, D, D, D, A],
  [U, U, U, A, L, A, D, D, D, A, R, A],
  [U, A, L, L, U, U, A, R, R, A, D, D, D, A],
  [U, U, L, L, A, R, A, R, A, D, D, A],
  [U, A, L, L, U, U, A, R, R, A, D, D, D, A],
]

function foo(arr) {
  let next = [];
  let start = A;
  for (const d of arr) {
    next = [...next, ...m[start][d], A];
    start = d;
  }
  return next;
}
console.log(input.map(i => foo(foo(i)).length));
console.log(input.map(i => foo(foo(i)).length));

