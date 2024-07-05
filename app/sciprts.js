class AVLNode {
  constructor(key) {
    this.key = key;
    this.left = this.right = this.parent = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  preorder(node) {
    if (!node) {
      return;
    }
    process.stdout.write(`${node.key},`);
    this.preorder(node.left);
    this.preorder(node.right);
  }

  printPreorder() {
    this.preorder(this.root);
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getMaxHeight(node) {
    return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  getBalance(node) {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  leftRotate(node) {
    const parent = node.parent;
    const rightChild = node.right;
    const leftGrandChild = rightChild.left;

    // 1. rotation
    rightChild.left = node;
    node.right = leftGrandChild;

    // 2. pointing from child to parent
    rightChild.parent = parent;
    node.parent = rightChild;
    if (leftGrandChild) {
      leftGrandChild.parent = node;
    }

    // 3. pointing from parent to child
    if (parent) {
      if (node === parent.left) {
        parent.left = rightChild;
      } else {
        parent.right = rightChild;
      }
    } else {
      this.root = rightChild;
    }

    // 4. updateHeight
    node.height = this.getMaxHeight(node);
    rightChild.height = this.getMaxHeight(rightChild);

    return rightChild;
  }

  rightRotate(node) {
    const parent = node.parent;
    const leftChild = node.left;
    const rightGrandChild = leftChild.right;

    // 1. rotation
    leftChild.right = node;
    node.left = rightGrandChild;

    // 2. child to parent pointing
    leftChild.parent = parent;
    node.parent = leftChild;
    if (rightGrandChild) {
      rightGrandChild.parent = node;
    }

    // 3. parent to child pointing
    if (parent) {
      if (node === parent.left) {
        parent.left = leftChild;
      } else {
        parent.right = leftChild;
      }
    } else {
      this.root = leftChild;
    }

    // 4. updateHeight
    node.height = this.getMaxHeight(node);
    leftChild.height = this.getMaxHeight(leftChild);

    return leftChild;
  }

  insert(node, key) {
    if (!this.root) {
      this.root = new AVLNode(key);
      return;
    }

    if (node === null) {
      return new AVLNode(key);
    }

    if (node.key === key) {
      return;
    }

    if (key < node.key) {
      node.left = this.insert(node.left, key);
      node.left.parent = node;
    } else {
      node.right = this.insert(node.right, key);
      node.right.parent = node;
    }

    node.height = this.getMaxHeight(node);
    const balance = this.getBalance(node);

    /* 회전이 한 번만 필요한 경우 */
    if (balance > 1 && key < node.left.key) {
      return this.rightRotate(node);
    }
    if (balance < -1 && key > node.right.key) {
      return this.leftRotate(node);
    }
    /* 회전이 두 번 필요한 경우 */
    if (balance > 1 && key > node.left.key) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    if (balance < -1 && key < node.right.key) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  add(key) {
    this.insert(this.root, key);
  }
}

const avl = new AVLTree();
[1, 2, 3, 4, 5, 6, 7].forEach((key) => avl.add(key));
avl.printPreorder();
