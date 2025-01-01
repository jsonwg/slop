const findLoops = (adj, len) => {
  const stack = [];
  const loops = [];

  for (const [k, v] of adj)
    for (const n of v)
      stack.push([k, n]);
  
  while (stack.length > 0) {
    const seen = stack.pop();

    if (seen.length === len + 1) {
      if (seen.at(0) === seen.at(-1))
        loops.push(seen.slice(0, -1).sort());
      continue
    }

    for (const n of adj.get(seen.at(-1)))
      stack.push([...seen, n]);
  }
  
  return loops;
}

const isClique = (adj, nodes) => {
  for (const n of nodes)
    for (const o of nodes)
      if (n !== o && !adj.get(n).includes(o))
        return false;
  return true;
}

const createSub = (k, v) => {
  let subs = [];
  for (const n of v) {
    let sub = [k, n];
    for (const o of v)
      if (!sub.includes(o))
        subs.push([...sub, o]);
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
  
  return seen;
}

const file = await Deno.readTextFile("input.txt");
const input = file.trim().split("\n").map(c => c.split("-"));

const adj = new Map();

input.forEach(c => {
  const [a, b] = c;
  adj.set(a, [...(adj.get(a) ?? []), b]);
  adj.set(b, [...(adj.get(b) ?? []), a]);
})

console.log(cullCliques([...adj.entries().flatMap(e => createSub(e[0], e[1])).filter(n => isClique(adj, n)).filter(hasTStart).map(c => c.sort())]).size)
