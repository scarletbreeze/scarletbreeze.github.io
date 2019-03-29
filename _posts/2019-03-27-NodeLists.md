---

title: java List 수업 복습(3)(NodeList)

---

## NodeList

*	Node data structure
	*	object element()
	*	setElement(object e)
	*	setPrev(Node p), Node getPrev()
	*	setNext(NOde p), NOde getNext()

*	Generic operations
	*	int size()
	*	boolean isEmpty()

*	Accessor operations
	* Node first()
	* Node last()
	* Node prev(Node p)
	* Node next(Node p)

*	Update operations
	* set(Node p, object e)
	* addBefore(Node p, object e)
	* addAfter(Node p, object e)
	* addFirst(object e)
	* addlast(object e)
	* object remove(Node p)

### 기본 설명

Arraylist는 index를 이용해서 접근하지만 Node List는 위치를 가지고 접근한다. 어떤 기준이 되는 노드가 있고, 그 노드 앞쪽에 있는 혹은 뒤쪽에 있는 previous, next를 가지고 접근한다. 항상 기준이 되는 노드를 reference node라고 한다.

이 리스트의 맨 앞쪽 first, 뒤쪽을 last
first,last의 앞 뒤쪽으로는 header와 trailer다. 
사용을 하진 않으며. 리스트의 시작과 끝을 나타낼 뿐.
first와 last까지만 사용한다.

## NodeList Operation Example

초기 비어있는 상태(헤더와 트레일러 밖에 없다.) -> empty 상태.


![스크린샷 2019-03-28 오전 9 45 36](https://user-images.githubusercontent.com/23495876/55121561-5eb12280-513e-11e9-8674-567cf290a44f.png)

![스크린샷 2019-03-28 오전 9 45 37](https://user-images.githubusercontent.com/23495876/55121562-5fe24f80-513e-11e9-9352-0d0bf6e0f474.png)



## NodeList만들어보기

addfirst 에서 
`if(head.next == NULL) tail = head; `
가 들어가야 하는 이유.

![image](https://user-images.githubusercontent.com/23495876/55218813-868bad80-5246-11e9-9120-c0a2fc0539c0.png)





#### Iterator 객체 생성과 next메소드 
도 포함했다.

```
package NodeList;

public class NodeList {
	private Node head;
	private Node tail;
	private int size = 0;
	private class Node{
		
		//데이터가 저장될 필드
		private Object data;
		
		//다음 노드를 가리키는 필드
		private Node next;
		
		// 생성자 Node 객체 초기화.
		
		public Node(Object input) {
			this.data = input;
			this.next = null;
		}
		
		//노드의 내용을 쉽게 출력해서 확인해볼 수 있는 기능
		public String toString() {
			return String.valueOf(this.data);
		}
	}
	
	public void addFirst(Object input) {
		
		//노드 생성
		Node newNode = new Node(input);
		
		//새로운 노드의 다음 노드로 헤드를 지정.
		newNode.next = head;
		
		//헤드로 새로운 노드를 지정
		head = newNode;
		size++;
		//이 노드의 다음 노드가 없다. 즉 한개만 존재.
		
		if(head.next == null)
			tail = head;
		
	}
		
	public void addLast(Object input) {
		//노드 생성
		Node newNode = new Node(input);
		
		//리스트의 노드가 없다면 첫번째 노드를 추가하는 메소드 사용
		if(size == 0) {
			addFirst(input);
		}else {
			//마지막 노드의 다음 노드로 생성한 노드를 지정
			tail.next = newNode;
			//마지막 노드 갱신
			tail = newNode;
			//엘리먼트의 개수를 1 증가시킨다
			size++;
		}
	}
	
	//노드 찾는 함수 안에서만 사용되니(사용자를 위한 함수가 아니니까 public 지워줘야지)
	
	Node node(int index) {
		Node x = head;
		for(int i = 0; i < index; i ++) 
			x=x.next;
		return x;
	}
	
	public void add(int k, Object input) {
		//만약 k가 0이라면 첫번째 노드에 추가하는 것이기 때문에 addFirst를 사용한다.
		if(k == 0) {
			addFirst(input);
		}else {
			Node  temp1 = node(k-1);
			
			//k번째 노드를 temp2로 지정
			Node temp2 = temp1.next;
			
			//새로운 노드를 생성
			Node newNode = new Node(input);
			
			//temp1의 다음 노드로 새로운 노드를 지정한다.
			temp1.next = newNode;
			
			//새로운 노드의 다음 노드로 temp2를 지정한다.
			newNode.next = temp2;
			size++;
			
			//새로운 노드의 다음 노드가 없다면 새로운 노드가 마지막 노드이기 때문에 tail로 지정한다.
			if(newNode.next == null)
				tail = newNode;
			
		}
	}
	
	public Object remove(int k) {
		if( k == 0 ) {
			return removeFirst();
		}
		//k-1 번째 노드를 temp의 값으로 변경한다.
		Node temp = node(k-1);
		
		//삭제 노드를 todoDeleted에 기록해둔다.
		//삭제 노드를 지금 제거하면 삭제 앞 노드와 삭제 뒤 노드를 연결할 수 없다.
		
		Node todoDeleted = temp.next;
		
		//삭제 앞 노드의 다음 노드로 삭제 뒤 노드를 지정한다.
		temp.next = temp.next.next;
		
		//삭제된 데이터를 리턴하기 위해서 returnData에 데이터를 저장한다.
		Object returnData = todoDeleted.data;
			if(todoDeleted == tail) {
				tail=temp;
			}
		
		// cur.next를 삭제한다.
		todoDeleted = null;
		size--;
		return returnData;
		
	}
	
	public int size() {
		return size;
	}
	
	public Object get(int k) {
		Node temp = node(k);
		return temp.data;
	}
	
	public int indexOf(Object data) {
		//탐색 대상이 되는 노드를 temp로 지정한다.
		Node temp = head;
		
		//탐색 대상이 몇번째 엘리먼트에 있는지를 의미하는 변수로 index를 사용한다.
		int index = 0;
		
		//탐색 값과 탐색 대상의 값을 비교한다.
		
		while(temp.data != data) {
			temp = temp.next;
			index++;
			
			//temp의 값이 null이라는 것이 더 이상 탐색 대상이 없다는 것을 의미한다.  -1 리턴
			if(temp == null)
				return -1;
		}
		//탐색 대상을 찾았다면 대상의 인덱스 값을 리턴한다.
		return index;
	}
	
	
	public String toString() {
		//노드가 없다면 []를 리턴한다.
		
		if(head == null) {
			return "[]";
		}
		
		// 탐색을 시작한다.
		Node temp = head;
		String str = "[";
		
		//다음 노드가 없을 때까지 반복문을 실행한다.
		//마지막 노드는 다음 노드가 없기 때문에 아래의 구문은 마지막 노드에서 제외한다.
		while(temp.next!= null) {
			str += temp.data+",";
			temp = temp.next;
		}
		//마지막 노드를 출력결과에 포함시킨다.
		str+= temp.data;
		return str+"]";
		
	}
	public Object removeFirst() {
		//첫번째 노드를 temp로 지정하고 head의 값을 두 번째 노드로 변경한다.
		Node temp = head; // 노드를 탐색해야 하기 때문에.
		
		head = head.next; // temp.next도 같다.
		
		//데이터를 삭제하기 전에 리턴할 값을 임시 변수에 담는다.
		
		Object returnData = temp.data;
		temp = null;
		size--;
		return returnData;

		
	}
	
	//Iterator
	public ListIterator listIterator() {
		return new ListIterator();
	}
	public class ListIterator{
		
		private Node next;
		private Node lastReturned;
		private int nextIndex;
		
		ListIterator(){
			next = head;
		}
		
		public Object next(){
			lastReturned = next;
			next = next.next;
			nextIndex++;
			return lastReturned.data;
		}
		
		public boolean hasNext() {
			return nextIndex < size();
		}
		
		public void add(Object input){
			Node newNode = new Node(input);
			if(lastReturned == null) {
				head = newNode;
				newNode.next = next;
			}else {
				lastReturned.next = newNode;
				newNode.next= next;
			}
			lastReturned = newNode;
			nextIndex++;
			size++;
			if (newNode.next == null) {
				tail = newNode;
			}
		}
		
		public void remove(){
			if(nextIndex == 0) {
				throw new IllegalStateException();
			}
			//비효율적인 코드. lastReturned값만 알고 있지. 그 이전은 몰라.
			//만약 각각의 노드들의 이전값 prev를 알고 있었다면,우리는 효율적으로 삭제가 가능하다. 이런 점 때문에 사용한다.
			
			NodeList.this.remove(nextIndex-1);
			nextIndex--; 
		}
	}
	
	public static  void main(String[] args) {
		NodeList numbers = new NodeList();
		numbers.addLast(10);
		numbers.addLast(20);
		numbers.addLast(30);
		
		System.out.println(numbers);
		NodeList.ListIterator i = numbers.listIterator();
		
		i.remove();
//		
	}
}

```


## ArrayList vs LinkedList

ArrayList
인덱스 사용해서 찾기 빨라!
하지만 데이터 삭제, 추가시 떙겨줘야하는 문제
그리고 데이터 사이즈가 정해져 있어 
그런데 자바에서 이미 구현된 
※ArrayList는 Double로 커지는 DynamicArray가 구현이 되어 있어.




LinkedList
데이터 next로 순회하며 찾아서 찾기 느려
하지만 데이터 삭제, 추가시 바로바로 가능


## Doubly Linked List Implementation

왜 단순연결리스트를 사용하지 않고 보통 이중 연결리스트를 많이 쓸까?

자바의 컬렉션 리스트에 포함된건 더블리 링크드 리스트야.


```
package DoubleLinkedList;

public class DoublyLinkedList {
	private Node head;
	private Node tail;
	private int size = 0;
	private class Node{
		
		//데이터가 저장될 필드
		private Object data;
		
		//다음 노드를 가리키는 필드
		private Node next;
		private Node prev;
		
		// 생성자 Node 객체 초기화.
		
		public Node(Object input) {
			this.data = input;
			this.next = null;
			this.prev = null;
		}
		
		//노드의 내용을 쉽게 출력해서 확인해볼 수 있는 기능
		public String toString() {
			return String.valueOf(this.data);
		}
	}
	
	public void addFirst(Object input) {
		
		//노드 생성
		Node newNode = new Node(input);
		
		//새로운 노드의 다음 노드로 헤드를 지정.
		newNode.next = head;
		
		// 기존에 노드가 있었다면 현재의 헤드의 이전 노드로 새로운 노드를 지정.
		if(head != null)
			head.prev = newNode;
		
		//헤드로 새로운 노드를 지정
		head = newNode;
		size++;
		
		//이 노드의 다음 노드가 없다. 즉 한개만 존재.
		if(head.next == null)
			tail = head;
		
	}
		
	public void addLast(Object input) {
		//노드 생성
		Node newNode = new Node(input);
		
		//리스트의 노드가 없다면 첫번째 노드를 추가하는 메소드 사용
		if(size == 0) {
			addFirst(input);
		}else {
			//마지막 노드의 다음 노드로 생성한 노드를 지정
			tail.next = newNode;
			newNode.prev = tail;
			
			//마지막 노드 갱신
			tail = newNode;
			//엘리먼트의 개수를 1 증가시킨다
			size++;
		}
	}
	
	//노드 찾는 함수 안에서만 사용되니(사용자를 위한 함수가 아니니까 public 지워줘야지)
	
	Node node(int index) {
		if(index < size/2) {
			Node x = head;
			for(int i = 0; i < index; i ++) 
				x=x.next;
			return x;
		}else {
			Node x = tail;
			for(int i=size-1; i>index; i--) {
				x = x.prev;
			}
			return x;
		}
		
	}
	
	public void add(int k, Object input) {
		//만약 k가 0이라면 첫번째 노드에 추가하는 것이기 때문에 addFirst를 사용한다.
		if(k == 0) {
			addFirst(input);
		}else {
			Node  temp1 = node(k-1);
			
			//k번째 노드를 temp2로 지정
			Node temp2 = temp1.next;
			
			//새로운 노드를 생성
			Node newNode = new Node(input);
			
			//temp1의 다음 노드로 새로운 노드를 지정한다.
			temp1.next = newNode;
			
			
			//새로운 노드의 다음 노드로 temp2를 지정한다.
			newNode.next = temp2;
			if(temp2 != null) {
				temp2.prev= newNode;
			}
			newNode.prev = temp1;
			
			size++;
			
			//새로운 노드의 다음 노드가 없다면 새로운 노드가 마지막 노드이기 때문에 tail로 지정한다.
			if(newNode.next == null)
				tail = newNode;
			
		}
	}
	
	public Object remove(int k) {
		if( k == 0 ) {
			return removeFirst();
		}
		//k-1 번째 노드를 temp의 값으로 변경한다.
		Node temp = node(k-1);
		
		//삭제 노드를 todoDeleted에 기록해둔다.
		//삭제 노드를 지금 제거하면 삭제 앞 노드와 삭제 뒤 노드를 연결할 수 없다.
		
		Node todoDeleted = temp.next;
		
		//삭제 앞 노드의 다음 노드로 삭제 뒤 노드를 지정한다.
		temp.next = temp.next.next;
		
		if(temp.next != null) {
			temp.next.prev = temp;
		}
		
		//삭제된 데이터를 리턴하기 위해서 returnData에 데이터를 저장한다.
		Object returnData = todoDeleted.data;
			
		if(todoDeleted == tail) {
			tail=temp;
		}
		
		// cur.next를 삭제한다.
		todoDeleted = null;
		size--;
		return returnData;
		
	}
	
	//마지막 노드 삭제
	public Object removeLast() {
		return remove(size - 1);
	}
	
	
	
	public int size() {
		return size;
	}
	
	public Object get(int k) {
		Node temp = node(k);
		return temp.data;
	}
	
	public int indexOf(Object data) {
		//탐색 대상이 되는 노드를 temp로 지정한다.
		Node temp = head;
		
		//탐색 대상이 몇번째 엘리먼트에 있는지를 의미하는 변수로 index를 사용한다.
		int index = 0;
		
		//탐색 값과 탐색 대상의 값을 비교한다.
		
		while(temp.data != data) {
			temp = temp.next;
			index++;
			
			//temp의 값이 null이라는 것이 더 이상 탐색 대상이 없다는 것을 의미한다.  -1 리턴
			if(temp == null)
				return -1;
		}
		//탐색 대상을 찾았다면 대상의 인덱스 값을 리턴한다.
		return index;
	}
	
	
	public String toString() {
		//노드가 없다면 []를 리턴한다.
		
		if(head == null) {
			return "[]";
		}
		
		// 탐색을 시작한다.
		Node temp = head;
		String str = "[";
		
		//다음 노드가 없을 때까지 반복문을 실행한다.
		//마지막 노드는 다음 노드가 없기 때문에 아래의 구문은 마지막 노드에서 제외한다.
		while(temp.next!= null) {
			str += temp.data+",";
			temp = temp.next;
		}
		//마지막 노드를 출력결과에 포함시킨다.
		str+= temp.data;
		return str+"]";
		
	}
	public Object removeFirst() {
		//첫번째 노드를 temp로 지정하고 head의 값을 두 번째 노드로 변경한다.
		Node temp = head; // 노드를 탐색해야 하기 때문에.
		
		head = head.next; // temp.next도 같다.
		
		//데이터를 삭제하기 전에 리턴할 값을 임시 변수에 담는다.
		Object returnData = temp.data;
		temp = null;
		if(head != null) {
			head.prev = null;
		}
		size--;
		return returnData;

	}
	
	
	
	
	//Iterator
	public ListIterator listIterator() {
		return new ListIterator();
	}
	public class ListIterator{
		
		private Node next;
		private Node lastReturned;
		private int nextIndex;
		
		ListIterator(){
			next = head;
			nextIndex= 0;
		}
		
		public Object next(){
			lastReturned = next;
			next = next.next;
			nextIndex++;
			return lastReturned.data;
		}
		
		public boolean hasPrevious() {
			return nextIndex > 0;
		}
		
		public Object previous() {
			if(next == null) {
				lastReturned = next = tail;
			}else {
				lastReturned = next = next.prev;
			}
			nextIndex--;
			return lastReturned.data;
		}
		
		
		public boolean hasNext() {
			return nextIndex < size();
		}
		
		public void add(Object input){
			Node newNode = new Node(input);
			
			if(lastReturned == null) {
				head = newNode;
				newNode.next = next;
			}else {
				lastReturned.next = newNode;
				newNode.prev = lastReturned;
				if(next != null) {
					newNode.next= next;
					next.prev = newNode;
				}else {
					tail = newNode;
				}
			}
			lastReturned = newNode;
			nextIndex++;
			size++;
			if (newNode.next == null) {
				tail = newNode;
			}
		}
		
		public void remove(){
			if(nextIndex == 0) {
				throw new IllegalStateException();
			}
			
			Node n = lastReturned.next;
			Node p = lastReturned.prev;
			
			if(p != null) {
				head = n ;
				head.prev = null;
				lastReturned = null;
			}else {
				p.next = next;
				lastReturned.prev = null;
			}
			
			if(n == null) {
				tail = p;
				tail.next = null;
			}else {
				n.prev = p;
			}
			if(next == null) {
				lastReturned = tail;
			}else {
				lastReturned=next.prev;
			}
			
		
			
			
			size --;
			nextIndex--;
			
			
		}
	}
	
	public static  void main(String[] args) {
		DoublyLinkedList numbers = new DoublyLinkedList();
		numbers.addLast(10);
		numbers.addLast(20);
		numbers.addLast(30);
		
		System.out.println(numbers);
		DoublyLinkedList.ListIterator i = numbers.listIterator();
		
		
		
		
	}
}

```

- - -
 
참고자료 

2019년 하영국 교수님 자료구조 19년 3월 27일

자바 연결리스트 구현
https://opentutorials.org/module/1335/8857




 