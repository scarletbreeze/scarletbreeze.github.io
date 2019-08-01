---
layout: post
title: programmers(68)level_2(행렬의곱셈)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-08-01
---

## 문제: 68. 행렬의 곱셈

```python
print(arr1[0][0], arr2[0][0])
print(arr1[0][1], arr2[1][0])
print(arr1[0][0], arr2[0][1])
print(arr1[0][1], arr2[1][1])
```

- 삼중포문을 손으로 써가며 겨우 구현했다.

```python
def solution(arr1, arr2):
    answer = []
    for i in range(len(arr1)):  # arr1의 col개수
        row = []
        for j in range(len(arr2[0])):  # arr2의 row 개수
            temp = 0
            for k in range(len(arr1[0])):
                temp += arr1[i][k]*arr2[k][j]
            row.append(temp)
        answer.append(row)
    return answer
print(solution([[1, 2], [3, 4], [5, 6]], [[1, 2], [3, 4]]))
```

## 간단하게 만들기

```python
def solution(arr1, arr2):
A = len(arr1)
B = len(arr1[0])
C = len(arr2[0])
return [[sum([arr1[idx1][idx3] * arr2[idx3][idx2] for idx3 in range(B)]) for idx2 in range(C)] for idx1 in range(A)]
```

- 리스트 comprehension을 사용

## 더 간단하게 만들기

```python
def productMatrix(A, B):
return [[sum(a*b for a, b in zip(A_row,B_col)) for B_col in zip(*B)] for A_row in A]
```

- zip을 이용

- 너무 가독성이 떨어지는 것 같다..

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[행렬의곱셈]<https://j1w2k3.tistory.com/575>
[참고블로그]<https://geonlee.tistory.com/110/>
