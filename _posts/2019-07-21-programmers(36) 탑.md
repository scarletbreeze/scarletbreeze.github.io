---
layout: post
title: programmers(36)level_2(탑)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-21
---

## 문제: 36. 탑

- 수평 직선에 탑을 세웠다.
- 6,9,7,5,4인 다섯 탑이 왼쪽으로 동시에 레이저 신호를 발사한다.
- 탑은 신호를 받는다.
- [6,9,5,7,4]가 입력값이면 출력은 [0,0,2,2,4]가 된다.
- 인덱스가 아닌 1부터 탑을 세서 받은 탑의 번호를 출력한다
- 신호를 보낸 탑보다 높은 탑에서만 수신한다.
- 입력값이 [3,9,9,3,5,7,2] 라면 출력값은 [0,0,0,3,3,3,6] 이다.

### 생각한 방법

- 이차원 배열 선언해서 풀 수도 있겠지? 0,1로 만들어서, 비교하는거야.
- 1차원 리스트로 풀 수는 없을까?
- 포문 2번 돌면 되지 않을까?
- for문을 돌릴 때, 마지막에서 왼쪽을 찾아가는게 편하다.
- 인덱스를 역순으로 계산하기 힘들어서, reverse를 할까 싶었는데, reverse를 하면, 그 뒤 어떻게 인덱스 값 넣어줄지가 애매해서, 그냥 역순으로 계산했다.

```python
def solution(height):
    result = []
    for i in range(len(height)-1, 0, -1):
        temp = 0
        for j in range(i-1, -1, -1):
            if height[i] < height[j]:
                temp = j+1
                break
        result.insert(0, temp)
    result.insert(0, 0)
    return result
```

### 다른 사람들 풀이

```python
def solution(h):
    ans = [0] * len(h)
    for i in range(len(h)-1, 0, -1):
        for j in range(i-1, -1, -1):
            if h[i] < h[j]:
                ans[i] = j+1
                break
    return ans
```

- 나와 다른 점은 딱 한가지. 0 으로 초기화 해줬다는 것.
- 그러면 중간에 temp란 변수를 선언해서, 끝에 도달했을 때, temp가 0이면 0을 넣어줄 필요가 없어진다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
