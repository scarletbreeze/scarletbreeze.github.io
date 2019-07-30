---
layout: post
title: programmers(62)level_2(예상대진표)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-30
---

## 문제: 62. 예상대진표

- 문제를 어떻게 풀어야 할지 헤맸다.
- 홀수인 경우에 2로 나눈 몫에 1을 더해준다.
- 2로 나눈 몫이 다음 경기에서 본인과 경쟁자의 번호이다.

```python
def solution(n, a, b):
    answer = 0
    while(a != b):
        if a % 2 == 0:
            a //= 2
        else:
            a //= 2
            a += 1  # 홀수 +1
        if b % 2 == 0:
            b //= 2
        else:
            b //= 2
            b += 1
        answer += 1
    return answer


print(solution(8, 4, 7))

```

### 다른 사람 풀이

```python
def solution(n, a, b):
    answer = 0
    while a != b:
        answer += 1
        a, b = (a+1)//2, (b+1)//2
    return answer
print(solution(8, 4, 7))

```

- 짝수든, 홀수든 상관없이 +1 한 뒤에 2로 나누면 동일한 몫이 구해진다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://wonhee010.tistory.com/17?category=767564>
