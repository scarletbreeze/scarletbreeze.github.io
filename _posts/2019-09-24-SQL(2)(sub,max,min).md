---
layout: post
title: SQL_(sub,max,min, Group BY)
categories: [SQL]
excerpt: ' '
comments: false
share: false
tags: SQL
date: 2019-09-24
---

## SUM,MAX,MIN

1. 최댓값 구하기

```mysql
SELECT DATETIME
FROM ANIMAL_INS
ORDER BY DATETIME DESC
LIMIT 1
```

-> 문제에서 의도한 건 이거인 것 같다

```sql
SELECT MAX(DATETIME)
FROM ANIMAL_INS
```

2. 최솟값 구하기

```sql
SELECT MIN(DATETIME)
FROM ANIMAL_INS
```

3. 동물 수 구하기

```sql
SELECT Count(ANIMAL_ID)
FROM ANIMAL_INS
```

4. 중복제거하기

```sql
SELECT  COUNT(DISTINCT NAME)
FROM ANIMAL_INS
```

->`COUNT(DISTINCT name)`
중복 제거해서 개수세는 거 주의하자

## GROUP BY

1. ★고양이와 개는 몇 마리 있을까★

```sql
SELECT ANIMAL_TYPE, count(ANIMAL_TYPE)
FROM ANIMAL_INS
GROUP BY ANIMAL_TYPE
```

-> GROUP BY는 이럴 때 쓰는거다.

2. 동명 동물 수 찾기

```sql
SELECT NAME, count(NAME)
FROM ANIMAL_INS
GROUP BY NAME Having count(NAME) >=2
```

3. 입양 시각 구하기(1)

-> as문은 테이블 또는 테이블의 열에 대해서 이름을 변경할 수 있다.

```sql
select HOUR(DATETIME) , Count(DATETIME)
FROM ANIMAL_OUTS
WHERE HOUR(DATETIME) >= 9 and HOUR(DATETIME)<= 19
GROUP BY HOUR(DATETIME)
```

4. 입양 시각 구하기(2)

```sql
set @hour = -1;
--  hour라는 변수 설정
select
    (@hour := @hour +1) as HOUR,
    (select count(*) from animal_outs where hour(`datetime`) = @hour) as `COUNT`
-- hour와 같은 값에 해당하는 갯수 세서 COUNT에 넣는다
from animal_outs
where @hour < 23
```

- 이렇게 푼다는데 어렵다..

---

참고자료
프로그래머스 코딩테스트 연습 (sql)
