---
layout: post
title: programmers(7)_나누어_떨어지는_숫자배열
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level1
date: 2019-07-19
---

## 문제: 나누어*떨어지는*숫자\_배열

arr과(리스트) advisor가 매개변수로 주어진다.
array의 각 element 중 divisor로 나누어 떨어지는 값을 오름차순으로 정렬한 배열을 반환하는 함수.

### 생각한 방법

그냥 주어진 대로 하면 될 것 같다.

```python
def solution(arr, divisor):
    ans = []
    for x in arr:
        if(x % divisor == 0):
            ans.append(x)
    ans.sort()
    if not ans:
        ans.append(-1)
    return ans
```

### 다른 사람 코드

```python

def solution(arr, divisor):
    arr = [x for x in arr if x % divisor == 0]
    arr.sort()
    return arr if len(arr) != 0 else [-1]
```

- 리스트 함축을 통해서, arr의 리스트를 줄여주고
- return 문에서도 삼항 연산자를 통해서 코드를 줄여줬다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
