---
layout: post
title: programmers(52)level_2(다음큰숫자)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-27
---

## 문제: 52. 다음 큰 숫자

- 자연수 n이 주어졌을 때, n의 다음 큰 숫자는 다음과 같이 정의된다.
- 1. n의 다음 큰 숫자는 n보다 큰 자연수이다.
- 2. n의 다음 큰 숫자와 n은 2진수로 변환했을 때, ㅂ의 갯수가 같다.
- 3. n의 다음 큰 숫자는 조건 1,2를 만족하는 수 중 가장 작은수이다.

## 파이썬 진법 변환

- 파이선은 2진수 8진수 16진수에 대해서, 내장함수를 제공한다.
- `bin(),oct(),hex()`가 그것이다.
- 이 때, 각 내장함수는 Ob,Oo,Ox가 붙어있는 문자열을 출력한다.
- `format()`내장함수를 이용하면 다른 진수의 문자열로 바꿀 댸, 접두어를 제외할 수 있다.
- `print(format(42, 'b'))`다음과 같이 사용한다.
- 문자열 이진수를 다시 10진술 바꾸기 위해서는 다음과 같이 사용한다
- `print(int('10111', 2)`

## 생각한 방법

- 15를 2진수로 바꾸면, 1111이다.
- 1의 갯수가 같을 때, 가장 작은 자연수는
- 10111이다.
- 따라서 답은 23이다.

- 78을 2진술 바꾸면 1001110이다.
- 그 중, 1의 개수가 같고, 다음 큰 숫자는
- 1010011이다.

- 1. 1씩 더하면서 2진수로 바꾼뒤, i의 개수가 일치하는지 판단하는 방법
- 주어진 n이 백만 이하의 자연수이기 때문에, 분명히 시간 초과에 걸릴 것이다. -> 아니다 이렇게 하는게 맞다
- 2. 주어진 2진수에 대해서, 직접 변환하는 방법

  - 이건 모르겠다.

- 결국 답은 1씩 크기를 키우면서, 1의 개수가 같은 수를 센다.

```python
def solution(n):
    N = format(n, 'b').count('1')  # 원본값 기억
    for i in range(n+1, 1000001):
        if format(i, 'b').count('1') == N:
            return i

print(solution(78))

```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[파이썬2진수다루기]<https://www.daleseo.com/python-int-bases/>
[참고블로그]<https://wayhome25.github.io/algorithm/2017/03/18/nextBigNumber/>
