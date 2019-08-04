---
layout: post
title: SWE(DFS,BFS)_python_intermediate_6문제복습
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: SWExpertAcadmey intermediate
date: 2019-08-04
---

# 목차

1. SWE4871 - 그래프의 경로
2. SWE4875 - 미로
3. SWE5105 - 미로의 거리
4. SWE5012 - 노드의 거리

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

- isSafe를 작성할 때, x와 y가 0이상이고, N 미만인지 그러면서 0 이거나 3인지로 놓고 판단
- 이 문제도 탐색이기에 visited[]가 필요하다. -> 방문한 좌표를 리스트에 저장

```python
def IsSafe(y, x):
    return 0 <= y < N and 0 <= x < N and(Map[y][x] == 0 or Map[y][x] == 3)


def DFS(y, x):
    global result
    if Map[y][x] == 3:
        result = 1
        return
    visited.append((y, x))  # 방문 표시
    for dir in range(4):
        NewY = y + dy[dir]
        NewX = x + dx[dir]
        if IsSafe(NewY, NewX) and (NewY, NewX) not in visited:
            DFS(NewY, NewX)


for rounds in range(int(input())):
    N = int(input())
    Map = [list(map(int, input())) for _ in range(N)]

    for y in range(N):
        for x in range(N):
            if Map[y][x] == 2:  # 0 통로 1 벽 2 출발 3 도착
                start_y, start_x = y, x

    dy = [1, -1, 0, 0]
    dx = [0, 0, -1, 1]
    visited = []
    result = 0
    DFS(start_y, start_x)
    print(f"#{rounds+1} {result}")

```

## 3. SWE(5105) - 미로의 거리

- 위와 완전히 동일한 문제다. 거리는 어떻게 표시해줄까?
- Distance라는 2차원 배열을 선언해준 뒤, 이전보다 +1 씩 증가한 값을 넣어준다.

```python
def IsSafe(y, x):
    return 0 <= y < N and 0 <= x < N and(Map[y][x] == 0 or Map[y][x] == 3)


def DFS(y, x):
    global result
    if Map[y][x] == 3:
        result = Distance[y][x]-1
        return
    visited.append((y, x))  # 방문 표시

    # print("---------")
    # for i in range(N):
    #     print(Distance[i])
    # print("---------")

    for dir in range(4):
        NewY = y + dy[dir]
        NewX = x + dx[dir]
        if IsSafe(NewY, NewX) and (NewY, NewX) not in visited:
            Distance[NewY][NewX] = Distance[y][x] + 1
            DFS(NewY, NewX)


for rounds in range(int(input())):
    N = int(input())
    Map = [list(map(int, input())) for _ in range(N)]

    for y in range(N):
        for x in range(N):
            if Map[y][x] == 2:  # 0 통로 1 벽 2 출발 3 도착
                start_y, start_x = y, x
    Distance = [[0]*N for _ in range(N)]  # 2차원 배열 선언

    dy = [1, -1, 0, 0]
    dx = [0, 0, -1, 1]
    visited = []
    result = 0
    DFS(start_y, start_x)
    print(f"#{rounds+1} {result}")

```

- 위 코드의 실행결과는 다음과 같다

```python
---------
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 1, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 0, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 0, 1, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 5, 0, 3, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
```

- 이 문제를 BFS를 이용해서 풀어보자.
- 미로찾기는 어떻게 BFS로 이어지는지 감이 오질 않았다.
- 그래서 해리님의 데브로그의 코드를 참고해서 직접 print를 찍어보니 다음과 같았다.

```python
---------
Distance:  [0, 0, 0, 0, 0]
Distance:  [0, 0, 0, 0, 0]
Distance:  [0, 0, 0, 0, 0]
Distance:  [0, 0, 0, 1, 0]
Distance:  [0, 0, 0, 0, 0]
---------
---------
Distance:  [0, 0, 0, 0, 0]
Distance:  [0, 0, 0, 0, 0]
Distance:  [0, 0, 0, 0, 0]
Distance:  [0, 0, 0, 1, 0]
Distance:  [0, 0, 1, 0, 0]
---------
---------
Distance:  [0, 0, 0, 0, 0]
Distance:  [0, 0, 0, 0, 0]
Distance:  [0, 0, 0, 2, 0]
Distance:  [0, 0, 0, 1, 0]
Distance:  [0, 0, 1, 0, 0]
---------
---------
Distance:  [0, 0, 0, 0, 0]
Distance:  [0, 0, 0, 0, 0]
Distance:  [0, 0, 0, 2, 0]
Distance:  [0, 0, 0, 1, 0]
Distance:  [0, 2, 1, 0, 0]
---------
---------
Distance:  [0, 0, 0, 0, 0]
Distance:  [0, 0, 0, 3, 0]
Distance:  [0, 0, 0, 2, 0]
Distance:  [0, 0, 0, 1, 0]
Distance:  [0, 2, 1, 0, 0]
---------
---------
Distance:  [0, 0, 0, 0, 0]
Distance:  [0, 0, 0, 3, 0]
Distance:  [0, 0, 0, 2, 0]
Distance:  [0, 3, 0, 1, 0]
Distance:  [0, 2, 1, 0, 0]
---------
---------
Distance:  [0, 0, 0, 4, 0]
Distance:  [0, 0, 0, 3, 0]
Distance:  [0, 0, 0, 2, 0]
Distance:  [0, 3, 0, 1, 0]
Distance:  [0, 2, 1, 0, 0]
---------
---------
Distance:  [0, 0, 0, 4, 0]
Distance:  [0, 0, 0, 3, 0]
Distance:  [0, 4, 0, 2, 0]
Distance:  [0, 3, 0, 1, 0]
Distance:  [0, 2, 1, 0, 0]
---------
---------
Distance:  [0, 0, 0, 4, 0]
Distance:  [0, 5, 0, 3, 0]
Distance:  [0, 4, 0, 2, 0]
Distance:  [0, 3, 0, 1, 0]
Distance:  [0, 2, 1, 0, 0]
---------
---------
Distance:  [0, 6, 0, 4, 0]
Distance:  [0, 5, 0, 3, 0]
Distance:  [0, 4, 0, 2, 0]
Distance:  [0, 3, 0, 1, 0]
Distance:  [0, 2, 1, 0, 0]
```

- 즉 이진트리로 바꿔놓고 생각해봤을 때, 갈 수 있는 depth의 경로를 순서대로 가는 , BFS 방식을 취하더라..

```python
def IsSafe(y, x):
    return 0 <= y < N and 0 <= x < N and(Map[y][x] == 0 or Map[y][x] == 3)


def BFS(y, x):
    global result
    Q.append((y, x))  # Queue에 넣고
    visited.append((y, x))  # 방문 처리
    while Q:
        y, x = Q.pop(0)
        for dir in range(4):
            NewY = y + dy[dir]
            NewX = x + dx[dir]
            if IsSafe(NewY, NewX) and (NewY, NewX) not in visited:
                Q.append((NewY, NewX))
                visited.append((NewY, NewX))
                Distance[NewY][NewX] = Distance[y][x] + 1
                # print("---------")
                # for i in range(N):
                #     print("Distance: ", Distance[i])
                # print("---------")
                if Map[NewY][NewX] == 3:
                    result = Distance[NewY][NewX]-1
                    return


for rounds in range(int(input())):
    N = int(input())
    Map = [list(map(int, input())) for _ in range(N)]
    for y in range(N):
        for x in range(N):
            if Map[y][x] == 2:  # 0 통로 1 벽 2 출발 3 도착
                start_y, start_x = y, x
    Distance = [[0]*N for _ in range(N)]  # 2차원 배열 선언
    visited = []
    dy = [1, -1, 0, 0]
    dx = [0, 0, -1, 1]

    Q = []
    result = 0
    BFS(start_y, start_x)
    print(f"#{rounds+1} {result}")
```

- BFS를 stack을 이용해서 구해보면 어떨까?

```python

def IsSafe(y, x):
    return 0 <= y < N and 0 <= x < N and(Map[y][x] == 0 or Map[y][x] == 3)


for rounds in range(int(input())):
    N = int(input())
    Map = [list(map(int, input())) for _ in range(N)]
    for y in range(N):
        for x in range(N):
            if Map[y][x] == 2:  # 0 통로 1 벽 2 출발 3 도착
                start_y, start_x = y, x
    Distance = [[0]*N for _ in range(N)]  # 2차원 배열 선언

    dy = [1, -1, 0, 0]
    dx = [0, 0, -1, 1]

    result = 0
    # stack을 이용한 BFS 구현
    visited = [(start_y, start_x)]
    stack = [(start_y, start_x)]
    while stack:
        start_y, start_x = stack.pop()
        # print("---------")
        # for i in range(N):
        #     print(Distance[i])
        # print("---------")
        for i in range(4):
            NewY = start_y + dy[i]
            NewX = start_x + dx[i]
            if IsSafe(NewY, NewX) and (NewY, NewX) not in visited:
                stack.append((NewY, NewX))
                visited.append((NewY, NewX))
                Distance[NewY][NewX] = Distance[start_y][start_x] + 1
                if Map[NewY][NewX] == 3:
                    result = Distance[NewY][NewX] - 1

    print(f"#{rounds+1} {result}")

```

- 조금 특이했던 점은 BFS로 구현할 때, 재귀로 할 때와 stack을 이용할 때, 탐방하는 순서가 다르다.

```python
---------
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 1, 0]
[0, 0, 1, 0, 0]
---------
---------
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 4, 0, 0, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 0, 0, 0, 0]
[0, 5, 0, 0, 0]
[0, 4, 0, 0, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 6, 0, 0, 0]
[0, 5, 0, 0, 0]
[0, 4, 0, 0, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 6, 0, 0, 0]
[0, 5, 0, 0, 0]
[0, 4, 0, 0, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 6, 0, 0, 0]
[0, 5, 0, 0, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 6, 0, 0, 0]
[0, 5, 0, 3, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 6, 0, 4, 0]
[0, 5, 0, 3, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
```

- 나는 stack 이용시, 방문하지 않은 노드들을 stack에 모두 넣어주는 방식을 취했다.
- 방문하지 않은 정점을 찾은 뒤, 조건에 맞는 정점을 찾으면 stack에 push하고, 연결된 간선이 없이 방문하지 않은 정점을 찾지 못한다면 pop하는 방식을 취할 수도 있다.

그와 같은 방법은 다음과 같다

```python


def IsSafe(y, x):
    return 0 <= y < N and 0 <= x < N and(Map[y][x] == 0 or Map[y][x] == 3)


for rounds in range(int(input())):
    N = int(input())
    Map = [list(map(int, input())) for _ in range(N)]
    for y in range(N):
        for x in range(N):
            if Map[y][x] == 2:  # 0 통로 1 벽 2 출발 3 도착
                start_y, start_x = y, x
    Distance = [[0]*N for _ in range(N)]  # 2차원 배열 선언

    dy = [1, -1, 0, 0]
    dx = [0, 0, -1, 1]

    result = 0
    # stack을 이용한 BFS 구현
    visited = [(start_y, start_x)]
    stack = [(start_y, start_x)]
    while stack:
        start_y, start_x = stack[-1]
        # print("---------")
        # for i in range(N):
        #     print(Distance[i])
        # print("---------")
        flag = False
        for i in range(4):
            NewY = start_y + dy[i]
            NewX = start_x + dx[i]
            if IsSafe(NewY, NewX) and (NewY, NewX) not in visited:
                flag = True
                stack.append((NewY, NewX))
                visited.append((NewY, NewX))
                Distance[NewY][NewX] = Distance[start_y][start_x] + 1
                if Map[NewY][NewX] == 3:
                    result = Distance[NewY][NewX] - 1
                break
        if not flag:
            stack.pop()

    print(f"#{rounds+1} {result}")
```

- 위 코드를 실행하면 다음과 같다.

```python
---------
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 1, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 0, 0]
[0, 0, 0, 0, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 0, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 0, 0, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 0, 1, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 0, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 0, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 0, 0, 3, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 0, 0, 4, 0]
[0, 5, 0, 3, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 6, 0, 4, 0]
[0, 5, 0, 3, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 6, 0, 4, 0]
[0, 5, 0, 3, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 6, 0, 4, 0]
[0, 5, 0, 3, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 6, 0, 4, 0]
[0, 5, 0, 3, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 6, 0, 4, 0]
[0, 5, 0, 3, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 6, 0, 4, 0]
[0, 5, 0, 3, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
---------
[0, 6, 0, 4, 0]
[0, 5, 0, 3, 0]
[0, 4, 0, 2, 0]
[0, 3, 0, 1, 0]
[0, 2, 1, 0, 0]
---------
```

- 위 방법은 재귀를 이용한 DFS 순서와 일치한다
- stack을 이용할 때도, 탐색순서는 이와 같이 차이가 있을 수 있다.
- 둘다 깊이 우선 탐색이란 점에서는 동일하다.

## 4. 5102 - 노드의 거리

이 문제 역시, SWE4871 - 그래프의 경로에서 거리를 구하는 문제로 변경된 문제다.
이 문제는 start에서 최단거리를 찾아가는 방식을 취했다.
DFS로 구현한다면 모두 돌아서 최단거리를 찾아야 한다.
따라서 이런 문제는 BFS가 효과적이다.

```python
def BFS(start):
    global result
    Q.append(start)
    visited[start] = 1
    while Q:
        start = Q.pop(0)
        for next in range(1, V + 1):
            if Map[start][next] and not visited[next]:
                Q.append(next)
                visited[next] = 1
                Distance[next] = Distance[start]+1
                if next == G:
                    result = Distance[next]
                    return
    return


for rounds in range(int(input())):
    V, E = map(int, input().split())
    Map = [[0]*(V+1) for _ in range(V+1)]
    visited = [0]*(V+1)
    for i in range(E):
        a, b = map(int, input().split())
        Map[a][b] = 1
        Map[b][a] = 1
    S, G = map(int, input().split())
    Distance = [0] * (V+1)
    result = 0
    Q = []
    BFS(S)
    print(f"#{rounds+1} {result}")

```

---

참고자료
[SWexperacademy]<https://swexpertacademy.com>
[stack과_재귀를_이용한_DFS]<https://paper-ship.tistory.com/2>
