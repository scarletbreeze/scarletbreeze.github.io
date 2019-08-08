---
layout: post
title: programmers(83)level_3(가장_긴_팰린드롬)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-08
---

## 문제: 83. 가장 긴 팰린드롬

- 문자열 s가 주어질 때, 가장 긴 팰린드롬의 길이를 리턴한다.
- 다른 회문 문제와 차이점은, 가장 긴 회문의 길이를 리턴하는 것.

- 생각보다 간단한 문제가 아닌 것 같다.
- DP를 이용해서 푸는 방법이 있을 수 있고, 맨체스터 알고리즘을 이용해서 푸는 방법이 있나보다

- 맨체스터 알고리즘으로 풀어보자
- 특정 센터를 기준으로 양옆으로 나아가면서 , 같은지 확인한다.
- 센터는 문자가 하나가 될 수도 있고 같은 문자가 두개가 될 수도 있다.
- 이를 토대로 문자열 s의 모든 인덱스에 대해서 센터를 잡고,
  팰린드롬의 길이를 확인해서 max를 구하면 답이다.

## 1. n^2풀이

```python
def solution(s):
    palins = []
    for i in range(0, len(s)):
        for j in range(1, len(s) + 1):
            converted_str = s[i:j]
            if converted_str == converted_str[::-1]:
                palins.append(len(converted_str))
    return max(palins)
```

## 2. n 풀이

```python
def palin(mid, s, case):
    if case == 0:  # 홀수일 때,
        result = 1
        ma = mid+1  # midRight
    else:  # 짝수일 때,
        result = 2
        ma = mid+2
    mi = mid-1  # midLeft
    while True:
        if mi < 0 or ma > len(s)-1:  # 범위를 벗어날 때,
            return result
        if s[mi] != s[ma]:  # 회문이 아닐 때,
            return result
        else:
            mi -= 1
            ma += 1
            result += 2


def solution(s):
    answer = 1
    for i in range(len(s)-1):
        answer = max(answer, palin(i, s, 0))
        if s[i] == s[i+1]:  # 센터가 같은 문자 두개일 때
            answer = max(answer, palin(i, s, 1))
    return answer


print(solution("abcdcba"))


```

- n^2로 풀기는 어렵다.
- 관련 코드를 가져와서 써보고 이해하는 것 외에는 풀 방법을 모르겠다.

- 다음에 다시 풀어보자.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://mstst33.com/programmers-the_longest_palindrome/201/>
[회문과치환]<https://www.youtube.com/watch?v=_3_580GhBYc>
[참고블로그2]<https://velog.io/@songjy6565/%EA%B0%80%EC%9E%A5-%EA%B8%B4-%ED%8C%B0%EB%A6%B0%EB%93%9C%EB%A1%AC>
[참고블로그3]<http://blog.naver.com/PostView.nhn?blogId=fldragonn&logNo=220806229179>
