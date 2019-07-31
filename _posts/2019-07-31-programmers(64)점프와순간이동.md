---
layout: post
title: programmers(64)level_2(점프와순간이동)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-31
---

## 문제: 64. 점프와 순간이동

- 점프할 때만 건전지 소모
- 순간이동 온 거리 x2만큼 이동. 건전지 소모x

- N이 5일 때 -> 점프->순간이동->순간이동->점프 : 건전지 2

- N 이 6일 때 -> 점프 -> 순간이동 -> 점프 -> 순간이동 : 건전지 2

## 문제의 유형

- 역추적 해보면 되지 않을까?
- 5라면, 2로 나눈 나머지가 1이니까.
- jump해서 4로변경. 4는 2로 나눈 나머지 0이니까. 순간이동 2
- 2를 2로 나눈 나머지 0이니까 다시 순간이동 1
- 1은 2로 나누면 나머지 1이니 -> jump
- 0이 나왔으면 return

```python
def solution(n):
    jump = 0
    while(n):
        num = n % 2
        if num == 1:
            jump += 1
            n -= 1
        else:
            n = n//2
    return jump


print(solution(5000))

```

## 다른 사람 풀이

```python
def solution(n):
    return bin(n).count('1')
```

- 2진수로 변환한 뒤, 1의 개수를 세서 구할 수도 있다.
- 생각해보면 문제에서 요구하는 것과 정확히 일치한다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
