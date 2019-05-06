---
layout: post
title: SelfStudyBook(Stack),(1218)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm
date: 2019-05-04
---

## 스택

대표문제 계산기

중위 표기법으로 표현된 계산식을 후위 표기법으로 바꾸어 계산하는 프로그램을 작성해보라.

## 연습문제 +만 있는 계산기

`sum += num;`

## 연습문제 +,\*만 있는 계산기

크게 2가지 방법을 생각할 수 있다.

1. "\*"에 대한 숫자들을 계산하고 "+"연산을 수행하는 방법
2. 순차적으로 "+"연산을 하다가 "\*"을 만나면 "\*"연산을 수행하는 방법

"\*"을 먼저 수행하는 방법은 "\*"을 먼저 수행하고 결과를 sum에 누게 한 다음 연산을 하지 않은 숫자들을 sum에 누계하면 된다. 순차적으로 "+"연산을 하는 방법은 "+"부터 연산을 하는 것보다는 방법이 조금 간단하다. "+"연산 앞에 있는 숫자를 temp에 임시로 저장한 다음 "+"연산을 수행하면 된다.

```
if(operator == '*')
	sum += (temp*num);
else
	sum += num;
```

입력된 수식에서 "\*" 연산자 앞에 있는 숫자를 찾아 temp에 저장하는 과정에서 처리가 조금 더 필요하겠지만 핵심은 순차적으로 수식을 읽으면서 처리를 할 수 있다는 것이다. 임시변수 temp를 이용하여 수식을 순차적으로 처리하는 프로그램은 직접 작성해보아라.

## 연습문제, +,\*,()만 있는 계산기

"3+4\*(5+6) + 7"
위와 같은 수식을 계산하는 프로그램을 만들어라

수식에서 괄호가 있는 경우 괄호를 먼저 처리 하라고 배웠다. 문제에서는 주어진 "3+4*(5+6)+7"를 괄호를 먼저 계산하면 "3+4*11+7"이 된다. 그리고는 앞서 만든 코드를 사용하면 처리 할 수 있을 것이다.

만약 “(4+8+4∗(8∗5∗(7∗(6∗8)+3+(6+(3+7+1∗7∗5∗4)∗3)∗2∗3+5)+6+7∗7)∗4+(7∗6∗1∗8)+9+9)”처럼 단순하지 않은 수식이 주어진다면 어떻게 풀 수 있을까

괄호가 추가 되었을 뿐인데 문제가 만만치 않아 졌다.

가장 안쪽에 있는 괄호를 찾기 전에 스택에 대해서 알아보자.

## 스택

스택이란, 사전적 의미로는 무엇인가 쌓아놓은 듯한 '더미'를 뜻한다. 실제로 일상생활에서도 이러한 스택 구졸르 많이 접할 수 있다. 좁은 공간 때문에 쌓아두고 보관하면서 한쪽 방향에만 출입구가 있는 수납공간에 물건들을 보관하는 모습.

- 각 관리해야 될 물품들은 순서를 가진다.
- 각 관리해야 될 물품들은 역순으로 사용된다.

**"먼저 들어간 것이 맨 나중에 나온다!"**

이와 같은 원리로 동작하는 것을 스택이라 하고, 스택을 정확히 표현하자면,

**"제한적으로 접근할 수 있는 나열식 자료구조"**

언제나 목록의 한쪽 끝에서만 일어나기 떄문이다. 이러한 형태 떄문에 Pushdown List라고 표현하기도 한다.

한 쪽 끝에서만 자료를 넣거나 뺴는데, 이 때 가장 먼저 넣은 자료가 나중에 나오고, 가장 나중에 넣은 자료가 가장 먼저 나오기 떄문에 이렇나 형태를 First In Last Out 혹은 Last In first Out (LIFO)라고 부른다.

스택 오버 플로우란 스택 포인터가 스택의 경계를 넘어설 때 일어나는 현상이다.

아래는 정수형 자료를 담을 수 있는 스택을 배열을 사용하여 구현한 것이다.

```
int stack[size];
int top;

void push(int input)
{
	stack[top++] = input;
}

void pop(int* output)
{
	ouput = stack[--top];
}
```

이와 같은 형태는 스택 오버플로우가 발생할 수 있다는 단점이 있 긴 하지만 구현이 쉽고 속도가 빠르기 때문에 실제로 간단한 알고리즘을 해결하기 위해서 위와 같은 형태를 많이 사용한다.

아주 전형적인 스택을 사용하여 풀 수 있는 문제를 풀어보자.

## 연습문제. 같은 번호 짝 소거하기

0~9로 이루어진 번호 문자열에서 같은 번호로 붙어있는 쌍들을 소거하고 남은 번호를 출력한다. 단, 번호 쌍이 소거되고 소거된 번호 쌍의 좌우 번호가 같은 번호이면 또 소거할 수 있다. 예를 들어 아래의 번호 열을 언급한 방법으로 소거하고 알아낸 과정을 보도록 한다.

문제: 0~9로 이루어진 번호 문자열에서 같은 번호로 붙어있는 쌍들을 소거하고, 남은 번호를 출력한다.
단 번호쌍이 소거되고 소거도니 번호 쌍의 좌우번호가 같은 번호이면 또 소거할 수 있다.

일반적으로 접근했을 경우에는 첫 번째 값부터 검샇마녀서 양 옆의 숫자 중 하낙 자신과 같은지 검사한 후, 같은 숫자일 경우 일 때 자신과 그 숫자를 지우는 방식으로 반복해서 올바른 값을 출력할 수 있다. 하지만, 이렇게 구현할 겨우, 지운 값을 중심으로 뒤쪽의 숫자들을 앞으로 모두 옮겨야 해서 생각보다 코드가 복잡해 질 수 있다.

```
scanf("%s", str);

is_change = 1;

while(is_change){
	is_change = 0;

    //문자열의 끝까지 검사

    for(i = 0 ; str[i+1]; i++){
    	if(str[i] == str[i+1]) // 인접한 문자열이 같은 경우
        is_change = 1;

        if(is_change){ // 같은 숫자가 있는 경우 뒤에 있는 숫자를 이동시킨다.
        if(int j=i; str[j+1]; j++)
        	str[i] = str[i+2];
        }
    }
}
```

언급했던 과정대로 작성한 코드이다. is_change 변수는 현재 검사하는 숫자와 그 다음 숫자가 같은 경우 1이 되고, is_change의 값이 1으로 바뀐 이후부터는 2칸 떨어진 값을 현재 값으로 현재 값으로 옮기는 일을 더이상 바뀌는 일이 없을떄 까지 반복한다.
is_change의 값이 0일 경우 while문에서 나가며 결과값을 출력하는 형태이다. 이 코드의 길이는 길지 않으나, 시간 복잡도의 경우 O(n^2)으로 빠른 시간 내에 끝나지 않는다. 그럼 Stack 을 사용한 코드를 보자.

```
scanf("%s", str);

stack[0] = str[0];
top = 1;

for(i = 1; str[i-1]; i ++){
	if(top != 0 && stack[top-1] == str[i])
    top --; // 마지막 숫자와 같은 숫자가 들어올 경우, pop을 하는 것
    else
    stack[top++] = str[i]; // 마지막 숫자가 들어오는 경우 Stack의 top을 늘리고 해당 숫자를 넣는 행동을 반복한다.
}

O(n^2)이었던 시간복잡도가 O(n)줄어들었다는 것은 코드만 봐도 알 수 있다. 한 가지 참고할 것은 실제로 Stack 구현 시에는 이렇게 바로 구현하는 것이 아니라 push함수와 pop함수를 만들어 사용하는 것을 추천한다.

이런 방식으로 Stack을 사용할 경우 시간복잡도가 많이 줄어드는 경우를 많이 발견할 수 있다. 불필요한 연산을 줄여 실제로 메모리에서도 Stack형태로 많이 관리하곤 하는데 자세한 것은 후에 알아보도록 하고 지금은 Stack을 활용하는데 좀 더 익숙해지도록 하자.

다시 계산기 문제로 돌아가보자. 마지막으로 고민하던 문제는 괄호가 있는 수식을 계산하는 것이다.
아래의 문제를 바탕으로 가장 안쪽의 괄호를 찾는 방법에 대해서 생각 해보자.

## 연습문제. 괄호 짝 판별

```

4 종류의 괄호 문자들 '()','[]','{}','<>'로 이루어진 문자열이 주어진다.

이 문자열에 사용된 괄호들의 짝이 모두 맞는지 판별하는 프로그램을 작성한다.

우리는 위의 문제에 대한 조건을 다음과 같이 이야기할 수 있다.

1. 괄호의 종류: 대괄호, 중괄호, 소괄호, 화살괄호
2. 왼쪽 괄호의 개수와 오른쪽 괄호의 개수가 같아야 한다.
3. 같은 괄호에서 왼쪽 괄호는 오른쪽 괄호보다 먼저 나와야 한다.
4. 괄호 사이에는 포함 관계만 존재한다.

위의 조건으로 할시, 닫는 괄호가 나오는 순서는 여는 괄호가 나온 순서의 역순으로 나오게 된다.

순서도는 다음과 같다

![image](https://user-images.githubusercontent.com/23495876/56089163-f302df80-5ec9-11e9-8e3e-521e577133c4.png)

먼저, 괄호는 연속된 순서를 가지고 있다. 그러므로 연속된 값을 저장하기 위한 배열이 필요하다. 그리고 닫는 괄호와 여는 괄호를 비교하는 방법을 알아보자. 괄호의 특성상, 닫는 괄호와 여는 괄호는 바료 옆에 있지 않을 수 있다. 하지만, 바로 옆에 있는 괄호부터 차례대로 없애간다면, 멀리 있는 괄호도 바로 옆에 있다고 할 수 있다.

위의 순서도를 바탕으로 스택 개념을 도입하면 다음과 같다

1. **배열에 있는 괄호를 차례대로 조사**
2. **왼쪽 괄호를 만나면 스택에 삽입**
3. **오른쪽 괄호를 만나면 스택에서 top 괄호를 삭제한 후, 오른쪽 괄호와 짝이 맞는지 검사**
4. **스택이 비어있으면 조건 2 또는 조건 3에 위배되고 괄호의 짝이 맞지 않으면 조건 4에 위배된다.**
5. **마지막 괄호까지 조사한 후에도 스택에 괄호가 남아 있으면 조건 2에 위배된다.**

1차원 배열을 사용하여 스택을 구현할 때는 스택의 최대 사이즈를 어느 정도로 할 것인지가 중요하다. 배열을 동적으로 할당하거나 리스트를 사용하여 스택의 크기를 조절할 수 있는 방법을 적용하는 것이 아니라면 말이다.

배열로 스택을 구현하는 방법은 의외로 간단하다. 데이터를 담을 배열과 Push될 데이터의 위치를 가리킬 수 있는 변수 하나만 있으면 된다. 편의상 stack[]과 stackCounter하자라 하자. stack[]은 데이터를 담을 수 있도록 크기를 충분히 잡는다. stackCounter는 새로운 데이터가 들어갈 위치를 가리키고 있다. 스택에 데이터가 하나도 없다면 stackCounter의 값은 0이다. 배열의 인덱스는 0부터 시작하기 떄문이다. 또한 stackCounter는 스택의 크기를 의미하기도 한다.

데이터를 Push할 때는 stack[stackCounter]에 데이터를 할당하고, stackCounter를 1증가시킨다. 데이터를 pop 할 때는 push의 반대로 하면 된다. stackCounter를 1감소시키고, stack[stackCounter]에 있는 데이터를 읽으면 된다.

해당 코드 1218번 문제.

1218번 문제 풀기.

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Scanner;
import java.util.Stack;
import java.util.StringTokenizer;
public class Solution {

	static int T = 10;
	static int mResult;

	public static void main(String args[]) throws Exception{
		Scanner sc = new Scanner(System.in);{
			for(int t = 1; t <= 10; t++) {
				int N = Integer.parseInt(sc.nextLine());
				String s = sc.nextLine();
				Stack<Character> stack = new Stack<Character>();
				for(int i = 0; i < N; i++) {
					char operator = s.charAt(i);
					 if(operator == '{' || operator == '[' || operator == '(' || operator == '<' ){
			               stack.push(operator);
			            }
			            else{
			               if(stack.isEmpty()){
			                  break;
			               }
			               char temp = stack.pop();
			               if(operator == '}'){
			                  if(temp != '{'){
			                     break;
			                  }
			               }
			               else if(operator == ']'){
			                  if(temp != '['){
			                     break;
			                  }
			               }
			               else if(operator == '>'){
			                  if(temp != '<'){
			                     break;
			                  }
			               }
			               else{
			                  if(temp != '('){
			                     break;
			                  }
			               }

			            }
					 if(i == N - 1 /*&& stack.isEmpty()*/){
			               mResult = 1;
			            }
				}
				System.out.println("#" + t + " " + mResult);
		         mResult = 0;
			}
		}
	};
}



```

## 후위 표기법

일반적으로 사용하는 방식 -> 중위 표기법.
=> 괄호 안을 찾아서 탐색하고, 해당 계산을 먼저 해줘야 한다. 따라서 연산량이 많아져 좋지 않다. 실제로 이를 피하기 위해 후위 표기법을 사용한다.

후위 표기법은 수식을 계산할 떄 특별한 변환이 필요 없이 수식을 앞에서 읽어나가면서 스택에 저장하면 된다는 장점이 있다.

스택을 이용하여 바꾸는 방법.
ex) `(3+5) * (4+2)`

1. 열린 괄호의 "("의 경우에 Stack에 넣는다
2. 숫자의 경우 Stack에 넣지 않고 바로 출력한다.
3. +의 경우 연산 부호 이므로 Stack에 넣는다
4. 닫힌 괄호가 나온 경우, 열린 괄호가 나올 때 까지 Pop하여 출력한다
5. 더 이상 남아있지 않은 경우 모두 pop한다.

- 전위 표기를 후위 표기로 바꾸는 코드 짜보자

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Stack;

public class Solution {
	public static void main(String[] args) throws Exception  {
		BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
		Stack<Character> stack;
		stack = new Stack<Character>();

		String s = bf.readLine();
		for(int i  = 0 ; i < s.length(); i++) {
			char temp = s.charAt(i);
			if(temp == '(' || temp == '+' || temp == '*') {
				stack.push(temp);
			}else if(temp == ')') {

				boolean flag = true;
				while(flag) {
					char temp2 = stack.pop();
					if(temp2 == '(') {
						flag=false;
					}else {
						System.out.print(temp2);
					}
				}

				while(stack.size()!= 0) {
					System.out.print(stack.pop());
				}

			}else {
				System.out.print(temp);
			}
		}

	}
}
//(3+5)*(4+2)

```

만약, 연산자 우선순위를 고려한다면 단순히 Stack에 Push하는 것이 아니라 Push 하기 전에 자신의 우선 순위 보다 낮은 연산자 일때까지 Pop을 해주어야 한다. 이 점을 주의하여 코딩해보자.

( 연산자는 스택이 비어있지 않으면 스택에 있는 연산자의 우선순위를 비교해 스택에 있는 연산자의 우선순위가 같거나 크다면 스택에 있는 연산자를 pop을 한후 출력하고, 현재 연산자는 스택에 push한다. 우선순위가 현재 연산자가 더 크다면 현재 연산자를 push한다.)

## 3.1 대표문제. 계산기 해결하기

문자열로 이루어진 계산식이 주어질 때 이 계산식을 후위 표기법으로 바꾸어 계산하는 프로그램을 작성하기

예를 들어
"3+(4+5)*6+7"
라는 문자열로 된 계산식을 후위 표기법으로 바꾸면 다음과 같다.
"345+6*7+"
변환된 식을 계산하면 64를 얻을 수 있다.

#### 제약사항

(문자열 계산식 구성하는 연산자는 +,\* 두 종류 뿐)
(괄호의 유효성 여부는 항상 옳은 경우만 주어짐)

#### 후위표기법으로 되어있는 수식을 계산하는 방법

계산을 이용하는 것 역시 스택을 이용한다.

1. 피 연산자를 만나면 스택에 Push 한다.
2. 연산자를 만나면 필요한 만큼의 피 연산자를 스택에서 Pop하여 연산하고, 연산 결과를 다시 스택에 Push한다.
3. 수식이 끝나면, 마지막으로 스택을 Pop하여 출력한다.

## 대표문제. 계산기 해결하기

1. ※ 이전의 코드에서 연산자 우선순위 추가하기
2. 괄호의 경우, 여는 괄호가 스택에 push 된 후, 닫는 괄호가 나올 때 까지 여는 괄호가 pop이 되면 안되므로 여는 괄호의 우선순위는 제일 낮다.

---

참고자료

SWE selfStudyBook(2)

연산자 우선순위 고려 참고 블로그
<https://jamanbbo.tistory.com/>
<https://donggod.tistory.com/45>
<http://blog.naver.com/PostView.nhn?blogId=wpdls6012&logNo=220247355248&parentCategoryNo=&categoryNo=&viewDate=&isShowPopularPosts=false&from=postView>
