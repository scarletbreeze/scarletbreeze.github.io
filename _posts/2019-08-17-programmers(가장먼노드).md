---
layout: post
title: programmers(가장 먼 노드)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-17
---

## 가장 먼 노드

- n개의 노드가 있는 그래프가 있다.
- 각 노드는 1부터 n까지 번호가 적혀있다.
- 1번 노드에서 가장 머리 떨어진 노드의 갯수를 구하려고 한다.
- 간선의 개수가 가장 많은 노드를 의미

## 풀이방법

- BFS로 돌면서, 간선을 탈 때마다 cnt를 1씩 증가시켜주고,
- 결과 배열에 저장한 뒤, 그 배열에서 가장 큰 값을 출력해주는 방향으로 하자.

```python
def solution(n, edge):
    graph = [[] for _ in range(n + 1)]
    distances = [0 for _ in range(n)]
    is_visit = [False for _ in range(n)]
    queue = [0]
    is_visit[0] = True
    for (a, b) in edge:
        graph[a-1].append(b-1)
        graph[b-1].append(a-1)

    while queue:
        i = queue.pop(0)

        for j in graph[i]:
            if is_visit[j] == False:
                is_visit[j] = True
                queue.append(j)
                distances[j] = distances[i] + 1

    distances.sort(reverse=True)
    answer = distances.count(distances[0])

    return answer

```

---

참고자료
[codeplus](https://code.plus/course/33)
