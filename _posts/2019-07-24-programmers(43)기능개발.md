---
layout: post
title: programmers(43)level_2(기능개발)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-24
---

## 문제: 43. 기능 개발

- 제한사항
- 작업의 개수(progressess,speeds배열의 길이는 100개 이하이다.
- 작업 진도는 100 미만의 자연수
- 작업의 속도는 100 이하의 자연수
- 배포는 하루에 한 번 가능. 하루의 끝에 배포
- 예를 들어 진도율이 95%인 작업의 개발 속도가 하루 4%라면, 배포는 2일 뒤에 이루어진다.

- 입출력 예
- progresses : [93,30,55], speeds[1,30,5], return [2,1]
- 첫 번째 기능은 하루에 1%씩 작업이 가능, 7일간 작업 후 배포 가능
- 두 번째 기능은 30% 완료되었고, 하루에 30%씩 작업 가능-> 3일간 작업 후 배포가능
- 하지만 이전 첫 번째 기능이 아직 완성 상태가 아니기 때문에, 첫 번째 기능이 배포되는 7일째 배포가 가능
- 세 번째 기능은 55%가 완료되었고, 하루에 5%씩 가능하므로 9일간 작업 후 배포 가능
- 따라서 7일째에 2개, 9일 째에 1개의 기능이 배포된다.

## 생각한 방법

1. 우선 각자 언제 배포가 끝날지, 그 리스트를 구해보자

- 93에서 1을 몇 번 더해야 100이상이 되는가 ? -> 7번
- 30에서 30을 몇 번 더해야 100 이상이 되는가? -> 3번
- 55에서 5를 몇 번 더해야 100 이상이 되는가? -> 9번
- [7,3,9]

2. 이 리스트에서 [0]번째 수 보다 큰 수가 나오기 전까지, 리스트를 자르고 빼낸다.

- 7은 9보다 작으므로, 3까지 자르고 더해서 결과 리스트에 추가
- 9는 1개 남았으므로 그대로 출력

3. 결과리스트를 출력한다

## 풀이과정

- 100에서 progresses 하나 뺀 뒤, 이를 speeds로 나눴을 때, 값이 나누어 떨어지면, 그대로 적용하고, 나누어 떨어지지 않는다면 +1을 해줘야 한다.
- 올림을 해주는 것이기 때문에 ceil 함수를 사용해봤다.

- 위 생각한 방법대로 쉽게 작동하지 않았다.
- 예제 케이스를 더 살펴보자
  예제 1)
  progresses : [40, 93, 30, 55, 60, 65]
  speeds : [60, 1, 30, 5 , 10, 7]
  return : [1,2,3]

  예제 2)
  progresses : [93, 30, 55, 60, 40, 65]
  speeds : [1, 30, 5 , 10, 60, 7]
  return : [2,4]

## 참고 블로그

2번의 과정을 혼자서 제대로 수행하지 못했다
결국 풀이를 참고했다.
나는 자르고 빼내는 방법을 생각했는데, 그것보다 index를 갱신하도록 하는 방안을 짜면 훨씬 효율적이다.

```python
import math
def solution(progresses, speeds):
    answer = []
    progresses = [math.ceil((100-a)/b) for a, b in zip(progresses, speeds)]
    front = 0
    for idx in range(len(progresses)):
    if progresses[front] < progresses[idx]:
        answer.append(idx-front)
        front = idx
    answer.append(len(progresses)-front)
return answer

출처: https://geonlee.tistory.com/122 [빠리의 택시 운전사]
```

- zip 함수를 list comprehension을 사용하면 아래의 코드를 더 줄일 수 있다.

```python
for x, y in zip(progresses, speeds):
        z = math.ceil((100 - x) / y)
        mid.append(z)
```

## 이 문제에서 가장 크게 배울 것은

- front의 사용법이다.

```python
for idx in range(len(progresses)):
    if progresses[front] < progresses[idx]:
        answer.append(idx-front)
            front = idx
    answer.append(len(progresses)-front)
```

- 이렇게 front의 값을 업데이트 하면서, 값을 구할 수 있다.

---

참고자료
[참고블로그]<https://geonlee.tistory.com/122>
[프로그래머스]<https://programmers.co.kr/learn/challenges>
