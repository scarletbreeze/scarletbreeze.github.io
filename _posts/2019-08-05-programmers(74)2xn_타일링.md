---
layout: post
title: programmers(74)level_3(2xn타일링)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-05
---

## 문제: 74. 2xn타일링

- 가로가 2, 세로가 1인 직사각형 모양의 타일이 있다.
- 이 직사각형 타일을 이용하여 세로의 길이가 2이고 가로의 길이가 n인 바닥을 가득 채우려고 한다.
- ? 이 문제 SWE 4869랑 거의 비슷하네 ?(SWE에서는 2x2 타일도 있었다.)
- 이런 문제는 점화식을 찾자

## 피보나치 수열인가?

- 맞다
  ![No Image](/assets/posts/20190805/1.png)

```python
def solution(n):
    a, b = 1, 2
    for i in range(2, n+1):
        a, b = b % 1000000007, a+b % 1000000007
    return a

```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
