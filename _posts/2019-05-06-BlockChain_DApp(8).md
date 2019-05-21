---
layout: post
title: BlockChain_Dapp(8)
categories: [BlockChain]
excerpt: ' '
comments: false
share: false
tags: BlockChain
date: 2019-05-06
---

![No Image](/assets/logo/BlockChain.png)

# 인프런 -블록체인 이더리움 부동산 댑(Dapp) 만들기

## 솔리디티 스마트 계약 실전

## 트러플 & 컨트랙 배포 (1) (구조 설명, 배포)

- `mkdir -p truffle` -> `cd truffle` -> `truffle init` -> `code .`
- contract폴더 : solidity 컨트랙을 보관하는 곳
- migrations폴더 : 컨트랙을 배포할 때, migration 폴더 안에 있는 스크립트 파일을 실행함
- migration폴더 안 스크립트 : 배포하는 과정에 쓰이는 로직이 담겨져있음. 다른 스크립트 파일을 생성하게 될 때, 순차적으로 진행되는 숫자를 붙여야 한다. 배포할 때, 앞에 접두사로 붙여준 숫자를 보면서 순차적으로 실행하므로. 이런 스크립트 파일은 이 마이그레이션(contract 폴더 안에 있는) 컨트랙을 노드에 배포하는 역할을 한다
- test 폴더 안 파일 -> 컨트랙 테스트에 쓰임
- truffle.js : 환경설정 담당. (난 안생겼네) 어느 네트워크에 배포할지 나중에 정의한다.
- truffle.config.js : 윈도우에서 명령 프롬프트 cmd를 이용하는 분들 때문, cmd에서 truffle.js 인식문제가 발생할 수 있으므로. cmd 사용시에만 문제. (강좌에서는 truffle-config.js를 지우지만, 난 지우지 않음)

#### 새로운 컨트랙 파일 만들기

- contracts 폴더 안에. MyContract.sol
- 이 안에 참조 타입 매핑 예제로 썼던 예제 붙여넣기
- migrations 폴더 안에 2_deploy_contract.js생성
- 이 안에 MyContract파일을 불러오고 노드에 배포하는 로직을 넣겠다.

```solidity
var MyContract = artifacts.require("./MyContract.sol");

module.exports = function(deployer) {
  deployer.deploy(MyContract);
};

```

- 컨트랙 폴더 안에 있는 mycontract파일을 불러와서
- deployer -> 이 인스턴스를 가지고, 내가 불러온 마이컨트랙을 넘겨서 이더리움 가상머신에 배포함
- truffle 폴더로 가서 `truffle develop`실행
- 트러플 내부에서 이더리움 노드를 실행시키고, 테스트 계정 10개를 생함
- 이 노드의 rpc endpoint가 포트로 나옴
- 자바스크립트 콘솔 또한 실행됌
- 이 상태에서 파워쉘을 열어서 `truffle develop --log`치면, log 확인 가능
- 다시 콘솔로 돌아와서, migrate 실행
- initial migration.js 파일 실행해서 그 안에있는 마이그레이션 배포함.
- 마찬가지로 2_deploy_contract.js 파일 실행해서 MyContract을 배포함

![No Image](/assets/posts/20190506/1.png)

- 이 정보는 마이그레이션 컨트랙을 배포하면서 생긴 트랜잭션 해쉬이고
  그 밑의 정보는 이 컨트랙이 네트워크에 어느 주소로 배포가 되었는지를 알려준다
- 동일하게 deploy아래도 같다.
- log를 확인해보면, 트랜잭션이 총 4개가 찍힌 걸 확인 가능
- 첫 번째와 세번째 건, 우리가 배포한 트랜잭션 해쉬와 일치한다.
- 2번째와 마지막(4번째)는 어디에서 온 건가 ? -> truffle내부에서 `migrations.sol` 여기서. last_completed_migration변수를 업데이트 하기 위해 쓰인 트랜잭션. 마이그레이트 커맨드 실행하면서 두 개의 스크립트 실행시켰고, 그 결과 `last_completed_migration`값이 2로 업데이트 된다. 2로 업데이트 되었기 때문에 나중에 마이그레이트 커맨드 실행시켜도 기존의 컨트랙 재배포하지 않는다. -> 새로 추가한 컨트랙만 노드에 배포하게 됌. 가스 비용 절감과, 기존 컨트랙을 새로운 주소에 배포하지 않기 위한 장치.

- 기존에 배포된 컨트랙 주소로는 다시 배포 불가. 블록체인은 수정이 불가능하기 때문이다. 아예 새로운 주소로 배포를 해야한다. -> 되도록 완벽한 테스팅을 통해, 재배포를 하지 않도록 노력해야 한다.
- `migrate --compile-all --reset` all : 이 커맨드 사용하면 모든 컨트랙 재 컴파일. reset : 마이그레이션 폴더 안에 있는 스크립트를 강제적으로 다시 실행
- 마이그레이트 커맨드를 쓰면, 컴파일 되면서 build라는 폴더가 생성이 된다. 이 안에 컨트랙이라는 폴더가 있다. 두 개의 json 파일들이 생성됌
- 이 파일들을 artifact 파일이라고 함. 해당 컨트랙의 abi정보와 추가적으로 컨트랙과 관련한 모든 정보를 담고 있다. abi(application binary interface)의 약자. 컨트랙에서 쓰는 함수들과 변수들이 json 형식으로 나타나 있다. 블록체인의 컨트랙을 배포했을 때, 그 컨트랙에 있는 함수들을 호출하고 데이터가 예상했던 형식으로 리턴될 수 있도록 보장하는 것이다. 컨트랙과 상호작용할 수 있는 방법을 정의한 곳

## 트러플 & 컨트랙 배포 (2) (트러플 콘솔 사용)

- web3 api 사용 : `web3.eth.accounts` => 10개의 계정이 나옴
- 첫 번째 계정은 우리가 컨트랙을 배포하는데 썼던 계정이라서 잔액이 조금 깎여 있을 것.
- `web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]),"ether")` 예전 Geth 콘솔 사용법과 동일. wei는 알아보기 힘드니까 알아보기 편한 ether로 변환하는 작업. 이것도 보기 힘드니까 원하는 숫자로 보기 위해서, 끝에 `.toNumber()`붙여주기
- `web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1]),"ether").toNumber()`
- 트러플 노드에 배포했던 마이 컨트랙을 불러오고, 그 안의 함수를 써볼 것. 그러기 위해서는 전역 변수에다가 마이컨트랙의 인스턴스를 저장해야한다.
- `MyContract.deployed().then(function(instance){ app = instance;})`
- (MyContract이 배포가 되었으면, 무엇을 하라 인데, then 안에 function을 넣고, 트러플로부터 마이컨트랙의 인스턴스를 콜백을 받게 되는데, 이 인스턴스를 전역변수 앱에다가 대입을 한다.) undefined가 나오면 대입이 잘 되었다는 거다
- 이제 이 앱 변수를 통해서, 노드에 배포된 마이 컨트랙과 소통이 가능해짐
- app을 실행해보면 마이컨트랙에 관한 많은 정보를 볼 수 있다.
- 우리가 만들었던 함수들이 보인다. setStudentInfo, getStudentInfo,
- setStudentInfo을 이용해서 학생정보 입력하기
- `app.setStudentInfo(1111,"seonhong","male",7,{from: web3.eth.accounts[1]})`
- 마지막 파라미터는 트러플 내부에서 인식하는 파라미터. setStudentInfo 함수르 쓸 때, 어느계정으로 불러와서 쓰는 건지 명시를 해줘야 한다.
- 두 번째 계정의 잔액 확인해보니 잔액이 나간 걸 확인할 수 있다. `app.getStudentInfo(1111)`
- getStudentInfo 함수는 view타입을 쓰기 때문에 트랜잭션을 생성하지도 않고 가스비도 지불하지 않는다.
- `.exit` 써서 콘솔 나가고, log 창도 컨트롤 씨 눌러서 끝낸다

## 트러플 & 컨트랙 배포 (3) (가나슈 사용)

- 가나슈를 쓰면 비주얼적으로 쉽게 쉽게 진행사항을 빨리 알아차릴 수 있음
- 트러플에서 가나슈 네트워크에 연결하겠다. 우선 가나슈 실행.
- truffle.js 파일에서, 주석 지우고

```javascript
module.exports = {
  networks:{
    ganache:{
      host: "localhost"
      port:8545,
      network_id:"*"
    }
  }
};
```

- 트러플 콘솔에 접속하지 않은 상태에서 배포
- 블록체인 트러플 폴더로 가고, `truffle migrate --compile-all --reset --newwork ganache`
- 가나슈에 배포하면서 첫 번째 코인베이스 계정이 디폴트로 쓰였고, 해당 계정이 가스비 소모하였음
- contract creation이 두 개의 컨트랙을 배포하면서 생긴 트랜잭션
- contract call은 migration 컨트랙의 last_completed migration변수를 업데이트하면서 쓰인 트랜잭션
- 트러플 콘솔에 접속해서 가나슈의 배포된 컨트랙과 소통을 해보자.
- `truffle console --network ganache`
- 저번 강좌에 했었던 커맨드들 반복. `MyContract.deployed().then(function(instance){app = instance;})`
- `app.setStudentInfo(1111,"sejong","male",7,{from: web3.eth.accounts[1]})`
- 가나슈 들어가보면, 두 번째 계정의 가스 소모된 것 확인 가능.
- `app.getStudentInfo(1111)`

- 트러플은 스마트 컨트랙의 빌드와 배포를 간편화 시킨다는 것을 보았고 배포하는 사이클 관리하며 트러플 콘솔을 통해 스마트컨트랙과 소통할 수 있다는 것을 배워보았다.

## 참조

inflearn 강좌
<https://www.inflearn.com/course/blockchain-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-dapp#>
