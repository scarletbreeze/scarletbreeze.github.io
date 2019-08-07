---
layout: post
title: programmers(79)level_3(정수삼각형)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-07
---

## 문제: 79. 정수삼각형

- 삼각형의 꼭대기에서 바닥까지 이어지는 경로 중, 거쳐간 숫자의 합이 가장 큰 경우 찾기
- 다 하나씩 더해가면서 값을 구한다. ?

## 풀이방법

- 모르겠어서 codeDrive님의 코드를 찾아봤다.

-![No Image](/assets/posts/20190807/1.png)

```python
def solution(triangle):
    for i in range(1, len(triangle)):
        for j in range(i+1):
            if j == 0:  # 앞일 때,
                triangle[i][j] += triangle[i-1][j]
            elif j == i:  # 끝일 때,
                triangle[i][j] += triangle[i-1][j-1]
            else:
                triangle[i][j] += max(triangle[i-1][j], triangle[i-1][j-1])
    return max(triangle[-1])


print(solution([[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]))

```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[프로그래머스]<https://codedrive.tistory.com/49>
