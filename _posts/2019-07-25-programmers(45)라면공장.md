---
layout: post
title: programmers(45)level_2(라면공장)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-25
---

## 문제: 45 라면공장

- 입출력 예제
  stock dates supplies k result
  4 [4,10,15][20,5,10] 30 2

- 몇 번을 밀가루 공급을 받아야 하는지 구해야 하는 문제다.

- 현재 밀가루가 4톤(stock)이다.
- 하루에 1톤씩 사용하기 때문에, 오늘 하루, 사용하고 쭉쭉 가다보면 4일 째에는 0이 되므로 5일 새벽에는 반드시 공급을 받아야 한다. 그래야 점심에 가동하니까.

- k가 주어지므로 전체 일 수는 30을 넘어가서는 안된다.
- 일수는 k를 넘어서지 않는다. 30이라면 많아봤자 29번 반복한다는 뜻.
- dates의 인덱스에 해당 하는 날에 stock을 검사한다.
- dates[i+1] -dates[i] 가 남아 있는 stock보다 크면 stock을 채워주고 횟수를 기록한다. ?

- 이걸 힙을 어떻게 사용하지 ?
- 확실한 건, stock, k는 10만 이하,
- dates와 supplies의 길이는 2만 이하.즉 굉장히 수가 크다.

- 즉 반복문을 1씩 차감하듯 돌면 효율성 테스트에서 실패할 것 같다.?

## 우선 그냥 하루씩 반복해보자.

- while문 돌면서, k번 반복하며
- 공급 큐가 있다고 생각하고, 남은 밀가루가 0이 되면, 큐에서 하나식 빼서 공급을 해주는 것이다.

- 0~k-1까지 돌면서
- 1. 공급일정 검사 -> 공급일정 검사해서 공급 큐에 넣기
- 2. 작업 시작 전 조건 -> 남은 밀가루가 0이면 공급
- 3. 작업시작 : stock-=1

## 우선 그냥 작성해 봤다.

```python
def solution(stock, dates, supplies, k):
    answer = 0
    supQueue = []
    for day in range(k):  # 0일부터 29일까지
        # 공급일정 검사
        if(dates and dates[0] == day):
            print(dates)
            dates.pop(0)
            supQueue.insert(0, (supplies.pop(0)))
            print(supQueue)
        # 작업 시작 전
        if(stock == 0):
            stock += supQueue.pop(0)
            answer += 1
        # 작업시작
        stock -= 1
        print(day, stock)

    return answer
print(solution(10, [5, 10], [1, 100], 110))

```

- 예제코드는 통과하지만 정확성 테스트를 다 만족하지 못한다.
- 왜 그런가 봤더니, Queue에 넣을 때, 최소한의 횟수로 밀가루를 공급받기 위해서는 가장 큰 수량부터 공급을 받아야 한다. 즉 queue가 내림차순으로 정렬이 되어있어야 한다.

```python
import heapq


def solution(stock, dates, supplies, k):
    answer = 0
    heap = []
    for day in range(k):  # 0일부터 29일까지
        # 공급일정 검사
        if(dates and dates[0] == day):
            dates.pop(0)
            num = supplies.pop(0)
            heapq.heappush(heap, (-num, num))
        # 작업 시작 전
        if(stock == 0):
            stock += heapq.heappop(heap)[-1]
            answer += 1
        # 작업시작
        stock -= 1

    return answer


print(solution(4, [4, 10, 15], [20, 5, 10], 30))

```

- 이렇게 하니 효율성 테스트에서 막힌다.

- 어떻게 해야 통과할 수 있을까?
- day일 수가, k보다 커지면, for문을 계속할 필요가 없다. 즉 뒤를 보지 않아도 된다.

## 코드

```python
import heapq
def solution(stock, dates, supplies, k):
    answer = 0
    heap = []
    idx = 0  # lastAddedIdx
    while stock < k:
        while idx < len(dates) and dates[idx] <= stock:
            heapq.heappush(
                heap, (-supplies[idx], supplies[idx]))
            idx += 1
        stock += heapq.heappop(heap)[-1]
        answer += 1

    return answer


print(solution(4, [4, 10, 15], [20, 5, 10], 30))
```

- 결국 날의 경과를 하나씩 더해가면서 해줄 필요 없이.
- dates의 순서대로 heap에서 빼가면서, 값을 더해주고,
- 그 더한 값이 k보다 클 때가 언제인지를 찾아주면 된다.

- `dates[idx]<=stock`이 이해가 잘 안갔었다.
- stock은 곧 dataCanRunFactory, 즉 공장이 가동할 수 있는 날을 의미하기에
- 해당 날이 지나면, 충전을 할 수 있음을 뜻하므로 -> queue에 넣으라는 조건이 된다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://cheolhojung.github.io/posts/algorithm/Programmers-RamenFactory.html>https://cheolhojung.github.io/posts/algorithm/Programmers-RamenFactory.html
[참고블로그]<https://codedrive.tistory.com/82>
