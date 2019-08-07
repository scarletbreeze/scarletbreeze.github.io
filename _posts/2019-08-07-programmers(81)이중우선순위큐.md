---
layout: post
title: programmers(81)level_3(이중우선순위큐)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-07
---

## 문제: 81. 이중우선순위큐

```python
import heapq
nums = [1, 8, 3, -5, 4, 99, -4, 0]

print(heapq.nlargets(3,nums)) # -> [99,8,4]
print(heapq.nsmallest(3,nums)) # -> [-5,-4,0]

```

## 코드

```python
import heapq


def solution(operations):
    h = []
    for i in operations:
        a, b = i.split(" ")
        if a == "I":
            heapq.heappush(h, int(b))
        else:
            if len(h) > 0:
                if b == "1":  # 큐에서 최댓값 삭제
                    h.pop(h.index(heapq.nlargest(1, h)[0]))
                else:
                    heapq.heappop(h)
    return [0, 0] if not h else [heapq.nlargest(1, h)[0], heapq.nsmallest(1, h)[0]]


print(solution(["I 7", "I 5", "I -5", "D -1"]))

```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://mstst33.com/programmers-the_longest_palindrome/201/>
[heapq_nlargets_nsmallest]<https://ohgyun.com/615>
