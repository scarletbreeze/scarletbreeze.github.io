---
layout: post
title: programmers(60)level_2(땅따먹기)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-29
---

## 문제: 60. 땅따먹기

- 땅은 총 N행 4열
- 한 행씩 내려올 때, 같은 열을 연속해서 밟을 수 없는 규칙
- 마지막 행까지 모두 내려왔을 때, 얻을 수 있는 점수의 최대값을 return하는 solution 함수 작성

- 백트래킹을 이용해서 재귀적으로 푸는 문제인 것 같았는데, DP를 이용해서 풀 수 있다고 한다.
- 가장 왼쪽에 놓인 칸을 a라고 했을 때, 위에서 어떤 방법으로 탐색을 해서 a에 도착했던 것과 상관 없이, a위치에서 갈 수 있는 방법은 3가지가 있다.
  ![No Image](/assets/posts/20190729/1.png)
- 어떠한 경로를 선택하든, a에서 출발해서 얻을 수 있는 최댓값은 항상 같다. -> 동일한 탐색을 반복.

- a,b,c,d에서 출발했을 때, 얻을 수 있는 최고 점수를 구했따면, k지점에서 이동할 수 있는 방법은 (a 바로 위) b,c,d에서 각각 출발했을 때, 얻을 수 있는 가장 큰 정수 중에서 max 값 + k 값이다.
  ![No Image](/assets/posts/20190729/2.png)

- 밑에서 올라가서 역으로 올라가는 방법

```python
def solution(land):
    answer = 0
    N = len(land)  # N은 행의 개수가 된다.
    for i in range(0, N-1):
        land[i+1][0] += max(land[i][1], land[i][2], land[i][3])
        land[i+1][1] += max(land[i][0], land[i][2], land[i][3])
        land[i+1][2] += max(land[i][0], land[i][1], land[i][3])
        land[i+1][3] += max(land[i][0], land[i][1], land[i][2])
    answer = max(land[N-1])
    return answer


```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[알고리즘문제해설]<https://programmers.co.kr/learn/courses/18/lessons/1880>
[참고블로그]<https://ssungkang.tistory.com/entry/%EB%95%85%EB%94%B0%EB%A8%B9%EA%B8%B0%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4level2>
