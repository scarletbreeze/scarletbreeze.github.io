---
layout: post
title: (자료구조)SearchTree(3)_twoFourTree
categories: [data]
excerpt: ' '
comments: false
share: false
tags: data
date: 2019-06-01
---

## Multi-Way 탐색 트리

- 서치트리인데 바이너리 서치트리가 아니다.
- 내부 노드가 두 개 이상의 자식을 가지는 트리.
- ![No Image](/assets/posts/20190601/1.png)
- 그림에서 트리의 degree는 4이다.
- 어떤 노드의 degree가 d이면 그 노드가 저장할 수 있는 키의 개수는 d-1개다.
- 모든 노드의 key값은 정렬된 순서대로 나온다.
- ex) v1에 저장되는 모든 key값은 key <= k1
-     v2에 저장되는 모둔 key값은 k1 <= key <= k3
-     v3에 저장되는 모든 key값은 key >= k3
- 정확히 얘끼하면 binary tree에서 inorder traverse 순서는 아니지만, 비슷한 원리로 정렬된다.
- Multi-way search tree에서 external node는 placeholder역할만 한다.

### Multi-Way 탐색

- 기본적으로 BST 탐색과 같은 원리
- 다만 BST에서는 노드의 key가 한 개
- Multi-Way search 트리에서는 한 노드의 key가 여러 개 있을 수 있다.
- ![No Image](/assets/posts/20190601/2.png)
- ex) 오른쪽 Success 예시에서, 24를 찾는다고 가정
-     22보다 크니까 오른쪽. 25보다 작으니까 왼쪽으로 이동
-     각각의 노드에서 검색은 어떻게? -> 리니어 서치 or 정렬이 되어 있으니까 바이너리 서치해도 됌
-     실패하는 경우는 external node까지 갔을 때. -> BST와 동일
- 즉 바이너리 서치와의 차이점은 각 노드의 키가 한 개 이상 있을 수 있기 때문에 노드에서 탐색을 한번 더 해줘야 한다.

### Implementation of MST

- ![No Image](/assets/posts/20190601/3.png)
- 핵심은 노드에 있는 저장되어 있는 키값을 딕셔너리에 저장하는 것.
- child를 연결할 때, 각각의 엔트리 구조가 key와 value만 있는게 아니라, 엔트리 자체에 child노드를 가리키는 링크를 가지고 있어야 한다.
- 부모를 찾아가는 건 백링크를 달아주면 된다.
- MultiWaySearchTree에서 가장 중요한건 트리의 height가 된다.
- 로그 높이를 갖는 탐색트리는 균형탐색트리라고 불린다.

## (2,4)Trees

![No Image](/assets/posts/20190601/4.png)

- MultiWay Search Tree의 대표가 2-4 tree
- 최대 degree가 4.
- 노드의 종류는 degree가 2, 3, 4인 노드 세 종류 뿐이다
- 그래서 2~4 tree라고 불린다.

### Definition of (2,4) Tree

![No Image](/assets/posts/20190601/5.png)

- Size property : 모든 노드는 많아야 네 개의 자식을 가진다
- depth property : 모든 외부 노드는 동일한 깊이를 가진다
- 위 두 조건을 만족하면 height가 log n으로 유지된다.

### Insertion

- ![No Image](/assets/posts/20190601/6.png)
- (k,x)entry를 (2,4)tree에 삽입한다고 하자
- 1. k에 대한 탐색을 시작한다.
- external node가 나왔다면 그 위치가 추가해야할 위치이다.
- 32를 추가한 뒤 30을 추가하면, 5node가 되버린다
- ![No Image](/assets/posts/20190601/7.png)
- 이런 경우를 (2,4) tree에서 overflow라고 부른다
- fivenode를 2와 3으로 나누면 된다.

### Sequential Insertion Example

- ![No Image](/assets/posts/20190601/8.png)

### Cascading Split Example

- ![No Image](/assets/posts/20190601/9.png)

## Deletion

![No Image](/assets/posts/20190601/10.png)

- 24를 삭제한다고 가정하자
- external node에 있는 경우 그냥 삭제해버리면 된다
- 하지만 internal node있는 경우 binary search tree처럼 자리를 바꿔서 삭제한다.

### Underflow and Transfer

- 2node가 1node가 되면 underflow가 발생한다.
- 이 경우 두 가지 경우 생각
- ![No Image](/assets/posts/20190601/11.png)
- 1. v node의 좌우 형제들을 본다. 누군가 3node 이상이 있다면 key를 빌려온다
- 이 때 바로 가져올 수 없기 떄문에 부모를 거쳐서 가지고 온다.
- 이 경우 부모는 변하는게 없다. 하나 받고 하나 주기 때문에.

### Underflow and Fusion

- 2. 만약 형제들도 two node뿐이라면 -> 부모한테 빌려올 수 밖에 없다
- 둘을 합치면서 빌려온다.
- ![No Image](/assets/posts/20190601/12.png)

### Sequential Deletion Example

- ![No Image](/assets/posts/20190601/13.png)

### Propagatin Fusion Exmample

- ![No Image](/assets/posts/20190601/14.png)

---

하영국 교수님 자바 수업
