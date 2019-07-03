---
layout: post
title: BlockChain_Dapp(11)_이더리움 부동산 프론트엔드 개발
categories: [BlockChain]
excerpt: ' '
comments: false
share: false
tags: BlockChain
date: 2019-07-03
---

![No Image](/assets/logo/BlockChain.png)

# 인프런 -블록체인 이더리움 부동산 댑(Dapp) 만들기

## 이더리움 부동산 프론트 엔드 개발

## 1. 매몰 템플렛 작성 및 렌더링

백엔드라 칭할 수 있는 부동산 컨트랙을 만들었기에, UI를 담당하는 프론트엔드 개발 진행 예정

노드 모듈을 인스톨 해야한다.

real-estate로 가서 `npm install`

// index.html

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>이더리움 부동산</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-push-2">
          <h1 class="text-center">이더리움 부동산</h1>
          <hr />
          <br />
        </div>
      </div>

      <div class="row" id="list">
        <!-- 매물 리스트 -->
      </div>
    </div>

    <div id="template" style="display: none;">
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="panel panel-success panel-realEstate">
          <div class="panel-heading">
            <h3 class="panel-title">매물</h3>
          </div>
          <div class="panel-body">
            <img style="width: 100%;" src="" />
            <br /><br />
            <strong>아이디</strong>: <span class="id"></span><br />
            <strong>종류</strong>: <span class="type"></span><br />
            <strong>면적(m²)</strong>: <span class="area"></span><br />
            <strong>가격(ETH)</strong>: <span class="price"></span><br /><br />
            <button
              class="btn btn-info btn-buy"
              type="button"
              data-toggle="modal"
              data-target="#buyModal"
            >
              매입
            </button>
            <button
              class="btn btn-info btn-buyerInfo"
              type="button"
              data-toggle="modal"
              data-target="#buyerInfoModal"
              style="display: none;"
            >
              매입자 정보
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/web3.min.js"></script>
    <script src="js/truffle-contract.js"></script>
    <script src="js/app.js"></script>
    <script src="js/utf8.js"></script>
  </body>
</html>
```

app.js

```javascript
App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    $.getJSON('../real-estate.json', function(data) {
      var list = $('#list');
      var template = $('#template');

      for (i = 0; i < data.length; i++) {
        template.find('img').attr('src', data[i].picture);
        template.find('.id').text(data[i].id);
        template.find('.type').text(data[i].type);
        template.find('.area').text(data[i].area);
        template.find('.price').text(data[i].price);

        list.append(template.html());
      }
    });
  },

  initWeb3: function() {},

  initContract: function() {},

  buyRealEstate: function() {},

  loadRealEstates: function() {},

  listenToEvents: function() {},
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
```

-> `npm run dev` // light server를 통해서 실행

## 2. Web3 & 컨트랙 인스턴스화

app.js

```javascript
App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    $.getJSON('../real-estate.json', function(data) {
      var list = $('#list');
      var template = $('#template');

      for (i = 0; i < data.length; i++) {
        template.find('img').attr('src', data[i].picture);
        template.find('.id').text(data[i].id);
        template.find('.type').text(data[i].type);
        template.find('.area').text(data[i].area);
        template.find('.price').text(data[i].price);

        list.append(template.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new web3.providers.HttpProvider(
        'http://localhost:8545'
      );
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('RealEstate.json', function(data) {
      App.contracts.RealEstate = TruffleContract(data);
      App.contracts.RealEstate.setProvider(App.web3Provider);
    });
  },

  buyRealEstate: function() {},

  loadRealEstates: function() {},

  listenToEvents: function() {},
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
```

## 3. 매입자 정보 모달 및 데이터 전달

-> index.html 파일에서 form 및 target 속성 맞춰주기. => UI 완성
제출 버튼을 클릭하면 , app.js에 buyRealEstate 함수로 받을 수 있게 하는 작업 필요.
이름과 나이값은 받기 쉽지만, 매물의 아이디와 가격은 몇가지 스텝을 더 거쳐야 한다.
hidden type을 input 생성 뒤, 매입자 이름과 나이를 모달에서 입력하고 제출버튼을 클릭하면 총 네개의 데이터를 매물구입함수에서 받을 수 있게 함.

## 4 컨트랙 매물구입함수 연결

받은 값들을 컨트랙 매물구입 함수로 연결하려고 함.

name이 한글로 입력될 경우, UTF-8로 인코딩 해줘야 깨지지 않음. 그래서 utf8 라이브러리를 따로 추가해놓았음
따라서 라이브러리 사용해서 인코딩 해줘야 하며, 인코딩 시킨 이름을 hex로 바꿔서 넘겨준다.

```javascript
App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    $.getJSON('../real-estate.json', function(data) {
      var list = $('#list');
      var template = $('#template');

      for (i = 0; i < data.length; i++) {
        template.find('img').attr('src', data[i].picture);
        template.find('.id').text(data[i].id);
        template.find('.type').text(data[i].type);
        template.find('.area').text(data[i].area);
        template.find('.price').text(data[i].price);

        list.append(template.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new web3.providers.HttpProvider(
        'http://localhost:8545'
      );
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('RealEstate.json', function(data) {
      App.contracts.RealEstate = TruffleContract(data);
      App.contracts.RealEstate.setProvider(App.web3Provider);
    });
  },

  buyRealEstate: function() {
    var id = $('#id').val();
    var name = $('#name').val();
    var price = $('#price').val();
    var age = $('#age').val();

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      App.contracts.RealEstate.deployed()
        .then(function(instance) {
          var nameUtf8Encoded = utf8.encode(name);
          return instance.buyRealEstate(id, web3.toHex(nameUtf8Encoded), age, {
            from: account,
            value: price,
          });
        })
        .then(function() {
          $('#name').val('');
          $('#age').val('');
          $('#buyModal').modal('hide');
        })
        .catch(function(err) {
          console.log(err.message);
        });
    });
  },
  loadRealEstates: function() {},

  listenToEvents: function() {},
};

$(function() {
  $(window).load(function() {
    App.init();
  });

  //html 다 로드 되었을때 무엇을 하라고 정의할 수 있는 공간
  $('#buyModal').on('show.bs.modal', function(e) {
    var id = $(e.relatedTarget)
      .parent()
      .find('.id')
      .text();
    var price = web3.toWei(
      parseFloat(
        $(e.relatedTarget)
          .parent()
          .find('.price')
          .text() || 0
      ),
      'ether'
    );

    $(e.currentTarget)
      .find('#id')
      .val(id);
    $(e.currentTarget)
      .find('#price')
      .val(price);
  });
});
```

작성완료 했으면 `truffle migrate --compile-all --reset --network ganache`부터 다시

메타마스크 켜서 계정 2부터 매입을 시작해본다.
매입이 안되면 당황하지말고

> 메타마스크의 정책 변경이 있었습니다. 메타마스크 5.0부터 Dapp이 계정 주소를 볼 수 있는 권한을 요청해야하는 선택적 설정이 있습니다. 해결방안은 메타마스크의 Settings에 들어가서 Security & Privacy의 Privacy Mode를 해제하시면 됩니다.

## 7. 매입 후 UI 업데이트 (이미지 교체, 버튼 비활성화)

->완료 후 매각된 정보까지 load해줘야해.

## 8. 매입 후 UI 업데이트 (매입자 정보 버튼)

## 9. 이벤트를 통한 알림 메세지

6장 최종 app.js

```javascript
App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    $.getJSON('../real-estate.json', function(data) {
      var list = $('#list');
      var template = $('#template');

      for (i = 0; i < data.length; i++) {
        template.find('img').attr('src', data[i].picture);
        template.find('.id').text(data[i].id);
        template.find('.type').text(data[i].type);
        template.find('.area').text(data[i].area);
        template.find('.price').text(data[i].price);

        list.append(template.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new web3.providers.HttpProvider(
        'http://localhost:8545'
      );
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('RealEstate.json', function(data) {
      App.contracts.RealEstate = TruffleContract(data);
      App.contracts.RealEstate.setProvider(App.web3Provider);
      App.listenToEvents();
    });
  },

  buyRealEstate: function() {
    var id = $('#id').val();
    var name = $('#name').val();
    var price = $('#price').val();
    var age = $('#age').val();

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      App.contracts.RealEstate.deployed()
        .then(function(instance) {
          var nameUtf8Encoded = utf8.encode(name);
          return instance.buyRealEstate(id, web3.toHex(nameUtf8Encoded), age, {
            from: account,
            value: price,
          });
        })
        .then(function() {
          $('#name').val('');
          $('#age').val('');
          $('#buyModal').modal('hide');
        })
        .catch(function(err) {
          console.log(err.message);
        });
    });
  },

  loadRealEstates: function() {
    App.contracts.RealEstate.deployed()
      .then(function(instance) {
        return instance.getAllBuyers.call();
      })
      .then(function(buyers) {
        for (i = 0; i < buyers.length; i++) {
          if (buyers[i] !== '0x0000000000000000000000000000000000000000') {
            var imgType = $('.panel-realEstate')
              .eq(i)
              .find('img')
              .attr('src')
              .substr(7);

            switch (imgType) {
              case 'apartment.jpg':
                $('.panel-realEstate')
                  .eq(i)
                  .find('img')
                  .attr('src', 'images/apartment_sold.jpg');
                break;
              case 'townhouse.jpg':
                $('.panel-realEstate')
                  .eq(i)
                  .find('img')
                  .attr('src', 'images/townhouse_sold.jpg');
                break;
              case 'house.jpg':
                $('.panel-realEstate')
                  .eq(i)
                  .find('img')
                  .attr('src', 'images/house_sold.jpg');
                break;
            }

            $('.panel-realEstate')
              .eq(i)
              .find('.btn-buy')
              .text('매각')
              .attr('disabled', true);
            $('.panel-realEstate')
              .eq(i)
              .find('.btn-buyerInfo')
              .removeAttr('style');
          }
        }
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  listenToEvents: function() {
    App.contracts.RealEstate.deployed().then(function(instance) {
      instance
        .LogBuyRealEstate({}, { fromBlock: 0, toBlock: 'latest' })
        .watch(function(error, event) {
          if (!error) {
            $('#events').append(
              '<p>' +
                event.args._buyer +
                ' 계정에서 ' +
                event.args._id +
                ' 번 매물을 매입했습니다.' +
                '</p>'
            );
          } else {
            console.error(error);
          }
          App.loadRealEstates();
        });
    });
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });

  $('#buyModal').on('show.bs.modal', function(e) {
    var id = $(e.relatedTarget)
      .parent()
      .find('.id')
      .text();
    var price = web3.toWei(
      parseFloat(
        $(e.relatedTarget)
          .parent()
          .find('.price')
          .text() || 0
      ),
      'ether'
    );

    $(e.currentTarget)
      .find('#id')
      .val(id);
    $(e.currentTarget)
      .find('#price')
      .val(price);
  });

  $('#buyerInfoModal').on('show.bs.modal', function(e) {
    var id = $(e.relatedTarget)
      .parent()
      .find('.id')
      .text();

    App.contracts.RealEstate.deployed()
      .then(function(instance) {
        return instance.getBuyerInfo.call(id);
      })
      .then(function(buyerInfo) {
        $(e.currentTarget)
          .find('#buyerAddress')
          .text(buyerInfo[0]);
        $(e.currentTarget)
          .find('#buyerName')
          .text(web3.toUtf8(buyerInfo[1]));
        $(e.currentTarget)
          .find('#buyerAge')
          .text(buyerInfo[2]);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  });
});
```

index.html

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>이더리움 부동산</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-push-2">
          <h1 class="text-center">이더리움 부동산</h1>
          <hr />
          <br />
        </div>
      </div>

      <div id="events"></div>

      <div class="row" id="list">
        <!-- 매물 리스트 -->
      </div>
    </div>

    <div id="template" style="display: none;">
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="panel panel-success panel-realEstate">
          <div class="panel-heading">
            <h3 class="panel-title">매물</h3>
          </div>
          <div class="panel-body">
            <img style="width: 100%;" src="" />
            <br /><br />
            <strong>아이디</strong>: <span class="id"></span><br />
            <strong>종류</strong>: <span class="type"></span><br />
            <strong>면적(m²)</strong>: <span class="area"></span><br />
            <strong>가격(ETH)</strong>: <span class="price"></span><br /><br />
            <button
              class="btn btn-info btn-buy"
              type="button"
              data-toggle="modal"
              data-target="#buyModal"
            >
              매입
            </button>
            <button
              class="btn btn-info btn-buyerInfo"
              type="button"
              data-toggle="modal"
              data-target="#buyerInfoModal"
              style="display: none;"
            >
              매입자 정보
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="buyModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">매입자 정보</h4>
          </div>
          <div class="modal-body">
            <input type="hidden" id="id" />
            <input type="hidden" id="price" />
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="이름"
            /><br />
            <input
              type="number"
              class="form-control"
              id="age"
              placeholder="나이"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">
              닫기
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onclick="App.buyRealEstate(); return false;"
            >
              제출
            </button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" tabindex="-1" role="dialog" id="buyerInfoModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">매입자 정보</h4>
          </div>
          <div class="modal-body">
            <strong>계정주소</strong>: <span id="buyerAddress"></span><br />
            <strong>이름</strong>: <span id="buyerName"></span><br />
            <strong>나이</strong>: <span id="buyerAge"></span><br />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">
              닫기
            </button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/web3.min.js"></script>
    <script src="js/truffle-contract.js"></script>
    <script src="js/app.js"></script>
    <script src="js/utf8.js"></script>
  </body>
</html>

```

#### 참조

inflearn 강좌
<https://www.inflearn.com/course/blockchain-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-dapp#>

```

```
