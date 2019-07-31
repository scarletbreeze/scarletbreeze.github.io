---
layout: post
title: programmers(65)level_2(소수만들기)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-31
---

## 문제: 65. 소수만들기

- 배열 입력 받아서, 서로 다른 3개를 골라, 그 중 합이 소수가 되는 경우의 수 구하기

```python
import itertools


def solution(nums):
    answer = 0
    # 소수 구해놓기
    n = 1001
    num = set(range(2, n))
    for i in range(2, n+1):
        if i in num:
            num -= set(range(2*i, n+1, i))

    # 부분집합 구하기
    arr = list(itertools.combinations(nums, 3))

    for i in arr:
        if sum(i) in num:
            answer += 1
    return answer

print(solution([1, 2, 7, 6, 4]))
```

## 다른 사람 풀이

```python
def solution(nums):
    from itertools import combinations as cb
    answer = 0
    for a in cb(nums, 3):
        cand = sum(a)
        for j in range(2, cand):
            if cand%j==0:
                break
        else:
            answer += 1
    return answer
```

- 함수 안에서 `from itertools import conbinations as cb` 이렇게 import 할수도 있다.
- 에라토스테네스의 사용하여 먼저 구현하기 보다는,
- cand라는 변수에 합을 구한 뒤, 그 안에서 2부터 cand까지, 나누어떨어지는지를 확인했다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[순열과조합]<https://widekey6.tistory.com/105>
