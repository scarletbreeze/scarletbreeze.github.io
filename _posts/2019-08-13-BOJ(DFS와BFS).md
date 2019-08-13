---
layout: post
title: BOJ(DFS와BFS)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm BOJ 그래프와BFS 1260 DFS/BFS
date: 2019-08-13
---

## DFS와 BFS

- [DFS와BFS](https://www.acmicpc.net/problem/1260)

- 그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램 작성

- 이 문제 역시 인접리스트로 풀면 간단히 풀 수 있을 것 같다. 해보자!

```python
def DFS(s):
    visited[s] = True
    # 가장 최초로 방문한 노드만 찍으면 되기 때문에, 배열을 초기화해줄 필요가 없다.
    print(s, end=" ")
    for next in arr[s]:
        if not visited[next]:
            DFS(next)


def BFS(s):
    q.append(s)
    visited[s] = True
    while q:
        now = q.pop(0)
        print(now, end=" ")  # q를 방문한다는 의미로 출력한다
        for next in arr[now]:
            if not visited[next]:
                visited[next] = True
                q.append(next)
    print()


N, M, V = map(int, input().split())
arr = [[] for _ in range(N+1)]

for i in range(M):
    a, b = map(int, input().split())
    arr[a].append(b)
    arr[b].append(a)
# 정점 번호가 작은 순으로 탐색하기 때문에, 정렬을 해줘야 한다.
for x in arr:
    x.sort()
q = []
visited = [False] * (N+1)
DFS(V)
print()
visited = [False] * (N+1)
BFS(V)

```

---

참고자료
[codeplus](https://code.plus/course/32)
[참고블로그](https://blog.naver.com/wpghks7/221602789884)
