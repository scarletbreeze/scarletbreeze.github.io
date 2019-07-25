---
layout: post
title: programmers(47)level_2(H-indx)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-25
---

## 문제: 47 H-indx

- 어떤 과학자가 발표한 논문 n편 중, h번 이상 인용된 논문이 h편 이상이고 나버지 논문이 h번 이하 인용되었다면 h가 이 과학자의 H-indx이다.
- 어떤 과학자가 발표한 논문과 인용 횟수를 담은 배열 citations가 매개변수로 주어질 때, 이 과학자의 H-index를 return 하도록하는 solution 함수를 작성

- 입출력 예
- citations : [3,0,6,1,5]
- return 3

- 이 과학자가 발표한 논문의 수는 5편이고, 그 중 3편의 논문은 3회 이상 인용되었다. 그리고 나머지 논문은 3회 이하 인용되었기 때문에 이 과학자의 H-index는 3이다.

## 생각한 방법

- Q) 나머지 논문이 3회 이하로 인용되었는지 셀 필요가 있을까?
- 문제에는 빠져있지만 H-index가 최대가 되는 것의 값을 구하는 문제다.
- 즉 h번 이상 인용된 논문이 h편 이상이 되는 h의 최대값을 구하는 것과 같다.

```python
def solution(citations):
    answer = 0
    citations = sorted(citations, reverse=True)
    for i, x in enumerate(citations):
        cnt = 0
        for y in citations:
            if x <= y:
                cnt += 1
                # print(x, y)
        if cnt == x:
            return x


print(solution([3, 0, 6, 1, 5]))

```

- 처음에는 이렇게 생각했다.
- 그런데 틀렸다.
- 인용된 논문이 h편 이상이기에, 즉, sorted한 게 아닌, 인덱스를 큰 수부터 돌려줘야 한다.

## 다른 사람 풀이

```python
def solution(c):
    for i, x in enumerate(sorted(c)):
        if x >= len(c)-i:
            return len(c)-i
    return 0


print(solution([3, 0, 6, 1, 5]))

```

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
