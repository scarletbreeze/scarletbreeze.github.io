---
layout: post
title: programmers(86)level_3(저울)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-22
---

## 저울

- 이 문제와 동일한 문제를 백준 그리디에서 풀었던 기억이 있다.
- 그 때 제대로 풀지 못했었다.
- 지금 보니 또 모르겠다.

1. weight 배열 정렬
2. target=1로 지정한뒤 weight 배열 첫번째와 비교
3. target이 weight[i]보다 작다면 답을 찾은 것
4. 그렇지 않다면 target에 weight[i]를 더한다.
5. 답 찾았을 때 break 해서 출력한다.

- 결론은 직관적으로 풀면 된다.
-

```python
def solution(weight):
    weight.sort()
    target = 1
    for x in weight:
        if target < x:
            return target
        target += x
    return target
```

---

참고자료
[codeplus](https://code.plus/course/33)
