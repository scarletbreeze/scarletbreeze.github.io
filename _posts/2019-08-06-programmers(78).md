---
layout: post
title: programmers(75)level_3(타일장식물)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-05
---

## 문제: 75. 타일 장식물

-![No Image](/assets/posts/20190805/2.png)

- 둘레의 길이 역시 피보나치 수열이다.

```python
def solution(N):
    a, b = 4, 6
    if N == 1:
        return 4
    elif N == 2:
        return 6
    for _ in range(1, N):
        a, b = b, a+b
    return a
```

## 다른 사람 풀이

- 아마도 문제가 의도한 풀이는 이와 같은 방법이지 않았을까 싶다

```python
def solution(N):
    dp = [0] * int(N+2)
    if N == 1: return 4
    if N == 2: return 6
    dp[0], dp[1], dp[2] = 0, 1, 1
    for i in range(3, N+2):
        dp[i] = dp[i-1] + dp[i-2]
    return 2*dp[N-1] + 4*dp[N]

```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
