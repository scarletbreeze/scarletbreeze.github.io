---
layout: post
title: programmers(59)level_2(가장_큰_정사각형_찾기)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-28
---

## 문제: 59. 가장 큰 정사각형 찾기

- 1과 0으로 채워진 표가 주어진다. (board)
- 표에서 이루어진 가장 큰 정사각형을 찾아 넓이를 리턴하는 함수 완성

- for문을 두번 돌면서 이차원 배열을 순회한다.
- 그리고 나서 1일 때, 한번도 이차원 배열을 돌면,4중 포문이 되는데..

- 이 문제는 잘 모르겠네. 풀이방법을 찾아보자.

## 참고한 풀이방법

- 최고 큰 정사각형 한변 기록이 r이라고 하면
- 보드의 점이 1이면, (x-1,y-1),(x,y-1),(x-1,y) 세점이 1인지 확인한다.
- 세 점이 0이면, 현재 위치와 r과 비교하여 크면 r을 갱신,
- 세 점이 1 이상이면, 세점 중 가장 작은 수 +1을 현재 위치에 대입
  - 현재위치 r과 비교하여 크면 r 갱신
- 최종 r을 제곱하면 가장 큰 정사각형의 크기를 구할 수 있다.

```python
def solution(arr):
    r = 0
    for y in range(len(arr)):
        for x in range(len(arr[0])):  # 정사각형이므로
            if(arr[y][x]):  # 0이 아니면,
                length = min([arr[y-1][x-1], arr[y-1][x], arr[y][x-1]])
                if length and x and y:  # 값이 0이 아니면,
                    arr[y][x] = length+1
                if arr[y][x] > r:
                    r = arr[y][x]
    return r*r


print(solution([[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [0, 0, 1, 0]]	))
```

- 이렇게 풀 수 있다는 걸 배웠다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://burningrizen.tistory.com/150?category=816215>
[참고블로그2]<http://dailyddubby.blogspot.com/2018/03/24.html>
