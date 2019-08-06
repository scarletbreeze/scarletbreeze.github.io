---
layout: post
title: programmers(77)level_3(멀리뛰기)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-06
---

## 문제: 77. 멀리뛰기

```python
def solution(n):
    a,b = 1,2
    if n == 1:
        return 1
    if n == 2:
        return 2
    for i in range(2,n):
        a,b = b%1234567 , (a+b)%1234567
    return b
```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
