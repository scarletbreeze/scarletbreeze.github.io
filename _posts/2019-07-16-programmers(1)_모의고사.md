---
layout: post
title: programmers(1)_level1_모의고사
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level1
date: 2019-07-16
---

## 문제 설명: 모의고사 (완전탐색)

1번은 1~5,1~5를 반복하며 숫자를 찍는다
2번은 21,23,24,25를 반복하며 숫자를 찍는다
3번은 33,11,22,44,55를 반복하며 숫자를 찍는다

1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지
배열에 담아 return 하도록 solution 함수를 작성

- 문제의 정답은 1~5까지 중 하나
- 가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순으로 정렬
- 입출력 예시 : [1,2,3,4,5] -> [1] / [1,3,2,4,2] -> [1,2,3]

## 생각한 방법

- 입력값을 배열에 담아서

1. 각각의 인덱스대로 계산하고
   - 이 때, 각자 찍는 방법 대로의 리스트를 만들어서, 그 리스트를 반복하며 비교하자
2. 세 변수를 비교해서
3. 리스트에 넣어서 반환해준다.

- Q) for문을 한번 쓰고, 세 사람의 점수 중 가장 큰 값을 출력해줄 순 없을까?
  -> 그렇게 하기 위해선,리스트 안에 값을 무한정하게 넣어줄 수 없기 때문에, index를 맞춰가며, 비교해줘야 하는데. 각자의 규칙이 다 다르다
  -> 각각 for문 세개 써서 돌리자 -> 아니다. 그냥 값을 곱해줘서 리스트 크게 만들어놓고 비교하면 간단하다.

- Q) 리스트에 값을 넣어서 비교하지말고, 인덱스로 비교하는 건 어떨까 ? -> 그것도 비효율적.

- 값을 담은 뒤,세 수를 비교해야한다.

### 내 코드

```python
def f(a, b, c):
    maxNum = max(a, b, c)
    result = []
    if a == maxNum:
        result.append(1)
    if b == maxNum:
        result.append(2)
    if c == maxNum:
        result.append(3)
    return result

one = [1, 2, 3, 4, 5]*10000
two = [2, 1, 2, 3, 2, 4, 2, 5]*10000
three = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]*10000



def solution(answers):
    ans_one, ans_two, ans_thr = 0, 0, 0
    for i, x in enumerate(answers):
        # one으로 비교
        if(x == one[i]):
            ans_one += 1
        if(x == two[i]):
            ans_two += 1
        if(x == three[i]):
            ans_thr += 1
    return f(ans_one, ans_two, ans_thr)
```

## 다른 사람 코드 보면서 분석

```python
def solution(answers):
    pattern1 = [1,2,3,4,5]
    pattern2 = [2,1,2,3,2,4,2,5]
    pattern3 = [3,3,1,1,2,2,4,4,5,5]
    score = [0, 0, 0]
    result = []

    for idx, answer in enumerate(answers):
        if answer == pattern1[idx%len(pattern1)]:
            score[0] += 1
        if answer == pattern2[idx%len(pattern2)]:
            score[1] += 1
        if answer == pattern3[idx%len(pattern3)]:
            score[2] += 1

    for idx, s in enumerate(score):
        if s == max(score):
            result.append(idx+1)

    return result

```

> 위에 코드는 정말 간결하다.나와 다른점을 몇 가지 분석해보면
> score 배열을 선언해서 [0,0,0]으로 초기화한 뒤, 한 번의 for문 안에서 처리해준 점
> 이게 내 코드의 가장 큰 문제다 -> 나처럼 미리 값을 다 곱해서 메모리에 저장해준 게 아니라, index를 % 연산자를 통해서, 나머지를 구했다.이건 꼭 기억하자
> -> 나는 함수로 빼줘서 처리를 했었는데, score를 for문을 돌면서, max(score)와 같은 경우, result에 넣어줄 수 있었다. 애초에, 2번을 통해서 []리스트 안에 한번에 값을 다 정리했기에, 마지막에 max로 가장 큰 값을 구할 때도, 한번의 간단한 제어문으로 깔끔한 코드 작성이 가능하다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
