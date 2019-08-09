---
layout: post
title: programmers(82)level_3(디스크컨트롤러)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-08
---

## 문제: 82. 디스크 컨트롤러

- 끝나는 시간을 기점으로 우선순위 큐를 사용하여 최소힙 정렬을 한다.
- 운영체제 시간에 CPU 스케쥴링 했을 때도, 배웠던 개념

- 실패

```python
import heapq


def solution(jobs):
    heap = []
    for job in jobs:
        heapq.heappush(heap, (job[1], job[0]))
    e1, s1 = heapq.heappop(heap)
    result = e1
    while heap:
        e2, s2 = heapq.heappop(heap)
        result += e1+e2-s2
        e1, s1 = e2+e1, s2
    return result//len(jobs)


print(solution([[1, 2], [0, 5], [5, 5]]))
# print(solution([[0, 3], [4, 6], [5, 9]]))

```

- 뭔가 잘 짤 수 있을 것 같았는데 머리가 돌아가지 않는다.
- 그냥 계산하는 방법은 FCFS 방법이다.
- 이를 해결하기 위해선 Shortest Job First를 해야한다. (SJF)
- 즉 짧은 요청을 먼저 수행하는 것이다. (나는 endpoint로 정렬을 했었는데 그게 틀렸다.)

- codedrive님의 코드를 보며 차근차근 풀이해보자. 이 코드도 이해가 안가서 직접 손으로 써가며 이해를 해야 했다.

- ![No Image](/assets/posts/20190808/2.png)

```python
import heapq


def solution(jobs):
    last = -1
    now = 0
    answer = 0
    wait = []
    n = len(jobs)
    count = 0
    while(count < n):
        for job in jobs:
            if last < job[0] <= now:  # 처음에는 0이 들어와야 하니까. -1과 0
                answer += (now-job[0])
                heapq.heappush(wait, job[1])
                # print("몇번이나?")
        print("answer , wait", answer, wait)
        if len(wait) > 0:

            answer += len(wait)*wait[0]
            # print("answer %d, len(wait)*wait[0]: %d" %
            #       (answer, len(wait)*wait[0]))
            last = now
            now += heapq.heappop(wait)
            count += 1
            print(answer, last, now, count)
        else:
            now += 1
            # print("now 증가:", now)
    return answer//n


print(solution([[0, 3], [1, 9], [2, 6]]	))

# sorted [0,1,3,5,6]

```

- ![No Image](/assets/posts/20190808/1.png)

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://codedrive.tistory.com/tag/디스크컨트롤러>
