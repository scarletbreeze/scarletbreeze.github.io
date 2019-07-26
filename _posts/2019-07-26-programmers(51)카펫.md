---
layout: post
title: programmers(51)level_2(카펫)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-26
---

## 문제: 51. 카펫

- 중앙에는 빨간색, 모서리는 갈색으로 칠해져 있는 격자 모양의 카펫이다.

- 이걸 어떻게 완전 탐색할까? DP로도 풀 수 있을 것 같은데..
- red가 주어지면, brown은 red를 감싼다.
- red가 1일 때, brown은 8이다.
- red가 2일 때, brown은 10이다.
- red가 3일 때, brown은 12이다.
- red가 4일 때 (정사각형이면) 12, (직사각형이면 )14이다.
- 즉 red의 갯수에 따라서 brown의 크기가 결정된다.

- 다시
- red가 1일 때, 만들 수 있는 사각형 1개
- red가 2일 때 만들 수 있는 사각형 2개
- red가 3일 때 1개
- red가 4일 때 3개, (약수)

- 여기서 카펫의 가로 길이는 세로 길이와 같거나, 세로 길이보다 길기 때문에, red의 가로가 세로보다 더 길어야 한다.

- 접근을 잘못했다.
- 단순하게 위, 아래, 좌 우 row와 col을 제외한 크기를 곱하면 빨간 타일의 갯수가 나온다.

## 참고블로그

- 위, 아래 row와 좌 우 col을 제외한 크기를 곱하면 빨간타일의 갯수가 나온다.

```python
def solution(brown, red):
    for a in range(1, int(red**0.5)+1):
        if red % a == 0:
            b = red // a
            if 2*a + 2*b + 4 == brown:
                return [b+2, a+2]

    # math.sqrt를 쓰지 않고도 이렇게 구할 수 있다.

```

- 루트를 구하기 위해서 `import math`를 하지 않고, 위와 같은 방식으로 int(red\*\*0.5)를 통해 구할 수 있다.
- red = A\*B이며, brown은 2(A+B)+4이다. 이 때, A와B를 찾는 것이다.
- a가 red로 나누어 떨어지면서, b를 a로 나누었을 때, 2*a + 2*b+4 = brown이라면 찾는 수이다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>

[참고블로그]
<https://swjeong.tistory.com/74>

[참고블로그]<https://geonlee.tistory.com/114>
