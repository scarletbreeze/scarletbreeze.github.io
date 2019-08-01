---
layout: post
title: programmers(70)level_2(조이스틱)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-08-01
---

## 문제: 70. 조이스틱

- A~Z까지의 총 수는 26개이며, 초기값 A에서 시작했을 때, N에서 모두 13번 걸린다. (A부터 출발하던, Z로가서 출발하던)
- 따라서 B~N 사이의 수라면, 해당 수만큼 인덱스 더해주고
- 마찬가지로 Z~ N사이의 수라면 해당 수만큼 거꾸로 인덱스를 더해줘서 구할 수 있다.
- JAZ에서, 언제 왼쪽으로 가야하는지, 오른쪽으로 가야하는 지를 판단할 수 있을까?
  - ex) JNAAAAC가 있다고 해보자.
  - J에서 N으로 한번 갔다가 왼쪽을 2번 눌러 C로 가는게 더 최소값이다.
  - 이 조건을 명확히 모르겠다.

## 풀이 방법

1. 문자의 이동 -> 아래로 갈지, 위로 갈지 => 아스키 코드 함수인 ord 사용
2. 위치의 이동 -> 문자 중 A가 존재한다면, 이동 시킬 필요가 없으므로 오른쪽으로 이동할지, 왼쪽으로 이동할지 결정. => 이는 문자를 이동시킨 인덱스에서, 오른쪽 문자와 왼쪽 문자 중 A가 아닌 것을 더 빨리 만나는 쪽으로 이동.

- 너무 어려워서 아래 블로그의 내용을 이해하는 데에 그쳤다.

```python
def solution(name):
    answer = 0
    name = list(name)
    base = ["A"]*len(name)
    idx = 0
    while(True):
        r_idx = 1
        l_idx = 1
        if name[idx] != "A":  # A 가 아닐 때
            if ord(name[idx])-ord("A") > 13:
                answer += 26-(ord(name[idx])-ord("A"))  # 26에서 개수를 빼주면 된다
            else:
                answer += ord(name[idx])-ord("A")
            name[idx] = "A"  # name 리스트가 전부 "A"일 때, 종료하기 위해서
        if name == base:
            break
        else:
            for i in range(1, len(name)):
                # 좌, 우에 "A"가 있는지 검사하고 개수를 센다.
                if name[idx+i] == "A":
                    r_idx += 1
                else:
                    break
                if name[idx-i] == "A":
                    l_idx += 1
                else:
                    break
            if r_idx > l_idx:  # 오른쪽이 더 개수가 많으면,
                answer += l_idx  # 왼쪽으로 가야지
                idx -= l_idx  # 음수로 가면 오른쪽 맨 끝으로 이동하니까 문제 x
            else:
                answer += r_idx
                idx += r_idx
    return answer


print(solution("JEROEN"))

```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://burningrizen.tistory.com/142>
