---
layout: post
title: programmers(87)level_3(줄서는방법)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-19
---

## 줄서는 방법

## 시간초과(1)

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

## 인식불가

- n과 m처럼 풀려고 했는데, 시간 초과가 나나 보다. 아마도 ?
- global result를 함수 안에서 정의한 함수 안에서 사용하니, 인식이 되지 않았다.

```python
def dfs(s):
    global result
    global k
    visited[s] = True
    if len(result) == 3:
        k -= 1
        if k == 0:
            print(result)
        return
    for next in range(1, n+1):
        if not visited[next]:
            visited[next] = True
            result.append(next)
            dfs(next)
            result.pop(-1)
            visited[next] = False
n = 3
k = 5
visited = [False]*(n+1)
result = []
dfs(0)

```

- 그래서 방법이 뭔지 찾아봤고
- codedrive님의 글을 참고했다.
- 1부터 n명까지 줄을 서는 총 경우의 수는 맨 앞에 서있는 사람이 m번인 경우 보통 (n-1)!개씩 있다.
- 예를 들어 문제에서 n이 3일 경우 나올 수 있는 총 경우의 수는 3x2x1인 6가지였다.
- 따라서 k를 (n-1)!로 나눈다면 k번째 방법이 어떤 임의이의 수 m번 앞으로 오는지 알 수 있게 된다.
- 맨 앞의 수를 정한 뒤, 그 뒤에 올 수들도 동일하게 정해주면 사전 순으로 나열이 된다.
- k를 (n-1)!로 나눈 뒤, 몫은 맨 앞의 수를 정하는데 사용하고, 나머지를 다시 한번 ((n-1)-1)!으로 나누어서 다음 수를 정해주는 방식을 진행한다.

```python
def solution(n,k):
    import math as m
    num_list=list(range(1,n+1))
    answer_list=[]
    while n > 0:
        n-=1
        p,r=divmod(k,m.factorial(n))
        if r == 0:
            p-=1
        answer_list.append(num_list[p])
        num_list.remove(num_list[p])
        k=r
    return answer_list
```

---

참고자료
[codeplus](https://code.plus/course/33)
[codedrive님블로그](https://codedrive.tistory.com/tag/줄%20서는%20방법)
