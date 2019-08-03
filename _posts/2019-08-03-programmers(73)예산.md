---
layout: post
title: programmers(73)level_3(예산)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-03
---

## 문제: 73. 예산

- 국가의 역할 : 지방의 요청에 대해 예산 분배
- 정해진 총액 이하에서 가능한 한 최대의 총 예상을 배정
- 1. 모든 요청이 배정될 수 있는 경우-> 요청된 금액을 그대로 배정
- 2. 모든 요청이 배정될 수 없는 경우 -> 특정한 정수 상한액 계산. 그 이상인 예상 요처은 모두 상한액 배정
- 상한액 이하의 요청은 그대로 요청한 금액 배정

- 예를 들어 전체 국가 예산 485.
- 4개의 지방의 예산 요청이 120,110,140,150
- 상한액을 127로 잡으면, 각각 120,110,127,127을 배정. 그 합이 484로 가능한 최대가 된다.

- 제한 사항
- 지방의 수는 3이상 10만 이하
- 각 지방에서 요청하는 예산은 1이상 10만 이하
- 총 예산은 10억 이하인 자연수

- 단순한 생각으로 짠 코드

```python
def solution(budgets, M):
    total = sum(budgets)
    average = total//len(budgets)
    for i in budgets:
        if i < average:
            M -= i
    maxNum = M//2
    return maxNum


print(solution([120, 110, 140, 150], 485))
```

- 예시만 통과 모든 문제 실패

## 이 문제 어떻게 접근 ?

- [5,5,5,5,15,30] 예산이 62인 경우를 생각해본다
- 단순히 균등 분배하게 되면 [5,5,5,5,21,21]이 되서 21이 나오지만, 실제 정답은 [5,5,5,5,15,27]이 나와야 한다.
- 이분탐색을 어떻게 적용하지 ?

- 이분탐색의 핵심은 찍기다. -> 상한액을 이분 탐색을 통해 찍어가는 방식이다. 여기서는 mid가 상한액을 뜻한다.

- left와 right의 변수를 두고, left=0, right는 budgets의 max값을 둔다. (예제 코드를 예로 들면 left는 0, right는 150)
- 처음에는 mid에 75가 들어간다. 이를 통해,
- result 값에 75\*4가 들어가므로, 예산 M보다 작다.
- 따라서 left에 mid+1을 집어넣고 시작한다.
- 그러면 상한액은 (150+76)//2가 되므로 즉 113이 된다.
- 113\*3+110<=485 이므로,113+1로 left를 갱신하고, 이분 탐색을 진행한다
- 그 다음 상한액은 (114+150)//2, 즉 132가 된다.
- 132는 120+110+132\*2 >= 485 이므로, right을 132-1을 선택해서 이분탐색을 진행한다.
- (right(131) + left(114))//2 => 122
- 127로 계산해보면, 120+110+127\*2 해서 484가 나온다.
- 반복하다보면 최대값을 구할 수 있다.

```python
def solution(budgets, M):
    left = 0
    right = max(budgets)
    answer = 0
    while (right >= left):  # left>right이면, 반복문 종료 , (left 값에 종료 기준을 맞)
        mid = (left+right)//2  # 상한액
        result = 0  # 상한액을 고려한 계산값
        for i in budgets:
            if mid > i:
                result += i
            else:
                result += mid
        if result > M:  # 계산값이 예산보다 크면, 상한액-=1
            right = mid-1
        else:  # 계산값이 예산보다 같거나 작으면
            answer = mid
            left = mid + 1
    return answer

print(solution([120, 110, 140, 150]	, 485))

```

## 다른 사람들 풀이

```python
def solution(budgets, M):
    lim = max(budgets)  # 상한액 지정

    while True:
        if sum(budgets) < M:  # 값을 다 더한게 상한액을 넘지 않으면,
            answer = max(budgets)  # budgets에서 가장 큰 값 뽑기
            break
        # budgets 갱신 -> x가 상한액 보다 작으면 그대로. 그렇지 않다면, 상한액으로 만들기
        budgets = list(map(lambda x: x if x <= lim else lim, budgets))
        lim = lim-1

    return answer
print(solution([120, 110, 140, 150]	, 485))

```

- 위 방법은 상한액만을 고려해서, 하나씩 감소 시켜가며 찾는 방식이다.
- 바로 위 방법이 깔끔해 보이긴 하지만, 아래에 참고블로그에 적힌 분이 작성하셨던 코드가 효율이 좋다.
- 왜냐하면, 상한액과 하한액을 고려하여 두 변수를 조정하고 있기 때문이다.
- 이 방법이 진정한 이분 탐색을 구한 것이라고 볼 수 있다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[코드참고]<https://codedrive.tistory.com/47>
