const parseFile = (file) => {
  const elements = [];
  let buffer = [];
  for (const row of file) {
    if (row === "") {
      elements.push(buffer);
      buffer = [];
    } else {
      buffer.push(row);
    }
  }
  return elements;
}

const distinguishInput = (input) => {
  const keys = [];
  const locks = [];
  for (const item of input) {
    if (item[0] === "#####") {
      locks.push(item);
    } else {
      keys.push(item);
    }
  }
  return [keys, locks];
}

const parseItems = (items) => {
  const parsed = [];
  for (const item of items) {
    const numRep = [0, 0, 0, 0, 0]
    for (let j = 0; j < item[0].length; j++) {
      for (let i = 0; i < item.length; i++) {
        if (item[i][j] === "#") {
          numRep[j]++;
        }
      }
    }
    parsed.push(numRep);
  }
  return parsed;
}

const add = (key, lock) => {
  const heights = []
  for (let i = 0; i < key.length; i++) {
    heights[i] = key[i] + lock[i];
  }
  return heights; 
}

const validPair = (heights) => {
  for (const h of heights) {
    if (h > 7)
      return false;
  }
  return true;
}

const file = await Deno.readTextFile("input.txt");
const input = parseFile(file.split("\n"));
const [keys, locks] = distinguishInput(input).map(parseItems);
console.log(keys.flatMap(k => locks.map(l => add(k, l))).filter(validPair).length)

