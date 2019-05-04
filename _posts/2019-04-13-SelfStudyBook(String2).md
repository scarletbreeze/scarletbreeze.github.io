---
layout: post
title: SelfStudyBook(String2),(1213)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm
date: 2019-04-13
---

## [String] 문자열, 대표문제 - 패턴매칭

[2.2] 대표문제 패턴매칭

다음 주어진 영어 문장에서 특정한 문자열의 개수를 리턴하는 프로그램을 작성하라.

## 패턴매칭

문자열에서 특정 단어나 문자열을 찾는 과정을 패턴매칭이라고 부른다. 문자열 패턴 매칭에 사용되는 대표적인 알고리즘은 아래와 같이 4가지가 있다.

- 고지식한 패턴 검색 알고리즘
- 카프 - 라빈 알고리즞ㅁ
- KMP 알고리즘
- 보이어-무어 알고리즘

4가지 이외에도 다양한 방법이 사용되고 있지만, 우선 당장은 4개에 대해서만 알아보자.

## 고지식한 패턴 검색 알고리즘

고지식한 알고리즘 (Brute Force)이란? 본문 문자열을 처음부터 끝까지 차례대로 순회하면서 패턴 내의 문자들을 일일이 비교하는 방식을 동작하는 알고리즘이다.

```
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Scanner;

public class Solution {

//	static int T = 10;

	public static void main(String args[]) throws Exception{

		String t ="TTTTATTATTTCTAACCAA";
		String p = "TTATTTCTA";

		int N = 19;
		int M = 9; //텍스트 길이, 패턴 길이
		int i, j;

		for(i = 0 ; i< N; i++) {
			for(j = 0 ; j < M; j++) {
				//실패했을 경우 다시 시작점으로 간다.

				if(t.charAt(i+j) != p.charAt(j)) {
					System.out.println("다르데");
					break;
				}


			}
			// 패턴을 찾았을 경우
			if(j == M) {
				System.out.println(j);
				System.out.println("find");
				break;
			}
		}
	};
}



```

## KMP 알고리즘

불일치가 발생한 텍스트 스트링의 앞 부분에 어떤 문자가 있는지를 미리 알고 있으므로, 불일치가 발생한 앞 부분에 ㅐㄷ하여 다시 비교하지 않고 매칭을 수행하는 알고리즘이다. 이 알고리즘은 패턴을 전처리하여 배열 next[M] (불일치가 발생했을 경우 이동할 다음 위치)을 구해서 잘못된 시작을 최소화할 수 있다. 시간 복잡도는 O(M+N)이다.

![스크린샷 2019-04-13 오후 9 02 43](https://user-images.githubusercontent.com/23495876/56079451-820ee980-5e2f-11e9-9a42-70a4d4ae16e2.png)

찾기에 실패했을 경우, 배열의 첫 요소로 가지 않고 최대한 유사한 위치에서 구분을 위한 작업이 필요하다. 그것을 새로운 1차원 배열을 만들어서 해결할 수 있다. 이것을 실패함수라고 한다. 매칭이 실패했을 때, 돌아갈 곳을 계산하는 역할을 한다.

![image](https://user-images.githubusercontent.com/23495876/56079469-e336bd00-5e2f-11e9-8e38-e91d8931eae3.png)

## 보이어-무어 알고리즘

보이어 - 무어 알고리즘은 패턴에 오른쪽 끝에 있는 문자가 불일치 하고 이 문자가 패턴 내에 존재하지 않는 경우, 이동 거리는 무려 패턴의 길이만큼 된다. 대부분 문자열 매칭 알고리즘은 왼쪽에서부터 비교하지만, 이 알고리즘은 오른쪽에서 왼쪽으로 비교한다.

과정을 봐둬야 한다 (그림이길어서 생략)

## 문자열 매칭 알고리즘 ㅣㅂ교

- 찾고자 하는 문자열 패턴의 길이 m, 총 문자열 길이 n
- 고지식한 패턴 검색 알고리즘: 수행시간 O(mn)
- 카프-라빈 알고리즘 : 수행시간 세타 n
- KMP 알고리즘 : 수행시간 세타 n
- 보이- 무어 알고리즘 : 앞의 두 매칭 알고리즘들의 공통점은 텍스트 문자열의 문자를 적어도 한번씩 훑는다는 것이다. 따라서 최선의 경우에도 오메가n이다.
- 보이어무어 알고리즘은 텍스트 문자를 다 보지 않아도 된다. 패턴의 오른쪽부터 비교하는것이다. 최악의 경ㅇ우 세타 (mn)이다. 세타n보다는 시간이 덜든다.

## 문자열 암호화

문자열의 암호화는 데이터 전송 시 타인의 불법적인 방법에 의해 데이터가 손실되거나 변경되는 것을 방지하기 위해 데이터를 변환하는 방법이라고 할 수 있다.
이와 반대로 암호화 한 문자열을 원래의 문자열로 돌려 놓는 것을 복호화라 한다. 그럼 문자열을 암호화하는 방법에는 어떤 것들이 있을까?

가장 간단하게 시저 암호가 있다. 평문에서 사용하고 있는 알파벳을 일정 문자 수 만큼 평행이동하여 암호화를 하는 방법이다.

평문에서 +1을 더할 경우 암호문이 나온다고 하면 이 떄 암호문의 키값이 1이다.
문자 변환 표, bit열의 암호화, 등이 있다.

## 패턴 매칭 해결하기

```
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
public class Solution {

	static int T = 10;

	public static void main(String args[]) throws Exception{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));



		int i,j,k;
		while(T-- >0) {
			String temp = br.readLine();
			int cnt = 0;
			char []text = new char[1000];
			char []find = new char[10];

			String f = br.readLine();
			for(i=0; i<f.length();i++){
				find[i] = f.charAt(i);
			}

			String te = br.readLine();
			for(i=0; i<te.length();i++){
				text[i] = te.charAt(i);
			}


			for(i =0; i<te.length(); i++) {
				boolean flag = false;
				if(text[i] == find[0]) {
					for(j=1; j<f.length(); j++) {
						if(text[i+j] != find[j]) {
							flag = false;
							break;
						}else {
							flag = true;
						}
					}
				}
				if(flag)
					cnt++;
			}
			System.out.println("#"+temp+" "+ cnt);

		}

	};
}



```

---

참고자료

SWE selfStudyBook(1)
