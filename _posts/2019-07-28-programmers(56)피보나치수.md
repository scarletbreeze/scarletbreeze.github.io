---
layout: post
title: programmers(56)level_2(피보나치수)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-28
---

## 문제: 56. 피보나치수

```python
def solution(n):
    if(n <= 1):
        return n
    else:
        return solution(n-1)+solution(n-2)
print(solution(6))

```

- 시간초과

```python
def solution(n):
    A, B = 0, 1
    for i in range(n):
        A, B = B, A+B
    return A

print(solution(6))

```

- 정확도 실패.
- n은 1이상 10만 이하인 자연수
- 문제를 제대로 안 읽었네.
- 마지막에 1234567을 리턴하는게 아닌, 매 계산마다 그걸 해야하나보다

```python
def solution(n):
    A, B = 0, 1
    for i in range(n):
        A, B = B%1234567, (A+B)%1234567
    return A

print(solution(6))
```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
