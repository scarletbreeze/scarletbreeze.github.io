---
layout: post
title: programmers(48)level_2(구명보트)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level2
date: 2019-07-26
---

## 문제: 48 구명보트

- 초기 생각.
- 내림차순 정렬한 뒤, 하나씩 체크해주면 되지 않을까?

```python
def solution(people, limit):
    boat, cnt = 0, 1
    people = sorted(people)
    for i in people:
        if boat+i <= limit:
            boat += i
        else:
            boat = i
            cnt += 1
    return cnt


print(solution([70, 80, 50], 100))
```

- 틀림
- 왜냐하면, `[50,40,40,60,60,50]`이 주어진다면
- 단순히 정렬하면 `[40,40,50,50,60,60]`이 되어서
- 구명보트가 4개가 필요하지만,
- `[40,60],[50,50],[40,60]`으로 묶는다면 3개면 되기 때문이다.
- 무인도에 갇힌 사람은 5만명 이하라고 했기 때문에, 효율성 테스트 또한 고려 해야한다.

- 주의사항.
- for문을 돌 때, `range(len(array))` 와 같은 방식 사용시, 중간에 array의 길이가 바뀐다고 해도, 초기에 들어있는 값대로 for문이 진행된다.
- 따라서 중간에 값이 바뀐다면, while을 사용해주는 게 좋다.

* 예시 코드

```python
array = [1, 2, 3, 4, 5]
array2 = [1, 2, 3, 4, 5]
for i in range(len(array)):
    array.pop(-1)
    print(i, len(array))
# 0 4 \n 1 3 \n 2 2 \n 3 1 \n 4 0\n 출력
idx = 0
while(idx < len(array2)):
    array2.pop(-1)
    print(idx, len(array2))
    idx += 1
# 0 4 \n 1 3 \n 2 2\n 출력
```

## 참고답안

- for문을 2개 쓰면 통과하기 힘들다
- 가장 몸무게가 작은 사람과 무거운 사람과 매칭을 해보는 방법으로 진행할 수 있다.
- 가장 작은 사람의 무게와 무거운 사람의 무게가 limit 보다 작다면, 탑승할 수 있으므로
- count를 한개 늘리고 light의 인덱스를 1 증가, heavy 인덱스 1 감소
- 만약 limit 보다 크다면 heavy의 인덱스 1 감소
- 이를 light의 인덱스가 heavy의 인덱스를 앞지를 때까지 반복
- 이후 최종 구명보트의 수는, people의 전체 길이에서 count 값을 뺸 값이 된다

```python
def solution(people, limit):
    people.sort()
    length = len(people)
    light = 0
    heavy = length-1
    count = 0
    while light < heavy:
        if people[light] + people[heavy] <= limit:
            count += 1
            light += 1
            heavy -= 1
        else:
            heavy -= 1
    return length-count


print(solution([35, 50, 60, 70], 100))

```

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://chaibin0.tistory.com/entry/%EA%B5%AC%EB%AA%85%EB%B3%B4%ED%8A%B8>
[참고블로그]<https://codedrive.tistory.com/46>
