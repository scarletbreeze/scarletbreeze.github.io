---
layout: post
title: programmers(72)level_3(단어변환)
categories: [algorithm]
excerpt: ' '
comments: false
share: false
tags: algorithm programmers level3
date: 2019-08-02
---

## 문제: 72. 단어변환

- 한 번에 한 개의 알파벳만 바꿀 수 있다.
- words에 있는 단어로만 변환될 수 있다.

- begin에서 target으로 변환하는 가장 짧은 변화 과정 찾기
- begin이 "hit", target이 "cog", words가 "hot","dot","dog","lot","log","cog" 라면
- "hit" -> "hot" -> "dot" -> "dog" -> "cog"와 같이 4단계를 거쳐서 변환이 가능하다

- 두 개의 단어 begin, target과 단어의 집합 words가 주어질 때, 최소 몇 단계 과정을 거쳐서 begin이 target으로 변화할 수 있는지를 return

- 제한사항
- 각 단어는 알파벳 소문자로만 이루어져 있다.
- 각 단어의 길이는 3이상 10이하이며, 모든 단어의 길이는 같다.
- words에는 3개 이상, 50개 이하의 단어가 있으며 중복 x
- begin과 target은 같지 않다
- 변환할 수 없는 경우에는 0을 return 한다.

## 문제풀이

---

참고자료
[프로그래머스]<https://programmers.co.kr/learn/challenges>
[참고블로그]<https://codedrive.tistory.com/159?category=809488>
