---
layout: post
title: BlockChain_Dapp(2)
categories: [BlockChain]
excerpt: ' '
comments: false
share: false
tags: BlockChain
date: 2019-04-30
---

![No Image](/assets/logo/BlockChain.png)

# 인프런 -블록체인 이더리움 부동산 댑(Dapp) 만들기

## 1. Geth로 프라이빗 노드 구축(제네시스 블록, 계정 생성)

- genesis 블록 생성(노드 초기화에 필요)
- `puppeth`라는 geth 인스톨 될 때, 같이 설치되는 툴을 가지고 제네시스 블록을 생성.
- chain/network ID 설정시, public ID는 피해야함 (1: Main net, 2: modern test net(이제안씀) , 3. Ropsten test net, 5. Rinkeby test network, 42: kovan test net)
- code mynetwork.json 하면 제네시스 블록, 즉 첫번째 블록이 담고 있는 정보를 보여줌
- 이더리움 노드에서 제네시스 블록의 내용을 읽고 체인의 시작을 어떻게 해야 하는지 초기화하는 것.
- config : chain의 parameter
- timestamp : 이더리움 가상머신에서 블록 생성의 난이도를 조절함. 연속되는 두 개의 블록의 타임스템프 차가 작으면 난이도가 올라간다. 타임스탬프는 또한 블록들이 올바른 순서대로 진행되는지 확인
- gas limit : 블록 내의 트랜잭션이 소비할 수 있는 최대 가스값. 각 블록마다 트랜잭션을 몇개나 할 것인지 제한해서 블록 사이즈 조절
- difficulty : 채굴자가 블록을 풀기 위해 연산을 몇번이나 해야하는지. 직접적인 연관. 높으면 채굴시간이 길어짐
- alloc : 지갑주소에 자금을 미리 할당하는 내
- number: 제네시스 블록
- gasUsed : 블록 내에서 여러 트랜잭션을 처리하면서 상용된 모든 가스의 합계
- parentHash: 부모블록의 해쉬 정보

### private node 초기화

- `geth --datadir . init mynetwork.json`
- 현재 디렉토리에 private node data를 저장한다.
- 관련 정보 생성이 되었다.
- geth 폴더 안에는 모든 체인에 관한 데이터가 저장되어 있다.
- keystore는 우리가 만들 계정들을 저장하는 공간
- `geth --datadir . account new` : keystore 폴더 안에 무작위로 새로운 이더리움 계정 생성
- 총 3개 생성.
- 계정을 리스트로 보여주는 커맨드 : `geth --datadir . account list`
- 생성한 순서대로 번호를 매겨서, 계정 주소와 파일이 어디에 위치해있는지 알려줌. 첫 번째 계정은 모든 채굴 보상금이 이 계정으로 들어간다.

## 2. Geth로 프라이빗 노드 구축 2(노드 첫 실행, DAG 파일 생성)

- 노드 실행. 스크립트를 만들어서 파라미터를 지정해줘야함.`code nodestart.cmd` (cmd : command script)
- `get --networkid 4386 --mine --minerthreads 2 --datadir "./" --nodiscover --rpc --rpcprot "8545" --rpccorsdomain "*" --nat "any" --rpcapi eth,web3,personal,net --unlock 0 -- password ./password.sec`
- 무조건 첫 번째 라인에 있어야 유지가 된다.
- `code password.sec`
- generating DAG in progress
- DAG : 에타시?채굴 알고리즘에서 필요로 하는 데이터 구조. 노드 처음 실행시 DAG 파일 생성. 노드가 채굴을 하기 위해서 이 DAG파일이 생성이 되어야 한다. 3만 블록. 명칭 -> 에폭?1이 100이 되면 끝이 남.
- 트랜잭션이 없어도 블록채굴을 하는 이유 : 트랜잭션 처리 + 새로운 에더 생성에도 목적이 있기 때문

## 3. Geth로 프라이빗 노드 구축 3(Geth 콘솔)

- `geth attach ipc://./pipe/geth.ipc` ->이게 실행이 안되서 그냥 geth attach ipc로 함.
- 해당 명령어는 백그라운드로 돌고 있는 노드에 연결시켜서 자바스크립트 console을 연다. 몇 가지 정보 확인 가능
- coinbase (3개의 계정 중 첫 계정 의미)
- module : 이 창에서 쓸 수 있는 api 나열.
- nodestart.cmd에 파라미터로 `-rpcapi` 주고 값으로 `eth,web3,personal,net`을 줬었다.
- `eth.coinbase` : coinbase 계정 등장
- `eth.accounts` : 현재 노드에 등록된 모든 계정
- `eth.getBalance(eth.accounts[1])` 2번째 계정의 잔액을 본다.
-     `eth.getBalance(eth.coinbase)` : 이 금액 wei 변환되서 나옴.(terminal에서는 그냥 0붙여서 나옴) wei는 adder를 나타내는 데 가장 낮은 단위
-     `web3.fromWei(eth.getBalance(eth.coinbase),"ether")` 이렇게 치니 308 나오네
-     `miner.stop()` : 채굴 멈추기
-     `miner.start(2)` : 2는 몇개의 채굴기 사용.
-     `personal.unlockAccount(eth.accounts[1],"비밀번호",200)` : 계정 언락. 계정의 프라이빗키. 즉 개인키를 열어서 트랜잭션에 서명할 수 있게. 디폴트로 프라이빗키는 잠궈져 있고 계정의 비밀번호를 알고 있어야 언락 가능. 일정시간동안 언락도 가능. 200초 unlock 걸어놓음
- `eth.sendTransaction({from:eth.coinbase, to:eth.accounts[1], value:web3.toWei(20,"ether")})` 리턴된 것 : 새로운 트랜잭션이 만들어진 것.
- `eth.getBalance(eth.accounts[1])` : 보낸 것 확인하기
- `exit` console 나가기

## 참조

<https://www.inflearn.com/course/blockchain-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-dapp#>

geth 명령어 in mac 참조
<https://medium.com/landingblock-korea/10-%EC%8B%A4%EC%8A%B5-mac-os%EC%97%90%EC%84%9C-geth-%EA%B5%AC%EB%8F%99%EC%8B%9C%EC%BC%9C%EB%B3%B4%EC%9E%90-%EB%AA%85%EB%A0%B9%EC%96%B4-%EB%B0%8F-%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%8B%A4%EC%8A%B5-genesis-json-19427d41c2f0>
