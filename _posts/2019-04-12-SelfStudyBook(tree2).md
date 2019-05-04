---
layout: post
title: SelfStudyBook(3)-Tree(2), SWE 1233
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm
date: 2019-04-12
---

## Chapter 6. 트리(Tree)(2) 사칙연산 유효성검사

대표문제. 사칙연산 유효성 검사.

사칙연산으로 구성되어 있는 식은 이진트리로 표현할 수 있다.
임의의 정점에 연산자가 있으면 해당 연산자의 왼쪽 서브트리의 결과와 오른쪽 서브트리의 결과를 사용해서 해당 연산자를 적용한다.

사칙연산 "+,-,_,/"와 양의 정수로만 구성된 임의의 이진 트리가 주어질 대, 이식의 유효성을 검사하는 프로그램을 작성하여라.
여기서 말하는 유효성이란, 사칙여산 "+,-,_,/"와 양의 정수로 구성된 임의의 식이 적절한 식인지를 확인하는 것으로 계산이 가능하다면 "1"을 계산이 불가능할 겨우 "0"을 출력한다.

## 수식트리

수식트리란? 수식 이진트리(Expression Binary Tree)라고 부르기도 한다. 연산자는 루트 노드이거나 가지 노드이며, 피연산자는 모드 단말 노드이다.

수식 트리의 순회하는 방법은 3가지다.

중위순회 / 후위순회 /전위순회

## Chapter 6.2 대표문제. 사칙연산 유효성 검사 해결하기 SWE 1233.

대표문제. 사칙 유효성 검사

해설

문제를 분서갛면, 트리 형태로 주어진 연산식의 유효성 여부를 판단하는 문제이다.

트리는 구조체 배열 형식으로 구현된다. 해당 노드의 데이터는 node 배열에 저장한다. 이 때 왼쪽 자손은 (현재 노드 번호)*2 이고, 오른쪽 자손은(현재 노드 번호) *2+1이다.
또한 전역변수로 수식의 유효성 여부를 체크할 bool형 flag를 선언한다. 입력 받은 데이터의 저장이 끝났으면, 현재 위치를 1로 초기화하고, 중위 순회를 한다.

문제 예씨의 [연산이 가능한 경우]를 살펴보자. 이의 경우는 ((8/7+2) \* (6-4)의 연산을 보여준다.)이게 왜 가능한 경우인가? 어떠한 모습을 하고 있는 것일까?
부모가 연산자가 있을 때, 자손들이 숫자만 왔을 경우, 아니면 한 쪽 자손만 숫자가 나오고 한 쪽은 연산자가 오는 경우, 둘다 연산자가 오는 경우, 자손이 없는 경우가 있다.
만약 부모가 연산자이고 오른쪽 자손이 숫자이고 왼쪽 자손이 존재하지 않는다면 어떻게 될까? 이 경우는 (숫자)(연산자)()와 같이 되므로, 계산을 할 수 없는 상황이 된다.
문제의 조건과 사칙연산의 조건에 성립되지 않는다. 여기서 이 문제의 포인트를 찾을 수 있다.

부모 노드에는 자손 노드가 존재할 시, 왼쪽과 오른쪽 노드가 둘 다 있어야 한다.
그리고 계산을 하기 위해서는 리프도느(자손이 없는 노드)는 숫자노드 이어야 한다.

```
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Solution {

	static int T = 10;
	static int n;
	static char[] map;

	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int t = 1;
		while(T-- > 0) {
			n = Integer.parseInt(br.readLine()); // 정점의 총 수 저장
			map = new char[n]; // 정점의 수 만큼 char형 배열 생성 .

			for(int i = 0 ;i < n; i++) {
				StringTokenizer st = new StringTokenizer(br.readLine());
				st.nextToken(); // 1 * 2 3일 때, 필요한 정보는 W부터.
				map[i] = st.nextToken().charAt(0); //string 을 char로 변환
				while(st.hasMoreTokens()) // st에 더 많은 토큰이 있다면
					st.nextToken();  // 2와 3 역시 배열에 들어가는 정보가 아니므로 넘긴다.
			}

			System.out.print("#" + (t++) + " ");
				for(int j = 0; j< n; j++) {
					if(n/2-1 < j) { // 리프노드 == 숫자
						if(map[j] == '+' || map[j] == '-' || map[j] == '*' || map[j] =='/')
						{
							System.out.print("0"); break;
						}
						else {
							System.out.print("1"); break;
						}
					}
					else if(n/2-1 >= j) {// 리프노드가 아닌 경우
						if(map[j] == '+' || map[j] == '-' || map[j] == '*' || map[j] == '/') {}
						else {
							System.out.print("0"); break;
						}
					}
				}
				System.out.println("");


			}
		}
}



```

---

참고자료

SWE selfStudyBook(3)

유효성 검사 간단한 코드
https://charm-charm.postype.com/post/3093318
