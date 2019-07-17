---
layout: post
title: programmers(2)_level1_체육복
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers
date: 2019-07-17
---

## 문제: 체육복 (그리디)

체육복을 빌릴 수 있는 건 바로 앞번호 학생 혹은 바루 뒷번호 학생.
체육복이 없으면 수업을 못 들으며 최대한 많은 학생이 체육수업을 들어야 한다.

- 전체 학생 수 n
- 체육복을 도난 당한 학생들의 번호가 담긴 배열 lost
- 여별의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve

체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 하는 solution 함수 작성

**제한사항**

- 전체 학생 수는 2~30
- 체육복을 도난 당한 학생의 수느 1명 이상 n명 이하. 중복되는 번호x
- 여벌의 체육복을 가져온 학생의 수는 1명 이상 n명 이하, 중복되는 번호x
- 여벌 체육복이 있는 학생만 다른 학생에게 체육복을 빌려줄 수 있음
- 여벌 체육복을 가져온 학생이 체육복을 도난 당할 수 있다. 이 때 이 학생은 체육복을 하나만 도난 당했다고 가정, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없다.

**예제**
n= 5, lost[2,4], reserve[1,3,5] return 5
n= 5 , lost[2,4], reserver[3] return 4
n= 3, lost[3], reserve[1], return 2

### 접근방법

index = 리스트 한 개 선언-> 우선 1로 다 초기화한 리스트 갖기
num = 아이들이 가지고 있는 체육복의 개수를 담은 리스트
lost에는 잃어버린 아이들 체육복 갖고 있다. -> 이를 num에 반영해서 하나씩 빼준다.
reserve에는 아이들이 여분으로 가져온 체육복이 있다. 이를 -> num에 반영해준다.
num을 돌면서, 갯수가 0이면, 인덱스 좌우를 살펴서, 2라면,1을 빼주고, 해당 인덱스에 1을 더해준다.
num 리스트 안에있는 값 다 더해서 출력

우선 이렇게 생각하고 최대한 빨리 풀어보자.

## 어려웠던 것

> list의 인덱스 범위를 초과하는데, idx+1에 어떻게 접근하지 ? 예외 처리를 해줘야하나 ? 이 생각에 시간을 많이 잡아 먹았다.
> 예를 들어 num = [1, 2, 0, 1, 0, 2]라고 한다면
> 반복 범위를 range(1,num)으로 해주면 5번 반복할거다. 이 때마다 왼쪽만 비교해주는거다. 2,0일 때 차례대로 if문 걸어줘서 계산해준다.
> 왼쪽의 경우의 수만 따져서, x가 2일 때, 왼쪽이 0이면 값 처리해주고
> x가 0일 때 왼쪽이 2이면 값 처리해주는 방식으로 구현했다.

### 알게된 것

- enumerate(num,1):
- 뒤에 세기 시작할 숫자를 입력해주면, 그 순서대로 센다.
- enumerate를 사용하면서 인덱스를 1부터 세려고 했는데, 그렇게 하는 방법은 없는 것 같다. 그래서 range를 사용하여 (1,len(list)) 이렇게 사용했다.

```python
n = 5
lost = [2, 4]
reserve = [1, 3, 5]

# num = [i for i in range(1, n+1)]
def solution(n, lost, reserve):
    num = [1]*n
    for idx in range(n):
        for i in lost:  # lost에서 하나 꺼내
            if(idx+1 == i):
                num[idx] -= 1
        for i in reserve:  # reserve에서 하나식 꺼내
            if(idx+1 == i):
                num[idx] += 1

    for i in range(1, n):
        if(num[i] == 2 and num[i-1] == 0):
            num[i-1] += 1
            num[i] -= 1
        elif(num[i] == 0 and num[i-1] == 2):
            num[i-1] -= 1
            num[i] += 1

    for i in range(n):
        if (num[i] == 2):
            num[i] = 1
    return sum(num)

```

코드가 굉장히 지저분하다.

다른 사람의 코드를 가져오니 정말 코드가 간결하다.

```python
def solution(n, lost, reserve):
    # 여벌을 가져온 사람이 분실당할 수 있기 때문에,
    # 여벌을 가져온 사람 중 분실하지 않은 사람을 _reserve 리스트에 담는다.
    _reserve = [r for r in reserve if r not in lost]
    # 분실한 사람 중 여벌을 가져온 사람이 있을 수 있기 때문에
    # 여벌을 가져오지 않은 사람 중 분실한 사람을 _list 리스트에 담는다.
    _lost = [l for l in lost if l not in reserve]

    for r in _reserve:
    # 여벌을 가져온 사람 포문을 돌면서
        f = r - 1 # 출석번호가 1씩 차이나니까, r-1 즉  f는 이전 사람이다.
        b = r + 1 # b는 뒷 사람이다.
        if f in _lost: # 앞 사람이 _lost에 있다면,
            _lost.remove(f) # _lost에서 빼준다.
        elif b in _lost: # 뒷 사람이 _list에 있다면,
            _lost.remove(b) # _lost에서 빼준다.
    return n - len(_lost)
```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
