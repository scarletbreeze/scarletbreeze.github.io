---
layout: post
title: BlockChain_Dapp(7)
categories: [BlockChain]
excerpt: ' '
comments: false
share: false
tags: BlockChain
date: 2019-05-05
---

![No Image](/assets/logo/BlockChain.png)

# 인프런 -블록체인 이더리움 부동산 댑(Dapp) 만들기

## 솔리디티 스마트 계약 실전

## 1. 컨트랙 최적화

- solidity에서 빅오 표기법 더 중요하게 생각해야 할 문제는 GAS
- 각각의 opcode마다 가스가 비용이 있다.
- 어떻게 하면 최대한 가스 소비를 줄일 수 있을지 고민하며 개발해야 함
- Q)어느 상황에 가스 소비를 줄여야 할까?

- ### 컨트랙 배포할 때의 비용
- ### 컨트랙 내의 함수를 불러올 때의 비용

- 컨트랙 배포할 때 (주석, 변수 이름, 타입 이름 -> 가스 소모 x)
- 불필요한 코드 정리

```solidity
function useless(uint a)public {
    if(a > 10){
        if(a+a < 10){
            b = 20; // 이 라인에 올 수가 없음
        }
    }
}
```

- 함수를 불러오고 실행시킬 때의 비용(Pure, View -> 실행시키는데 비용 x)그 외의 함수들은 비용 소모

- ### 비싼 연산을 최대한 줄이기
  (ex SSTORE : 스토리지를 쓰는 변수를 상태를 변화시킬 때마다 쓰임. 가스비가 5,000/20,000 소모)

```solidity
uint total = 0;
function expensive()public{
    for(uint i = 0 ; i < 10; i++)
        total += 2;
}
```

- 여기서의 문제. 상태변수 total은 데이터 저장위치가 storage. storage는 연산 위치가 비쌈.
- 그래서 로컬 변수를 생성하여 마지막에 한번 계산해준다.

```solidity
uint total = 0 ;
function optimizd() public {
    uint temp = 0 ;
    for(uint i = 0 ; i < 10; i ++)
        temp += 2;
    total += temp;
}
```

- ### 반복문 관련 패턴
- 반복문을 두개 쓰는 것 보다 하나로 합칠 수 있으면 합쳐라

- ### 고정된 크기 bytes배열 쓰기
- bytes32 -> 고정된 크기, string은 동적 크기
- 이더리움 가상머신은 32bytes 문자에 최적화 되어있다.

### 정리

- 불필요한 코드 정리
- 비싼 연산 최대한 줄이기 (상태변수)
- 반복문 패턴 제대로 쓰기
- string 대신 bytes32 쓰기

## 2. 컨트랙 최적화(2)

- ### 배열 사용시 주의점
  무제한 크기의 배열 반복 피해야함
- (정설에 따르면 길이 **50 이하**의 배열을 돌릴 때 효율적이라고 한다)
- mapping을 통해 조회하면 가스비용을 확연히 줄일 수 있다.
- 배열의 길이가 크지 않다면 mapping보다는 배열

## 참조

inflearn 강좌
<https://www.inflearn.com/course/blockchain-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-dapp#>
