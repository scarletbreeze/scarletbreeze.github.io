---
layout: post
title: SWE(DFS,BFS)_python_intermediate_6문제복습
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: SWExpertAcadmey intermediate
date: 2019-08-03
---

# 목차

1. SWE4871 - 그래프의 경로
2. SWE4875 - 미로
3. SWE5105 - 미로의 거리
4. SWE5102 - 노드의 거리
5. SWE4880 - 토너먼트카드게임
6. SWE4881 - 배열의 최소합

## 1. SWE4871 - 그래프의 경로

1. V개 이내의 노드를 E개의 간선으로 연결한

- 방향성 그래프가 주어질 때, 특정한 두 개의 노드에 경로가 존재하는지 확인하는 프로그램 짜기
- 두 개의 노드에 대해 경로가 있으면 1, 없으면 0을 출력
- 테스트 케이스 / V와 E / E개의 줄에 걸쳐 출발 도착 노드 간선 정보 / S와 G(출발 노드와 도착 노드)
- 그래프 순회이기 때문에 visited리스트를 만들어준다.

```python
def DFS(S):
    global result
    visited[S] = 1  # 방문한 노드니까 체크
    for n in range(1, V+1):
        if Map[S][n] and not visited[n]:  # 값이 0이 아니면서 즉 1이면서 방문하지 않은 노드라면
            if n == G:
                result = 1
                return  # 종료
            DFS(n)


TC = int(input())
for tc in range(1, TC+1):
    V, E = map(int, input().split())
    # 간선을 표시할 2차원 리스트 초기화
    # index를 편리하게 사용하기 위해 1개를 더했다.
    Map = [[0]*(V+1) for i in range(V+1)]
    visited = [0]*(V+1)  # 방문한 노드 표시
    # 간선 입력 받기
    for i in range(E):
        a, b = map(int, input().split())
        Map[a][b] = 1
    S, G = map(int, input().split())
    result = 0
    DFS(S)
    print("#%d %d" % (tc, result))

```

## 2. SWE4875 미로

---

참고자료
[SWexperacademy]<https://swexpertacademy.com>
