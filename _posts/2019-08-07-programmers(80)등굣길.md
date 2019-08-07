---
layout: post
title: programmers(80)level_3(등굣길)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-07
---

## 문제: 80. 등굣길

- 격자 모양의 좌표 M,N이 주어지고
- 집은 1,1에. 학교는 가장 오른쪽 아래에 주어진다
- puddles라는, 물이 잠긴 지역의 좌표가 주어지며. 이는 지나갈 수 없다.

- 완전 탐색이 아닌, DP로 풀어보자.

```python
def solution(m, n, puddles):
    # 값 세팅
    Map = [[0]*(m+1) for _ in range(n+1)]
    Map[1][1] = 1
    for i in range(1, n+1):
        for j in range(1, m+1):
            if i == 1 and j == 1:
                continue
            if [j, i] in puddles:
                Map[i][j] = 0
            else:
                Map[i][j] = Map[i-1][j] + Map[i][j-1]
    return Map[n][m] % 1000000007

print(solution(4, 3, [[2, 2]]))
```

- 문제에서 주의해야할 점은, n,m이 반대로 주어진다는 것이다. 즉 행과 열이 뒤집혀 있다.
- 따라서 puddles를 처리해줄 때도 주의해야 한다.
- puddles 안에 있는 값을 구할 때마다, 0으로 초기화시켜주면 하나의 for문안에 다 만들 수 있다.

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
