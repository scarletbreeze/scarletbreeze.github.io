---
layout: post
title: (자료구조)Dictionary
categories: [data]
excerpt: ' '
comments: false
share: false
tags: data
date: 2019-05-23
---

## Dictionary

- Map처럼 딕셔너리는 (Key, value)entry 구조를 검색하는 방식이다.
- Map과 달리, 중복되는 key를 허용한다. (Map의 put vs dictionary의 insert)
- 주요 동작은 -> searching, inserting, deleting
- 응용될 수 있는 것 : English dictionary(same words), Phone book(same names)

### Dictionary Operations

- entry find(k) : 키 값(k) 찾아서 리턴
- list findAll(k) : 중복되는 key 전부다 찾아서 리턴
- entry insert(k,v) : key와 value를 하나의 entry로 추가
- entry remove(e): 교재에서는 remove를 두 단계로 나누지만 그냥 remove(k)처럼 key값을 매개변수로 구현하자
- list entries(): 전체 entry를 리스트에 담아서 리턴

### A List-Based Dictionary

- 정렬되지 않은 리스트
- insert하게 되면 addfirst, addlast처럼 추가해줘
- findAll -> 이런 경우 다 찾아줘야해 -> linear search
- 단점 : search에 오랜 시간이 걸린다
- 장점 : insert가 빠르다.

### Find All Operation

![No Image](/assets/posts/20190523/1.png)

- linear search 형태
- 각각의 entry의 for each문 써서 가져오면서, key값이 내가 찾는 값과 일치하는지 비교
- 해당되는 키값을 찾으면, L은 리턴되는 리스트를 말함.
- 키가 여러개 있을 수 있으니까, 해당 리스트에 entry를 담아서 리턴

### Insertion and Removal Operation

![No Image](/assets/posts/20190523/2.png)

- insert는 add Last 하면 되고
- remove는 엔트리가 저장되어 있는 위치 쭉 찾아서, 내가 삭제하고자 하는 노드 찾으면 삭제

### Hash Table Dictionary

![No Image](/assets/posts/20190523/3.png)

- 해쉬테이블을 가지고 dictionary를 만들면 find,remove,insert 상수타임 (expected)
- findAll은 중복되는 키가 s만큼 있다고 가정하면 O(1+s)만큼의 시간이 걸린다.
- map에서 만들었던 방식과 동일.

### Ordered Search Table

- searchTable은 정렬된 리스트를 말한다.
- linear search일 때, insert,find,remove는 O(n)time
- binary search일 때, find- > O(log n)time
- 정렬되어 있는 경우에만 binary search 가능.
- binary search는 정렬이 빠르기 때문에 search가 빈번히 일어나는 신용카드, log 찾는 경우에 적합

### Binary Search

- 정렬이 되어 있어야 한다.
- 탐색 대상을 2분의 1로 줄여간다.
- middle 값 계싼은 high냐 low냐 상관x

![No Image](/assets/posts/20190523/4.png)

### Comparing Dictionary Implementations

![No Image](/assets/posts/20190523/5.png)

- searchTable : 인서트가 느리다. arraylist에 구현되어야 하기 때문에, 중간이 끼워너헝야 한다 -> O(n)
- remove-> 찾아서 지워야 하기 때무넹 O(n)

### Extensions of Dictionaries

- 딕셔너리 확장해서 구현하는 방법
- 엔트리가 삭제될 때, 엔트리 자체에 어느 노드에 저장되어 있는지 백링크를 가지고 있으면
- 즉 aware dictionary entry를 쓰면 remove 상수타임에 가능
- ordered dictionary를 사용하면 (키값으로 우선순위 판단)하면 효율적으로 구현 가능

---

하영국 교수님 자바 수업
