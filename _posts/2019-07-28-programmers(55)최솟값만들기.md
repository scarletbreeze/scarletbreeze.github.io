---
layout: post
title: programmers(55)level_2(최솟값만들기)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-28
---

## 문제: 55. 최솟값 만들기

- 길이가 같은 배열 A,B가 두개가 있다
- 배열은 자연수로 이루어짐
- 배열 A,B에서 각각 한 개의 숫자를 뽑아 두 수를 곱한다.
- 이러한 과정을 배열의 길이만큼 반복하며, 두 수를 곱한 값을 누적하여 더한다.
- 이 때, 최종적으로 누적된 값이 최소가 되도록 만드는 것이 목표다.

```python
def solution(A,B):
    return sum([i*j for i, j in zip(sorted(A), sorted(B, reverse=True))])

```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
