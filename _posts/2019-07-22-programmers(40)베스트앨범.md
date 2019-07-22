---
layout: post
title: programmers(39)level_3(베스트앨범)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-07-22
---

## 코딩테스트 고득점 Kit 해시 마지막문제 베스트앨범

- 문제 이해
- 스트리밍 사이트에서 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시하려고 함
- 노래는 고유 번호로 구분하며, 노래를 수록하는 기준은 다음과 같다

1. 속한 노래가 많이 재생된 장르를 먼저 수록
2. 장르 내에서 가장 많이 재생된 노래를 먼저 수록
3. 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록

- 노래의 장르를 나타내는 문자열 배열 genres와 노래 별로 재생 횟수를 나타내는 정수 배열 plays가 주어질 때,
- 배스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 하는 함수 작성

- 제한사항
- genres[i]는 고유번호가 i인 노래의 장르
- plays[i]는 고유 번호 길이가 i인 노래가 재생된 횟수
- genres와 plays의 길이는 같으며 , 1이상 만 이하
- 장르 종류는 100개 미만
- 장류에 속한 곡이 하나라면, 하나의 곡만 선택

- 입출력 예시
- genres / plays / return
- ["classic","pop","classic","classic","pop"] / [500,600,150,800,2500], [4,1,3,0]
- classic 장르는 1,450회 재생되었으며, classic 노래는 다음과 같다.
- 고유번호 3: 800회 재생
- 고유번호 0: 500회 재생
- 고유번호 2: 150회 재생

- pop장르는 3100회 재생되었으며, pop 노래는 다음과 같다
- 고유번호 4: 2500회 재생
- 고유번호 1: 600회 재생

- 따라서 pop 장르의 [4,1]번 노래를 먼저,classic장르의 [3,0]번 노래를 그 다음에 수록한다.

## 문제해결전략

- zip 함수로 장르별, plays를 key,value로 묶은 뒤
- 재생된 장르 순서로 정렬한다.(정렬 하지 않고, for문을 한번씩 돌아서, 가장 큰거, 그 다음 큰거를 찾아줄 수 도 있다.)
- 이 때, 초기 genres의 인덱스(고유번호)를 기억하고 있어야 하므로, value안에 튜플로 인덱스와 plays를 함께 저장한다.
- 문제를 풀어본다.

### 해보니 안되었던 것

1. `d = {genres: plays for genres, plays in zip(genres, plays)}` 바로 해시를 작성하면, 키가 중복되므로 문제가 발생한다.
2. 딕셔너리 안에 딕셔너리를 저장하는건 어떨까 ?, 반복문을 돌면서 넣기가 쉽지가 않더라.
3. 그래서 key의 value로 리스트를 넣은뒤 + 연산을 통해 반복적으로 리스트에 idx와 plays[i]를 저장해주었다.
4. 파이썬 딕셔너리는 순서를 관리하지 않는다. -> 컬렉션 모듈 OrderedDict를 쓴다고 하는데, 이런 방법은 문제랑 벗어날 방법일 것이다.
5. 파이썬 for in을 쓸 때, in 다음에 나오는 tuple이 2개라면, x,y와 같은 원소 2개로 해당 값을 받아올 수 있다.

- 코드를 짤 순 있겠으나, 너무 비효율적인 방법을 고집하고 있어서 다른 분들 코드를 참고했다.
- 정리하자면 나는

```python
for x, y in zip(genres, plays):
        d[x] = d.get(x, arr) + [(idx, y)]
        idx += 1
    print(d)
```

- 이런 식으로 dictionary를 구성하였다.
  `{'classic': [(0, 500), (2, 150), (3, 800)], 'pop': [(1, 600), (4, 2500)]}`

### 풀이 참조

- 다른 분은 이와 같은 구조로 딕셔너리를 구성하셨다.

```python
{
        '장르이름': {
            't': 전체 재생 시간
            'l': [노래정보리스트, {'v': 재생시간, 'i': 고유번호}]
        }
    }
```

- key와 value에 대해서 주어진 값으로 연결하기 보다, 이런 식으로 딕셔너리 안에서 이중 딕셔너리를 정의해줄 때,
- 임의로 key를 내가 부여한다면 value를 가져오기 편하겠다.

```python
{
    'classic':
    {'t': 1450,
        'l': [{'v': 500, 'i': 0}, {'v': 150, 'i': 2}, {'v': 800, 'i': 3}]
    },
    'pop':
    {'t': 3100,
        'l': [{'v': 600, 'i': 1}, {'v': 2500, 'i': 4}]
    }
}
```

- 이후 또 배울 점은 딕셔너리의 정렬을 위해 리스트의 형태로 바꿔줬다는 점이다.
- 이후 sorted 함수를 통해서 정렬을 해준다. t -> 시간이 가장 큰 것을 기준으로 오름차순으로
- 이후 각 장르별로 재생 횟수를 정렬하고, answer를 구한다.

```python
def solution(genres, plays):
    '''
    각 노래의 grouping을 진행할 변수를 선언해준다.
    다음과 같은 구조를 가지게 된다.
    {
        '장르이름': {
            't': 전체 재생 시간
            'l': [노래정보리스트, {'v': 재생시간, 'i': 고유번호}]
        }
    }
    '''
    d = {}
    # 노래 갯수 만큼 loop를 돌며 grouping을 진행한다.
    for i in range(len(genres)):
        # 장르에 해당하는 key가 없으면 새로 만들어준다.
        if not genres[i] in d:
            d[genres[i]] = {'t': 0, 'l': []}
        d[genres[i]]['l'].append({'v': plays[i], 'i': i})
        d[genres[i]]['t'] += plays[i]
    print(d)
    # 정렬을 위해 list 형태로 바꿔준다.
    # 앞으로의 연산이나, answer에는 장르 이름이 필요없기에 문제없다.
    d = list(d.values())
    d = sorted(d, key=lambda k: k['t'], reverse=True)
    answer = []
    # 각 장르별 재생 횟수를 정렬하고, answer를 구한다.
    for i in range(len(d)):
        v = d[i]['l']
        v = sorted(v, key=lambda k: k['v'], reverse=True)
        for j in range(2 if len(v) >= 2 else len(v)):
            answer.append(v[j]['i'])
    return answer
```

- 내가 원하던 방향의 깔끔한 코드다.
- 이 코드를 노트에 적고 정리하자.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고 블로그]<https://blog.rajephon.dev/2018/10/14/programmers-solution-hash-best-album/>
