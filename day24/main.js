const evaluate = (a, b, op) => {
  if (op === "XOR")
    return a ^ b;
  else if (op === "AND")
    return a && b;
  else 
    return a || b;
}

const evalAll = (init, gates, evaluated) => {
  const evalQueue = [];

  init.forEach(p => evaluated.set(p[0], p[1]));
  gates.forEach(e => evalQueue.push([e[4], e[0], e[2], e[1]]));

  while(evalQueue.length > 0) {
    const [wire, a, b, op] = evalQueue.shift();
    const [wireA, wireB] = [evaluated.get(a), evaluated.get(b)];

    if (wireA !== undefined && wireB !== undefined) {
      evaluated.set(wire, evaluate(wireA, wireB, op));
    } else
      evalQueue.push([wire, a, b, op]);
  }

  return evaluated;
}

const file = await Deno.readTextFile("fixed.txt");
const input = file.trim().split("\n");

const initial = input.filter(s => s.includes(":")).map(s => s.split(": ")).map(p => [p[0], Number(p[1])]);
const gates = input.filter(s => s.includes("->")).map(s => s.split(" "))

const wires = evalAll(initial, gates, new Map());
const z = parseInt([...wires.entries()].filter(e => e[0][0] === "z").sort().reverse().reduce((s, c) => s + c[1], ""), 2)

const x = parseInt([...wires.entries()].filter(e => e[0][0] === "x").sort().reverse().reduce((s, c) => s + c[1], ""), 2);
const y = parseInt([...wires.entries()].filter(e => e[0][0] === "y").sort().reverse().reduce((s, c) => s + c[1], ""), 2);

console.log((x + y).toString(2))
console.log(x + y)
console.log(z.toString(2))
console.log(z)

//console.log(wires.get("z33"))
//console.log(wires.get("x33"))
//console.log(wires.get("y33"))
//console.log(wires.get("fsq"))
//
console.log(wires.get("dqg"))
console.log(wires.get("ncd"))
//console.log(wires.get("fmk"))
//console.log(wires.get("x32"))
//console.log(wires.get("y32"))
//
//console.log(wires.get("grc"))
console.log(String(["qjj", "gjc", "wmp", "z17", "gvm", "z26", "qsb", "z39"].sort()))
