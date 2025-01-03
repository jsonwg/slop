const sameSign = (x, y) => {
  return x * y >= 0;
}

const inBound = (x) => {
  return Math.abs(x) > 0 && Math.abs(x) < 4;
}

const generateSubArrays = (arr) => {
  const subArrs = [arr];
  for (let i = 0; i < arr.length; i++) {
    let subArr = [...arr]
    subArr.splice(i, 1)
    subArrs.push(subArr);
  }
  return subArrs;
}

const safetyCheck = (arr) => {
  const dir = arr[0] - arr[1];

  if (!inBound(dir))
    return false;

  let last = arr[1];

  for (let i = 2; i < arr.length; i++) {
    let diff = last - arr[i];

    if (!sameSign(diff, dir))
      return false;
    if (!inBound(diff)) 
      return false;

    last = arr[i];
  }
  return true;
}

(async () => {
  const file = await Deno.readTextFile("input.txt");
  const input = file.trim().split("\n").map(a => a.split(" ").map(Number));

  console.log("Part 1: " + input.filter(safetyCheck).length);
  console.log("Part 2: " + input.filter(a => generateSubArrays(a).filter(safetyCheck).reduce((prev, curr) => prev || curr, false)).length);
})();
