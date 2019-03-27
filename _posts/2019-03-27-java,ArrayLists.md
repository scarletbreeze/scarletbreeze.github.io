---

title: java List 수업 복습(1)(ArrayList)
tag: data

---

## 3월 27일 배운 것 복습

	*	Array Lists(aka Vectors)
	*	Node lists
	*	Sequences
	*	Iterators

 
## 선형 대 비선형

*	선형 자료구조 : 스택, 뷰, 덱, 배열리스트(vectors), 노드리스트, Sequences

*	비선형 자료구조 : 트리, 그래프
(그래프라는게 트리를 포함한다. 사이클이라는게 존재하기만 한다면 그래프다.)

## Array List(Vectors)

ArrayLists는 데이터를 내가 원하는 위치에 저장하고 읽어올 때, **인덱스**를 기반으로한다.

Array List 구현해보자

※ 조건 : 인덱스 값이 음수거나, size()-1 이면 안된다. get operation을 실행할 때.

operations 정리
*	object get(int i): i 번째에 object저장
*	object set(int i, object e) : i 번째에 있던 
값 리턴해주고 e저장.
*	void add(int i, object e): e를 i번째에 삽입 (끼워 넣는 개념이니 뭔가 있으면 밀어줘야해)
*	object remove(int i) : i번째 공간 삭제 (삭제니까 땡겨주는 것 포함)

```
package ArrayList;

import java.util.ArrayList;
import java.util.Iterator;

class arrayList {

	public static void main(String[] args) {
		 ArrayList<Integer> numbers = new ArrayList<>();

	        numbers.add(10);
	        numbers.add(20);
	        numbers.add(30);
	        numbers.add(40);
	        System.out.println("add(값)");
	        System.out.println(numbers);

	        numbers.add(1, 50);
	        System.out.println("\nadd(인덱스, 값)");
	        System.out.println(numbers);

	        numbers.remove(2);
	        System.out.println("\nremove(인덱스)");
	        System.out.println(numbers);

	        System.out.println("\nget(인덱스)");
	        System.out.println(numbers.get(2));

	        System.out.println("\nsize()");
	        System.out.println(numbers.size());

	        System.out.println("\nindexOf()");
	        System.out.println(numbers.indexOf(30));

	        Iterator it = numbers.iterator();
	        System.out.println("\niterator");
	        while (it.hasNext()) {
	            int value = (int) it.next();
	            if (value == 30) {
	                it.remove();
	            }
	            System.out.println(value);
	        }
	        System.out.println(numbers);

	        System.out.println("\nfor each");
	        for (int value : numbers) {
	            System.out.println(value);
	        }
	        System.out.println("\nfor");
	        for (int i = 0; i < numbers.size(); i++) {
	            System.out.println(numbers.get(i));
	        }
	}

}


```

## 구현한 Array List

```
package ArrayList;

public class arrayList2 implements array {
	
	//클래스 필드 선언
	private int size;  //몇 개의 데이터가 리스트에 들어있는가 
	private Object[] elementData;
	
	// 생성자 따로 사용 
	arrayList2(int ArraySize){
		this.size = 0;
		this.elementData = new Object[ArraySize];
	}
	
	@Override
	public Object get(int index) {
		return elementData[index];
	}

	@Override
	public Object set(int index, Object e) {
		Object removed = elementData[index];
		elementData[index] = e;
		return removed;
	}
	
	@Override
	public void add(Object e) {
		elementData[size] = e;
		size++;
	}
	@Override
	public void add(int index, Object e) {
		// 끝의 요소부터 index노드까지 한칸씩뒤로 민다.
		for(int i = size-1; i>=index; i--)
			elementData[i+1] = elementData[i];
		// index에 노드 추가
		elementData[index] = e;
		size++;
	}

	@Override
	public Object remove(int index) {
		// element 삭제하기 전에 삭제할 데이터를 removed 변수에 저장
		Object removed = elementData[index];
		// 삭제된 엘리먼트 다음 엘리먼트부터 마지막 엘리먼트까지 순차적으로 이동해서 빈자리를 채운다
		for(int i = index+1; i<=size-1; i++) {
			elementData[i-1] = elementData[i];
		}
		
		//크기를 줄인다.
		size --;
		// 마지막 위치의 엘리먼트를 명시적으로 삭제해준다.
		
		elementData[size] = null;
		
		return removed;
	}

	@Override
	public int size() {
		return size;
	}

	@Override
	public boolean isEmpty() {
		if(size == 0)return true;
		else return false;
	}

	public String toString(){
	    String str = "[";
	    for(int i=0; i < size; i++){
	        str += elementData[i];
	        if(i < size-1){
	            str += ",";
	        }
	    }
	    return str + "]";
	}

	public static void main(String[] args) {
		 arrayList2 arrayList = new arrayList2(20);
		 arrayList.add("A");
		 arrayList.get(0);
		 arrayList.set(0,"A1");
		 arrayList.set(0,"A2");
		 arrayList.add(1,"B");
		 arrayList.remove(0);
		 System.out.print(arrayList);
	 
	}	
}

```

위 코드에서는 생성자에 size변수를 포함하여 작성하였다.

하지만 size 변수를 선언하지 않고도 문제를 풀 수 있다. 관건은 배열안에 들어있는 원소의 갯수를 어떻게 구하냐는 문제인데 다음과 같은 함수를 선언해서 구할 수 있다.

```
	public int size(){
    	for(int i= 0; i < Array.length(); i++){
        	if(Array[i] == null) return i;
        return Array.length;
        }
    }
```


### length() vs length

맨날 헷갈린다. 헷갈리지말자.

length() 문자열의 길이
length : 배열의 길이



- - -
 
참고자료 

2019년 하영국 교수님 자료구조 19년 3월 27일

자바 ArrayList 가져다가 써보기

https://programmers.co.kr/learn/courses/17/lessons/805#qna

자바 Arraylist 구현

http://blog.daum.net/_blog/BlogTypeView.do?blogid=0fkRr&articleno=309&categoryId=1&regdt=20140207175133


