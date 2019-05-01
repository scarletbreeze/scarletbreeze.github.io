---
layout: post
title: (자료구조)priorityQueue
categories: [data]
excerpt: " "
comments: false
share: false
tags: data
date: 2019-05-01
---

## Priority queue

- #### 우선순위에 따라서 데이터를 꺼낼 수 있는 자료구조
- 데이터를 저장할 때는 임의의 순서대로 저장할 수 있다.
- 데이터를 꺼낼 때는 우선순위가 높은 게 먼저 나간다.
- 우선순위 결정하는 것 : key
- key값은 문자, 숫자, 객체 등 여러 형태

### Prioirty Queue Operations
-	(key,value)를 합쳐서 Entry라고 부른다
-	entry insert(k,x) : key:x, value:x를 PQ에 넣고, entry를 반환한다. 
-	entry removeMin(): 키 값이 가장 작은걸 거낸다. 키값이 작을수록 우선순위가 높다. 
-	entry mIn() : 가장 작은 키가 무엇인지 리턴
-	size(), IsEmpty()

### Applications of PQ
- standBy passengers 시나리오

### Total Order Relations
-	특정한 오브젝트를 키값으로 사용할 때, 그들 간의 크기 비교가 이루어지기 위해서는 이 관계가 이루어져야 한다
-	x<=x : 자기 자신은 자기 자신보다 우선순위가 높다
-	(x<=y) && (y<=x) => x와 y의 우선순위는 같다
-	(x<=y) && (y<=z) => x <=z x가 z보다 우선순위가 높다

### Comparing Keys

- ex) String의 경우 "11" <= "4" -> 사전식 (lexicographic order)
- ex) 객체 마다의 우선순위 정하기 나름

### Supporting Components for PQ

-	Entry : 키값에 대해 핸들링을 용이하게 해주기 위해 만든 데이터 구조 (entry라는 클래스를 하나 만든다고 생각)
-	Comparator: 키 값을 비교해주는. 비교 전문

### Entry 
-	`getKey()` : 키값 리턴
-	`getValue()` :  value 값 리턴
-	setKey(), setValue()도 추가하면 좋다

### Comparator

- removeMin operation 안 쪽에서 끄집어 내도 되잖아. -> 이렇게 사용한 이유는 재활용 위해서.
- prioirty Queue라는 본체를 만들어 놓고. prioirty queue가 integer, string 등이 있 을 수 있으니, 이를 재활용하기 위해서 Comparator 클래스 제작
- 즉 Comparator는 비교만 한다.
- `compare(a,b)` : returns an integer i 

### Example Comparator

- java.util.Comparator 라는 인터페이스가 있다. 이를 implements하면 된다.

## Built-in Java Class Implementing Priority Queue

![No Image](/assets/post/20190501/7.png)

## List-Based PQ

- 실제로 Prioirty Queue를 어떻게 구현할껀가 ?  => 리스트 이용해서 2가지 방법 가능(정렬 O, 정렬 X)
- 자바에 있는 ArrayList 사용
- 정렬이 되지 않았을 경우, 비교해서 꺼낼 때 작은 거부터 꺼내야 한다. 즉 꺼낼 때 찾아야 한다
- 정렬된 경우 Min 해버리면 가장 작은 키를 꺼낼 수 있어 
- 정렬된 경우 꺼낼 때 상수타임 넣을 때 O(n). 정렬되지 않은 경우 꺼낼 때 O(n), 넣을 때 O(1)

## Sorting with a PQ
- n개의 숫자를 정렬한다고 가정
- PQ에 n번 인서트했다가 n번 remove 하면 된다

### Selection Sort and Insertion Sort
-	정렬된 리스트를 이용하면 -> InsertionSort
-	정렬되지 않은 리스트 이용 -> SelectionSort

### In-place Sorting
-	굳이 prioirty queue를 또 만들지 말고, input list를 사용하자

### In-place Insertion Sort

![No Image](/assets/post/20190501/8.png)

### In-place Selection Sort

![No Image](/assets/post/20190501/9.png)

- - -
 
하영국 교수님 자바 수업 


