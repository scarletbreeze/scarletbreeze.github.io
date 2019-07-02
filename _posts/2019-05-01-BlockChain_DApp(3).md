---
layout: post
title: BlockChain_Dapp(3)
categories: [BlockChain]
excerpt: ' '
comments: false
share: false
tags: BlockChain
date: 2019-05-01
---

![No Image](/assets/logo/BlockChain.png)

# 인프런 -블록체인 이더리움 부동산 댑(Dapp) 만들기

## 솔리디티 스마트 계약 이론

![No Image](/assets/posts/20190501/1.png)

## 1. 컨트랙 구조

- 객체지향 언어들의 클래스와 비슷
- 문법은 자바스크립트와 비슷.
- 상속과 타입 구분 가능

- 1 line : solidty compiler version
- 2 line : contract name
- line 3 : 상태변수, 클래스의 멤버변수라고 생각하면 된다
- line 4 : 생성자.
- line 5 : 함수 구조

## 2. 접근 제어자

![No Image](/assets/posts/20190501/2.png)

- **external** : 외부 컨트랙트만 호출 가능, 상태변수는 external 사용 불가
- **internal** : 컨트랙트 내부 호출 가능, 상속받은 컨트랙트도 호출 가능, 상태변수는 디폴트로 internal
- **public** : 컨트랙 내부 호출 가능, 상속받은 컨트랙 호출 가능, 외부 컨트랙도 호출 가능 (상태변수에 public접근 제어자 선언하면, 컴파일러에서 자동적으로 변수의 getter 함수를 만들어준다. )
- **private** : 컨트랙 내부에서만 호출 가능

## 3. 함수 타입 제어자

![No Image](/assets/posts/20190501/3.png)

- **view** : 데이터 read-only, 데이터 비용 없음
- **pure** : 데이터 읽지 않음, 인자값만 활용해서 반환 값 정함. 가스비용 없음
- **constant** : 0.4.17버전 이전에는 view/pure 쓰임
- **payable** : 함수가 에더(ETH)를 받을 수 있게 함. 가스 비용 있음

## 4. 값 타입

- Boolean 형 . ex) `bool x = false;`
- 정수형 타입 : int/uint
  - (int == int256) (양수 음수 둘다 가능)
  - (uint == uint 256) (양수만 받을 수있음)

![No Image](/assets/posts/20190501/4.png)

- address : 20byte값으로 고정. 이더리움 계정 주소 저장. 두개의 멤버 소유 (balance,transfer)

![No Image(/assets/posts/20190501/5.png)

- byte : 1~32byte, 문자열을 저장할 할 수 있다. 이 때 hex로 변환해서 저장해야한다. 나중에 라이브러리 사용 예정 (solidity는 문자열에 최적화 x 32바이트에 최적화 되어있기 때문.) 32바이트가 넘어가면 string 써야지. string 타입은 가스 비용이 더 요구된다는 것 참고

- 동적 크기의 byte 배열 : bytes/string, 값 타입 x ex) bytes[] names;

![No Image](/assets/posts/20190501/6.png)

- 열거형(enum) 사용자 정의타입 만드는 방법 중 하나.
- right,left 선택할 수 있는 direction 선언,
- 이걸 컨트랙 안에서 쓸 수 있게 변수로 선언
- getDirection: diretion의 현재 설정된 값의 인덱스를 리턴
- setDirection: direction의 right나 left를 정함

## 참조

<https://www.inflearn.com/course/blockchain-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-dapp#>
