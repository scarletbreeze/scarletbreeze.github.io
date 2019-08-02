---
layout: post
title: programmers(72)level_3(단어변환)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-02
---

## 문제: 72. 단어변환

- 한 번에 한 개의 알파벳만 바꿀 수 있다.
- words에 있는 단어로만 변환될 수 있다.

- begin에서 target으로 변환하는 가장 짧은 변화 과정 찾기
- begin이 "hit", target이 "cog", words가 "hot","dot","dog","lot","log","cog" 라면
- "hit" -> "hot" -> "dot" -> "dog" -> "cog"와 같이 4단계를 거쳐서 변환이 가능하다

- 두 개의 단어 begin, target과 단어의 집합 words가 주어질 때, 최소 몇 단계 과정을 거쳐서 begin이 target으로 변화할 수 있는지를 return

- 제한사항
- 각 단어는 알파벳 소문자로만 이루어져 있다.
- 각 단어의 길이는 3이상 10이하이며, 모든 단어의 길이는 같다.
- words에는 3개 이상, 50개 이하의 단어가 있으며 중복 x
- begin과 target은 같지 않다
- 변환할 수 없는 경우에는 0을 return 한다.

## 문제풀이

- 목표 단어를 만들기 위해서는, 시작 단어에서 하나만 다른 단어가 words에 존재 해야한다.
- 그리고 그렇게 하나씩 다른 단어를 찾아가야 한다.
- 단어 비교 함수 작성

```python
a = "hit"
b = "hot"
cmp = zip(a, b)

print(next(cmp)) # ('h', 'h')
print(next(cmp)) # ('i', 'o')
print(next(cmp)) # ('t', 't')

```

- 이를 간략하게 줄이면 다음과 같이 사용할 수 있다.
- `def transistable(a, b): return sum((1 if x != y else 0) for x, y in zip(a, b)) == 1`

- queue를 사용해야 한다. -> 알파벳을 하나씩 바꿔가는 단어를 표시해두기 위해 사용한다
- 내장함수 filter : 인자의 iterator를 인자의 함수에 대입하여 True 요소들로 새로운 iterator를 구성하는 함수
- 이 함수는 위에서 정의한 단어 비교함수를 사용하기 위해 사용한다.
- 즉 단어 비교 함수와 (단어,words)를 인자로하여 filter를 사용한다.

```python
begin = "hit"
words = ["hot", "dot", "dog", "lot", "log", "cog"]
d = dict()


def transistable(a, b): return sum((1 if x != y else 0)
                                   for x, y in zip(a, b)) == 1


d[begin] = set(filter(lambda x: transistable(x, begin), words))
print(d)  ## {'hit': {'hot'}}
for w in words:
    d[w] = set(filter(lambda x: transistable(x, w), words))
print(d)
## {'hit': {'hot'}, 'hot': {'lot', 'dot'}, 'dot': {'lot', 'dog', 'hot'}, 'dog': {'log', 'dot', 'cog'}, 'lot': {'log', 'dot', 'hot'}, 'log': {'lot', 'dog', 'cog'}, 'cog': {'log', 'dog'}}
```

- 알파벳이 하나만 차이나는 단어를 체크한, dictoinary를 만들었다면, 이 순서를 잘 조합하여 begin에서 target으로 단어를 만들 차례
- 큐를 이용, 단어가 변화하는 과정을 체크
- 먼저 큐에서 단어를 뽑아놓고, 먼저 체크한 단어와 이어질 단어를 체크한다. 그리고 그 변화 과정의 횟수 또한 함께 체크한다.

```python
from collections import deque as queue

def transistable(a, b): return sum((1 if x != y else 0)
                                   for x, y in zip(a, b)) == 1

def solution(begin, target, words):
    q, d = queue(), dict()
    q.append((begin, 0))
    d[begin] = set(filter(lambda x: transistable(x, begin), words))
    # 알파벳이 하나만 차이나는지 모아놓은 dictoinary 생성
    for w in words:
        d[w] = set(filter(lambda x: transistable(x, w), words))
    while q:  # 큐가 빌 때까지 반복
        cur, level = q.popleft()  # 큐에서 하나 꺼낸다. cur은 현재 단어, level은 변환 횟수
        if level > len(words):  # 큐를 다 탐색했음에도, 목표 단어가 만들어지지 않았다면,
            return 0
        for w in d[cur]:  # 목표 단어를 만들기 위해 탐색
            if w == target:  # 목표 단어가 완성되면 변환 횟수 리턴
                return level + 1
            else:
                q.append((w, level + 1))

    return 0  # 큐를 모두 소비해도 목표 단어가 만들어지지 않는다면 0 리턴

print(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]))


```

[코드출처]<https://cocojelly.github.io/algorithm/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%97%B0%EC%8A%B5-DFS-BFS-(3)/>

### 다른 풀이

```python
def solution(begin,target,words):
    answer=[begin]
    if target not in words:
        return 0
    answer_count=0
    while(len(words)!=0):
        for i in answer:
            temp=[]
            for word in words:
                count=0
                for j in range(len(i)):
                    if i[j]!=word[j]:
                        count+=1
                    if count==2:
                        break
                if count==1:
                    temp.append(word)
                    words.remove(word)
        answer_count+=1
        if target in temp:
            return answer_count
        else:
            answer=temp
    return 0
```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://cocojelly.github.io/algorithm/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%97%B0%EC%8A%B5-DFS-BFS-(3)/>
