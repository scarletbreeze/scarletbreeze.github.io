---
layout: post
title: programmers(35)level_2
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-20
---

## 문제: 35. 주식가격

초 단위로 기록된 주식가격이 담긴 배열 prices가 매개 변수로 주어질 떄, 가격이 떨어지지 않은 기간은 몇초인지를 return 하도록 solution 함수를 작성하시오

[1,2,3,2,3]이 입력된다면,

- 1은 뒤에가 2이므로, 가격이 떨어지지 않았다. 따라서 4초간 가격이 떨어지지 않은 것이므로 4를 출력
- 2는 뒤가 3이므로, 가격이 떨어지지 않았다. 따라서 3초간 가격이 떨어지지 않은 것이므로 3을 출력
- 3은 뒤가 2이므로, 1초 뒤에 가격이 떨어진다. 따라서 1초간 가격이 떨어지지 않은 것이므로 1을 출력
- 2는 뒤가 3이므로, 3이므로 가격이 떨어지지 않았다. 따라서 1초간 가격이 떨어지지 않은 것이므로 1을 출력
- 3은 뒤가 없으므로, 0초간 가격이 떨어지지 않았다. 따라서 0을 출력

알고리즘을 생각해보자.

- 조건문을 나눠서, 뒤가 자신과 같거나 자신보다 크면? # 가격이 떨어지지 않았다.
  - 따라서 자신의 인덱스가 i라고 한다면, len(n)-(i+1)을 출력해야한다.
- 뒤가 자신보다 작다면 ? -> 1초 뒤에 자신보다 떨어진다. 따라서 1을 출력

```python
def solution(prices):
    result = []
    for i in range(len(prices)-1):
        if(prices[i] <= prices[i+1]):
            result.append(len(prices)-(i+1))
        else:
            result.append(1)
    result.append(0)
    print(result)


solution([1,2,3,2,3])

```

## 문제 이해를 잘못했다.

-> 문제 이해를 잘못했다. 가격이 떨어지지 않았다는 것은. 각 요소와 비교했다는 것을 뜻한다.
-> 즉 1과 전체를 비교해서, 2,3,2,3보다 가격이 크지 않으므로, 해당 값이 출력되는 거였다.

## 새로 생각한 알고리즘

- 예제를 [2,3,1,2,3]으로 바꿔서 생각해보자
- 우선 스택이 비었으므로 값만 넣는게 아니라 인덱스도 같이 넣는다. time을 계산하기 위해서다.(2,0)을 넣는다.
- 스택의 가장 최상단.(2,0)의 2가 3보다 작으므로 , 스택에 (3,1)을 넣는다.
- 스택의 가장 최상단.(3,1)과 1을 비교한다. (3,1)이 작으므로. 결과리스트의 앞에 (1의 인덱스 2 - 3의 인덱스 1)을 넣는다.
  - 스택의 가장 최상단 (2,0)과 1을 비교한다. (2,0)이 작으므로. 결과 리스트의 앞에 (1의 인덱스 2- 2의 인덱스 0을) 넣는다.
- 리스트가 비었으니 1과 그 인덱스2가 들어간다.
- 1과 2를 비교 했을 때, 1이 더 작으므로 2가 스택에 인덱스와 함께 들어간다.
- 2와 3을 비교했을 때 2가 더 작으므로 2가 스택에 인덱스와 함께 들어간다.
- 이후, 리스트의 끝까지 돌았는데, 스택에 값이 남아있다면,
- 스택의 상단부터 (따지고보면 스택이 아니라 dequeue처럼 쓰겠다.) 전체 길이에서-( 자신의 인덱스+1)을 빼서 그 값을 결과리스트에 마지막에 추가해준다.

-> 이 역시, 해당 예제는 통과하지만, 기본 예제는 통과하지 못했다.
-> 결과리스트에 마지막에 추가해준다는 조건에 따르면, 중간에 작은 것이 있고 다시 큰 게 있을 경우, 순서에 문제가 생긴다.
-> 따라서 인덱스에 맞게 넣어주는 걸로 바꿔봤다.

- `# result[stack[-1][0]+1] = length-stack.pop(-1)[0]` 이런 식으로 pop해주면서 동시에 stack[-1]에 접근하는 코드를 짜서 30분 동안 고생했다. 동적으로 갯수를 세는 코드 혹은 인덱스로 접근하는 코드와 pop을 같이 쓰면 안된다.

```python
def solution(prices):
    stack = []
    result = [0]*len(prices)
    for idx, x in enumerate(prices):
        if not stack:
            stack.append((idx, x))
        elif stack[-1][1] <= x:
            stack.append((idx, x))
        else:
            length = len(stack)
            while(stack[-1][1] > x):
                temp = stack.pop(-1)
                result[temp[0]] = length - temp[0]
                if(not stack):
                    break
            stack.append((idx, x))
    if(stack):
        for i in stack:
            num = len(prices)-(i[0]+1)
            result[i[0]] = num
    return result

```

## 한 문제만 통과되고 다 실패에 시간초과가 뜬다.

- 문제를 잘못 이해했나 ?
- 그냥 이중포문 써서 구해보자.

```python
def solution(prices):
    result = []
    for idx, x in enumerate(prices):
        num = 0
        for j in range(idx+1, len(prices)):
            if(x <= prices[j]):
                num += 1
            else:
                num += 1
                break
        result.append(num)
    return result
```

- 이렇게 간단한 문제를 2시간넘게 고민하다니 정말 어렵게 생각했다.
- 애초에 이중포문 쓰면 될 줄 알았는데, level2라고 너무 어렵게 생각했던 것 같다.
- 시바...

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
