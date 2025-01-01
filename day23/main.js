const isClique = (adj, nodes) => {
  for (const n of nodes)
    for (const o of nodes)
      if (n !== o && !adj.get(n).includes(o))
        return false;
  return true;
}

const createSub = (e) => {
  const [k, v] = e;
  const subs = [];
  for (const n of v) {
    const sub = [k, n];
    for (const o of v)
      if (!sub.includes(o))
        subs.push([...sub, o].sort());
  }
  return subs;
}

const cS = (e) => {
  const [k, v] = e;
  const stack = [];
  const subs = [];

  stack.push([[k], 0])
  while (stack.length > 0) {
    const [sub, i] = stack.pop();
    subs.push([...sub].sort());

    if (i === v.length)
      continue;
    
    stack.push([[...sub, v[i]], i + 1]);
    stack.push([sub, i + 1]);
  }
    
  return subs;
}

const hasTStart = (clique) => {
  for (const n of clique) {
    if (n[0] === "t")
      return true;
  }
  return false;
}

const cullCliques = (cliques) => {
  const seen = new Set();
  for (const c of cliques)
    seen.add(String(c));
  return [...seen].map(s => s.split(","));
}

const findLargest = (cliques) => {
  let max = cliques[0];
  for (const c of cliques) {
    if (c.length > max.length)
      max = c;
  }
  return max.sort();
}

const file = await Deno.readTextFile("input.txt");
const input = file.trim().split("\n").map(c => c.split("-"));
const adj = new Map();
input.forEach(c => {
  const [a, b] = c;
  adj.set(a, [...(adj.get(a) ?? []), b]);
  adj.set(b, [...(adj.get(b) ?? []), a]);
})

const cliques = cullCliques([...adj.entries().flatMap(cS)]).filter(n => isClique(adj, n))

console.log(`Part 1: ${cliques.filter(x => x.length === 3).filter(hasTStart).length}`);
console.log(`Part 2: ${findLargest(cliques)}`)

