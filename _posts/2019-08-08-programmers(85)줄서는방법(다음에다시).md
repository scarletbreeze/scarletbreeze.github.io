---
layout: post
title: programmers(84)level_3(최고의집합)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-08
---

- 다음에 다시

## 문제: 85. 줄 서는 방법

- 시간초과

```python
from itertools import permutations
def solution(n, k):
    answer = list(list(permutations(range(1, n+1), n))[k-1])
    return answer
print(solution(3, 5))

```

- 직접 구하는 문제가 아닌가 ?
- 마치 수학문제와 같다.
- 그래서 써봤다.
- n(사람)이 2명이면 총 2가지
- n = 3 총 6가지
- n=4 총 24가지
- 따라서 n!경우의 수가 나온다.
- 이를 다시 말하면 1부터 n까지 줄을 서는 총 경우의 수는 n!개 이며, 맨 앞의 수를 임의의 m으로 잡고, 나머지 수를 배열하는 방법은 (n-1)!이다.
- 따라서 k를 (n-1)!으로 나눈다면, k번째 방법이 어떤 임의의 수 m번이 맨 앞으로 오는 지 알 수 있게 된다.
- 맨 앞의 수를 정한 뒤, 그 뒤에 올 수들도 앞의 방법과 동일하게 정해주면, 사전순으로 나열이 된다.
- ***

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
