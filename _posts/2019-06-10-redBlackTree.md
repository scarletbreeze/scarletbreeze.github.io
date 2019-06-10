---
layout: post
title: (자료구조)redBlackTree
categories: [data]
excerpt: ' '
comments: false
share: false
tags: data
date: 2019-06-07
---

## redBlackTree

- 레드블랙트리를 알려면 BST를 알아야 한다.
- BST는 자신의 왼쪽 서브트리에는 현재 노드보다 key 값이 작은 것, 오른쪽 서브트리에는 key값이 큰 것이 들어오게 된다.
- 이진탐색트리는 중위순회할 경우 오름차순으로 정렬된 Key값을 얻을 수 있다
- 최악의 경우 O(h:트리의 높이)만큼의 탐색시간이 걸린다. -> srewed tree
- 레드블랙트리도 이진탐색 트리다. + balance 즉, balanced binary search tree이다.
- srewed 하게 나올 수 없는 조건을 걸어놨다. -> 따라서 O(log n)의 시간복잡도를 가진다.

### RedBlackTree의 조건

1. Root Property: 루트노드의 색은 검정이다.
2. External Property : 모든 external node들은 검정색이다.
3. Internal Property : 빨강(Red)노드의 자식은 검정(Black)이다.
   == No Double Red(빨간색 노드가 연속으로 나올 수 없다.)
4. Depth Property : 모든 리프노드에서 Black Detph는 같다.
   == 리프노드에서 루트노드까지 가는 경로에서 만나는 블랙노드의 개수는 같다.

이렇게 4개의 조건을 가지고 있다.

### 예제를 통해 확인

- 루트노드의 색은 검정을 준다.
- 삽입되는 노드의 색은 무조건 Red이다.
  - Q) No Double Red라면서 ?
  - ![No Image](/assets/posts/20190610/3.png)
- Double Red 해결방안
  - Restructuring
  - Recoloring
- Double Red를 해결하는 방법은 현재 insert된 노드의 uncle node의 색깔에 따라 수행하는 프로시저가 다르다. 부모의 형제.
- ![No Image](/assets/posts/20190610/3.png)
- w가 검정일 땐 Restructuring
- w가 빨강일 땐 Recoloring을 수행하게 된다

## Restructuring

- Restructuring을 하는 과정
- 현재 insert된 노드(z)와 부모 (v)와 부모의 부모를 가지고 Restructuring을 한다.

1. z와 z의 부모 v, v의 부모를 오름차순으로 정렬
2. 가운데에 있는 값을 부모로 만들고 나머지 둘을 자식으로 만든다.
3. 올라간 가운데 있는 값을 검정으로 만들고 나머지 자식들을 빨강으로 만든다.
4. 그리고 나서 원래 자식이었던 애들이 있으면 추가한다.

- Restructuring은 다른 서브트리에 영향을 끼치지 않기 때문에 한번의 Restructuring이면 끝난다.
- 여기서 말하는 영향이란 Black Depth다.
- 모든 리프노드에서 Black Depth는 같아야 했다.
- Restructuring 자체의 시간 복잡도는 (1)이지만 어떤 노드를 insertion 한 뒤 일어나므로 총 수행시간은 O (log n)이다.

## Recoloring

1. insert된 노드 z의 부모와 그 형제 w를 검정으로 하고 GrandParent를 빨강으로 한다
2. GrandParent가 Root node가 아니었을 시 Double Red가 다시 발생할 수 있다.

- w가 red일 때, recoloring을 한다고 했다.
- 부모와 형제를 검정으로하고, 조상을 빨강으로

  - 이 때, 조상이 루트노드였다면, 레드블랙트리의 조건에 의해 루트노드를 검은색으로 만들어준다.
  - 하지만 루트노드가 아니었다면, 빨강이 된다.
    - 문제는 이 때, 빨강, 즉 조상의 부모가 또 빨강이라면 double red가 발생
    - 그러므로 조상의 형제를 보고, Restructuring을 할지, Recoloring을 할지 결정해줘야 한다.

- insert하려면 내 위치를 찾는데 O(log n)이라는 시간이 걸린다.
- Restructuring과 마찬가지로 Recoloring은 O(1)시간이 걸린다
- Recoloring은 최악의 경우 Root까지 propagation이 될 수 있으므로 최악의 경우 O(log n)이 걸린다

- 따라서 레드블랙트리는 삽입을 할 때,Restructuring을 하든, Recoloring을 하든 O(log n)이 걸린다.

- 어떤 리프노드에서 루트노드까지 가더라도 black Depth가 항상 같아야 한다.
- black depth는 같으면서 가장 길려먼 ?검정 빨강 검정 빨강 검정 빨강 -> 이런 식으로 이루어져 있으면 가장 길다.
- 이 둘의 Black depth 즉 루트노드까지 가면서 만나는 블랙 노드의 개수는 같다.
- 따라서 최대 2배차이
- 그러므로 Depth Property 덕분에 레드블랙의 높이가 log에 바운드될 수 있다.

## 삭제

- 삭제된 노드가 레드인 경우 추가작업 필요x
- 규칙이 무너지는 경우는 red 노드가 연속적으로 부모 자식 관계인 경우인데, red가 삭제되는 것으로는 해당 규칙을 벗어나지 않기 때문이다.
- 하지만 검은색 노드를 삭제하는 경우가 문제

### default case

- 삭제가 일어나면 무조건 실행되는 케이스
- 삭제된 노드가 검은색인 경우, 그 자리를 대체하는 노드를 검은색으로 칠한다.
- 문제가 이로써 해결되면 좋겟지만, 그 자리를 대체하는 노드가 검은색이었다면 문제가 된다 -> 검은색 노드를 검은색으로 다시 칠하게 되는 경우 이중흑색노드라고 부른다.
- 이중흑색노드는 케이스마다 다르다.

### 이중 흑색노드 처리

#### 이중흑색노드의 형제가 RED인 경우

- 형제를 검은색, 부모를 빨간색으로 칠한다.
- 부모노드를 기준으로 좌회전한다.

- CASE A: 이중 흑색 노드의 형제가 Black이고 형제의 양쪽 자식 모두 Black인 경우, 형제노드만 RED로 만들고, 이중흑색노드의 검은색 1개를 부모로 전달한다.

- CASE B: 이중 흑색 노드의 형제가 Black이고 형제의 왼쪽 자식이 RED, 오른쪽 자식이 Black인 경우
- 형제노드를 RED로, 형제노드의 왼쪽 자식을 Black으로 칠한 후에 형제노드를 기준으로 우회전 한다.

- CASE C : 이중흑색노드의 형제가 Black 이고 형제의 오른쪽 자식이 RED인 경우
  부모노드의 색을 형제에게 넘긴다. 부모노드와 형제노드의 오른쪽 자식을 검은색으로 칠한다. 부모노드 기준으로 좌회전 한다.

---

하영국 교수님 자바 수업

[Zedd0202]<https://zeddios.tistory.com/237>

[덕's IT STORY]<https://itstory.tk/entry/%EB%A0%88%EB%93%9C%EB%B8%94%EB%9E%99-%ED%8A%B8%EB%A6%ACRed-black-tree>

[자바구현]
<https://www.java-tips.org/java-se-tips-100019/24-java-lang/1904-red-black-tree-implementation-in-java.html>

[레드블랙 트리 삭제]
<https://assortrock.com/88>
