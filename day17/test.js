const combo_operand = (state) => {
  const operand = state.program[state.ptr + 1];
  if (operand < 4) {
    return operand;
  } else if (operand === 4) {
    return state.registers[0];
  } else if (operand === 5) {
    return state.registers[1];
  } else if (operand === 6) {
    return state.registers[2];
  } else {
    throw new Error("Invalid program");
  }
};

const dv = (state) => {
  return Math.floor(state.registers[0] / Math.pow(2, combo_operand(state)));
};

const adv = (state) => {
  state.registers[0] = dv(state);
};

const bxl = (state) => {
  state.registers[1] = state.registers[1] ^ state.program[state.ptr + 1];
};

const bst = (state) => {
  state.registers[1] = combo_operand(state) & 7;
};

const jnz = (state) => {
  state.ptr = state.registers[0] === 0 ? state.ptr : state.program[state.ptr + 1] - 2;
};

const bxc = (state) => {
  state.registers[1] = state.registers[1] ^ state.registers[2];
};

const out = (state) => {
  const foo = combo_operand(state) & 7;
  state.out += `${foo},`;
};

const bdv = (state) => {
  state.registers[1] = dv(state);
};

const cdv = (state) => {
  state.registers[2] = dv(state);
};

const OPERATIONS = {
  0: adv,
  1: bxl,
  2: bst,
  3: jnz,
  4: bxc,
  5: out,
  6: bdv,
  7: cdv,
}

const simulate = (file, program, a) => {
  const state = { registers: null, program: null, out: "", ptr: 0 };
  state.registers = file.split("\n").splice(0, 3).map((x) => Number(x.split(" ")[2]));
  state.program = program
  if (a !== undefined)
    state.registers[0] = a;
  while (state.ptr < state.program.length - 1) {
    OPERATIONS[state.program[state.ptr]](state);
    state.ptr += 2;
  }
  return state.out.slice(0, -1);
}

const eq = (sub, arr) => {
  sub = [...sub].reverse();
  arr = [...arr].reverse();

  console.log(sub.length, arr.length)

  for (let i = 0; i < sub.length; i++)
    if (sub[i] !== arr[i]) {}
      return false;
  return true;
}

const weq = (sub, arr) => {
  const foo = sub === arr.substring(arr.length - sub.length);
  if (sub.length === 30) {
    console.log(sub, arr);
    console.log(sub.length)
    console.log(sub)
  }
  return foo;
}

const dfs = (file, program) => {
  const stack = [];
  const teg = [];
  const feg = [];
  
  for (let i = 0; i < 8; i++)
    stack.push(String(i));

  while (stack.length > 0) {
    const oct = stack.shift();

    if (oct.length === 16 && weq(simulate(file, program, parseInt(oct, 8)), String(program))) {
      teg.push(parseInt(oct, 8));
      feg.push(oct);
      continue
    }

    const out = simulate(file, program, parseInt(oct, 8))
    //const out = simulate(file, program, parseInt(oct, 8)).split(",").map(Number);


    if (weq(out, String(program)))
      for (let i = 0; i < 8; i++)
        stack.push(oct + i);
  }

  return teg;
}


const file = await Deno.readTextFile("input.txt");
const program = file.split("\n")[4].split(" ")[1].split(",").map(Number);

console.log(simulate(file, program))
console.log(Math.min(...dfs(file, program)))
