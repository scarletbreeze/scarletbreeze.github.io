---
layout: post
title: programmers(50)level_2(숫자야구게임)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-26
---

## 문제: 50 숫자야구게임

- 질문한 세 자리의 수, 스트라이크의 수, 볼의 수를 담은 2차원 배열이 주어질 때, 가능한 답의 개수를 return 하도록 하는 함수 작성

- 예시 코드
- [[123, 1, 1], [356, 1, 0], [327, 2, 0], [489, 0, 1]]

- 답을 모르는 상태에서 답을 어떻게 찾지 ?

- 완전탐색

- 1~9까지의 수 중에서, 길이가 3이고 중복을 허용하지 않기 때문에 가능한 경우의 수가 매우 작다.

- 길이가 3이고 1~9까지 중복을 허용하지 않는 3자리의 숫자의 경우의 수를 모두 구하는 건 `itertools`의 `permutations`를 이용해서 간단하게 만들 수 있다.
- `lst= list(permutations([1,2,3,4,5,6,7,8,9],3))`

- check_score라는, 질문한 숫자와 비교하여 알맞은 스코어를 반환하는 경우를 찾는 함수를 구현하자
- strike의 경우, 앞에서부터 for loop을 이용해서 비교한다.
- **ball의 경우, set으로 바꿔서 교집합의 크기를 구한다.**
- **이 크기에서 strike의 값을 빼면 ball이 나온다.**
- 이를 제공된 스코어와 비교하여, 적합하지 않은 경우, 전체 경우의 수에서 제거한다.

```python
from itertools import permutations


def check_score(question, candidate, s, b):
    strike = 0
    for i in range(len(question)):
        if question[i] == candidate[i]:
            strike += 1
    if s != strike:
        return False
    ball = len(set(question) & set(candidate))-strike
    if b != ball:
        return False
    return True


def solution(baseball):
    lst = list(permutations([1, 2, 3, 4, 5, 6, 7, 8, 9], 3))

    for i in baseball:
        for item in lst[:]:
            if not check_score([int(i) for i in list(str(i[0]))], item, i[1], i[2]):
                lst.remove(item)
    return len(lst)


print(solution([[123, 1, 1], [356, 1, 0], [327, 2, 0], [489, 0, 1]]	))

```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://geonlee.tistory.com/116>
