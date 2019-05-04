---
layout: post
title: BlockChain_Dapp(5)
categories: [BlockChain]
excerpt: ' '
comments: false
share: false
tags: BlockChain
date: 2019-05-04
---

![No Image](/assets/logo/BlockChain.png)

# **인프런 -블록체인 이더리움 부동산 댑(Dapp) 만들기 **

## 솔리디티 스마트 계약 실전

![No Image](/assets/logo/BlockChain.png)

## 1. Remix 테스팅 & 디버깅 1

- compile version - > 0.4.24 + commit~ 로 실습 진행하겠다
- auto compile check 해주기
- 코드 입력
- run 탭으로 가보면 Environment 3가지
- 브라우저에 블록체인 인스턴스를 삽입하기 위해 Remix에서 세 가지 옵션 제공
  - Javascript Vm
  - Injected Web3 (메타마스크)
  - Web3 Provider(Geth나 가나슈의 end point주소를 입력해서 사용하는 방식) (가나슈에서 호스트나 포트를 설정했었는데, 거기 연결해서 사용하는 것)
- deploy를 누르면 새로운 트랜잭션 정보가 뜬다.
- contract 주소는 이 주소에 생성
- from-> 이 계정으로 배포
- gas : 배포를 하면서 소모된 가스 정보
- 오른쪽에 어떤 패널 생성. 이게 우리가 만든 함수이다. (컨트랙 배포하면서 함수를 테스팅 할 수 있게 함)
- 패널에 인풋값 입력하고 transaction 해보면 output나옴. 즉 간단한 테스팅 가능

## 2. Remix 테스팅 & 디버깅 2

-

## 참조

inflearn 강좌
<https://www.inflearn.com/course/blockchain-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-dapp#>

Remix
<http://remix.ethereum.org/>
