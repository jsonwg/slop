const FREE = -1;

const decompress = (arr) => {
  const decompressed = [];
  for (let i = 0; i < arr.length; i++) {
    for (let x = 0; x < arr[i]; x++) {
        decompressed.push(i % 2 === 0 ? i / 2 : FREE);
    }
  }
  return decompressed;
}

const swap = (arr, a, b) => {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

const findFree = (arr, idx) => {
  for (let i = idx + 1; i < arr.length; i++) {
    if (arr[i] === FREE) {
      return i;
    }
  }
  return -1;
}

const findFile = (arr, idx) => {
  for (let i = idx -1; i >= 0; i--) {
    if (arr[i] !== FREE) {
      return i;
    }
  }
  return -1;
}

const findFileBlock = (arr, idx) => {
  let val = arr[idx];
  let end = idx;
  while(arr[--idx] === val) {}
  return [idx + 1, end + 1];
}

const findFreeBlock = (arr, idx, size) => {
  let front = findFree(arr, -1);
  let end = front;
  while (front < idx && front !== -1) {
    while (arr[++end] === FREE) {}
    if (end - front >= size) {
      return [front, end]
    } else {
      front = findFree(arr, end);
      end = front; 
    }
  }
  return [-1, -1, -1]
}

(async () => {
  const file = await Deno.readTextFile("input.txt");
  const input = file.split("").map(Number);
  const decompressed = decompress(input);
  const decompressedCopy = [...decompressed];

  let front = findFree(decompressed, -1);
  let back = findFile(decompressed, decompressed.length);
  while (front < back) {
    swap(decompressed, front, back);
    front = findFree(decompressed, front);
    back = findFile(decompressed, back);
  }
  console.log("Part 1", decompressed.filter(x => x !== FREE).map((x, i) => x * i).reduce((s, n) => s + n));

  back = findFile(decompressedCopy, decompressedCopy.length);
  while (back != FREE) {
    const file = findFileBlock(decompressedCopy, back);
    const free = findFreeBlock(decompressedCopy, back, file[1] - file[0]);
    if (!free.includes(-1)) {
      for (let i = 0; i < file[1] - file[0]; i++) { 
        swap(decompressedCopy, file[0] + i, free[0] + i);
      }
    }
    back = findFile(decompressedCopy, file[0]);
  }
  console.log("Part 2", decompressedCopy.map((x, i) => x * i).filter(x => x > 0).reduce((s, n) => s + n));
})();

