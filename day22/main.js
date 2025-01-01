const file = await Deno.readTextFile("input.txt");
const input = file.trim().split("\n").map(BigInt);

const secretNumber = (x, n) => {
  let nums = [];
  for (let i = 0; i < n; i++) {
    nums.push(x);
    let s1 = ((x * 64n) ^ x) % 16777216n;
    let s2 = ((s1 / 32n) ^ s1) % 16777216n;
    let s3 = ((s2 * 2048n) ^ s2) % 16777216n;
    x = s3;
  }
  return nums;
}

const getOnesPlace = (x) => {
  const s = String(x);
  return Number(s.charAt(s.length - 1));
}

const getDiffs = (arr) => {
  const diffs = [];
  for (let i = 0; i < arr.length - 1; i++) {
    diffs.push(arr[i + 1] - arr[i]);
  }
  return diffs;
}

const getSeqs = (diffs, prices, map) => {
  const seen = new Set();
  for (let i = 0; i < diffs.length - 3; i++) {
    let seq = "";
    for (let j = 0; j < 4; j++)
      seq += String(diffs[i + j]) + (j !== 3 ? "," : "");

    if (seen.has(seq))
      continue;
    
    seen.add(seq);
    if (map.has(seq)) {
      map.set(seq, map.get(seq) + prices[i + 4]);
    } else {
      map.set(seq, prices[i + 4]);
    }
  }
}

const nums = input.map(x => secretNumber(x, 2001));
const prices = nums.map(s => s.map(getOnesPlace));
const diffs = prices.map(getDiffs);
const seqPrices = new Map();

diffs.forEach((diff, i) => getSeqs(diff, prices[i], seqPrices));

console.log(`Part 1: ${input.map(x => secretNumber(x, 2001)[2000]).reduce((acc, curr) => acc + curr)}`);
console.log(`Part 2: ${Math.max(...seqPrices.values())}`);

