---
layout: post
title: programmers(66)level_2(N개의_최소공배수)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-31
---

## 문제: 66. N개의 최소공배수

- 최소공배수란, 입력된 두 수의 배수중 공통이 되는 가장 작은 숫자를 말한다.
- n개의 수의 최소공배수는, n개의 수들의 배수 중 공통이 되는 작은 숫자가 된다.
- 이 수들의 최소 공배수를 반환하는 함수를 구하라.

- 여러 개의 최대공약수는 어떻게 구할까?
- A와 B의 최소 공배수가 D라고 한다면
- A,B,C의 최소 공배수는 D,C의 최소공배수다.

```python
def gcd(n, m):
    while n:
        t = m % n
        m, n = n, t
    return abs(m)

def getLcm(n, m):
    return n*m//gcd(n, m)

def solution(n):
    lcm = n[0]
    for i in range(1, len(n)):
        print(lcm)
        lcm = getLcm(lcm, n[i])
    return lcm

print(solution([2, 6, 8, 14]))

```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[여러수의최대공배수]<https://codeday.me/ko/qa/20190307/15670.html>
[참고블로그]<https://m.blog.naver.com/PostView.nhn?blogId=yongyos&logNo=221492070718&categoryNo=39&proxyReferer=https%3A%2F%2Fwww.google.com%2F>
