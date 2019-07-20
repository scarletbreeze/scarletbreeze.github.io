---
layout: post
title: programmers(20-34)level_1완료
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers
date: 2019-07-20
---

## 문제: 20. 자릿수 더하기

자연수 N이 주어지면, 각 자릿수의 합을 구해서 리턴하는 함수

```python
def solution(n):
    return sum(list(map(int, list(str(n)))))
```

### 다른 사람 풀이

```python
    return sum(map(int,str(number)))
```

굳이 list에 담아주지 않고도, sum을 바로 해줄 수 있다.

- Q) map은 왜 map 객체를 반환할까?
- iterator이기 때문이다. iterator란 반복가능한 객체, 즉 반복문을 활용해서 데이터를 순회하면서 처리하는 것을 말한다.

-

## 21. 자연수 뒤집어 배열로 만들기

```python
def solution(n):
    return list(reversed(list(map(int, str(n)))))
```

### 다른 사람 풀이

```python
def solution(n):
    return list(map(int, reversed(str(n))))
```

- string은 먼저 뒤집을 수 있다.

## 22. 정수 내림차순으로 배치하기

```python
def solution(n):
    return int("".join(sorted(str(n), reverse=True)))
print(solution(118372))

```

## 23. 정수 제곱근 판별

```python
def solution(n):
    for i in range(1, n+1):
        if(i*i == n):
            return (i+1)*(i+1)
    return -1
```

## 다른 사람 풀이 보기

```python
def nextSqure(n):
    sqrt = n ** (1/2)

    if sqrt % 1 == 0:
        return (sqrt + 1) ** 2
    return 'no'
```

- 파이썬에서는 제곱근을 찾는 연산으로 \*\*을 제공한다.

## 24. 제일 작은 수 제거하기

```python
def solution(n):
    n.remove(min(n))
    return [-1] if not n else n
```

## 25. 짝수와 홀수

```python
    return "Even" if num % 2 == 0 else "Odd"

```

## 26. 최대 공약수와 최소 공배수

- 유클리드 호제법을 알면 편하다.
- 호제법이란 말은 두 수가 서로 상대방 수를 나누어서 결국 원하는 알고리즘을 나타낸다.
- 예를 들어 1071과 1029의 최대 공약수를 구해보면
- 1071은 1029로 나누어 떨어지지 않기 때문에 1071을 1029로 나눈 나머지를 구한다 -> 42
- 1029는 42로 나누어 떨어지지 않기 때문에 1029를 42로 나눈 나머지를 구한다 -> 21
- 42는 21로 나누어 떨어진다. 따라서 최대 공약수는 21이다.

- 이를 이용해서 최대 공약수를 구한 뒤, 최소 공배수는 두수 a,b의 곱을 최대공약수로 나누기만 하면 된다.

```python
def gcd(m, n):
    while n != 0:
        t = m % n
        (m, n) = (n, t)
    return abs(m)


def solution(n, m):
    T = gcd(n, m)
    lcm = int(n*m/T)
    return [T, lcm]
```

## 27. 콜라츠 추측

콜라츠 추측이란 주어진 수가 1이 될 때까지 다음 작업을 반복하면, 모든 수를 1로 만들 수 있다는 추측이다.

    1-1. 입력된 수가 짝수라면 2로 나눈다.
    1-2. 입력된 수가 홀수라면 3을 곱하고 1을 더한다.
    2-0. 결과로 나온 수에 같은 작업을 1이 될 때까지 반복한다.

예를 들어 입력된 수가 6이라면 6->3->10->5->16->8->4->2->1이 되어 총 8번 만에 된다.
단 500번을 반복해도 1이 되지 않는다면 -1을 반환

```python
def solution(num):
    idx = 0
    while(num != 1 and idx < 500):
        if num % 2 == 0:
            num = num//2
        else:
            num = num*3+1
        idx += 1
    if idx >= 500:
        idx = -1
    return idx
print(solution(626331))
```

## 28. 평균 구하기

```python
def solution(arr):
    return sum(arr)/len(arr)


print(solution([1, 2, 3, 4]))
```

## 29. 하샤드 수

양의 정수 x가 하샤드 수 이려면 x의 자릿수의 합으로 x가 나누어져야 한다.

```python
def solution(x):
    return (x % sum(map(int, str(x)))) == 0
print(solution(11))
```

## 30. 핸드폰 번호 가리기

```python
def solution(x):
    return "*"*(len(x)-4) + x[-4:]
print(solution("0277"))
```

## 31. 행렬의 덧셈

```python
def solution(arr1, arr2):
    result = []
    for i in range(len(arr1)):
        row = []
        for j in range(len(arr1[0])):
            row.append(arr1[i][j] + arr2[i][j])
        result.append(row)
    return result
```

## 32. x만큼 간격이 있는 n개의 숫자

```python
def solution(x, n):
    num = x
    result = [x]
    for i in range(n-1):
        num += x
        result.append(num)
    return result
```

### 다른 사람 풀이

```python
def number_generator(x, n):
    # 함수를 완성하세요
    return [i for i in range(x, x*n+1, x)]

# 아래는 테스트로 출력해 보기 위한 코드입니다.
print(number_generator(2,5))
```

- range() 함수에x를 3번째 인자로 넣어서 활용이 가능하다.

## 33. 직사각형 별찍기

```python
n, m = map(int, input().strip().split(' '))

for i in range(m):
    print("*"*n)

```

### 다른 사람 풀이

```python
a, b = map(int, input().strip().split(' '))
answer = ('*'*a +'\n')*b
print(answer)
```

- '\n'도 만들어서 찍어주면 그만이다.

## 34. 예산

- 동전 거스름돈 그리디 문제랑 똑같은 것 같다.

```python
def solution(d, budget):
    d.sort()
    maxSum = 0
    count = 0
    for idx, i in enumerate(d):
        maxSum += i
        if (maxSum <= budget):
            count += 1
        else:
            break
    return count
```

---

참고자료
[유클리드 호제법]<https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95>
[최대공약수/최소공배수]<http://blog.naver.com/PostView.nhn?blogId=fldragonn&logNo=220800294793&parentCategoryNo=&categoryNo=37&viewDate=&isShowPopularPosts=false&from=postView>
