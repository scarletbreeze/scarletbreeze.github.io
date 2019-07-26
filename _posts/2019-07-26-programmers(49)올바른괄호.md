---
layout: post
title: programmers(49)level_2(올바른괄호)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-26
---

## 문제: 49 올바른 괄호

```python
def solution(s):
    stack = []
    for i in s:
        if i == '(':
            stack.append(i)
        else:
            if stack:
                stack.pop(0)
            else:
                return False
    return False if stack else True

```

- 시간초과 떠서 스택을 사용하지 않았다.

```python
def solution(s):
    stack = 0
    for i in s:
        if i == '(':
            stack += 1
        else:
            if stack:
                stack -= 1
            else:
                return False
    return False if stack else True
print(solution("()"))
```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
