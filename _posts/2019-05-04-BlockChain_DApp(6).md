---
layout: post
title: BlockChain_Dapp(6)
categories: [BlockChain]
excerpt: ' '
comments: false
share: false
tags: BlockChain
date: 2019-05-04
---

![No Image](/assets/logo/BlockChain.png)

# 인프런 -블록체인 이더리움 부동산 댑(Dapp) 만들기

## 솔리디티 스마트 계약 실전

## 1. 가스란?

(트랜잭션의 유효성을 검증하고 블록체인에 추가하려고 노력하는 채굴자들에게 보상금으로 돌아간다)

- 가스는 수수료다.
- 채굴자들에게 보상금으로 지급
- 수수료내는 예:

1.  다른 계정으로 돈 보낼 때
2.  스마트 컨트랙 배포할 때
3.  함수에서 상태 변수에 변화를 줄 때
4.  등등 ...

- 함수 실행중인 계정에서 가스비 지불
- 가스비도 에더(ETH)를 사용(진짜 돈)
- 가스 단위를 쓰는 이유:

1. 에더는 화폐 변동성이 있다
2. 가스 가격은 거의 변동되지 않는다.

- 가스 비용은 함수의 복잡성에 따라 결정
- 연산에 소모되는 비용 == 옵코드(opcode)
- 네트워크 상태, 컴퓨팅 자원에 따라 비용 결정

> 가스 최대 한도 비용, 메타 마스크 같은 경우 미리 이 트랜잭션을 시뮬레이션하고 거기에 실제 사용된 가스를 측정해서 사용자의 가스를 이정도, 쓸거다 하고 한도를 미리 보여줌)

> (가스가격은 트랜잭션을 끝내기 위해 채굴자에게 시간당 지불하는 임금과 같다. GWEI라는 단위를 통해 지불.
> (네트워크 상태에 따라 평균가가 정해짐. 그걸 체크할 수 있는 사이트 <http://ethgasstation.info> 현재 네트워크에서 트랜잭션을 처리하는데 드는 가스 가격의 평균가를 볼 수 있다.)

> (평균가에서 낮게 책정해서 내면 채굴자들이 미루고, 한참 후에 처리해줄 가능성이 높다.)

(<http://converter.murkin.me>) (사이트가 안들어가지네)

- etherscan에서 모든 트랜잭션을 기록하는 공식 사이트
- 사용된 가스 곱하기 가스 가격을 하면, 트랜잭션에 대한 총 수수료가 나온다.

- 가스 개념이 존재하는 이유?

1. 무한 반복문 저지
2. 함수내 실수로 인한 네트워크 성능 저하
   (가스가 없었다면 서버가 다운되거나, 성능문제로 고통 받았을 것)

## 2. 옵코드란 ?

- 연산에 소모되는 비용 == 옵코드:(opcode)

1. 산술 연산
2. 로직 연산
3. memory or storage 연산
4. 등등..

컨트랙에 컴파일 되면서 먼저 바이트 코드로 변환이 되고
그 다음에 옵코들 분해되서 이더리움 가상 머신에 의해 실행이 된다.
BYTECODE에 있는 object 복사
etherscan.io 코드로 이동

byte 코드를 opcode로 해독할 수 있는 곳
붙여넣어보면
object 아래 opcode와 동일을 알 수 있음

각각의 opcode가 무슨 역할을 하는지 대충은 알 필요 있음
<https://ethereum.stackexchange.com/questions/119/what-opcodes-are-available-for-the-ethereum-evm>

- Mstore : 단어를 메모리에 저장
- DUP1 : 첫 번째 스택 아이템을 복제

이런 식으로 각각의 opcode 역할 존재
그리고 opcode마다 소량의 가스비용이 든다

결과적으로 이더리움 가상머신에서 컨트랙이 배포되었을 때, 옵코드를 스택에 먼저 쌓고 해당 트랜잭션이 있을 때마다 해당 옵코드를 읽어서 실행시킨 다는 점 기억하기.

## 참조

inflearn 강좌
<https://www.inflearn.com/course/blockchain-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-dapp#>

Remix
<http://remix.ethereum.org/>

Etherscan
<https://etherscan.io/>
