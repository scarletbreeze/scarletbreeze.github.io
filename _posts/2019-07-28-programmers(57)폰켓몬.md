---
layout: post
title: programmers(57)level_2(폰켓몬)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-28
---

## 문제: 57. 폰켓몬

- N마리의 포켓몬 중, N/2가져가도 좋다
- 포켓몬은 종류에 따라 번호를 붙여 구분
- [3,1,2,3]이라면, 4마리 중 2마리를 고르는 방법은 6가지
- 3번 1번 / 3번 2번 / 3번 3번 / 1번 2번 / 1번 3번 / 2번 3번
- 이중, 포켓몬은 한 종류만 가질 수 있다면 같은 포켓몬을 고르는 3번 3번이 들어가는 경우는 제외.
- 이 중 가질 수 있는 포켓몬 수의 종류의 최대값은 2다.
- N마리의 포켓몬의 종류번호가 담긴 배열이 매개변수로 주어질 때, N/2마리의 포켓몬을 선택하는 방법 중, 가장 많은 종류의 포켓몬을 선택하는 방법을 찾아, 그 떄의 포켓몬 종류 번호의 개수를 return하도록 하는 함수 완성

- 제약사항
- nums는 포켓몬의 종류번호가 담긴 1차원 배열
- nums의 길이(N)는 1이상 10,000 이하의 자연수, 항상 짝수
- 폰켓몬의 종류 번호는 1이상 200,000이하의 자연수

```python
def solution(n):
    maxNum = len(n)//2
    N = list(set(n))  # n의 중복 제거
    return len(N) if maxNum >= len(N) else maxNum
print(solution([3, 3, 3, 2, 2, 2]))

```

### 다른 사람 풀이

```python

def solution(n):
    return min(len(n)/2, len(set(n)))
print(solution([3, 3, 3, 2, 2, 2]))

```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
