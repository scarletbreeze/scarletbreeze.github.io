---
layout: post
title: BOJ(N-Queen)(9663)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm BOJ DP 9663 2019(백준)SW준비_연습
date: 2019-08-17
---

## N-Queen (9663)

- Queen은 같은 행, 같은 열에서 2개 이상 놓는 것이 불가능 하다.

- calc(row): row 행에 퀸을 어디에 놓을지 결정하는 함수
- check 함수를 통해서 row,col에 놓고, 대각선도 검사.

- 각각의 퀸을 놓을 때마다 검사를 하는데 걸리는 시간. 대각선, 왼쪽, 위쪽 모두 검사 -> 총 N개의 행에 대해서 올라가니까. 시간이 N^N이 된다.
- 굳이 올라가면서 검사할 필요가 없고, 퀸을 놓고 다시 아래쪽에 내려가면 , 중복된 검사를 할 수 있는데, 중복 검사를 하는 것은 비효율적이다.

- 그 방법은 배열을 추가적을 이용하는 거다.
- check_col[i] i번 열에 퀸이 놓여져 있으면 True아니면 false
- check_dig[i] => 오른쪽 위 방향 대각선에 퀸이 있는지 판단 / (행과 열을 더한 값으로 구할 수 있음)
- 반대방향도 마찬가지로 \ 방향으로 구할 수 있다.
- r-c를 통해서 어떤 방향의 대각선인지 찾아낼 수 있다.

```python
def check(row, col):
    if check_col[col]: # 세로 방향 col
        return False
    if check_dig[row+col]: # 오른쪽 위 더하기/ #행과 열을 더한 값이 모두 같다는 특징 사용
        return False
    if check_dig2[row-col+n-1]: # 왼쪽 위방향 더하기 대각선 \
    # (r,c) r에서 c를 뺀 값이 모두 같다. 음수가 나올 수 있기 때문에 0보다 크거나 같은 정수로 만들어줬다.
        return False
    return True

def calc(row):
    if row == n:
        return 1
    ans = 0
    for col in range(n): # row,col열에 어디에 놓을지 정하고
        if check(row,col):
            check_dig[row+col] = True
            check_dig2[row-col+n-1] = True
            check_col[col] = True
            a[row][col] = True
            ans += calc(row+1)
            check_dig[row+col] = False
            check_dig2[row-col+n-1] = False
            check_col[col] = False
            a[row][col] = False
    return ans

n = int(input()) # n입력 받고
a = [[False]*n for _ in range(n)]
check_col = [False] * n
check_dig = [False] * (2*n-1)
check_dig2 = [False] * (2*n-1)
print(calc(0)) # 0번 행부터 퀸을 어디에 둘지 결정
```

- 프로그래머스에 완전히 동일한 문제가 있다.

```python
def solution(n):
    def check(row, col):
        if check_col[col]:  # 세로 방향 col check
            return False
        if check_dig[row+col]:
            # 오른쪽 위 더하기/ #행과 열을 더한 값이 모두 같다는 특징 사용
            return False
        if check_dig2[row-col+n-1]:
            # 왼쪽 위방향 더하기 대각선 \
            # (r,c) r에서 c를 뺀 값이 모두 같다. 음수가 나올 수 있기 때문에 0보다 크거나 같은 정수로 만들어줬다.
            return False
        return True

    def calc(row):
        if row == n:  # 끝
            return 1
        ans = 0
        for col in range(n):  # row, col 열에 어디에 놓을지 정하고
            if check(row, col):
                check_dig[row+col] = True
                check_dig2[row-col+n-1] = True
                check_col[col] = True
                a[row][col] = True
                ans += calc(row+1)
                check_dig[row+col] = False
                check_dig2[row-col+n-1] = False
                check_col[col] = False
                a[row][col] = False
        return ans

    N = n
    a = [[False] * n for _ in range(n)]
    check_col = [False] * n
    check_dig = [False] * (2*n-1)
    check_dig2 = [False] * (2*n-1)
    return calc(0)
```

---

참고자료
[codeplus](https://code.plus/course/33)
