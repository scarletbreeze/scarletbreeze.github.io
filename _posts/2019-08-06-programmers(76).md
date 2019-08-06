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

-![No Image](/assets/posts/20190806/1.png)

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

## 다른 사람 풀이

```python
def solution(routes):
    routes = sorted(routes, key=lambda x: x[1])
    last_camera = -30000

    answer = 0
    print(routes)
    for route in routes:
        print("route:", route)
        if last_camera < route[0]:
            answer += 1
            last_camera = route[1]
    return answer

print(solution([[-20, -15], [-14, -5], [-18, -13], [-5, -3]]))
```

- 위 코드는 for문을 한번만 돌면 된다.
- 이전의 문제들과 접근 방법은 비슷하다.
- 정렬을 x[1]을 기준으로 한다. 순차적으로 계산이 가능해진다.
- for문에서 리스트를 꺼내면서 마치 최소값을 구하듯, route[0]보다 작을 때만, answer+=1 해준뒤, last_camera에 route[1]을 기억. 이를 반복해주면 된다.
- 거꾸로 풀 필요도 없고, for문을 2번 쓸 필요도 없는 깔끔한 코드다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[codeDrive님참고블로그]<https://codedrive.tistory.com/163>
