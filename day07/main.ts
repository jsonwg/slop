const solve = (input, part) => {
  const calibrations = new Set();
  for (const row of input) {
    const target = row[0];
    let possibilities = [row[1]];
    for (let i = 2; i < row.length; i++) {
      const add = possibilities.map(x => x + row[i]);
      const mul = possibilities.map(x => x * row[i]);
      const con = part === 2 ? possibilities.map(x => Number(String(x) + String(row[i]))) : [];
      possibilities = [...add, ...mul, ...con];
    }
    possibilities.filter(x => x === target).forEach(x => calibrations.add(x));
  }
  return Array.from(calibrations).reduce((sum, curr) => sum +  curr);
}

(async () => {
  const file = await Deno.readTextFile("input.txt");
  const sanitized = file.split("\n").map(s => s.split(" ")).map(a => a.map(x => Number(x.replace(/:/g, ""))));
  console.log("Part 1: " + solve(sanitized, 1));
  console.log("Part 2: " + solve(sanitized, 2));
})();
