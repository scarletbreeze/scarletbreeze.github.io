---
layout: post
title: programmers(63)level_2(영어끝말잇기)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-31
---

## 문제: 63. 영어 끝말잇기

- 사람 수 n, 사람들이 순서대로 말한 단어 words가 매개변수
- 가장 먼저 탈락하는 사람의 번호와, 그 사람이 자신의 몇 번째 차례에 탈락했는지를 return

- 참여자 수는 2이상 10이하
- words는 끝말잇기에 사용한 단어들이 순서대로 들어있는 배열. 길이 100이하
- 단어의 길이는 2이상 50이하
- 모든 단어는 알파벳 소문자로
- 정답은 [번호,차례]로 return
- 탈락자가 생기지 않는다면, [0,0]을 리턴

- 정리하자면 값이 중복 / 끝말잇기에 틀렸을 경우 -> 탈락

```python
def solution(n, words):
    flag, a, b = 0, 0, 0
    for i in range(1, len(words)):
        p1 = words[i-1]
        p2 = words[i]
        for j in range(0, i):  # 중복검사
            if words[j] == words[i]:
                flag = 1
                break
        if p1[len(p1)-1] != p2[0]:
            flag = 1
        if flag:
            a = (i % n)+1
            b = (i//n)+1
            return [a, b]
    return [0, 0]
```

- 배운 것 : `words[i]`와 `words[i-1]`을 비교하므로, 이를 변수로 둬서 식을 쓰면 편하다
- 중복검사 : 배열에 넣어둬서 중복을 검사할 생각을 했지만, 먼저 중복검사를 해주면 편하다
- flag 변수 사용 : flag변수를 사용해줘서, 마지막에 처리해줘야 하는 값을 한번에 처리해주면 편하다.

## 다른사람 코드

```python

def solution(n, words):
    for p in range(1, len(words)):
        if words[p][0] != words[p-1][-1] or words[p] in words[:p]: return [(p%n)+1, (p//n)+1]
    else:
        return [0,0]
```

- 알파벳 검사 : `words[p][0] != words[p-1][-1]`
- 중복 검사 : `words[p] in words[:p]`
- 값 계산 : `[(p%n)+1, (p//n)+1]`
- 깔끔하고 간단하다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://has3ong.tistory.com/214>
