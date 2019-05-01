---
layout: post
title: (자료구조)priorityQueue(실습))
categories: [data]
excerpt: ' '
comments: false
share: false
tags: data
date: 2019-05-01
---

## 실습 1. Entry인터페이스를 이용하여 MyEntry 클래스 구현, Sorted List를 기반으로 MyPQ 클래스 완성

#### Entry interface

```java
package priorityQueue;

public interface Entry {
	public void setKey(Object k);
	public void setValue(Object v);
	public Object getKey();
	public Object getValue();
}
```

#### MyEntry Class

```java
package priorityQueue;

public class MyEntry implements Entry{
	private Object key;
	private Object value;

	public MyEntry(){
		this.key = null;
		this.value = null;
	}

	public MyEntry(Object k, Object v) {
		this.key = k;
		this.value = v;
	}

	@Override
	public void setKey(Object k) {
		this.key = k;
	}

	@Override
	public void setValue(Object v) {
		this.value = v;

	}

	@Override
	public Object getKey() {
		return this.key;

	}

	@Override
	public Object getValue() {
		return this.value;
	}

}

```

#### MyPQ Class

```java
package priorityQueue;

import java.util.ArrayList;
import java.util.Comparator;

public class MyPQ {

	private ArrayList list;
	private Comparator cpt;

	MyPQ(){
		this.list = null;
		this.cpt = null;
	}

	//constructors
	MyPQ(Comparator comp){
		this.list = new ArrayList();
		this.cpt = comp;
	}

	MyPQ(int initialCapacity, Comparator comp){
		this.list = new ArrayList(initialCapacity);
		this.cpt = comp;
	}

	public int size() {
		return list.size();
	}

	public boolean isEmpty() {
		return list.isEmpty();
	}

	public MyEntry insert(Object k, Object v) {
		MyEntry newEntry = new MyEntry(k,v);

		int where = 0;
		int len = list.size();

		for(int i= 0 ; i < len ; i ++) {
			MyEntry temp = (MyEntry)list.get(i);
			if(this.cpt.compare(k, temp.getKey())>0) {
				where++;
			}
		}
		list.add(where,newEntry);

		return newEntry;
	}

	public MyEntry removeVin() {
		return (MyEntry)list.remove(0);
	}

	public MyEntry min() {
		return (MyEntry)list.get(0);
	}
}

```

## 실습 1-2 Comparator 인터페이스를 이용하여 Integer를 비교하는 IntComparator 클래스를 구현하고, main 메소드를 실행하여 결과를 출력하시오

#### IntComparator 클래스

```java
package priorityQueue;
import java.util.Comparator;

public class IntComparator implements Comparator{
	public int compare(Object o1, Object o2) {
		return (int)o1 - (int)o2;
	}
}

```

#### Main

```java
package priorityQueue;

public class Main {

	public static void main(String[] args) {
		IntComparator c = new IntComparator();
		MyPQ pq = new MyPQ(c);

		pq.insert(new Integer(30),null);
		pq.insert(new Integer(10),null);
		pq.insert(new Integer(20),null);

		System.out.println((Integer)pq.removeMin().getKey());
		System.out.println((Integer)pq.removeMin().getKey());
		System.out.println((Integer)pq.removeMin().getKey());

	}

}

```

## 실습 2. MyPQ 클래스를 이용하여 다음 문제를 해결하는 Java 프로그램을 작성하시오

1. 2차원 평면상에 아래와 같은 점들이 있을 때, 이 점들을 원접에서부터 가까운 순서대로 출력하는 프로그램을 작성하시오
   - 2차원 평면상의 거리는 Euclidean Distance from (0,0) to p(x,y) = sqrt(p.x^2 + p.y^2)
   - 2차원 ㅍ여면상의 점은 java.awt.Point클래스를 사용하여 구현함(살습자료 뒤에 [별첨 2] 참조)
2. 2차원 평면상에 아래 그림과 같 은 점들이 있을 때, 이 점들을 원점에서부터 멀리 있는 순서(위의 1번 문제와 반대 순서)대로 출력할 수 있도록) 새로운 IntComparator2를 구현하고, 이를 이용하여 화면에 결과를 출력하시오

![No image](/assets/posts/20190501/10.png)

### IntComparator 2

```java
package priorityQueue;

public class Main {

	public static void main(String[] args) {
		IntComparator c = new IntComparator();
		MyPQ pq = new MyPQ(c);

		pq.insert(new Integer(30),null);
		pq.insert(new Integer(10),null);
		pq.insert(new Integer(20),null);

		System.out.println((Integer)pq.removeMin().getKey());
		System.out.println((Integer)pq.removeMin().getKey());
		System.out.println((Integer)pq.removeMin().getKey());

	}

}

```

### main

```java
package priorityQueue;

import java.awt.Point;

public class Main {

	public static void main(String[] args) {
		IntComparator c2 = new IntComparator();
		MyPQ pq2 = new MyPQ(c2);

		Point p1 = new Point(5, 4);
		pq2.insert((int) Math.sqrt(Math.pow(p1.getX(), 2) + Math.pow(p1.getY(), 2)), "a (5,4)");
		Point p2 = new Point(2, 7);
		pq2.insert((int) Math.sqrt(Math.pow(p2.getX(), 2) + Math.pow(p2.getY(), 2)), "b (2,7)");
		Point p3 = new Point(9, 5);
		pq2.insert((int) Math.sqrt(Math.pow(p3.getX(), 2) + Math.pow(p3.getY(), 2)), "c (9,5)");
		Point p4 = new Point(3, 1);
		pq2.insert((int) Math.sqrt(Math.pow(p4.getX(), 2) + Math.pow(p4.getY(), 2)), "d (3,1)");
		Point p5 = new Point(7, 2);
		pq2.insert((int) Math.sqrt(Math.pow(p5.getX(), 2) + Math.pow(p5.getY(), 2)), "e (7,2)");
		Point p6 = new Point(9, 7);
		pq2.insert((int) Math.sqrt(Math.pow(p6.getX(), 2) + Math.pow(p6.getY(), 2)), "f (9,7)");
		Point p7 = new Point(1, 4);
		pq2.insert((int) Math.sqrt(Math.pow(p7.getX(), 2) + Math.pow(p7.getY(), 2)), "g (1,4)");
		Point p8 = new Point(4, 3);
		pq2.insert((int) Math.sqrt(Math.pow(p8.getX(), 2) + Math.pow(p8.getY(), 2)), "h (4,3)");
		Point p9 = new Point(8, 2);
		pq2.insert((int) Math.sqrt(Math.pow(p9.getX(), 2) + Math.pow(p9.getY(), 2)), "i (8,2)");
		Point p10 = new Point(4, 8);
		pq2.insert((int) Math.sqrt(Math.pow(p10.getX(), 2) + Math.pow(p10.getY(), 2)), "j (4,8)");

		int len = pq2.size();
		for (int i = 0; i < len; i++) {
			System.out.println(pq2.removeMin().getValue());
		}
		System.out.println("------------------------------------------");

		IntComparator2 c3 = new IntComparator2();
		MyPQ pq3 = new MyPQ(c3);
		pq3.insert((int) Math.sqrt(Math.pow(p1.getX(), 2) + Math.pow(p1.getY(), 2)), "a (5,4)");
		pq3.insert((int) Math.sqrt(Math.pow(p2.getX(), 2) + Math.pow(p2.getY(), 2)), "b (2,7)");
		pq3.insert((int) Math.sqrt(Math.pow(p3.getX(), 2) + Math.pow(p3.getY(), 2)), "c (9,5)");
		pq3.insert((int) Math.sqrt(Math.pow(p4.getX(), 2) + Math.pow(p4.getY(), 2)), "d (3,1)");
		pq3.insert((int) Math.sqrt(Math.pow(p5.getX(), 2) + Math.pow(p5.getY(), 2)), "e (7,2)");
		pq3.insert((int) Math.sqrt(Math.pow(p6.getX(), 2) + Math.pow(p6.getY(), 2)), "f (9,7)");
		pq3.insert((int) Math.sqrt(Math.pow(p7.getX(), 2) + Math.pow(p7.getY(), 2)), "g (1,4)");
		pq3.insert((int) Math.sqrt(Math.pow(p8.getX(), 2) + Math.pow(p8.getY(), 2)), "h (4,3)");
		pq3.insert((int) Math.sqrt(Math.pow(p9.getX(), 2) + Math.pow(p9.getY(), 2)), "i (8,2)");
		pq3.insert((int) Math.sqrt(Math.pow(p10.getX(), 2) + Math.pow(p10.getY(), 2)), "j (4,8)");

		len = pq3.size();

		for (int i = 0; i < len; i++) {
			System.out.println(pq3.removeMin().getValue());
		}

	}
}

```

---

하영국 교수님 자바 수업
