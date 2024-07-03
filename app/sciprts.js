class Node {
  constructor(key) {
    this.key = key;
    this.left = this.right = this.parent = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /* findLocation 은 해당 key를 갖는 node를 발견하면 해당 node를 반환하고 
  존재하지 않을 경우엔 마지막 탐색이 일어난 노드의 부모 노드를 반환함 */
  findLocation(key) {
    if (!this.root) {
      return null;
    }

    let searchTarget = this.root;
    let parent = searchTarget.parent;

    while (searchTarget !== null && searchTarget.key !== key) {
      parent = searchTarget;
      searchTarget =
        key < searchTarget.key ? searchTarget.left : searchTarget.right;
    }
    return searchTarget?.key === key ? searchTarget : parent;
  }

  preorder(node = this.root) {
    process.stdout.write(`${node.key},`);
    if (node.left) {
      this.preorder(node.left);
    }
    if (node.right) {
      this.preorder(node.right);
    }
  }

  linkingNode(parent, node) {
    if (!parent) {
      this.root = node;
      return;
    }

    if (parent.key === node.key) {
      return;
    }

    if (node.key < parent.key) {
      parent.left = node;
    } else {
      parent.right = node;
    }
    node.parent = parent;
  }

  unLinkNode(parent, node) {
    if (!parent) {
      this.root = null;
      return;
    }
    if (node.key < parent.key) {
      parent.left = null;
    } else {
      parent.right = null;
    }
    node.parent = null;
  }

  insert(key) {
    const node = new Node(key);
    const parent = this.findLocation(key);
    this.linkingNode(parent, node);
  }

  search(key) {
    const target = this.findLocation(key);
    return target.key === key ? target : null;
  }

  findMaxLeaf(rootNode) {
    let MaxLeaf = rootNode;

    while (MaxLeaf.right !== null) {
      MaxLeaf = rootNode.right;
    }
    return MaxLeaf;
  }

  deleteByMerging(key) {
    if (!this.root) {
      return;
    }
    const deleteTarget = this.search(key);

    if (!deleteTarget) {
      return;
    }

    const parent = deleteTarget.parent;
    const leftSubtree = deleteTarget.left;
    const rightSubtree = deleteTarget.right;

    if (!parent) {
      /* 지우고자 하는 노드가 root Node라면 */
      this.root = null;
    }

    if (!leftSubtree && !rightSubtree) {
      /* 지우고자 하는 노드가 leaf Node라면 */
      this.unLinkNode(parent, deleteTarget);
      return;
    }

    if (leftSubtree && !rightSubtree) {
      /* 지우고자 하는 노드가 leftSubtree 만 존재한다면 */
      this.linkingNode(parent, leftSubtree);
      return;
    }
    if (!leftSubtree && rightSubtree) {
      /* 지우고자 하는 노드가 rightSubtree 만 존재한다면 */
      this.linkingNode(parent, rightSubtree);
      return;
    }

    /* 지우고자 하는 노드가 leftSubtree, rightSubtree 모두가 존재한다면 */
    const LeftNodeMaxLeaf = this.findMaxLeaf(leftSubtree);

    this.linkingNode(parent, leftSubtree);
    this.linkingNode(LeftNodeMaxLeaf, rightSubtree);
  }

  deleteByCopying(key) {
    if (!this.root) {
      return;
    }
    const deleteTarget = this.search(key);

    if (!deleteTarget) {
      return;
    }

    const parent = deleteTarget.parent;
    const leftSubtree = deleteTarget.left;
    const rightSubtree = deleteTarget.right;

    if (!leftSubtree && !rightSubtree) {
      /* 지우고자 하는 노드가 leaf Node라면 */
      this.unLinkNode(parent, deleteTarget);
      return;
    }

    if (!leftSubtree && rightSubtree) {
      this.linkingNode(parent, rightSubtree);
      return;
    }

    /* leftSubtree 가 존재하는 경우 로직이 존재 */

    const LeftNodeMaxLeaf = this.findMaxLeaf(leftSubtree);
    deleteTarget.key = LeftNodeMaxLeaf.key;

    if (leftSubtree.left) {
      this.linkingNode(LeftNodeMaxLeaf.parent, LeftNodeMaxLeaf.left);
    }
  }
}

const bst = new BinarySearchTree();

[15, 4, 2, 20, 17, 19, 18, 16, 32].forEach((key) => bst.insert(key));
console.log('기존 서브 트리를 전위 순회한 결과');
bst.preorder();
console.log('\n deleteByCopying 시행한 결과');
bst.deleteByCopying(20);
bst.preorder();
