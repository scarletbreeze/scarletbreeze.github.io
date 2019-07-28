---
layout: post
title: programmers(58)level_2(JadenCase문자열만들기)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-28
---

## 문제: 58. JadenCase문자열 만들기

- 첫 문자가 대문자이고, 그 외의 알파벳은 소문자로 만들어서 리턴해라

- 정확도 실패

```python
def solution(s):
    s = s.split()
    for i, x in enumerate(s):
        if not x[0].isdigit():
            s[i] = x.title()
    return " ".join(s)


print(solution("33sdfs 3people unFollowed me"))

```

- 계속 정확도 테스트에서 틀렸다.
- title() 함수가 문제인 듯하다.
- s3dfs를 넣으면, S3Dfs를 출력하는 걸로 봐서, 3뒤로 나오는 문자의 첫글자를 다시 대문자로 바꿔주나보다.

```python
def solution(s):
    s = s.split()
    for i, x in enumerate(s):
        if x[0].isdigit():
            s[i] = x.lower()
        else:
            x = x[0].upper()+x[1:].lower()
            s[i] = x

    return " ".join(s)


print(solution("s3dfs 3people unFollowed 3unFollowed me"))

```

- 왜 틀렸는지 몰랐는데 이제 알았다.
- 공백을 제거하면 안된다.
- 공백에 uppper() 함수를 걸어줘도 변함없이 공백이다.

```python

def solution(s):
    r = ""
    for i, x in enumerate(s):
        print(i, x, s[i-1])
        r += x.upper() if not i or s[i-1] == " " else x.lower()
    return r


print(solution("3peOple unFollowed me"))


```

- 첫 번째에 나오는 인덱스는 무조건 대문자
- `s[i-1] == " "` 이전에 나온 숫자가 공백이었다면, 다음에 나올 i는 대문자가 되어야 한다.
- 나머지 소문자

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[python_title()함수]<https://hashcode.co.kr/questions/695/%EC%8A%A4%ED%8A%B8%EB%A7%81%EC%97%90-%EB%8B%A8%EC%96%B4-%EC%B2%AB-%EA%B8%80%EC%9E%90%EB%A5%BC-%EB%8C%80%EB%AC%B8%EC%9E%90%EB%A1%9C-%EB%B0%94%EA%BE%B8%EB%8A%94-%EB%B0%A9%EB%B2%95%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-%EC%95%8C%EA%B3%A0%EC%8B%B6%EC%8A%B5%EB%8B%88%EB%8B%A4>
[참고블로그]<https://burningrizen.tistory.com/152>
