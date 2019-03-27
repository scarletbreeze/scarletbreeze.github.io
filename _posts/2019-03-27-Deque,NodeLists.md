---

title: java List 수업 복습(2)(deque,Growable Array Implementation)
tag: data

---


## Implementation of a Deque Using an Array List

![스크린샷 2019-03-27 오후 4 58 55](https://user-images.githubusercontent.com/23495876/55059202-b9506d00-50b1-11e9-8eab-17a26797034d.png)

이전에 arraylist 구현했으니 생략.

## Growable Array Implementation

add할 때 array에서 overflow가 일어난다면, array 큰 걸 하나 더만들고 기존에 있던 값을 복사해준다.

이 때 새로운 array에 얼만큼 늘려줄까에 따라서 두 가지 방식을 배웠다.
*	Incremental strategy: increase the size by a constant c (각각 더하는 시간 빅오 n ) (Amortized time of the add operation is O(n^2)/n = O(n))
*	Doubling strategy : double the size ()  (각각 더하는 시간 상수값 )(The amortized time of the add Operation is O(n)/n = O(1))

이전에 구현한 arrayList에 doubling Strategy Analysis로 add 추가로 구현한 예제

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
	
	
	// doubling Strategy Analysis
//	public void ensureCapacity(int minCapacity) {
//		Object[]newArray = new Object[minCapacity];
//		for(int i = 0 ; i< elementData.length; i++) {
//			newArray[i] = elementData[i];
//		}
//		elementData=newArray;
//	}
	
	public void add2(int index, Object e) {

		System.out.println(index);
		System.out.println(index+1 >=elementData.length);
		
		//index가 size보다 클 경우
		if(index+1 >= elementData.length) {
			Object[]newArray = new Object[elementData.length*2];
			for(int i = 0 ; i< elementData.length; i++) {
				newArray[i] = elementData[i];
			}
			elementData=newArray;
			System.out.println(elementData.length);


			// index에 노드 추가
			elementData[index] = e;
			System.out.println(elementData[index]);
			System.out.println(index);
			this.size++;
		}else {
			elementData[size] = e;
			size++;
		}
	}

     // 추가할 때, length로 접근 안하면, 매개변수로 받아줘야지 
//	public void ensureCapcity(int minCapacity) {
//		Object[] newArray = new Object[minCapacity];
//		System.arraycopy(elementData, 0, newArray, 0, size());
//		elementData = newArray;
//	}
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
		 arrayList2 arrayList = new arrayList2(4);
		 arrayList.add("A");
		 arrayList.add("A");
		 arrayList.add("A");
		 arrayList.add("A");
		 arrayList.add2(4,"AB");
		 arrayList.add2(5,"AAA");
		 arrayList.add2(6,"AAA");
		 arrayList.add2(7,"AAA");
		 System.out.print(arrayList.size());
		 System.out.print(arrayList);
	}
}


```







- - -
 
참고자료 

2019년 하영국 교수님 자료구조 19년 3월 27일



 