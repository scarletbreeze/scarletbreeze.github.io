---

title: SelfStudyBook(String),(1215)
tag: algorithm

---

## [String] 문자열, 대표문제 - Palindrome

## 문자의 표현

유니코드 -> 16비트를 사용하여 65,536개의 문자를 표현할 수 있도록 만들어졌다.

왜 이렇게 문자들을 코드 체계로 표현할까? 글자 A를 메모리에 저장하는 방법을 생각해보자. 메모리에는 이진 형태의 숫자만이 저장이 가능하기 때문에 문자를 결국 아래와 같이 숫자와 대응 되는 문자 형태로 저장해야 하는데, 이러한 방법을 코드 체계라고 한다.

대표적인 코드 체계는 ASCII 코드. 인코딩 표준을 정함.
다국어 처리를 위해 유니코드.

## 대표문제 Palindrome

"기러기" 또는 "level과 같이 거꾸로 읽어도 제대로 읽은 것과 가은 문장이나 낱말을 회문이라고 한다. 주어진 8*8 평면 글자판에서 가로, 세로를 모두 보아 제시된 길이를 가진 회문의 총 개수를 구하는 문제이다.

## 문자열.

문자열은 크게 고정 길이 문자열(Fixed length string)과 가변 길이 문자열(variable length string)이 있다. 가변 길이 문자열에는 또 length controlled와 delimited로 분류하는데 length controlled와 같은 경우에는 java에서, delimited와 같은 경우에는 C에서 주로 사용한다.

![스크린샷 2019-04-13 오후 6 07 28](https://user-images.githubusercontent.com/23495876/56077427-1a4ca480-5e17-11e9-9d0d-75e9bd3e8b66.png)

그림에서 볼 수 있듯 java.lang.string 클래스에는 기본적인 객체 메타 데이터 외에도 네 가지 필드들이 포함되어 있는데, hash값, 문자열의 길이(Count), 문자열 데이터의 시작점(offset), 그리고 실제 문자열 배열에 대한 참조(value)이다.

C에서의 문자열은  문자들의 배열 형태로 구현된 응용 자료형이라고 할 수 있다. 다만 아래와 같이 문자 배열에 문자열을 저장할 때에는 항상 마지막 끝에 끝을 표시하는 NULL(\0)을 넣어줘야 한다.

또한 문자열 처리에 필요한 연산은 strlen(), strcpy(), strcmp()와 같이 함수 형태로 제공이 된다. 이와는 다르게 javaㅘ 같이 객체지향언어에서는 문자열 데이터를 저장, 처리해주는 클래스를 제공하고 문자열 처리에 필요한 연산은 length(), replace(), split(), substring()등 다양한 메소드 형태로 제공된다.

좀더 근본적인 차이점은 대부분의 C는 아스키 코드로 저장하지만 Java는 유니코드로 저장한다는 점이다.

![image](https://user-images.githubusercontent.com/23495876/56077484-b4145180-5e17-11e9-8ea3-4b78ce935639.png)

## 문자열 복사와 문자열 뒤집기

## 문자열 비교

C와 같은 경우는 strcmp()를 제공
자바의 경우 equals()메소드를 제공

strcmp()와 같은 경우에는 두 문자열이 같은 경우 0을 리턴하고, equlas() 메소드는 같은 경우 true르 리턴한다.

## 문자열 숫자를 정수로 변환

C에서는 atoi() 함수와 역함수로는 itoa()를 제공하고 
Java에서는 숫자 클래스의 parse() 메소드를, 역으로는 toString() 메소드를 제공한다.

## 해설

2차원 배열에서 어떤 문자가 회문인지 판단하기 전에 어떤 문자가 주어 졌을 때 회문인지 판단하는 알고리즘을 작성해보자.

문자열의 길이를 알아낸 뒤에 앞과 뒤의 문자를 하나씩 비교해 보면서 같은지를 비교하는 방법으로 하면 어떤 문자가 회문인지 판단할 수 있을 것이다. 이를 이용하면 2차원 배열이 주어진 경우에도 회문인 문자열을 찾을 수 있다. 아래의 방법을 이용하여 문제를 풀어보자.

1. 찾은 회문의 개수를 저장할 변수를 0으로 초기화 한다.
2. 주어진 문자판의 첫 번째 행 좌측부터 가로 방향으로 한 문자씩 탐색을 시작한다.
3. 현재 위치의 문자를 기준으로 찾아야 할 길이만큼 구간에 대해 회문 여부를 판단한다. 이 때 임시로 사용할 boolean형 flag 변수를 true로 초기화한다.
	A. 회문의 길이가 짝우시거나 홀수인 것에 관계 없이 양 끝 문자를 시작으로 한 칸씩 가운데로 좁혀 들어오며 일치 여부를 검사한다.
	B. 이때 일치하지 않는 문자가 발견되면 flag 변수를 false로 바꾼 후 검사를 종료한다
	C. flag 변수가 true라면 찾은 회문의 개수를 1 증가시킨다.
4. 모든 행에 대해 2,3번 과정을 진행한다.
5. 작업이 종료되면 열 방향으로 위의 과정을 진행한다.
6. 열 방향까지 탐색이 완료되면 찾은 회문의 개수를 리턴한다.


## 시행착오

java에서 그 자체로 char형 배열에 담아주기가 쉽지 않더라.
string으로 담아서 변환해주는게 낫겠다.

나는 포문을 세번 돌 때, k를 j와 같게 해줘서 문제를 해결하려고 하였으나 그것보다는 k를 횟수로 정하고
배열을 순회할 때, [i][j+k]와 같은 방식으로 순회하는거 좋다.

## 코드

```
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Scanner;

public class Solution {
	
	static int T = 10;
	
	public static void main(String args[]) throws Exception{
	
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		 int n ; // 찾아야 하는 정점의 수
		 int i,j,k;
		 
		 int t = 1;
		 while(T-- > 0) {
			 // 2차원 배열 생성
			 char [][]Array = new char[8][8];
			 
			 //count
			 int count = 0;
			 
			 //입력 받기 
			 n = Integer.parseInt(br.readLine());
			
			 
					 
			 for(i = 0 ; i < 8; i++) {
				 String s = br.readLine();
				 for(j = 0; j < 8 ; j++) {
					 Array[i][j] = s.charAt(j);
//					 System.out.print(Array[i][j]);
				 }
//				 System.out.println();
			 }
					 
			 
			
			
			 boolean flag;
			//행방향 
			for(i = 0 ; i < 8; i++) {
				for(j = 0 ; j < 8-n+1; j++) {
					flag = true;
					for(k= 0; k < n/2; k++) {
						if(Array[i][k+j] != Array[i][j+n-1-k]) {
							flag = false;
						}
					}
					if(flag) {
						count++;
					}
				}
			}
			 
			//열방향 
			for(i = 0 ; i < 8; i++) {
				for(j = 0 ; j < 8-n+1; j++) {
					flag = true;
					for(k= 0; k < n/2; k++) {
						if(Array[k+j][i] != Array[j+n-1-k][i]) {
							flag = false;
						}
					}
					if(flag) {
						count++;
					}
				}
			}
			System.out.println("#"+ t++ + " "+ count);

		 }
	};
}
				


```



- - -
 
참고자료 

SWE selfStudyBook(1)


