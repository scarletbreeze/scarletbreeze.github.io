---
layout: post
title: (자료구조)SearchTree(2)_AVLTree
categories: [data]
excerpt: ' '
comments: false
share: false
tags: data
date: 2019-05-31
---

## AVL Trees

#### AVL Tre Definition

- Height-balance property(높이 균형 특성) : **T의 모든 내부 노드 v에 대해, v의 left subtree와 right subtree 차가 1을 넘지 않는다.**
- 이 특성을 만족하는 이진 탐색 트리를 AVL 트리(AVL tree)라고 한다.

#### Height of an AVL Tree

- n개의 항목을 저장하는 AVL 트리의 높이는 O(log n)이다.

## Insertion into an AVL Tree

- 일반적인 삽입은 binary search Tree와 동일

### Trinode Restructuring

- ![No Image](/assets/posts/20190531/1.png)

- 새로 추가된 노드에서 시작한다
- 부모의 밸런스가 깨졌는지 검사 -> left와 right의 height의 차이를 본다
- 문제가 없으면 다시 부모를 본다. 이 과정 반복
- 밸런스가 깨진 노드를 찾으면 -> 해당 레벨을 줄여주는 게 목표.
- 그 과정이 trynode Restructuring

- 위 예제에서는 삽입된 노드, 54를 시작으로 위에서 세 노드를 찝는다.
- 또는 루트로 부터 불균형이 되는 첫 노드를 z, 그리고 더 높은 높이를 가지는 자식 노드를 y, 마지막으로 더 높은 높이를 가지는 y의 자식 노드를 x라고 하자.
- 이 세 노드를 inOrderTraverse 했을 때, 정렬된 순서로 나온다 (이진 탐색 트리의 기본 속성) -> 정렬된 순서로 나온 x, y, z를 a,b,c로 재명명하고 이 때, x,y,z,를 a,b,c로 사상하는 네 가지 방법이 아래에 제시된다.

-

### Rotating Nodes

- ![No Image](/assets/posts/20190531/2.png)

- 트리 T의 변경은 T를 바꾸는 방법을 시각화 할 수 있는 기하학의 방법이기 때문에 회전(rotation)이라고 불린다.
- 만약 b = y라면, 트라이노드 재구성 메소드는 z위에 y가 회전됨으로써 시각화될 수 있기 때문에 단일 회전 (single rotation)이라고 불린다.
- 만약 b=x라면 트라이노드 재구성 메소드는 먼저 y위에 x가, 그 후 z위에 "회전"됨으로써 시각화 될 수 있기 때문에 이중 회전(double rotation)이라고 불린다.

### Restructuring with Single Rotation

![No Image](/assets/posts/20190531/3.png)

### Restructuring with Double Rotation

![No Image](/assets/posts/20190531/4.png)

## Removal from an AVL Tree

- 삭제 되었을 때도 밸런스가 깨질 수 있다.
- 예를 들어 remove 연산을 사용하여 노드를 삭제 후, 그 위치로 자식의 하나를 올린 후에는 이전에 삭제된 노드의 부모 w로터 T의 루트까지의 경로에 있는 T의 노드는 불균형이 될 수 있다.
- ![No Image](/assets/posts/20190531/5.png)

### Rebalancing after a Removal

- w에서 T의 루트를 향해 올라다가다 만나게 되는 첫 불균형 노드를 z라고 하자. 또한 보다 높은 높이를 가지는 z의 자식을 y라고 두고(노드 y는 w의 조상이 아닌 z의 자식임에 유의하자), 가장 높은 높이를 가지는 y의 자식을 x라 하자. y의 서브트리가 같은 높이를 가질 수도 있기 때문에 x의 선택은 유일하지 않을 수 있다. 어쟀든 z를 루트 노드로 하는 이전의 서브트리에서 높이-균형 특성을 지역적으로 회복하는 restructure(x)를 실앻나 후 임시적으로 b라 불리는 노드를 루트로 한다.

- 이로 인해 key가 전체적으로 줄어들 수 잇기 때문에, z를 재균형화한 후 계속 T를 따라가며 불균형 노드를 찾아가며 재균형화를 계속 해줘야 한다. 없을 떄까지.

---

하영국 교수님 자바 수업
