---
layout: post
title: programmers(76)level_3(단속 카메라)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-06
---

## 문제: 76. 단속 카메라

- testcase에 나와있는 -20,15는 -20,-15로 추정된다

```python
def solution(routes):
    routes.sort()
    answer = 0
    check = [0] * len(routes)
    for i in range(len(routes)-1, -1, -1):
        if check[i] == 0:
            camera = routes[i][0]
            answer += 1
        for j in range(i-1, -1, -1):
            if check[j] == 0 and routes[j][1] >= camera >= routes[j][0]:
                check[j] = 1
    return answer


print(solution([[-20, 15], [-14, -5], [-18, -13], [-5, -3]]	))

```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[codeDrive님참고블로그]<https://codedrive.tistory.com/163>
