---
layout: post
title: SQL_select
categories: [SQL]
excerpt: ' '
comments: false
share: false
tags: SQL
date: 2019-09-24
---

## select

1. select 모든레코드 조회하기

```mysql
SELECT *
FROM
    ANIMAL_INS A
ORDER BY
    ANIMAL_ID
```

2. 역순 정렬하기

```mysql
SELECT NAME,DATETIME
FROM ANIMAL_INS
ORDER BY ANIMAL_ID Desc
```

3. 아픈 동물찾기

```mysql
SELECT ANIMAL_ID, NAME
FROM ANIMAL_INS
WHERE INTAKE_CONDITION = "Sick"
```

4. 어린 동물 찾기

```mysql
SELECT ANIMAL_ID, NAME
FROM ANIMAL_INS
WHERE INTAKE_CONDITION != "Aged"
ORDER BY ANIMAL_ID
```

5. 동물의 아이디와 이름

```mysql
SELECT ANIMAL_ID, NAME
FROM ANIMAL_INS
ORDER BY ANIMAL_ID
```

6. 여러 기준으로 정렬하기

```mysql
SELECT ANIMAL_ID, NAME, DATETIME
FROM ANIMAL_INS
ORDER BY NAME, DATETIME DESC
```

7. 상위 n개의 레코드

```mysql
SELECT NAME
FROM ANIMAL_INS
ORDER BY DATETIME LIMIT 1;
```

---

참고자료
프로그래머스 코딩테스트 연습 (sql)
