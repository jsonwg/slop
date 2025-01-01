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
  state.registers[1] = combo_operand(state) % 8;
};

const jnz = (state) => {
  state.ptr = state.registers[0] === 0 ? state.ptr : state.program[state.ptr + 1] - 2;
};

const bxc = (state) => {
  state.registers[1] = state.registers[1] ^ state.registers[2];
};

const out = (state) => {
  const foo = combo_operand(state) % 8
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

const file = await Deno.readTextFile("input.txt");
let state = { registers: null, program: null, out: "", ptr: 0 };
//state.registers[0] = 117440

for (let i = 0; i < 16734016 * 8; i++) {
  state = { registers: null, program: null, out: "", ptr: 0 };
  state.registers = file.split("\n").splice(0, 3).map((x) => Number(x.split(" ")[2]));
  state.program = file.split("\n")[4].split(" ")[1].split(",").map(Number);
  state.registers[0] = i;
  while (state.ptr < state.program.length - 1) {
    OPERATIONS[state.program[state.ptr]](state);
    state.ptr += 2;
  }
  if (state.out === "0,")
    console.log(i)
  if (state.out === "3,0,")
    console.log(i)
  if (state.out === "5,3,0,")
    console.log(i)
  if (state.out === "5,5,3,0,")
    console.log(i)
  if (state.out === "3,5,5,3,0,")
    console.log(i)
  if (state.out === "0,3,5,5,3,0,")
    console.log(i)
  if (state.out === "0,0,3,5,5,3,0,")
    console.log(i)
  if (state.out === "4,0,0,3,5,5,3,0,")
    console.log(i)
  if (state.out === "5,4,0,0,3,5,5,3,0,")
    console.log(i)
    //console.log(state.out);
}

