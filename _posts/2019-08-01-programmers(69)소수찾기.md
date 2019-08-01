---
layout: post
title: programmers(69)level_2(소수찾기)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-08-01
---

## 문제: 69. 소수 찾기

- 주어진 숫자를 조합해서 소수를 몇개 만들 수 있는지 알아본다

```python
import itertools


def solution(numbers):
    answer = 0
    # 소수 구해놓기 - 에라토스테네스의 체
    n = 1000000
    prime = set(range(2, n+1))
    for i in range(2, n+1):
        if i in prime:
            prime -= set(range(i*2, n, i))

    # 부분집합 생성
    arr = list(numbers)

    # 중복을 제거할 집합
    checknum = []
    for i in range(1, len(arr) + 1):
        arr2 = list(itertools.permutations(arr, i))
        for j in arr2:
            num = int(''.join(j))  # 정수 하나를 가진 집합을 바로 생성할 수 없으니, 리스트에 담아서 생성하자
            checknum.append(num)
    for check in set(checknum):

        if check in prime:
            answer += 1
    return answer


print(solution("011"))

```

- 에라토스테네스의 체를 통해서 밖에서 소수를 구한 뒤 문제를 풀었다.

## 다른 사람 풀이

```python
from itertools import permutations
def solution(n):
    a = set() # a라는 집합 선언
    for i in range(len(n)): # 입력된 카드 수만큼
        a |= set(map(int, map("".join, permutations(list(n), i + 1))))
        # list(n)을 이용하여 문자열을 리스트 안에 하나씩 담음
        # permutations를 적용, 전체 부분집합의 개수를 구한다
        # map을 이용해, 각각의 문자열을 합쳐주고
        # map을 이용해 그 문장려을 정수로 변환
        # 그리고 중복을 제거하기 위해, 집합의 합집합 연산을 구함
    a -= set(range(0, 2))
        # 0과 1은 제거
    for i in range(2, int(max(a) ** 0.5) + 1):
        # 구한 정수형 집합의 가장 큰 수를 찾은 뒤, 해당 수의 루트를 구해서 +1한 값만큼 까지의 수를 나열
        #그 중, 에라토스테네스의 체를 이용하여 소수 제거
        a -= set(range(i * 2, max(a) + 1, i))
    return len(a) # 소수의 개수 반환
```

- 이 풀이 정말 깔끔하다. 내가 머릿 속에서 구현하려고 했던 것들이 그대로 코드로 작성이 되어있다.
- 정확히 해당하는 숫자의 개수 만큼 `for i in range(2,int(max)**0.5)+1`을 해준 것이 관건이었다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
