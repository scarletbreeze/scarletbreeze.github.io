---
layout: post
title: programmers(84)level_3(최고의집합)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-08
---

## 문제: 84. 최고의집합

- 각 원소의 합이 S가 되는 수의 집합
- 위 조건을 만족하면서 각 원소의 곱이 최대가 되는 집합

- 자연수 2개로 이루어진 집합 중, 합이 9가 되는 집합은 다음과 같이 4개가 있다.
- {1,8}, {2,7}, {3,6}, {4,5}
- 이중 각 원소의 곱이 최대인 {4,5}가 최고의 집합이다.

- 제한 사항
- 최고의 집합은 오름차순으로 정려로딘 1차원 배열로 return해야한다.
- 최고 집합이 존재하지 않을 경우, 크기가 1인 1차원 배열에 -1을 채워서 return

- 자연수의 개수 n은 1이상 10,000 이하의 자연수
- 모든 원소들의 합 s는 1이상, 100,000,000이하의 자연수이다.

## 생각지도 못한 방법

```python

def solution(n, s):
    if n > s:
        return [-1]
    [portion, remain] = divmod(s, n)
    answer = [portion]*n
    for i in range(remain):
        answer[i] += 1
    return sorted(answer)


print(solution(2, 9))
```

- codedrive님의 코드를 보고 정말 놀랐다.
- 곱이 최대가 되려면, 원소들이 골고루 높아야 한다는 특성을 이용하셨다.
- 수학을 잘하면 코딩이 편해진다는게 이런 말인듯 하다.
- divmod 함수는 `Return the tuple (x//y, x%y). Invariant: div*y + mod == x.`
-

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[codedrive님의코드]<https://codedrive.tistory.com/tag/%EC%B5%9C%EA%B3%A0%EC%9D%98%20%EC%A7%91%ED%95%A9>
