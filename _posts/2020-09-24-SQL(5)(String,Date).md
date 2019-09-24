---
layout: post
title: SQL_(String,Date)
categories: [SQL]
excerpt: ' '
comments: false
share: false
tags: SQL
date: 2019-09-24
---

## String,Date

1. 루시와 엘라 찾기

```sql
SELECT ANIMAL_ID, NAME, SEX_UPON_INTAKE
FROM ANIMAL_INS
WHERE NAME = "Lucy" or NAME = "Ella" or NAME = "Pickle" or NAME = "Rogan" or NAME = "Sabrina" or NAME = "Mitty"
Order By ANIMAL_ID
```

- 이렇게도 풀 수 있지만, IN을 활용하면 더 편하다

```sql
SELECT ANIMAL_ID, NAME, SEX_UPON_INTAKE
FROM ANIMAL_INS
WHERE NAME In ("Lucy", "Ella", "Pickle", "Rogan", "Sabrina", "Mitty")
Order By ANIMAL_ID
```

2. 이름이 el이 들어가는 동물 찾기

```sql
SELECT ANIMAL_ID, NAME
FROM ANIMAL_INS
WHERE ANIMAL_TYPE = "Dog" and NAME LIKE '%el%'
ORDER BY NAME
```

3. 중성화 여부 파악하기

- CASE ~ WHEN ~ THEN ~ELSE END를 써야하는 문제

```sql
SELECT ANIMAL_ID, NAME,
CASE
    WHEN SEX_UPON_INTAKE LIKE "%Neutered%" OR SEX_UPON_INTAKE LIKE "%Spayed%" THEN "O" ELSE 'X' END as 중성화
FROM ANIMAL_INS
```

4. 오랜 기간 보호한 동물(2)

- `DATEDIFF(DATE1,DATE2)`를 사용해서 풀 수 있다
- `DATEDIFF`는 Day의 차이를 반환하고
- `TIMESTAMPDIFF(단위,DATE1,DATE2)`는 단위별로 차이를 구할 수 있다
- 단위 : SECOND, MINUTE,HOUR,DAY,WEEK,MONTH,QUARTER,YEAR

```sql
SELECT A.ANIMAL_ID, A.NAME
FROM ANIMAL_INS as A, ANIMAL_OUTS as B
WHERE A.ANIMAL_ID = B.ANIMAL_ID
ORDER BY DATEDIFF(A.DATETIME,B.DATETIME)
LIMIT 2
```

5. DATETIME에서 DATE로 형변환

- `DATE_FORMAT(DATE,형식)`을 통해 DATE의 형식을 바꿀 수 있다.

```sql
SELECT ANIMAL_ID, NAME ,DATE_FORMAT(DATETIME,'%Y-%m-%d')
FROM ANIMAL_INS
```

- 형식에는 `%Y`(4자리 연도), `%y`(2자리 연도), `%m`(월), `%d`(일), `%H`(24시간), `%h`(12시간), `%i`, `%s`가 있다.

---

참고자료
프로그래머스 코딩테스트 연습 (sql)
