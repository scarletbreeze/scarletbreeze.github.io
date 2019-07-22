---
layout: post
title: programmers(38)level_2(전화번호목록)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-22
---

## 문제: 38. 전화번호 목록

- 한 번호가 다른 번호의 접두어인 경우가 있으면 false
- 그렇지 않으면 true를 리턴하는 함수 작성

- 입출력 예시. ["119","9764223","11955224421"] -> false
- ["123","456","789"] -> true
- ["12","123","1235","567","88"] -> false

### 생각한 방법.

- 간단하게 생각하면 수를 정렬한 뒤, 단순히 각 리스트의 패턴을 비교해서 풀이하는 방법도 있을 수 있다.
- 문자열로 비교하지 않고 어떻게 해시로 구현할 수 있을까?
- 문자열로 비교한다면 for문을 두개 사용해서 구할 수 있다.

```python
def solution(phone_book):
    for i in phone_book:
        idx = 0
        for j in phone_book:
            if i in j:
                idx += 1
        if(idx > 1):
            return False
    return True
print(solution(["119", "97654223", "1195524421"]))
```

- 위 코드가 틀린 이유는 접두사만 비교해야하는데, 전체 요소를 다 비교해서 그 안에서 in을 적용해서 그렇다.

```python
def solution(phone_book):
    for i in phone_book:
        idx = 0
        for j in phone_book:
            if i in j[0:len(i)]:
                idx += 1
        if(idx > 1):
            return False
    return True
print(solution(["119", "97654223", "1195524421"]))

```

### 푼 뒤에 궁금한 것

- in과 idx를 같이 써줘야 하는 상황에서는 어떻게 적용해주는 게 효율적일까?
- ( 내 경우는 idx를 선언해줘서, break를 쓰지 않아 반복을 다소 비효율적으로 해준다. 했던 비교를 또 비교하기 때문이다.)

### 예시 코드 (1)

- 이 코드는 phoneBook for문 반복이 내 코드보다 효율적이다.
- phoneBook[i], phoneBook[j] 중에서 가장 작은 수가, 가장 큰 수에 들어가는 지를 판단해준다.

```python
def solution(phoneBook):
    for i in range(len(phoneBook)):
        for j in range(i+1, len(phoneBook)):
            if min(phoneBook[i], phoneBook[j]) in max(phoneBook[i], phoneBook[j]):
                return False
    return True
print(solution(["119", "97654223", "1195524421"]))
```

### 예시 코드 (2)

```python
def solution(phoneBook):
    for i in range(len(phoneBook)):
        for j in range(i+1, len(phoneBook)):
            if phoneBook[i].starztswith(phoneBook[j]) or phoneBook[j].startswith(phoneBook[i]):
                return False
    return True
print(solution(["119", "97654223", "1195524421"]))
```

- 달라진건 startztswith 밖에 없다.
- 파이썬에서는 특정 문자열로 시작하는 문자열을 비교하는 함수로 `str.startswith("")` 과 같은 함수를 제공한다.
- 끝나는 문자열로 `endswith`라는 함수 또한 제공한다.

### 예시코드 (3)

```python
def solution(phoneBook):
    phoneBook = sorted(phoneBook)

    for p1, p2 in zip(phoneBook, phoneBook[1:]):
        if p2.startswith(p1):
            return False
    return True
```

- 정렬을 이용해서 푼다면, 다음과 같이 풀 수 있다.
- 하지만 이 코드는 효율성이 매우 좋지 않다.
- 정렬을 하게 되면, 리스트의 뒤만 비교하면 되기 때문에. for문을 한번만 사용해도 된서, 코드가 간결해진다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
