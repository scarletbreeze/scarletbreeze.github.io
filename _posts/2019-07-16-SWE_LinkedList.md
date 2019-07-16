---
layout: post
title: SWE_LinkedList
categories: [python]
excerpt: ' '
comments: false
share: false
tags: python
date: 2019-07-16
---

## 7강 링크드 리스트

1. 파이썬 리스트

- 순서를 가진 데이터의 묶음 - 같은 데이터의 중복 저장 가능
- 시퀀스 자료형 - 인덱싱, 슬라이싱, 연산자, 메서드 사용 가능
- 크기 제한 없음. 타입 제한 없음
- 배열은 크기 변경 불가. 선언된 한 가지 타입만 저장 가능
- 리스트는 크기 변경 가능, 다양한 데이터 타입 저장 가능
- 다른 언어에서 배열로 구현한 순차리스트의 개념이 파이썬에서 제공하는 리스트다.
- 순차 리스트의 개념인 리스트와, 메모리의 동적 할당 기반으로 구현된 리스트를 알아보자.

2. 순차 리스트

- 초기화 및 생성. 변수에 값을 초기화 하는 것으로 리스트 생성
- 리스트의 인덱스를 이용해 데이터 접근 가능

3. 리스트

- 파이썬의 리스트는 동적 배열로 작성된 순차 리스트
- 자료의 삽입 삭제 연산 -> 원소의 이동 작업이 필요
- 원소의 개수가 많고 삽입 삭제 연산이 빈번한 작업 -> 소요시간이 증가
- 리스트 복사
- 수행시간의 차이가 있고, 의미가 다른 항목 존재
  ![No Image](/assets/posts/20190716/1.png)
- 아래로 내려 갈수록 시간이 많이 걸리는 작업이다.
- 2번의 방법이 추천되는, 가장 많이 사용되는 방법이다.
  ![No Image](/assets/posts/20190716/2.png)
- 마지막 방법은, 위 방법들과 달리, 원소들의 객체까지도 깊은 복사를 해준다.

4. 연결리스트

- 리스트의 단점을 보완한 자료 구조
- 자료의 논리적인 순서와 메모리 상의 물리적인 순서가 일치하지 않고 개별적으로 위치하고 있는 원소의 주소를 연결하여 하나의 전체적인 자료구조를 이룸
- 링크를 통해 원소에 접근하므로, 순차 리스트에서 물리적인 순서를 맞추기 위한 작업이 필요 없음
- 자료구조의 크기를 동적으로 조정할 수 있어 메모리의 효율적인 사용이 가능
- 탐색은 순차 탐색

5. 연결리스트 필요한 연산

   addtoFirst() 연결리스트의 앞쪽에 원소를 추가하는 연산
   addtoLast() 연결리스트의 뒤쪽에 원소를 추가하는 연산
   add() 연결리스트의 특정 위치에 원소를 추가하는 연산
   delete() 연결리스트의 특정 위치에 원소를 삭제하는 연산
   get() 연결리스트의 특정 위치에 있는 원소를 리턴하는 연산

6. 연결리스트이 노드와 헤드

- 노드 : 연결 리스트에서 하나의 원소에 필요한 데이터를 갖고 있는 단위
- 데이터 필드(원소의 값 저장)와 링크 필드(다음 노드의 위치 저장)로 구성

- 헤드 : 리스트의 처음 노드를 가리키는 레퍼런스

7. 단순 연결리스트

- 노드가 하나의 링크 필드에 의해 다음 노드와 연결되는 구조를 가짐
- 헤드가 가장 앞의 노드를 가리키고, 각 노드의 링크 필드가 연속적을 다음 노드를 가리킴
- 최종적으로 None을 가리키는 노드가 리스트의 가장 마지막 노드임

8. 단순 연결리스트의 삽입 연산

   1. 메모리 할당. 새로운 노드 생성
   2. 새로운 노드의 데이터 필드에 B를 저장
   3. 삽입될 위치의 바로 앞에 위치한 링크 필드를 생성된 노드에 복사
   4. 생성된 주소의 노드를 앞 노드의 링크 필드에 저장

9. 첫 노드에 데이터 삽입

```python
def addtoFirst(data): # 첫 노드에 데이터 삽입
global Head
Head = Node(data,Head) # 새로운 노드 생성
```

10. 가운데 노드로 삽입하는 알고리즘

```python
def add(pre,data): # pre 다음에 데이터 삽입
    if(pre == None):
        print('error')
    else:
        pre.link = node(data,pre.link)
```

11. 마지막 노드로 삽입하는 알고리즘

```python
def addtoLast(data): # 마지막에 삽입
    global Head
    if Head == None: # 빈 리스트이면
        Head = Node(data,None)
    else :
        p = Head
        while p.link != None: # 마지막 노드 찾을 때까지
            p = p.link
        p.link = Node(data,None)
```

12. 첫 번째 노드 삭제하는 알고리즘

```python
def deletetoFirst():# 처음 노드 삭제
    global Head
    if Head == None:
        print('error')
    else:
        Head = Head.link
```

13. 노드 삭제 알고리즘

```python
def delete(pre): #pre 다음 노드 삭제
    if pre == None or pre.link == None:
        print('error')
    else:
        pre.link  pre.link.lnk
```

14. 이중연결리스트

---

참고자료
[SW_Expert_Academy]<https://swexpertacademy.com/main/learn/course/lectureVideoPlayer.do>
