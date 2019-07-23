---
layout: post
title: programmers(41)level_2(프린터)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-23
---

## 문제: 41 프린터

- 중요도가 높은 문서를 먼저 인쇄하는 프린터 개발

1. 인쇄 대기목록의 가장 앞에 있는 문서 (J)를 대기 목록에서 꺼낸다
2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 단 한개라도 존재하면 J를 대기목록의 가자 마지막에 넣는다.
3. 그렇지 않으면 J를 인쇄한다.

- 예를 들어 A,B,C,D 네 개의 문서가 인쇄대기목록에 있고 중요도가 2132라면, CDBA순으로 인쇄된다.
- 내가 요청한 문서가 몇 번째로 인쇄되는지 알고 싶다.
- 현재 대기 목록에 있는 문서의 중요도가 순서대로 담긴 배열 priorities와 내가 인쇄를 요청한 문서가 현재 대기목록의 어떤 위치에 있는지를 알려주는 location이 매개변수로 주어질 때, 내가 인쇄를 요청한 문서가 몇 번쨰로 인쇄되는지 solution 함수를 작성하시오

- 제한사항
- 대기목록에는 1개이상 100개 이하 문서
- 인쇄 작업의 중요도는 1~9로 표현, 숫자가 클수록 중요
- location은 0이상 현재 대기목록에 작업 수 -1 이하의 값을 가진다. 가장 앞에 있으면 0 두번째 있으면 1로 표현

## 해결 방안

- priorities는 몇 번 반복될까? -> 인쇄되는 횟수는 어떻게 구하지? -> 직접 해봐야 할까?

1. 우선 가장 큰 수의 인덱스를 구한다.
2. 그 수만큼 리스트 슬라이스 해서 다시 넣고 해당 수 꺼낸다.
3. 이 과정 반복

- 리스트에서 빼내면서, 각 요소의 인덱스가 갱신된다.
- 따라서 인덱스 값을 기억할 필요가 있다.
- 딕셔너리는 중복을 허용하지 않아서 고려 대상 x

## 풀이

```python
def solution(priors, location):
    # 인덱스 기억
    result = []

    for i in range(len(priors)):
        priors[i] = (priors[i], i)
    while priors:
        if(len(priors) <= 1):
            result.append(priors[0])
            priors.pop(0)
        elif(0 == priors.index(max(priors, key=lambda x: x[0]))):
            result.append(priors.pop(0))
        else:
            priors.append(priors.pop(0))
    for i in range(len(result)):
        if(result[i][1] == location):
            return i+1


print(solution([1, 1, 9, 1, 1, 1], 1))

```

- 배운 것
- max 함수에서도 key값을 지정할 수 있구나. 감사하다 ... 이걸 몰라서 생고생했다.
- 슬라이스로 문제를 처리하려고 해서 오래걸렸다.

```python
temp = priors[priors.index(max(priors)):len(priors)]
priors = temp + priors[0:priors.index(max(priors))]
```

- 이렇게 처리하려고 하면, 2번째 예제를 통과하지 못한다.

## 다른 사람 풀이

- 다들 제각각이라 그냥 내 풀이를 믿고 가자.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
