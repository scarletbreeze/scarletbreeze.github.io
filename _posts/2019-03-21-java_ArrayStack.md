---

title: ArrayStack_java
tag: data

---

## 자료구조 0321 실습

### 1. stack 인터페이스 이용하여 ArrayStack 구현하기

##### 인터페이스

```
public interface Stack{
	public int size();
	public boolean isEmpty();
	public char top();
	public char push(char o);
	public char pop();
    
}


※ 추가적으로 넣을 메소드
public boolean isFull();
public void clear(); // top을 -1로 초기화 stack을 비움
public int capacity(); // stackSize 반환 (크기)
public int indexOf(int x); // x를 찾아서 반환
public void dump(); // 모든 바닥에서 꼭대기 순서로 출력



```

간단한 ArrayStack을 만들어보자.

주의해야 할 점 

####  	 1. 생성자 입력시, 매개변수로 stackSize 받고, stackSize만큼 ArrayStack의 크기를 생성해야한다. `this.Arrayitem = new char[this.stackSize];`

※ 다시보는 객체의 배열 생성법.

객체를 배열로 선언할 때는 ?
`Arrayitem = new Arrayitem[10];`가 끝이 아니다.

반드시 객체를 배열로 선언한 후, 각 공간의 객체를 생성(생성자 호출) 해줘야 한다.

(ArrayStack의 예제에서는 Stack을 하나만 생성해주므로 객체를 배열로 선언해서 각 공간에 생성자 호출을 해주는 것과는 다르긴 하다.)

#### 2. push의 리턴값은 ? 

```
public char push(char o) {
		return ArrayItem[top++] = o;  // 이러면 반환 값이 뭐가 나오지 ?
	}
```

이 경우 stack이 다 차있을 때. null을 반환하므로 null을 찍어준 뒤 실행이 된다.


#### 3. isFull?
top의 초기값을 -1로 잡았는데 이러한 top이 stackSize-1보다 크거나 같을 때. 꽉 찬거라고 볼 수 있다.
`return top>=stackSize-1`

#### 4. push와 pop 주의
`push : return ArrayItem[++top] = o;`
`pop : return ArrayItem[top--];`


### 코드 첨부

```

public class ArrayStack implements Stack{
	// 1. 클래스의 변수 선언 	
	private int top;// index 역할 해주는 top; 
	private int stackSize; // stack에 들어있는 전체 갯수 알려주기 
	private char[] ArrayItem; 

	// 2. 생성자 선언
	public ArrayStack(int stackSize) {
		this.top = -1;
		this.stackSize = stackSize;
		this.ArrayItem = new char[stackSize];
	}
	
	@Override
	//3. size -> top의 +1. 왜냐하면 top이 인덱스를 가리키므로 
	public int size() {
		// TODO Auto-generated method stub
		return top+1;
	}

	@Override
	//4. isEmpty() -> 비었는지, 안비었는지 top이 < 0 check! 
	public boolean isEmpty() {
		// TODO Auto-generated method stub
		return top < 0;
	}

	@Override
	//5. top -> peek와 동일. 가장 위에 있는, 즉 top이 가리키는 곳에 뭐가 담겨있냐? 
	public char top() {
	if(isEmpty()) {
		System.out.println("스택이 비어있음");
		return 0;
	}else	
		return ArrayItem[top];
	}

	@Override
	public char push(char o) {
		if(isFull()) {
			System.out.println("꽉 차있습니다. ");
			return 0; // 임시방편으로 해놓음 
		}else {
			return ArrayItem[++top] = o;  // 이러면 반환 값이 뭐가 나오지 ?
		}
		
	}

	@Override
	public char pop() {
		if(isEmpty()) {
			System.out.println("stack이 비어있습니다.");
			return 0; // 임시방편
		}else {
			return ArrayItem[top--];
		}
		 
	}
	

	@Override
	public boolean isFull() {
		return top>=stackSize-1;
	}

	@Override
	public void clear() { 
		top = -1; // top 초기
		
	}

	@Override
	public int capacity() {
		return stackSize;
	}

	@Override
	public int indexOf(char x) {
		for(int i = top; i>=0; i--) 
			if(ArrayItem[i] == x)
				return i;
		return -1;
	}

	@Override
	public void dump() {
		if(top < 0) {
			System.out.println("스택이 비었습니다.");
		}else {
			for(int i = 0; i < top+1; i++) {
				System.out.print(ArrayItem[i] + " ");
			}
			System.out.println(); // 이걸 넣어주지 않으면 다음 것도 옆으로 찍히네. 
		}
		
	}
	public static void main(String[] args) {
		ArrayStack stack = new ArrayStack(3); // stackSize를 30으로 잡음 ;
		System.out.println(stack.capacity());
		System.out.println(stack.push('a'));
		System.out.println(stack.push('b'));
		System.out.println(stack.push('c'));
		stack.dump();
		
		System.out.println(stack.indexOf('b'));
		System.out.println(stack.size());
		System.out.println(stack.pop());
		System.out.println(stack.pop());
		System.out.println(stack.pop());
		System.out.println(stack.pop());
		
		
	}
}

```




- - -

참고자료

ArrayStack 참고자료
https://gompangs.tistory.com/5