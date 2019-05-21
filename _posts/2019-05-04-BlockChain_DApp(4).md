---
layout: post
title: BlockChain_Dapp(4)
categories: [BlockChain]
excerpt: ' '
comments: false
share: false
tags: BlockChain
date: 2019-05-04
---

![No Image](/assets/logo/BlockChain.png)

# 인프런 -블록체인 이더리움 부동산 댑(Dapp) 만들기

## 솔리디티 스마트 계약 이론

![No Image](/assets/logo/BlockChain.png)

## 5. 참조타입 : 데이터 위치

![No Image](/assets/posts/20190504/1.png)

- 변수가 쓰이는 용도가 메모리 저장, 블록체인에 영구히 저장되는 용도인지 정할 수 있는 지시어가 존재. ex) 하드디스크. 상태변수에 디폴트로 세팅
- 메모리: 휘발성, 지역변수 ex) RAM

![No Image](/assets/posts/20190504/2.png)

- 상태변수는 디폴트로 storage를 씀. 따로 타입 뒤에 선언 안해도 된다. 함수 밖에 선언된 변수를 상태변수라고 한다.
- 함수의 매개변수로 uint[]의 배열을 넘김. 매개변수로 넘겼을 때는 저장위치가 디폴트로 메모리를 사용한다. 리턴값도 디폴트로 메모리다.
- 기본 값 타입은 함수 안에 변수로 선언되었을 때, 저장위치가 default로 메모리다.
- 배열이 함수 안에 선언되었을 때,default로 storage에 저장된다.
- studentAges가 age 배열의 값을 변경하는 포인터로 선언. 즉 studenetAges의 값이 변경될 때, 상태변수의 ages 값도 변경.

## 6. 참조타입 : 배열

![No Image](/assets/posts/20190504/3.png)

![No Image](/assets/posts/20190504/4.png)

- uint[] myArray; 선언
- memory지시어를 붙여서 storage가 아닌 메모리에 저장하도록 함
- new keyword와 함께, 배열의 사이즈를 초기지정함.
- 동적 배열의 경우 push member를 써서 새로운 값을 배열의 끝에 추가.
- push는 저장위치가 memory인 경우 사용불가. storage인 경우만 사용 가능
- length라는 member는 배열의 길이 리턴

## 7. 참조타입 : 구조체

![No Image](/assets/posts/20190504/5.png)

- student 구조체 선언
- 이 구조체를 배열로 사용할 예정
- addStudent 함수 : structure 배열에 새로운 학생정보를 추가하는 내용
- storage에 저장하는 새로운 Student 선언
- 함수 안 지역변수로 Student type의 updateStudent를 Stroage에 저장. 값으로 상태변수 Student 배열의 첫번째 인덱스값 대입. storage를 썼기 때문에, 첫 번째 인덱스 값을 복사하지 않고, 가리키는 포인터로 쓰게 됌
- updateStudent.age를 55로 변경하면, students배열의 첫 번째 인덱스의 age 값이 55로 변경.
- 메모리에 updateStudent2로 선언을 하면, 포인터 역할을 하지 않고 복사를 해온다.
- memory 배열의 값을 상태변수에 직접적으로 대입해주면 students 값 영구히 변경

## 8. 참조타입 : 매핑

![No Image](/assets/posts/20190504/6.png)

![No Image](/assets/posts/20190504/7.png)

- `mapping(address => uint256)balance;` mapping keyword를 쓰고 주소형을 key타입으로 설정, value로 양수형을 넣음.
- 어떤 이더리움 계정 주소만의 양수값이 블록체인 안에 존재한다는 거다.
- balance의 키 타입이 주소형이므로, 이더리움 주소를 입력한다 키값으로.
- msg.sender는 이 함수를 불러오는 계정 주소를 뜻한다.

![No Image](/assets/posts/20190504/8.png)

- mapping 선언, key: uint256, value : Student
- key 값으로 uint를 넣으면 Student가 불러와짐
- setStudentInfo 함수의 인자값들을 활용하여 studentInfo의 상태변수에 키값과 value 값을 저장할거다.
- student 구조체 변수에 studentInfo의 value 값을 대입. 저장위치가 storage이므로 student 변수는 studentInfo 상태변수를 참조하게 됌. (포인팅)

- getStudentInfo : studentInfo, 상태 변수의 value 값을 불러오는 함수
- 솔리디티에서 아직까지 구조체 자체를 리턴할 수 없다.

## 참조

<https://www.inflearn.com/course/blockchain-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-dapp#>
