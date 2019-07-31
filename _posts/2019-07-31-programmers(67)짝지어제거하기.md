---
layout: post
title: programmers(67)level_2(짝지어제거하기)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-31
---

## 문제: 67. 짝지어 제거하기

- 문자열에서 같은 알파벳이 붙어있는 짝을 찾고, 이를 제거한 뒤 앞뒤 문자열 이어붙임
- 짝 지어 제거할 수 있는지 여부를 리턴

- 전에 분명히 푼 기억이 있었따. (그런데도 못 풀었다.)
- SWE 4864 반복문 지우기와 매우 흡사하다.

```python
def checkRow(text):
    row = ""
    length = len(text)
    for i in range(1, length):
        if(text[i] == text[i-1]):
            row += text[0:i-1]
            row += text[i+1:length]
            return checkRow(row)
    return len(text)


def solution(s):
    return 0 if checkRow(s) else 1


print(solution("baabaa"))

```

- 근데 런타엠 에러와 시간초과가 난다.
- 문자열의 길이 : 1,000,000이하의 자연수라고 한다.
- 이걸 어떻게 하지 ? -> 다른 사람들을 보니 스택을 이용해서 풀었다.

- 풀고나니 무지무지 간단한 문제였다.

```python
def solution(s):
    stack = []
    while s:
        for i in range(len(s)):
            if not stack:  # 스택이 비어있을 때
                stack.append(s[i])
            else:
                if stack[-1] != s[i]:
                    stack.append(s[i])
                else:
                    stack.pop(-1)
        return 0 if stack else 1


print(solution("baabaa"))

```

## 다른 풀이방법

```python
def solution(s):
    stack = []
    for i in s:
        if not answer or answer[-1] != i:
            stack.append(i)
        else:
            stack.pop()
    return int(not bool(stack))
```

- index 말고, in을 통해서 리스트 순회
- stack이 비어있거나, stack의 마지막이 i와 같지 않다면
- stack에 push
- 그렇지 않다면 pop
- stack이 비어있는지 파악후 이를 int로 변환하여 출력

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://lkhlkh23.tistory.com/148>
