---

title:  컴퓨터구조론 (virtual_memory)
tag: class 

---

## 5.4 가상메모리


![2018-06-12 3 36 32](https://user-images.githubusercontent.com/23495876/41274085-118f242c-6e57-11e8-9ab5-a667b7f8f5e0.png)
![2018-06-12 4 13 28](https://user-images.githubusercontent.com/23495876/41343579-fe14c436-6f39-11e8-8dc4-e72cea38c854.png)
![2018-06-12 8 50 18](https://user-images.githubusercontent.com/23495876/41343580-fe5d6a6a-6f39-11e8-997d-d54197cc023e.png)
![2018-06-12 8 55 21](https://user-images.githubusercontent.com/23495876/41343596-07b1b076-6f3a-11e8-9892-f90986d3ebce.png)
![2018-06-12 9 09 27](https://user-images.githubusercontent.com/23495876/41343598-07f89162-6f3a-11e8-84be-d1a1dc59f114.png)
![2018-06-12 9 37 20](https://user-images.githubusercontent.com/23495876/41343600-082da4ec-6f3a-11e8-8a62-2c53ab035693.png)
![2018-06-12 9 13 36](https://user-images.githubusercontent.com/23495876/41343601-0864ac26-6f3a-11e8-8e66-f3676b61e4dc.png)
![2018-06-12 9 14 57](https://user-images.githubusercontent.com/23495876/41343604-08952aa4-6f3a-11e8-9f58-4b6c897a58f6.png)
![2018-06-12 9 29 02](https://user-images.githubusercontent.com/23495876/41343605-08c78602-6f3a-11e8-94bb-697e9a3d3f87.png)
![2018-06-12 9 40 42](https://user-images.githubusercontent.com/23495876/41343606-08f9ae84-6f3a-11e8-8c0c-bbf2bd856be5.png)
![2018-06-12 9 43 34](https://user-images.githubusercontent.com/23495876/41343621-1044e9d8-6f3a-11e8-9d30-c4684e89bddc.png)
![2018-06-12 9 51 53](https://user-images.githubusercontent.com/23495876/41343623-10729644-6f3a-11e8-90b8-00d06f23c802.png)
![2018-06-12 9 57 29](https://user-images.githubusercontent.com/23495876/41343625-10a6b690-6f3a-11e8-8258-57ce6b135da8.png)
![2018-06-12 9 58 17](https://user-images.githubusercontent.com/23495876/41343626-10d9722e-6f3a-11e8-8a9d-1b669c7d248c.png)
![2018-06-12 9 59 44](https://user-images.githubusercontent.com/23495876/41343627-1107d542-6f3a-11e8-8fa8-1d2ed8ca5789.png)
![2018-06-12 10 00 06](https://user-images.githubusercontent.com/23495876/41343628-11396f58-6f3a-11e8-9999-50abb89e92ba.png)
![2018-06-12 10 05 57](https://user-images.githubusercontent.com/23495876/41343629-11806778-6f3a-11e8-89b3-b381e631c4f9.png)



##  25차시 강의 정리


![2018-06-14 1 51 53](https://user-images.githubusercontent.com/23495876/41392301-d92fef5a-6fda-11e8-8e74-b95e291d007d.png)
![2018-06-14 1 53 43](https://user-images.githubusercontent.com/23495876/41392303-d9d809e2-6fda-11e8-9771-e9c08bb7130e.png)


가상메모리의 주소 변환에 대해 배웠다.
중심이 되는 건 페이지 테이블 이란 표.
가상 주소 공간이 실제 주소 공간보다 크기 때문에
프로세서가 원하는 모든 내용이 다 메인메모리에 있을 수 없다. 그 때 페이지 테이블의 밸리드 비트는 영이 되는데, 이걸 페이지 폴트라고 한다.

페이지 폴트는 exception 매카니즘으로  처리가 된다.
처리과정을 간략히 보이면 위 그림과 같다.

로드 엑세스 했어 이게 가상주소다. 프로그램에서 쓰이는 주소
프로세서가 사용하는 주소. 전부 가상주소다. 버츄얼 메모리 시스템을 사용하는 경우.

그래서 가상주소를 내면, 이걸 가지고 페이지 테이블을 찾아간다.
페이지 테이블에 가서 밸리드 비트를 갔더니 0이면 페이지 폴트다.

버츄얼 페이지의 밸리드 비트를 봤더니 0이다. 그러면 페이지 폴트다. 

OS가 제어권을 넘겨 받아서 처리를 해야한다. exception이 발생하니까. page fault exception.

디스크에서 페이지를 읽어오려 하겠지. 리드명령을 보내서. 그 동안에 한참을 기다려야 하니까 프로세서는 다른 프로그램을 실행하게 된다. 한참 지나서 읽어온다. 그러면 그 때 다시 exception이 발생한다. 그럼 그 페이지를 메인 메모리 블락 빈대에 집어넣는다. 빈곳이 없으면 리플레이스 알고리즘에 의해서 무언가를 대체 쫓아냄.

밸리드 비트가 다시 1로 바뀌면서 physical 넘버가 들어간다. 그리고 나서 중단했던 명령어를 실행한다.

간단히 보면 이런대 자세히 보면 이렇다.

디스크 어드레스 페이지 테이블.

메인 메모리에 없는 블락들. 밸리드 비트가 0 디스크에 어디에 있다. 하는 디스크어드레스가 들어간다.
디스크 어드레스하고 피지컬 페이지 넘버하고는 길이가 다르니까 별도의 표를 사용하기도 한다.

페이지 테이블 크기가 얼마나 되느냐?
-> virtual address space, page size가 얼마냐에 따라서 결정이 된다.

전체가 4기가 바이트인데, 페이지 하나가 4KB이다.
이러면 2의 20승개의 페이지가 존재한다.

entry하나가 몇 비트냐? 네 바이트라고 했다. 
네 바이트니까. 2의 20승개에다가 네 바이트. 이렇게 된다. 4mb이다. 이 예에서는

![2018-06-14 1 55 03](https://user-images.githubusercontent.com/23495876/41392304-da69fa3c-6fda-11e8-9d8d-39195dff0ce0.png)

실행중인 프로세스가 20개다. 그러면
프로세스 마다 있다고 했으니까, 
만만치 않은 크기다. 80mb 

write 할 때는 어떻게 하느냐 ?
write back 할 수 밖에 없다.
disk write하는데 시간이 많이 걸리기 때문에
그래서 dirty bit를 사용한다.
페이지 테이블에 더티비트가 있다.
1이면 디스크에다가 write
0이면 diskwrite필요없이 페이지에 override

문제는 주소 변환 하기 위해서 페이지 테이블을 읽어야 하는데.

![2018-06-14 1 59 24](https://user-images.githubusercontent.com/23495876/41392378-35361946-6fdb-11e8-9fb6-f545a438fab4.png)

주소 변환 하기 위해서 페이지 테이블을 읽어야 한다.

virtual address 가지고 physical address로 바꿔야 한다. 이게 메인 메모리에 있다.

메인 메모리 읽는데 200클락 걸린다고 하면
이거 주소 변환하는데 이백클락 걸리고
다시 피지컬 어드레스 만들어가지고 이 번지를 읽어야한다
또 200클락 걸리고.

즉 메모리 엑세스 한번 하는데 실제로 2번 메모리 엑세스가 된다.
시간이 많이 걸린다.

이 문제를 해결하기 위해서
## Translation Lookaside Buffer -> 줄여서 TLB 사용
![2018-06-14 2 02 06](https://user-images.githubusercontent.com/23495876/41392470-9b24f402-6fdb-11e8-903c-15a53f0da47d.png)

TLB

가상메모리에서 메모리를 엑세스하려면
페이지 테이블을 읽어야하고 실제 데이터를 읽어야하고
두번의 메모리 엑세스가 일어난다.

시간이 오래걸린다.

페이지 테이블에서 2의 20승개의 페이지 테이블 엔트리엥서.
이거 사용하는데도 locality가 있겠지. 그 전에 사용하던거 그 근처에 사용되고. 즉 몇개만 가지고 있으면 대부분의 translation을 가지고 있으면, 
그래서 TLB는  page table의 캐쉬
그렇게 많이 안가지고 있어도 된다. 이 entry하나가 페이지 하나에 해당. 4KB에 해당. 열개만 있어도 40KB를 커버.

실제로 16개~512개.

TLB라는 건, 최근에 사용한 어드레스 매핑을 저장하고 있는거다. 쉽게 말하면 페이지 테이블의 캐쉬다.
블락 개념 없이 하나만 가기도 하고, 두개 묶어서 가기도 한다.

hit time - 0.5~1 clock
miss penalty 10 -100clock
mirss rate 굉장히 낮다.

TLB가 있는 경우

![2018-06-15 11 48 29](https://user-images.githubusercontent.com/23495876/41447805-306a8426-7092-11e8-8851-fdd37a256eb1.png)

page table은 메인메모리에 있지

프로세서에서 주소가 나오면
오프셋을 제외하고 virtual 페이지 넘버가지고 TLB를 찾아간다.
TLB에 있으면 바로 physical page number가 나오니까 그거하고 offset하고 이어서 주소만들면 되고
여기에 없다 그렇게 되면 메인 메모리가서 찾아와야한다.

여기는 valid bit 외에 dirty bit(write back 할 때 해야하느냐 안해야 하느냐), reference bit(LRU를 구현하기 위해 사용 그대로 구현하면 힘드니까 사용할 떄마다 1로 만든다. 나중에 누구 쫓아낼 때 0인 것 중에서 선택 한참 지나면 다 1이니까 주기적으로 클리어. LRU 비슷하게 쉽게 구현) TLB가 cache니까. direct mapping, fully, set 세개 할 수 있다. 크기가 작으니까. 보통 fully associated mapping을 한다. 
virtual number하고 physical page number를 같이 저장해야겠지. Tag이 virtual page number 
direct일 떄는, 주소의 일부를 잘라서 찾아가야지.

![2018-06-15 11 54 08](https://user-images.githubusercontent.com/23495876/41447939-df5a8c2e-7092-11e8-85f0-b380ad5ffdd9.png)

entry가 16개. 하나당 64비트.
fullt associative mapping

페이지 사이즈는 4K 바이트. 그래서 virtual address 밑에 12비트 이건 page offset
나머지 20비트 이게 virtual page number
이걸 가지고 TLB를 찾아간다. 

TLB에는 valid, dirty,reference,
tag -> virtual page number 
이 주소를 저기에 보낸다. TLB에.
안에 하드웨어가 찾는다. 해당되는게 있으면 physical page number를 보내준다.
physical page number 20비트 읽으면 
physical address를 바꾼다.
그런데 쭉 뒤졌는데 TLB에 없다. 그러면
TLB miss
메인 메모리에 있는 page table을 읽는다.

### 캐시도 같이 생각해보자 이제.

캐시가 있어.

그러면 캐시를 읽을 때는 태그, 인덱스, 블락 오프셋, 바이트 오프셋, 캐시에 엑세스 하기 위해서는 필드가 달라진다.
캐시 크기는 앞에서 했지만 한 블락당 16워드고 블락이 256개가 있고, 이런 캐시다.
그런 캐시다.

밑의 두 비트가 바이트 오프셋이고, 그다음 네 비트가 블락 오프셋이다. 합쳐서 6비트가 오프셋

그리고 캐시 블락이 256개니까. 그 다음 8비트가 인덱스다. 그러면 32에서 (8+6)14빼니까 나머지가 18. 이게 캐시의 태그다.

일단 주소변환해서 피지컬 어드레스를 구한 다음에, 캐시 엑세스 하기 위해서 쪼개서 사용한다.

이거가지고 캐시를 찾아가서 tag를 읽어낸다. 18비트.
이 태그하고 이 주소의 tag 부분하고 일치하면 hit
일치하지 않으면 miss hit이 되었다 -> 데이터를 읽어내는데. 블락 사이즈가 16이면 네 워드를 읽어서 나중에 블락 offset 가지고서 멀티플레서 제어로 하나 뽑아낸다. 근데 지금 그림에는 멀티플렉서가 없다. 멀티 플렉서 없이 인덱스하고 블락 오프셋하고 같이 사용해서 읽어내면 해당되는 것만 읽을 수 있다. 태그 부분과 데이터 부분 분리.

인덱스하고 블락 오프셋을 같이 읽으면 해당되는 한 워드만 읽을 수 있다. 

tag , data 분리. 캐시 인덱스하고 block offset하고 합쳐서 12비트로 읽으면 해당 되는 것만 읽어낼 수 있다. 
그걸 보여주고 있다. 캐시가 들어가면 주소 변환한 다음에 physical address를 다시 캐시에 맞게 필드별로 쪼개야 하는. 

똑같은 주소인데 어떻게 짤라서 쓰냐? 캐시 크기에 따라 달라짐.

만약에 다이렉트 매핑TLB라고 하면
TLB 사이즈가 16개. valid,dirty,reference,이런 것들 + tag, index, fully associated mapping하면 통째로, 다이렉트 맵핑 -> 16개니까 어드레스가 네비트. 가상 페이지 넘버중 네개가 인덱스, 나머지 16비트가 태그

offset 빼고 나머지 중에서 캐시 크기에 따라서 캐시가 2이n승이면 n비트가 인덱스다. 2의 사승이니까 네비트가 인덱스. 

태그는 20비트가 아니고 16비트. 다이렉트 맵핑하는 TLB의 경우

physical page number는 똑같이 20비트. 

set associative 하면 반쪽이 갈거고, 인덱스가 세비트.
다이렉트 맵핑 TLB나 set associative TLB나 캐시에서 똑같이 생각해서 하면 된다 .

![2018-06-15 12 13 29](https://user-images.githubusercontent.com/23495876/41448437-8cc3a600-7095-11e8-9df3-fe5c855a250c.png)

그러면 미스가 세가지가 된다 .

TLB미스, 캐시 미스, virtual memory miss

일단 virtual address가 나오면
TLB를 찾아가는 거지.

**첫 번째 경우**
TLB에서 hit이 되면 그 주소를 가지고 
캐시를 찾아간다.
캐시에서 hit이다. 그러면 제일 베스트 케이스. 캐시도 히트 TLB도 히트 virtual memory도 hit

##### 캐시가 hit인데 virtualmemory  fault다. 이런 경우는 있을 수가 없어.

캐시에 있는데 메인메모리에 없다. 이런 경우는 없다.

TLB에서 주소변환은 성공했는데 캐시에 갔더니 없다.
TLB hit이고 캐시 미스. TLB에 있다는 얘기는 메인메모리에 있다는 이야기. 메인메모리 가서 읽어와야하는 거지.
시간이 좀 걸리겠다.
page table access는 안하지만 데이터를 읽기 위해서 메인메모리에 가야한다. TLB hit인데 cache miss기 때문에

**두 번째 경우**
메인 메모리에 있는 page table읽어야 한다. 그 페이지 테이블에 갔더니 valid bit이 0이다. 그러면 page fault

page fault는 아니다. 그거 가지고 캐시 갔더니 힛이다. 케이스 투. TLB는 미스지만 캐시 hit. main mermoy 한번만 찾아감. 

미스가 두번 발생 -> TLB miss인데 캐시에서도 미스다. 메인메모리 두번 찾아가야함. 페이지 폴트는 아니다. 

![2018-06-15 12 33 03](https://user-images.githubusercontent.com/23495876/41448860-53ace8c4-7098-11e8-8219-4c359331ee19.png)

지금 가정한 것은
캐시에서 physical address를 사용한다고 가정.
physical address로 바꾼 다음에 그 주소를 이용해서 캐시 access를 한다. 
프로세서에서 virtauladdress가 나오면 TLB에서 physical address로 바꾼 다음에 cache를 찾아간다.

cache에서는 주소 변환이 끝난 physical address를 사용한다.
cache hit이 되어도 주소 변환하는 시간을 거쳐야한다.
hit time이 커진다. hit time을 빠르게 하기 위해서,
주소 변환하지말고 그냥 캐시에서 virtual address 사용하자. virtual address나오면 캐시에서 그대로 virtual address 사용하자. 그러면 hit time이 빨라지겠지.
캐시 미스가 발생하면 메인 메모리 가야하는데
메인 메모리에서 physical address 사용하니까. 그 떄는 주소변환 사용. 그래서 병렬적으로 사용하자는 것.

hit이 되면 끝나고. miss가 발생하면 TLB에서 physical address로 바꿔서 하자.

TLB의 미스레이트는 굉장히 낮으니까.

virtual cash -> virtual address를 사용하는 캐시다.

이게 무슨 문제가 있냐 하면 -> alaising problem이 있다. 

캐시에서 virtual address를 사용하는데
이게 파워포인트의 200번지, 아래 한글의 오백번지.
이놈이 실제로 같은 내용이다. physical memory에서 공유가 된다면. 서로 다른 프로세서가 같은 데이터를 공유하거나 할 수 있다. 

캐시에 들어갈 때, 얘는 200번지로 들어가고, 재는 500번지로 들어가고 두개가 동시에 들어갈 수 있다. 그런데 사실은 같은거다. 

그래서 보통 위에껄 쓴다.

양쪽의 좋은 점을 다 쓰고 싶다면,
그게 세번째다.

virtually indexed and physically tagged cache

실제로 캐시에서는 피지컬 어드레스를 사용하는거다.

virtual address고 physical address

캐시를 엑세스 하기 위해서 태그하고 인덱스 사용.
근데 그게 동시에 사용되는게 아니다. 가만히보면
태그와 인덱스가 동시에 사용되는게 아니고
인덱스를 사용해서 일단 읽는다.
인덱스가 먼저사용
인덱스가 읽어져 나오면 태그는 한단계 뒤에 사용한다.

인덱스를 먼저 사용해서 읽어내고
캐시 읽는게 끄나면 그떄 태그 비교하여 사용한다.

급한건 인덱스 

인덱스는 주소변환 하지말고 virtual address를 쓰자.
읽어내요. 읽어내는 동안에 주소 변환을 한다.

tag를 비교할 때, 주소변환 된거랑 비교한다. 이게 어떻게 가능 ? 주소변환하기 전과 한 후의 offset은 변하지 않는다. 이 offset 부분만 cache index로 사용한다면 문제가 없다. 주소 변환 안해도 index는 바로 나온다. index가 이 offset보다 더 크다. 이 부분은 virtual address랑  physical address랑 달라지니까 주소변환해야함.
인덱스가 조그만해서 offset부분에만 있다면, 주소 변환하기 전이나 후나 똑같다. 
그래가지고 index는 주소 변환 안해서 쓰고
tag 는 주소 변환해서 쓴다.

캐시사이즈가 페이지 사이즈보다 커질 수 없다는 문제가 있다.

![2018-06-15 1 10 48](https://user-images.githubusercontent.com/23495876/41449696-986988dc-709d-11e8-9df2-2091d031d45d.png)
48분부터 다시 

p1이 실행되다가 p2로 바꼈다. p1의 테이블을 p2가 엑세스하면 안되지. context switch가 일어나면 사용하는 테이블도 바뀌니까.

processID -> 현재 실행 중인 프로세스의 번호를TLB에 virtual page number와 같이 사용한다.
태그가 virtual page number + PID.
자연스럽게 안하면 쫓겨남. 안쫓겨나면 살아남는다. 
프로세스 원으로 돌아오면 다시 쓰는거니까.
이걸 address space ID

![2018-06-15 6 44 34](https://user-images.githubusercontent.com/23495876/41461944-2f6fea68-70cc-11e8-917e-144b7fee19ad.png)
![2018-06-15 6 42 57](https://user-images.githubusercontent.com/23495876/41461945-2f9f2cec-70cc-11e8-8171-17a454607c74.png)

요약하면 virtual memory는 page fault가 생기면 miss penalty가 엄청나게 크다.
page fault rate를 최대한 낮춰야 한다.
page size가 크다

fully associative mapping

LRU

disk write하는데도 시간이 많이 걸리니깐
write-back and dirty bit

memory protection
resting page table access

TLB
reduicing address translation



### 미연이가 알려준 정보

physical memory(이하 메모리)를 구역 분할한 걸 프로세스끼리 노나 먹으면, 그 안에서 페이지를 생성, 실제 피지컬과 mapping해준 정보(PTE)는 메모리에 담기지만, 이를 접근을 용이하게 캐시로 담은게 TLB. 이 과정에서 Memory가 꽉 찼을 떄, 해당하는 virtual 공간을 전부 disk에 넣어서 mermoy 공간을 비워주는게 swap in인가 out인가 여튼 swap, 이때는 PTE가 disk에 존재할 수 있음







---
 
참고자료 


컴퓨터 구조 및 설계 지음 DAVID A.PATTERSON, JOHN L>HENNESSY 

[숭실대학교 컴퓨터구조론 강의](http://www.kocw.net/home/search/kemView.do?kemId=998138)
