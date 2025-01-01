from pathlib import Path
from copy import deepcopy
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


def djikstra(grid, start, d = "E"):
    dist = {(i, j): float("inf") for i in range(len(grid)) for j in range(len(grid[0]))}
    pq = []

    dist[start] = 0
    heapq.heappush(pq, (0, start, d))
    while len(pq) > 0:
        cdist, pos, d = heapq.heappop(pq);

        if cdist > dist[pos]:
            continue

        for nei_dist, nei, nei_d in get_neighbor_dist(grid, pos, d):
            ndist = nei_dist + cdist
            if ndist < dist[nei]:
                dist[nei] = ndist
                heapq.heappush(pq, (ndist, nei, nei_d))

    return dist

def dfs(grid, start, end, d = "E"):
    stack = []
    paths = []
    
    stack.append((start, d, [start], 0, set()))
    while(len(stack) > 0):
        pos, d, path, cdist, seen = stack.pop();
    
        grid[pos[0]][pos[1]] = "O"

        if pos in seen or len(path) > 400:
            continue

        if pos == end:
            paths.append((path, cdist))
            continue
        
        seen.add(pos)
        for dist, nei, nei_d in get_neighbor_dist(grid, pos, d):
            npath = [*path, nei]
            stack.append((nei, d, npath, cdist + dist, seen.copy()))

    return paths

def pg(grid):
    s = ""
    for row in grid:
        for c in row:
            s += c;
        s += "\n"
    return s

#file = Path("smallest_input.txt")
file = Path("small_input.txt")
grid = list(map(lambda s: [c for c in s], file.read_text().strip().split("\n")))
start = find(grid, "S")
end = find(grid, "E")

print(find(grid, "S"))
dist = djikstra(grid, find(grid, "S"))
print(dist[end])



#print(len(bfshitstra(grid, start, end, dist[end], "E",)))
#print(len(dfs(grid, start, end, dist[end], "E",)))
#print(len(set(sum(dfs(grid, start, end, dist[end], "E",), []))))
paths = dfs(grid, start, end, "E")

print([cdist for path, cdist in paths ])#if cdist == dist[end]])

print(pg(grid))
