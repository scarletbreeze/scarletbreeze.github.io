---
layout: post
title: programmers(3)_level1_k번째수
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers
date: 2019-07-18
---

## 문제: k번째 수 (정렬)

배열 array의 i번째 숫자부터 j번째 숫자까지 자르고 정렬했을 때, k번째 수를 구하려고 한다.

입출력 예시

```python
# array
[1, 5, 2, 6, 3, 7, 4]
# 2차원 배열 commands
 [[2, 5, 3], [4, 4, 1], [1, 7, 3]]
# return
[5, 6, 3]
```

### 생각한 방법

그냥 주어진 대로 구하면 될 것 같다.

## 풀이한 코드

```python
def solution(array, commands):
    answer = []
    for i in range(len(commands)):
        # commands[i][0]  # i 번쨰
        # commands[i][1]  # j 번째까지 자른다.
        arr = array[commands[i][0]-1:commands[i][1]]
        arr.sort()
        answer.append(arr[commands[i][2]-1])
    return answer


array = [1, 5, 2, 6, 3, 7, 4]
commands = [[2, 5, 3], [4, 4, 1], [1, 7, 3]]


print(solution(array, commands))

```

## 다른 분이 사용한 코드

```python
def solution(array, commands):
    return list(map(lambda x:sorted(array[x[0]-1:x[1]])[x[2]-1], commands))

```

단 두줄에 끝낼 수 있었다니..
map 함수에 lambda를 써주고, 매개변수로 들어온 x를 정렬하는데
이 x가 commands의 하나의 리스트를 뜻할 테니,
[2,5,3]이라고 한다면, array의 1부터 5까지 슬라이스 해주고, 그 중 [2]번째 값을 가져와서
리스트에 만들어서 리턴해주면 된다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
