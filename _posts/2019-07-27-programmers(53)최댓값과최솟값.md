---
layout: post
title: programmers(53)level_2(최댓값과최솟값)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-27
---

## 문제: 53. 최댓값과 최솟값

- 주어진 numbers를 나눠서, 나올 수 있는 수를 조합하여 배열에 담고, 각 수가 소수인지를 검사한다.

```python
def solution(s):
    T = list(map(int, s.split()))

    return "".join(str(min(T))+" "+str(max(T)))


print(solution("-1 -2 -3 -4"))
```

---

참고자료z
[프로그래머스]<https://programmers.co.kr/learn/challenges>
