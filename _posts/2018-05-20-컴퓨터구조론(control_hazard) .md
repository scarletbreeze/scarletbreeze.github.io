---

title:  컴퓨터구조론 (control hazard)
tag: class 

---

MIPS 명령어 정리



![시험문제 풀이](https://user-images.githubusercontent.com/23495876/40278086-83b96a70-5c65-11e8-88dc-8a143236f1b3.png)

add와 and 사이 2.a hazard
sub과 or 사이 2.a hazard
and와 or 사이 1.b hazard
or와 sw 사이 1.a hazard
 
forwarding unit이 없다면 이런식으로 진행

![image](https://user-images.githubusercontent.com/23495876/40344395-8ed4496e-5dcf-11e8-9ad1-d1e273243c60.png)

forwarding unit이 있다면 다 forwarding 하면 된다.
lw-use dataHazard도 없기 때문에

이 경우 forward a와 forward b의 값이 어떻게 되는지 물어볼 수 있다.

lw의 경우
![image](https://user-images.githubusercontent.com/23495876/40344601-7aae11f8-5dd0-11e8-9b62-455013c4ccb7.png)

![image](https://user-images.githubusercontent.com/23495876/40344652-b8bb23d2-5dd0-11e8-9079-81a86c7d11c3.png)

![image](https://user-images.githubusercontent.com/23495876/40347865-c25e381e-5ddc-11e8-830d-ff597feddf93.png)


![image](https://user-images.githubusercontent.com/23495876/40349451-9dbd1db8-5de1-11e8-8b60-6efc5fb5b5d9.png)


![image](https://user-images.githubusercontent.com/23495876/40350413-b059e62e-5de4-11e8-9239-e286f73a9c2b.png)


![image](https://user-images.githubusercontent.com/23495876/40351348-28ff350a-5de7-11e8-8261-289c88d7efb0.png)

![image](https://user-images.githubusercontent.com/23495876/40353396-62512c3c-5dec-11e8-8d46-67acc30a90da.png)

![image](https://user-images.githubusercontent.com/23495876/40354240-585048ce-5dee-11e8-9d17-a99a8ea0ac6b.png)

![image](https://user-images.githubusercontent.com/23495876/40360184-2efe17c8-5e00-11e8-81a1-1841bcd7f863.png)


---
 
참고자료 


컴퓨터 구조 및 설계 지음 DAVID A.PATTERSON, JOHN L>HENNESSY 

[숭실대학교 컴퓨터구조론 강의](http://www.kocw.net/home/search/kemView.do?kemId=998138)
