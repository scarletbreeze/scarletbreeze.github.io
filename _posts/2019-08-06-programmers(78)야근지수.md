---
layout: post
title: programmers(78)level_3(야근지수)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-06
---

## 문제: 78. 야근지수

- 수식을 구해서 풀면 될 줄 알았는데 실패했다

```python
def solution(n, works):
    total = sum(works)
    cnt = len(works)
    result = 0
    if total <= n:
        return 0
    else:
        total = total - n
        if total % cnt == 0:
            result = (((total//cnt)**2)*cnt)
            return result
        else:
            mok = total // cnt
            nam = total % cnt
            result = [mok]*cnt
            for i in range(nam):
                result[i] = result[i]+nam
            return sum(map(lambda x: x**2, result))

print(solution(1, [2, 1, 2]))

```

- 테스트 케이스만 통과한다.

* 그냥 정렬해서 쉽게 가자

```python
def solution(n, works):
    answer = 0
    if n > sum(works):
        return answer
    for i in range(n):
        works.sort()
        works[-1] -= 1
    answer = sum(map(lambda x: x**2, works))
    return answer


print(solution(1, [2, 1, 2]))

```

- 시간 초과가 뜬다. 정렬을 하지 말란 소리다.
- 매 루프마다 가장 큰 값을 새로 찾아야 한다.
- 우선순위 큐를 사용해보자.

```python
import heapq


def solution(n, works):
    for i in range(len(works)):
        works[i] *= -1  # maxheap을 만들기 위해 편의상 모두 -1을 곱해서 힙 정렬 해줬다.
    heapq.heapify(works)
    for i in range(n):
        m = heapq.heappop(works)
        if m >= 0:
            heapq.heappush(works, m)
            break
        m += 1
        heapq.heappush(works, m)
    answer = sum(map(lambda x: x**2, works))
    return answer


print(solution(4, [4, 3, 3]))
```

- 리스트가 있어. 그리고 그 리스트 안에서 가장 큰 값을 뽑애줘야해 ?
- 그럴 때 계속 index.(max(~))를 이용해주거나, sort()를 이용해줄 수도 있지만, 우선순위 큐를 쓰면 보다 빠르다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://blog.rajephon.dev/2018/10/14/programmers-solution-level3-no-overtime/>
[우선순위큐]<https://www.daleseo.com/python-heapq/>
