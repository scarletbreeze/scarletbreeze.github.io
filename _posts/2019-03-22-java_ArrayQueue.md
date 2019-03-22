---

title: ArrayQueue_java
tag: data

---

## 자료구조 원형 Queue 짜보기


선형 큐 -> 배열 요소들을 하나씩 앞으로 옮겨줘야 하는 문제 발생.

#### rear와 front가 같을 때 ? 
1. 수업시간에 배운 전통적인 방법 -> rear를 항상 비워놓는다. -> "full"과 "empty" 상태를 구별하기 위해서
2. Do it 자료구조와 함께 배우는 알고리즘 입문(p.150)을 보면, front와 rear의 값이 같은 경우 큐가 비어 있는지, 가득 찼는지 구별할 수 없는 상황이 오기 떄문에 이를 피하기 위해 생성자 부근에 num이란 변수를 하나 더 만든다.

그래서 인큐할 경우 rear와 num을 함께 증가시켜준다. 그리고 max(큐의 크기)와 rear가 같아지게 된다면, rear를 배열의 처음인 0으로 넣어준다.
디큐 또한 front의 값이 배열의 끝이라면 0으로 초기화를 시켜준다.


##### 인터페이스 생성하기

```
public interface Stack{
	public int size();
	public boolean isEmpty();
	public char top();
	public char push(char o);
	public char pop();
}


※ 추가적으로 넣을 메소드
    public int size();
	public boolean isEmpty();
	public char front();
	public void enqueue(char o);
	public char dequeue();
	public boolean isFull();
	public void clear(); // 큐를 비움 
	public int capacity(); // 큐 용량을 반환
	public int indexOf(char x); // x를 찾아서 반환
	public void dump(); // 큐 안의 모든 데이터를 front -> rear 순으로 출력 



```

간단한 ArrayQueue를 만들어보자.

## 주의해야할 점

### rear는 항상 비어있어야 한다.
-> "full"과 "empty"한 상태를 구별하기 위해서!
(그게 아니라면 위에서 말한대로 num 변수를 두고, 초기화를 시켜줘야 한다.)

#### Q) 왜 front에는 0으로, rear는 0으로 초기값을 둘까?
-> 그저 내가 0으로 시작하려고 정한 것 뿐. front는 0에서 시작하고 rear는 -1로 시작해도 문제는 없어 조금씩 바꿔줘야겠지만 .

#### size() 함수
size : Counting the occupied cells

occupied cells
= N - (of free cells)
= N - (f - r) // only when f>=r
-> (N - (f-r))mod N

그러면 이렇게 작성하면 f>=r일 때만 되는거 아닌가?
-> 아니다. 직접 계산해보면 저거 하나로 문제 해결된다. 
if문을 쓰고 싶다면

```
		if(rear>front)
			return rear - front;
		return QueueSize - (front-rear);
```

#### 생성 흐름

1. interface 선언 된거 implements 받기
2. class field 영역 선언
3. 생성자 선언 (이 떄 array 주의하기)
4. 각 method 작성

#### 원형 큐라는 것 잊지 말기

rear와 front의 크기를 증가시켜줄 때, QueueSize로 나누는 것 잊지말자.




### 코드 첨부

```

package QueuePractice;

public class CirCleQueue implements Queue{

	//1. class field 선언
	private int rear;
	private int front;
	private int QueueSize;
	private char []Array;
	
	//2. 생성자 선언
	
	public CirCleQueue(int QueueSize){
		this.rear = 0;
		this.front = 0;
		this.QueueSize = QueueSize;
		this.Array = new char[QueueSize];
	} 

	@Override
	public int size() {

		return (QueueSize-(front-rear))%QueueSize;
	}

	@Override
	public boolean isEmpty() {
		// TODO Auto-generated method stub
		return front==rear;
	}

	@Override
	public char front() {
		// TODO Auto-generated method stub
		return Array[front];
	}

	@Override
	public void enqueue(char o) {
		if(isFull()){
            System.out.println("큐가 포화 상태");
		}
		Array[rear]=o;
		rear = (rear+1)%QueueSize;
	}

	@Override
	public char dequeue() {
		if(isEmpty()) {
			System.out.println("비어있습니다.");
			return 0;
		}else {
			char item = Array[front];
			front = (front+1)%this.QueueSize;
			return item;
		}
		
	}
	

	@Override
	public boolean isFull() {
		return (rear+1)%this.QueueSize == front;
	}

	@Override
	public void clear() {
		this.front = 0;
		this.rear = 0;
		
	}

	@Override
	public int capacity() {
		return QueueSize;
	}

	@Override
	public int indexOf(char x) {
		for ( int i = 0 ; i< QueueSize; i++) {
			int idx = (i + front) % QueueSize;
			if(Array[idx] == x)
				return idx;
		}
		return -1;
	}

	@Override
	public void dump() {
		if(front == rear) {
			System.out.println("큐가 비어있습니다.");
		}else {
			for(int i = 0 ; i < size(); i++) {
				System.out.print(Array[(i+front)%QueueSize]+ " ");
			}System.out.println();
		}
		
	}


	public static void main(String[] args) {
		CirCleQueue CircleQueue = new CirCleQueue(5); // 실제queue의 크기는 4다.rear 한자리 비워놔야 하니까.
		CircleQueue.enqueue('A');
		CircleQueue.enqueue('B');
		CircleQueue.enqueue('C');
		CircleQueue.enqueue('D');
		System.out.println(CircleQueue.size());
		System.out.println(CircleQueue.dequeue());
		CircleQueue.enqueue('E');
		System.out.println(CircleQueue.size());
		System.out.println(CircleQueue.dequeue());
		System.out.println(CircleQueue.size());
		CircleQueue.dump();
	}
}

```




- - -

참고자료

선형 큐 , ArrayQueue 참고자료
https://gompangs.tistory.com/5

원형 큐, ArrayQueue 참고자료
https://mailmail.tistory.com/41

Do it 자료구조와 함께 배우는 알고리즘 입문(p.150)