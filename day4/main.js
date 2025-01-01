const inBounds = (i, j, arr) => {
  return i >= 0 && i < arr.length && j >= 0 && j < arr[0].length;
}

const findXMAS = (i, j, arr) => {
  const U = [[i, j], [i - 1, j], [i - 2, j], [i - 3, j]];
  const D = [[i, j], [i + 1, j], [i + 2, j], [i + 3, j]];
  const L = [[i, j], [i, j - 1], [i, j - 2], [i, j - 3]];
  const R = [[i, j], [i, j + 1], [i, j + 2], [i, j + 3]];
  const UL = [[i, j], [i - 1, j - 1], [i - 2, j - 2], [i - 3, j - 3]];
  const UR = [[i, j], [i - 1, j + 1], [i - 2, j + 2], [i - 3, j + 3]];
  const DL = [[i, j], [i + 1, j - 1], [i + 2, j - 2], [i + 3, j - 3]];
  const DR = [[i, j], [i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3]];
  const DIRS = [U, D, L, R, UL, UR, DL, DR]
  let seen = 0;
  for (const dir of DIRS) {
    let word = ""
    for (const char of dir) {
      if (!inBounds(char[0], char[1], arr)) {
        break;
      }
      word += arr[char[0]][char[1]];
    }
    if (["XMAS", "SMAX"].includes(word)) {
      seen++;
    }
  }
  return seen;
}

const findMASX = (i, j, arr) => {
  const q1 = inBounds(i - 1, j + 1, arr) ? arr[i - 1][j + 1] : ".";
  const q2 = inBounds(i - 1, j - 1, arr) ? arr[i - 1][j - 1] : ".";
  const q3 = inBounds(i + 1, j - 1, arr) ? arr[i + 1][j - 1] : ".";
  const q4 = inBounds(i + 1, j + 1, arr) ? arr[i + 1][j + 1] : ".";

  if ([q1, q2, q3, q4].filter(c => c === "M" || c === "S").length !== 4)
    return 0;


  const c1 = q1 === q2 && q1 !== q3;
  const c2 = q1 === q4 && q1 !== q2;
  const c3 = q2 === q3;
  const c4 = q3 === q4;
  return Number(c1 && c4 || c2 && c3);
}

const file = await Deno.readTextFile("input.txt");
const input = file.trim().split("\n").map(a => a.split(""));
let xmasCount = 0;
let masxCount = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === "X") {
      xmasCount += findXMAS(i, j, input);
    } else if (input[i][j] === "A") {
      masxCount += findMASX(i, j, input);
    }
  }
}

console.log("Part 1:", xmasCount);
console.log("Part 2:", masxCount);
