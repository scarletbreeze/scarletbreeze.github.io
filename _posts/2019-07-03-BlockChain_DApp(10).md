---
layout: post
title: BlockChain_Dapp(10)_이더리움 부동산 스마트 계약 개발
categories: [BlockChain]
excerpt: ' '
comments: false
share: false
tags: BlockChain
date: 2019-07-03
---

![No Image](/assets/logo/BlockChain.png)

# 인프런 -블록체인 이더리움 부동산 댑(Dapp) 만들기

## 이더리움 부동산 스마트 계약 개발

## 1. 스타터 템플렛 받기

truffleframework.com/boxes 를 들어가면
각 언어에 맞는 트러플 템플릿 다운 가능

강좌에서는 강사님이 수정해주신 템플릿 다운
스타터 템플릿 구조 훑음

## 2. 컨트랙 소유자 설정

```javascript
pragma solidity ^0.4.23;

contract RealEstate {
    // 다른 언어의 생성자와 달리 배포할 때, 한번만 실행되고 끝. 그 이후에는 호출 불가
    // 그 이점을 살려서 컨트랙의 소유자를 설정할 수 있다. 즉 배포할 때 사용된 계정이 이 컨트랙의 소유자가 될 수 있게 설정한다
    address public owner;
    // 상태변수에 public을 붙이면 자동적으로 owner 변수의 getter 함수가 생성이 된다.

    constructor() public{
        owner = msg.sender;
        // 컨트랙 배포 단계에서 생성자가 호출이 되는데, msg.sender의 주소값을 owner에 대압하는 과정
        // msg.sender: 현재 사용하는 계정으로 이 컨트랙 안에 있는 생성자나, 함수를 불러오는 것.
        // 이 컨트랙의 주인은 현재 배포하는데 쓰인 계정이라고 선언하는 것.
    }

}


```

이후 real-estate 폴더에서
`truffle migrate --network ganache`로 배포
가나슈 들어가보면 첫번 째 계정이 디폴트로 사용되면서 balance가 줄어든 걸 알 수 있다

이후 `truffle console --network ganache` 트러플 콘솔로 들어간다

RealEstate 컨트랙의 인스턴스를 전역 변수에 저장하고
RealEstate.deployed().then(function(instance){app = instance;})

app변수를 사용해서 현재 배포된 컨트랙의 소유자가 누구인지 확인해보자
`app.owner.call()`
즉 배포에 사용된 계정이 현재 컨트랙의 소유자가 되었다.

앞으로 이 owner 변수를 어떤 사람이 매물을 매입했을 때, 그 매입가를 owner 계정으로 송금할 거다.

정리하자면 가나슈의 첫 번째 계정으로 배포를 하게 되었고 그 계정으로 realEstate의 생성자를 호출해서, 이 컨트랙의 owner, 즉 소유자를 가나슈의 첫 번째 계정으로 설정했다. 즉 내가 사용하고 싶은 계정으로 언제든지 소유자를 설정할 수 있다는 것을 의미

## 3. 첫 테스팅

테스트 스크립트 작성.
블록체인에 스마트컨트랙을 한번 배포하면, 배포된 주소에서는 수정하는게 불가. 최대한 많은 테스팅을 한뒤 메인넷에 배포해야한다.

```javascript
// 두 개의 인자 받음
// 첫 번쨰 인자 : 테스팅할 컨트랙의 이름
// 두 번째 인자 : 계정이란 인자를 콜백으로 받는다 accounts는 현재 연결된 노드에서 쓸 수 있는 계정들
var RealEstate = artifacts.require('./RealEstate.sol');

contract('RealEstate', function(accounts) {
  var realEstateInstance;

  it('컨트랙의 소유자 초기화 테스팅', function() {
    return RealEstate.deployed()
      .then(function(instance) {
        realEstateInstance = instance;
        return realEstateInstance.owner.call();
      })
      .then(function(owner) {
        assert.equal(
          owner.toUpperCase(),
          accounts[0].toUpperCase(),
          'owner가 가나슈 첫번째 계정과 동일하지 않습니다.'
        );
      });
  });
});
```

이후 로컬로 돌아가서 `truffle test --network ganache`

![No Image](/assets/posts/20190703/1.png)

## 4.매물구입 함수

```javascript
pragma solidity ^0.4.23;

contract RealEstate {
    struct Buyer { // 매입자 정보
        address buyerAddress;
        bytes32 name;
        uint age;
    }

    mapping (uint => Buyer) public buyerInfo; // 매물의 아이디를 키값으로 하면 매입자의 정보를 불러오는 구조
    address public owner;
    address[10] public buyers; // 매물이 10개 있으니까 10명만 살 수 있도록 고정시킴

    constructor() public {
        owner = msg.sender;
    }
    //payable: 함수가 이더를 받아야 할 떄, 즉 매입자가 매입을 했을 때, 메타마스크가 뜨고, 이더를 이 함술 보낸다.
    function buyRealEstate(uint _id, bytes32 _name, uint _age) public payable {
        require(_id >= 0 && _id <= 9); // 유효성 체크
        buyers[_id] = msg.sender; // 매물을 구입하고 있는 현재 계정을 배열에 저장
        buyerInfo[_id] = Buyer(msg.sender, _name, _age);

        owner.transfer(msg.value);  // 이더를 계정에서 계정으로 이동할 때, tranfer 함수를 쓰고,
        //msg.value는 이 함수로 넘어온 이더를 뜻함, msg.value는 way만 취급
    }
}


```

이후 `truffle migrate --compile-all --reset --network ganache`
컨트랙을 재컴파일 시키고 가나슈에 재배포한다.
이후 `truffle console --newwork ganache`
`RealEstate.deployed().then(function(instance){app = instance;})`
`app.buyRealEstate(0,"sejong",13,{from: web3.eth.accounts[1].value:web3.toWei(1.50,"ether")})`
가나슈 보면 2번째 계정 balance가 깎였는데, 그 금액이 함수 실행하면서 지불한 가스비와 송금한 1.5 에더가 포함되어 있다.
그리고 첫번 쨰 계정의 balance가 많아진 걸 알 수 있는데, 함수로직 맨 마지막 부분에 owner 계정으로 이더를 송금하기에, 1.5 에더가 첫 번쨰 계정으로 송금이 된 것이다.

## 5. 이벤트(Event)

매물을 어떤 유저가 매입하면, 매입이 완료되었다는 메세지를 생성해서 , 사람들에게 알려주면 이상적일 것. 그 작업을 이벤트를 통해서 할 것.

관련 코드는 6번에 다 모아놨음

컨트랙을 수정했으니, 재컴파일 재배포 해야지
`migrate --compile-all --reset`
`RealEstate.deployed().then(function(instance){app = instance;})`

`app.LogBuyRealEstate({},{fromBlock:0, toBlock: 'latest'}).watch(function(error,event){console.log(event);})`

> 만든 함수를 사용하기 위해서는 파라미터 명시해야 함. 첫 번째 파라미터는 필터고 두 번째는 범위이다. 필터는 더 자세히 명시 안하고 그냥 모든 이벤트를 감지하는 걸로 하고 두번째 파라미터는 0번째 블록에서부터 최근 생성된 블록까지 감지를 하게 한다. watch, 즉 앞의 필터링과 범위를 정한 이벤트를 마지막으로 감지를 할 수 있게 하고 콜백으로 에러와 이벤트를 받는다. 그리고 받은 이벤트의 내용을 콘솔에 보여주게 한다.

이제 매물을 하나 매입해서 이벤트가 잘 작동하는지 확인
`app.LogBuyRealEstate({},{fromBlock:0, toBlock: 'latest'}).watch(function(error,event){console.log(event);})`

실행을 시키면, 트랜잭션 영수증이 나오고
그 밑에 로그 부분에 전에 없던 여러 필드들이 생성이 된다. 트랜잭션을 통해 발산된 이벤트의 모든 정보들을 담고 있다. 이 정보를 블록에 현재 저장 시킨 것이다.

마지막으로 정리하자면, buyRealEstate 함수를 통해 이벤트를 발생시킬 수 있고 발생된 이벤트의 정보가 블록 로그 부분에 저장이 된다는 걸 알 수 있었다. 나중에 로그에 args 부분을 통해서 프론트엔드에서 매입자 계정을 포함한 완료 메세지를 보여줄 수 있다.

## 6. 읽기 전용 함수들

```javascript
pragma solidity ^0.4.23;

contract RealEstate {
    struct Buyer { // 매입자 정보
        address buyerAddress;
        bytes32 name;
        uint age;
    }

    mapping (uint => Buyer) public buyerInfo; // 매물의 아이디를 키값으로 하면 매입자의 정보를 불러오는 구조
    address public owner;
    address[10] public buyers; // 매물이 10개 있으니까 10명만 살 수 있도록 고정시킴

    event LogBuyRealEstate(
        address _buyer,
        uint _id
    );

    constructor() public {
        owner = msg.sender;
    }
    //payable: 함수가 이더를 받아야 할 떄, 즉 매입자가 매입을 했을 때, 메타마스크가 뜨고, 이더를 이 함술 보낸다.
    function buyRealEstate(uint _id, bytes32 _name, uint _age) public payable {
        require(_id >= 0 && _id <= 9); // 유효성 체크
        buyers[_id] = msg.sender; // 매물을 구입하고 있는 현재 계정을 배열에 저장
        buyerInfo[_id] = Buyer(msg.sender, _name, _age);

        owner.transfer(msg.value);  // 이더를 계정에서 계정으로 이동할 때, tranfer 함수를 쓰고,
        //msg.value는 이 함수로 넘어온 이더를 뜻함, msg.value는 way만 취급
        emit LogBuyRealEstate(msg.sender, _id);
    }

    function getBuyerInfo(uint _id) public view returns (address, bytes32, uint){
        Buyer memory buyer = buyerInfo[_id];
        return (buyer.buyerAddress, buyer.name, buyer.age);
    }

    function getAllBuyers() public view returns (address[10]){
        return buyers;
    }
}

```

`migrate --compile-all --reset`
`RealEstate.deployed().then(function(instance){app = instance;})`
`app.buyRealEstate(0,"sejong",14,{from: web3.eth.accounts[1],value:web3.toWei(1.50,"ether")})`
`app.getBuyerInfo(0);`

이름을 bytes32로 저장했으니까 hex로 나와서 알아보기가 어렵다

`app.getAllBuyers();` -> 10개의 고정된 사이즈가 리턴된다.

## 7. 마무리 테스팅

사실 테스트 케이스를 하나하나 나누어서 하는게 더 바람직하지만, 여러가지를 한번에 넣어야 하는 경우도 분명히 있다.

```javascript
//TestRealEstate.js
var RealEstate = artifacts.require('./RealEstate.sol');

contract('RealEstate', function(accounts) {
  var realEstateInstance;

  it('컨트랙의 소유자 초기화 테스팅', function() {
    return RealEstate.deployed()
      .then(function(instance) {
        realEstateInstance = instance;
        return realEstateInstance.owner.call();
      })
      .then(function(owner) {
        assert.equal(
          owner.toUpperCase(),
          accounts[0].toUpperCase(),
          'owner가 가나슈 첫번째 계정과 동일하지 않습니다.'
        );
      });
  });

  it('가나슈 두번째 계정으로 매물 아이디 0번 매입 후 이벤트 생성 및 매입자 정보와 buyers 배열 테스팅', function() {
    return RealEstate.deployed()
      .then(function(instance) {
        realEstateInstance = instance;
        return realEstateInstance.buyRealEstate(0, 'sejong', 13, {
          from: accounts[1],
          value: web3.toWei(1.5, 'ether'),
        });
      })
      .then(function(receipt) {
        assert.equal(
          receipt.logs.length,
          1,
          '이벤트 하나가 생성되지 않았습니다.'
        );
        assert.equal(
          receipt.logs[0].event,
          'LogBuyRealEstate',
          '이벤트가 LogBuyRealEstate가 아닙니다.'
        );
        assert.equal(
          receipt.logs[0].args._buyer,
          accounts[1],
          '매입자가 가나슈 두번째 계정이 아닙니다.'
        );
        assert.equal(
          receipt.logs[0].args._id,
          0,
          '매물 아이디가 0이 아닙니다.'
        );
        return realEstateInstance.getBuyerInfo(0);
      })
      .then(function(data) {
        assert.equal(
          data[0].toUpperCase(),
          accounts[1].toUpperCase(),
          '매입자의 계정이 가나슈 두번째 계정과 일치하지 않습니다.'
        );
        assert.equal(
          web3.toAscii(data[1]).replace(/\0/g, ''),
          'sejong',
          '매입자의 이름이 sejong이 아닙니다.'
        );
        assert.equal(data[2], 13, '매입자의 나이가 13살이 아닙니다.');
        return realEstateInstance.getAllBuyers();
      })
      .then(function(data) {
        assert.equal(
          data[0].toUpperCase(),
          accounts[1].toUpperCase(),
          'Buyers배열 첫번째 인덱스의 계정이 가나슈 두번째 계정과 일치하지 않습니다.'
        );
      });
  });
});
```

`truffle test --network ganache` 로 테스팅 해보기.

#### 참조

inflearn 강좌
<https://www.inflearn.com/course/blockchain-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-dapp#>

```

```
