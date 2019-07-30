---
layout: post
title: programmers(61)level_2(타겟넘버)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-30
---

## 문제: 61. 타겟넘버

- n개의 음이 아닌 정수가 있다. 이 수를 적절히 더하거나 빼서, 타겟 넘버를 만들려고 한다.
- [1,1,1,1,1]로 숫자 3을 만들려면 -1을 1,1,1,1 사이에 어디에 넣느냐에 따라
- 5가지의 경우의 수가 있다.

- 제한사항
- 주어지는 숫자의 개수는 2개 이상, 20개 이하이다
- 각 숫자는 1이상 50이하인 자연수이다.
- 타겟 넘버는 1이상 1000이하인 자연수이다.

## 참고 블로그

- 깊이/너비 우선 탐색은 트리구조를 만들어서 풀 수 있다.

- 이 문제에서 타겟 넘버를 만드는 방법은 더하거나 빼거나 둘 중 하나다

- 하나의 숫자에 대해 다음 값을 더하는 경우, 빼는 경우로 트리구조를 만들어나갈 수 있다.

- 첫 수부터 빼는 경우가 있을 수 있으므로, 미리 0을 담아놓고 시작한다.

- 재귀로도 풀 수 있겠지만, 이렇게 트리구조를 만들어서 풀 수도 있다.

```python
def solution(numbers, target):
    answer_list = [0]
    for i in numbers:
        temporary_list = []
        for j in answer_list:
            temporary_list.append(j+i)
            temporary_list.append(j-i)
        answer_list = temporary_list
    answer = answer_list.count(target)
    return answer


print(solution([1, 1, 1, 1, 1]	, 3))

```

## 다른사람 풀이

- 재귀적으로 푼 방법이다.

```python
def solution(numbers, target):
    # 해당 연산이 경우의 수를 만족하므로 return 1 (target이 0이 되므로)
    if not numbers and target == 0 :
        return 1
    # 해당 연산이 경우의 수를 만족하지 못하므로 return 0
    elif not numbers:
        return 0
    else:
        return solution(numbers[1:], target-numbers[0]) + solution(numbers[1:], target+numbers[0])
```

- BFS,DFS 여전히 어렵다..
- 좀더 문제를 풀어보면서 어떻게 풀어야 하는지를 익혀야할 것 같다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://itholic.github.io/kata-target-number/>
[참고블로그2]<https://codedrive.tistory.com/50>
[참고블로그3]<https://cocojelly.github.io/algorithm/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%97%B0%EC%8A%B5-DFS-BFS-(1)/>
