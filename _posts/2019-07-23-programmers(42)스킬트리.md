---
layout: post
title: programmers(42)level_2(스킬트리)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-23
---

## 문제: 42. 스킬트리

- 문제 이해
- 선행 스킬: 어떤 스킬을 배우기 전에 먼저 배워야 하는 스킬
- 예시 : 스파크 -> 라이트닝 볼트 -> 썬더
- 순서 없는 다른 스킬들(힐링)등은 순서에 상관없이 배울 수 있다.
- 스파크 -> 힐링 -> 라이트닝 볼트 -> 썬더
- 썬더 스파크와 같은 기존 순서와 맞지 않는 스킬트리는 불가능

- 제한사항
- 스킬은 알파벳 대문자로 표기. 모든 문자열은 알파벳 대문자로 이루어짐
- 스킬의 길이는 2이상 26이하이며, 스킬은 중복해서 주어지지 않음.

- 입출력 예시
- skill: "CBD",
- skill_trees : ["BACDE","CBADF",AECB","BDA"]
- return 2

- 입출력 예 설명
- "BACDE" : B 스킬을 배우기 전에 C 스킬을 먼저 배워야 한다. 불가능한 스킬트리
- "CBADF" : 가능
- "AECB" : 가능
- "BDA" : B스킬을 배우기 전에 C스킬을 먼저 배워야 한다. 불가능

## 생각한 방법

- skill의 순서를 기억하기 위해 result 리스트를 만든다.
- skill의 첫번째 문자열과 검사할 문자열을 비교한다. 어떻게 비교 ?
  - `print("C" > "B")`하면 False가 나오고 반대로 하면 True가 나온다.
  - 파이썬에서는 문자열 비교가 가능하다.
  - 아스키 코드로 변환되서 비교가 가능해지며, 문자를 아스키코드로 변환하고 싶다면 `ord('a')`와 같은 함수를 사용한다
- 삼중 포문 구현하기가 까다롭다. 1시간 고민하다가 안되서, 결국 찾아봤다.

### 다른 사람들 풀이

1. 스킬트리 중, 스킬에 없는 스킬들은 빼고 임시변수에 저장한다.
2. 임시 변수에 길이만큼 스킬을 배우는 순서와 비교한다
3. 비교 결과가 같다면 가능한 스킬트리라면 정답 개수를 1 증가시킨다.

- index는 문자열이 어디있는지 반환해준다. 없으면 오류를 발생.
- find의 경우 찾는 문자열이 없으면 -1을 반환해준다.

```python
def solution(skill, skill_trees):
    answer = 0
    for str in skill_trees:
        temp = ""       # 스킬에 없는 스킬들은 지우고 저장할 변수
        isOk = True     # 가능한 스킬트리의 개수를 저장할 변수

        # 1. 스킬에 없는 스킬들은 뺴고 temp에 저장
        for s in str:
            if skill.find(s) != -1:
                temp += s

        # 2. temp의  길이만큼 스킬과 비교하여
        # 같으면 가능한 스킬트리, 다르면 불가능한 스킬트리
        for i in range(len(temp)):
            if skill[i] != temp[i]:
                isOk = False
                break

        # 3. 가능한 스킬트리라면 정답 개수를 1 증가
        if isOk == True:
            answer += 1

    return answer
```

### 다른 사람 풀이 2

```python
def solution(skill, skill_trees):
    answer = 0

    for skills in skill_trees:
        skill_list = list(skill)

        for s in skills:
            if s in skill:
                if s != skill_list.pop(0):
                    break
        else:
            answer += 1

    return answer
```

- 이 방법은 가장 쉽고 직관적이게 풀었다.
- 처음에 이해가 가지 않아서 for-else가 뭔지 찾아보니, 이런 문도 있었다.

## for - else 문

- 기본적으로 for문에 break가 포함되어 있을 때 사용 가능하다.
- for문을 순회하는 도중 break문을 만나지 않았다면 for문 종료 이후 else문이 실행된다.
- skill_list에 skill을 복사해준 뒤 ,pop(0)을 해줘서 순서대로 같은 것을 찾아줬다.
- 그 이후 break문이 실행되지 않았다면 answer+=1을 해줘서 정답을 찾아준 것이다.

```python
for a in range(5):
    print(a)
    if a == 3:
        break
else:
    print("else statement is called")
```

- 위 예시코드를 살펴보면
- 실행 결과는 0,1,2,3이다.

- 그런데 break문을 만나지 않는 for문이라면 ?

```python
for a in range(5):
    print(a)
    if a == 6:
        break
else:
    print("else statement is called")
```

이게 출력된다.

- 실행 결과는 0,1,2,3,4와
- else statement is called가 함께 출력된다.
- flag변수를 사용하지 않아도 코드가 훨씬 깔끔해진다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고한 블로그]<http://blog.naver.com/PostView.nhn?blogId=h0609zxc&logNo=221479852915&categoryNo=1&parentCategoryNo=1&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView>
[find와index차이]<https://ssungkang.tistory.com/entry/%EB%AC%B8%EC%9E%90%EC%97%B4-%ED%95%A8%EC%88%98-find%EC%99%80-index>
[for-else문]<http://www.mukgee.com/?p=93>
