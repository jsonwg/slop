class DisjointSet {
  #map;

  constructor() {
    this.#map = new Map();
  }

  get map() {
    return this.#map;
  }

  add(x) {
    if (!this.#map.has(x))
      this.#map.set(x, [-1, [x]]);
  }

  union(x, y) {
    if (this.connected(x, y))
      return;

    const rX = this.find(x);
    const rY = this.find(y);

    const xM = this.#map.get(rX);
    const yM = this.#map.get(rY);

    console.log(xM, yM)

    const combined = [...new Set(xM[1]), ...new Set(yM[1])];
    if (xM[0] <= yM[0]) {
      this.#map.set(rX, [-combined.length, combined])
      yM[0] = rX;
    } else {
      this.#map.set(rY, [-combined.length, combined])
      xM[0] = rY;
    }
  }

  find(x) {
    const parent = this.#map.get(x)[0];
    if (typeof parent !== 'number') {
      return this.find(parent)
    }
    return x;
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

const ds = new DisjointSet();

const file = await Deno.readTextFile("input.txt");
const input = file.trim().split("\n").map(c => c.split("-"));

input.forEach(c => {
  ds.add(c[0]);
  ds.add(c[1]);
  ds.union(c[0], c[1]);
});

console.log(ds.map);
console.log(ds.map.values().forEach(e => console.log(e[0])))




/*ds.add("foo");
ds.add("bar");

console.log(ds.mapp)

ds.union("foo", "bar")

console.log(ds.mapp)

console.log(ds.find("bar"))*/

