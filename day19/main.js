const inFront = (sub, str) => {
  for (let i = 0; i < sub.length; i++)
    if (sub[i] != str[i])
      return false;
  return true;
}

const find = (patterns, towels) => {
  const seen = new Map();
  const findHelper = (pattern, towels, seen) => {
    if (pattern === "")
      return 1;
    if (seen.has(pattern)) {
      return seen.get(pattern); 
    } else {
      let total = 0;
      for (const t of towels)
        if (inFront(t, pattern)) {
          const found = findHelper(pattern.substring(t.length), towels, seen);
          if (found)
            seen.set(pattern, (seen.get(pattern) ?? 0) + found);
          total += found;
        }
      return total;
    }
  }
  return patterns.map(p => findHelper(p, towels, seen));
}

const file = await Deno.readTextFile("input.txt");
const towels = file.split("\n")[0].split(", ").sort((a, b) => b.length - a.length);
const patterns = file.split("\n").slice(2, -1);
const found = find(patterns, towels);

console.log(`Part 1: ${found.filter(x => x).length}`);
console.log(`Part 2: ${found.reduce((s, n) => s + n)}`);
