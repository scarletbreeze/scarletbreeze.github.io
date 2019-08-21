---
layout: post
title: programmers(86)level_3(거스름돈)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-19
---

## 거스름돈

- 백준 동전1 문제와 완전히 동일한 문제

```python
def solution(n, money):
    d = [1]+[0]*n
    for m in money:
        for i in range(m, n+1):
            d[i] += d[i-m]
    return d[n]
print(solution(5, [1, 2, 5]))
```

---

참고자료
[codeplus](https://code.plus/course/33)
