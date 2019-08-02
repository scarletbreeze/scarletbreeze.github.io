---
layout: post
title: programmers(71)level_3(네트워크)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-02
---

## 문제: 71. 네트워크

- 문제가 이해가 안가서 괴로웠다.
- 30분을 고민한 끝에, 알게된 것은 다음과 같다.

- A와 B가 연결되어 있고 B와 C가 연결되어 있다면, A와 C도 간접적으로 연결되기 때문에, 같은 네트워크 상에 있다고 볼 수 있다.

- 예제를 살펴보자.
- `[[1,1,0],[1,1,0],[0,0,1]]`과 같은 이차원 리스트가 있다.
- ![image](https://grepp-programmers.s3.amazonaws.com/files/ybm/5b61d6ca97/cc1e7816-b6d7-4649-98e0-e95ea2007fd7.png)
- 이를 네트워크로 표현하면 위와 같다. 따라서 1,2가 연결된 네트워크 이므로 1개의 네트워크, 3이 독립적이므로 총 2개의 네트워크가 존재한다.

- 다른 예제
- `[[1,1,0],[1,1,0],[0,0,1]]`과 같은 이차원 리스트가 있다.
- ![image](https://grepp-programmers.s3.amazonaws.com/files/ybm/7554746da2/edb61632-59f4-4799-9154-de9ca98c9e55.png)
- 이를 네트워크로 표현하면 위와 같다. 1,2,3이 모두 연결되어 있으므로 한 개의 네트워크가 존재한다.

## 풀이방법

- DFS로 풀어야 한다고 한다.
- DFS 순서 -> 초기 스택 비어있으므로 시작 노드 넣고
  - 스택에서 노드 하나 꺼내서, 꺼낸 노드의 child 노드를 전부 스택에 (한번 스택에 담았던 노드는 다시 넣지 않는다.)
  - 꺼낸 노드는 출력. 이를 반복

```python
def Network(computers, visited, SNode):
    stack = [SNode]  # idx를 스택에 넣고 시작
    while stack:  # 스택이 빌 때까지
        path = stack.pop()  # 스택에서 하나 꺼내고
        if not visited[path]:
            visited[path] = True
        for i in range(len(computers)):
            if computers[path][i] == 1 and not visited[i]:
                stack.append(i)


def solution(n, computers):
    answer = 0
    visited = [False for i in range(n)]  # 방문한 노드 표시
    idx = 0
    while not all(visited):  # 전부다 방문할 때까지 반복
        if not visited[idx]:
            Network(computers, visited, idx)
            answer += 1  # 처음 방문한 것이기 때문에 네트워크 개수를 늘려준다.
        idx += 1
    return answer


print(solution(3, [[1, 1, 0], [1, 1, 0], [0, 0, 1]]))

```

## 알게된 것

- 2치원 배열 탐색할 때, for문으로 1차원씩 잘라서 재귀함수 호출 가능

- python 내장 함수 중에 all이란게 있다.
  - all(x) : 반복가능한 자료형 x를 입력 인수로 받아 x가 모두 참이면 True, 거짓이면 False를 돌려준다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://codedrive.tistory.com/159?category=809488>
[DFS,BFS]<https://www.youtube.com/watch?v=_hxFgg7TLZQ&t=91s>
