---
layout: post
title: programmers(5)_가운데_글자_가져오기
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers
date: 2019-07-19
---

## 문제: 가운데 글자 가져오기

level1

단어 s의 가운데 글자를 반환하는 함수 solution을 만들어보세요
단어의 길이가 짝수라면 두 글자를 반환하면 됩니다.

### 생각한 방법

짝수와 홀수 인지 판단해서
짝수면 두글자 반환
홀수면 한글자 반환

```python
def solution(s):
    if(len(s) % 2 == 0):  # 짝수
        return s[len(s)//2-1:len(s)//2+1]
    else:
        return s[len(s)//2]
```

- 다른 사람들 풀이 보기 전에 어떻게 하면 이걸 줄일 수 있을지 생각해보자.
- 모르겠다

## 다른 사람 풀이

```python
def string_middle(str):
    # 함수를 완성하세요
    return str[(len(str)-1)//2:len(str)//2+1]
# 아래는 테스트로 출력해 보기 위한 코드입니다.
print(string_middle("power"))
```

간단하다. 홀수와 짝수 구분하지 않고
1을 뺀 뒤 나누기 2 해주고,
나누기 2한뒤 1을 더해준 값으로 슬라이스를 하면 된다.

리스트의 값이 뭐가될지를 고민해보면 더 줄일 수 있던 것 같다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
