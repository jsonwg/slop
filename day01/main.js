console.log("Part 1: " + (await Deno.readTextFile("input.txt")).trim().split("\n").map(s => s.split("   ").map(Number)).reduce((a, p) => [[...a[0], p[0]], [...a[1], p[1]]], [[], []]).map(a => a.sort()).reduce((a, p) => p.map((n, i) => Math.abs(a[i] - n))).reduce((s, n) => s + n))

const file = await Deno.readTextFile("input.txt");
const input = file.trim().split("\n").map(s => s.split("   ").map(Number)).reduce((a, p) => [[...a[0], p[0]], [...a[1], p[1]]], [[], []]);
const grubbah = {};
let sum = 0;
for (const x of input[1]) {
  grubbah[x] = (grubbah[x] || 0) + 1;
}
for (const x of input[0]) {
  sum += (grubbah[x] || 0) * x;
}
console.log("Part 2 " + sum);
