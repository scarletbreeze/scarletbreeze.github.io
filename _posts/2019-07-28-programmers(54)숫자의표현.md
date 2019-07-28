---
layout: post
title: programmers(53)level_2(숫자의표현)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-28
---

## 문제: 54. 숫자의 표현

- 자연수 n은 만 이하의 자연수
- 연속한 자연수들로 표현하는 방법은 여러가지
- 15는 다음과 같이 4가지로 표현 가능
- 1 + 2 + 3 + 4 + 5 =15
- 4 + 5+ 6 = 15
- 7 + 8 + 15
- 15 = 15

```python
def solution(n):
    result = 1
    for i in range(n):
        total = 0
        for j in range(i+1, n+1):
            # print(j, total, result)
            if(total == n):
                result += 1
                break
            elif(total > n):
                break
            total += j
    return result
print(solution(15))

```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
