---
layout: post
title: programmers(39)level_2(위장)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-22
---

## 문제: 39. 위장

- 스파이들은 매일 다른 옷을 조합하여 자신을 위장한다.
- 스파이가 가진 의상들이 담긴 2차원 배열 clothes가 주어질 때, 서로 다른 옷의 조합의 수를 return 하도록 하는 solution 함수 작성

- 제한사항
- clothes의 각 행은 [의상의 이름, 의상의 종류]로 이루어져 있다.
- 스파이가 가진 의상의 수는 1개 이상 30개 이하.
- 같은 이름을 가진 의상 존재 x
- 스파이는 최소 하루에 한개 이상의 의상은 입는다.

- 입출력 예시
- [["yellow_hat", "headgear"], ["blue_sunglasses", "eyewear"], ["green_turban", "headgear"]]

1. yellow_hat
2. blue_sunglasses
3. green_turban
4. yellow_hat + blue_sunglasses
5. green_turban + blue_sunglasses

- 위 다섯가지 조합이 가능하다.

## 접근

- 일반화된 방법이 뭐가 있을까.
- 코딩적 접근이 아닌, 수학적 지식이 필요할 것 같은데, 모르겠어서 검색을 했고, 아래 참고 블로그를 토대로 문제를 풀었다.
- 우선 카테고리별로 갯수를 담자. 예를 들어 입력 예시를 받았다고 한다면, headgear 2개, eyewear1개가 입력될 것이다.
- 안골랐다는 경우의 수를 포함하면, 3개, 2개가 된다.
- 여기서 3\*2를 해준 뒤, 둘다 안고르는 경우를 빼주면 5가지로 답을 구할 수 있다.

- 종류를 하나 더 추가해보면
- 배 a,b,c 3개, 귤 e,f 2개, 사과 g,h,i 3개라고 한다.
- 위 방법대로 한다면 4*3*4-1이 총 가지수가 된다.

```python
def solution(clothes):
    d = {}
    for i in clothes:
        d[i[1]] = d.get(i[1], 1)+1  # 안 고른 경우를 포함하기 위해 초기값을 1로 두었다.
    result = 1
    for v in d.values():
        result *= v
    return result-1
```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
