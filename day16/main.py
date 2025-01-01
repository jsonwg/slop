from pathlib import Path
import heapq


TURNS = {
    "N": {
        "N": 0,
        "E": 1,
        "S": 2,
        "W": 1,
    },
    "E": {
        "N": 1,
        "E": 0,
        "S": 1,
        "W": 2,
    },
    "S": {
        "N": 2,
        "E": 1,
        "S": 0,
        "W": 1,
    },
    "W": {
        "N": 1,
        "E": 2,
        "S": 1,
        "W": 0,
    },
}


def find(grid, x):
    for i, r in enumerate(grid):
        for j, c in enumerate(r):
            if c == x:
                return (i, j)
    return (-1, -1)


def in_bounds(grid, pos):
    return pos[0] >= 0 and pos[0] < len(grid) and pos[1] >= 0 and pos[1] < len(grid[0])


def valid(grid, pos):
    return in_bounds(grid, pos) and grid[pos[0]][pos[1]] != "#"


def get_neighbor_dist(grid, pos, d):
    neighbors = []
    for off in [[1, 0, "S"], [-1, 0, "N"], [0, 1, "E"], [0, -1, "W"]]:
        i, j = pos
        di, dj, nd = off
        npos = (i + di, j + dj)
        if valid(grid, npos):
            neighbors.append((TURNS[d][nd] * 1000 + 1, npos, nd))
    return neighbors


def djikstra(grid, start, end, d = "E"):
    dist = {(i, j): float("inf") for i in range(len(grid)) for j in range(len(grid[0]))}
    path = None
    pq = []

    dist[start] = 0
    heapq.heappush(pq, (0, start, d, [start]))
    while len(pq) > 0:
        cdist, pos, d, cpath = heapq.heappop(pq);

        if pos == end:
            path = cpath
            continue

        if cdist > dist[pos]:
            continue

        for nei_dist, nei, nei_d in get_neighbor_dist(grid, pos, d):
            ndist = nei_dist + cdist
            if ndist < dist[nei]:
                dist[nei] = ndist
                heapq.heappush(pq, (ndist, nei, nei_d, [*cpath, nei]))

    return dist, path

def findAll(grid, start, end, dist, path):
    paths = [*path]
    for pos in path:
        i, j = pos
        tmp = grid[i][j]
        grid[i][j] = "#"
        ndist, npath = djikstra(grid, start, end)
        if ndist[end] == dist:
            paths.extend(npath)
        grid[i][j] = tmp

    return paths


file = Path("input.txt")
grid = list(map(lambda s: [c for c in s], file.read_text().strip().split("\n")))
start, end = find(grid, "S"), find(grid, "E")

dist, path = djikstra(grid, start, end)
all_paths = findAll(grid, start, end, dist[end], path)

print(f"Part 1: {dist[end]}")
print(f"Part 2: {len(set(all_paths)) + 1}")

