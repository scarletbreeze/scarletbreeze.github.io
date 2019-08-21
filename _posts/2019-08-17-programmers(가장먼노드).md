---
layout: post
title: programmers(84)level_3(가장 먼 노드)
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
    graph = [[] for _ in range(n)]
    distances = [0 for _ in range(n)]
    is_visit = [False for _ in range(n)]
    queue = [0]
    is_visit[0] = True
    for (a, b) in edge:
        graph[a-1].append(b-1)
        graph[b-1].append(a-1)
    while queue:
        # queue.sort() # 디버그 용도
        # print("q :", queue)
        i = queue.pop(0)
        # print("start", i)
        for j in graph[i]:
            if is_visit[j] == False:
                is_visit[j] = True
                queue.append(j)
                distances[j] = distances[i] + 1
    # print(distances)
    distances.sort(reverse=True)
    answer = distances.count(distances[0])

    return answer


a, b = 6, [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]
print(solution(a, b))

```

---

참고자료
[codeplus](https://code.plus/course/33)
