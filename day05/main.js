const correctOrder = (a, b) => {
  const rule = adj.get(b);
  if (rule === undefined)
    return true;

  return !rule.includes(a);
}

const topSort = (o) => {
  const rules = o.map(u => adj.get(u)).filter(u => u);
  const copy = [...o];
  copy.sort((a, b) => rules.filter(r => r.includes(a)).length - rules.filter(r => r.includes(b)).length);
  return copy;
}

const validOrdering = (o) => {
  for (let i = 0; i < o.length; i++) {
    for (let j = i + 1; j < o.length; j++) {
      if (!correctOrder(o[i], o[j])) {
        return false;
      }
    }
  }
  return true;
}

const file = await Deno.readTextFile("input.txt");
const input = file.trim().split("\n");
const rules = input.filter(r => r.includes("|")).map(r => r.split("|").map(Number));
const orderings = input.filter(o => o.includes(",")).map(o => o.split(",").map(Number));
const adj = new Map();
rules.forEach(pair => adj.set(pair[0], []));
rules.forEach(pair => adj.get(pair[0]).push(pair[1]));

console.log("Part 1", orderings.filter(validOrdering).map(v => v[Math.floor(v.length / 2)]).reduce((s, n) => s + n));
console.log("Part 2", orderings.filter(o => !validOrdering(o)).map(topSort).map(v => v[Math.floor(v.length / 2)]).reduce((s, n) => s + n));
