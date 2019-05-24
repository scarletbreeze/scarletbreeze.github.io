---
layout: post
title: (자료구조)SearchTree(1)
categories: [data]
excerpt: ' '
comments: false
share: false
tags: data
date: 2019-05-24
---

## Binary Search Trees (BST)

![No Image](/assets/posts/20190524/1.png)

### What is Binary Search Tree

- 순서화된 딕셔너리 항목들을 저장하기 좋은 자료구조
- 딕셔너리 D의 항목 (k,e)를 T의 각 내부 노드 v에 저장하는 이진트리
- 키가 k보다 작은 값이면 v의 왼쪽 서브트리에 저장된다
- 키가 k보다 크거나 같은 값이면 v의 오른쪽 서브트리에 저장된다
- T의 외부노드는 placeholder 역할만 한다.
- ![No Image](/assets/posts/20190524/2.png)

### Searching BSTs

![No Image](/assets/posts/20190524/3.png)

- find(k)라고 하자, v가 시작하는 노드.
- 루트에서 부터 4를 찾는다. v와 비교해서 4가 6보다 작기 때문에 왼쪽으로
- 2와 4 비교. 4가 2보다 크므로 오른쪽.
- 그 다음 4와 찾으려는 4가 같으므로. 찾음
- 탐색에 실패하는 경우는 external node를 만났을 때다.

### Implementation of find Operation

![No Image](/assets/posts/20190524/4.png)

### Insertion

1. 이진 탐색 트리 T의 insert 연산을 실행하기 위해서는 **TreeSearch(k,T.root())**를 호출하는 것으로 시작한다.
   - TreeSearch로 부터 반환되는 노드를 w라 하자.
2. w가 외부노드라면, w를 (k,e) 엔트리와 두 개의 외부 자식 노드를 갖는 새로운 노드로 교체한다. 이 때, w는 키값 k를 가지는 항목을 삽입할 적당한 위치를 나타낸다.
3. w가 내부노드라면 -> 똑같은 중복된 키가 있다는 것 -> 인쪽 혹은 오른쪽 상관없이(정의한 대로), 예제에서는 왼쪽으로 갔음. 왼쪽으로 가서, 9를 다시 찾으면 된다(재귀적으로 외부노드를 만나면 2번 실행)

![No Image](/assets/posts/20190524/5.png)

![No Image](/assets/posts/20190524/6.png)

### Deletion

1. 삭제할 노드를 찾는다. ( **TreeSearch(k,T.root())**를 호출하는 것으로 시작한다.)
   - TreeSearch로 부터 반환되는 노드를 w라 하자.
2. w가 외부노드라면 NO_SUCH_KEY를 반환하고 작업을 마침 (삭제 대상이 external node 두 개를 child로 갖는 경우)
   - ![No Image](/assets/posts/20190524/7.png)
3. child로 1개의 internal node, 1개의 external node를 갖는 경우 -> 외부노드를 삭제하고 내부노드를 땡겨준다.
   - ![No Image](/assets/posts/20190524/8.png)
4. child로 두 개 모두 내부 노드일 경우, -> 중위 순회(inorder Traverse)를 하여, 중위 순회 상 3의 바로 앞에 있거나, 3의 바로 뒤에 있는 애를 찾는다. -> 5를 선택했다고 가정하면, 5와 3을 바꿔준다 - > 밑으로 3이 내려오면 삭제가 가능해진다.
   - 정리하자면 : 삭제하고자 하는 대상의 중위순회 상 앞 또는 뒤를 찾아서 자리를 바꿔준다.
   - ![No Image](/assets/posts/20190524/9.png)

### Performance Analysis

- 검색 성능 : O(h)
- 트리의 성능을 가장 중요하게 좌지우지 하는 건 트리의 height다.
- find, insert, remove 기본이 -> O(h)
- findAll은 O(h+s)만큼ㅁ
- The Worst Case : skewed 되어있는 경우 -> list랑 다를 바가 없다. O(h)
- The Base Case : Complete binary tree일 때, -> O(h+s)

### Balanced Search Trees

- 관건은 어떻게하면 tree의 height를 optimal하게 유지시킬까?
- load factor가 일정 수준 넘어가면 rehashing을 해주는 것과 같다.
- rebalancing(restructuring)기능을 가지고 있는 걸 -> Balanced Search Tree라고 한다.

#### ※ 순회 복습

---

하영국 교수님 자바 수업

트리 순회 - 위키백과
<https://ko.wikipedia.org/wiki/%ED%8A%B8%EB%A6%AC_%EC%88%9C%ED%9A%8C>
