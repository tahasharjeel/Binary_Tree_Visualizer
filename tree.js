let root;
let inorderArray = [];
let preorderArray = [];
let postorderArray = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  root = null;
  frameRate(1);
}

function rand() {
  reset();
  for (let i = 0; i < 8; i++) {
    input(floor(random(1, 99)));
  }
}

function input(val) {
  if (root === null) {
    if (!val) {
      if (document.getElementById("val").value) {
        root = insert(root, parseInt(document.getElementById("val").value));
      }
    } else {
      root = insert(root, val);
    }
    root.x = width / 2;
    root.y = 50;
  } else {
    if (!val) {
      insert(root, parseInt(document.getElementById("val").value));
    } else {
      insert(root, val);
    }
  }
  levelOrder(root);
  adjust(root);
}

function draw() {
  background("#222831");
  traversal(root);
}

function reset() {
  root = null;
  inorderArray = [];
  preorderArray = [];
  postorderArray = [];
  document.getElementById("intrav").innerHTML = "Inorder: ";
  document.getElementById("pretrav").innerHTML = "Preorder: ";
  document.getElementById("posttrav").innerHTML = "Postorder: ";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function intrav() {
  inorder(root);
  for (let i = 0; i < inorderArray.length; i++) {
    inorderArray[i].highlight("yellow");
    document.getElementById("intrav").innerHTML += " " + inorderArray[i].value;
    await sleep(1000);
  }
}

async function pretrav() {
  preorder(root);
  for (let i = 0; i < preorderArray.length; i++) {
    preorderArray[i].highlight("yellow");
    document.getElementById("pretrav").innerHTML += " " + preorderArray[i].value;
    await sleep(1000);
  }
}

async function posttrav() {
  postorder(root);
  for (let i = 0; i < postorderArray.length; i++) {
    postorderArray[i].highlight("yellow");
    document.getElementById("posttrav").innerHTML += " " + postorderArray[i].value;
    await sleep(1000);
  }
}

function inorder(current) {
  if (current === null) {
    return;
  }
  inorder(current.left);
  inorderArray.push(current);
  inorder(current.right);
  return;
}

function preorder(current) {
  if (current === null) {
    return;
  }
  preorderArray.push(current);
  preorder(current.left);
  preorder(current.right);
  return;
}

function postorder(current) {
  if (current === null) {
    return;
  }
  postorder(current.left);
  postorder(current.right);
  postorderArray.push(current);
  return;
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (document.getElementById("val").value) {
      if (root === null) {
        root = insert(root, parseInt(document.getElementById("val").value));
        root.x = width / 2;
        root.y = 50;
      } else {
        insert(root, parseInt(document.getElementById("val").value));
      }
      levelOrder(root);
      adjust(root);
    }
  }
}

function heightOfTree(current) {
  if (current === null) {
    return 0;
  } else {
    let lHeight = heightOfTree(current.left);
    let rHeght = heightOfTree(current.right);
    if (lHeight > rHeght) {
      return lHeight + 1;
    } else {
      return rHeght + 1;
    }
  }
  return 0;
}

function levelOrder(current) {
  for (let i = 1; i <= heightOfTree(root); i++) {
    currentLevel(current, i, heightOfTree(root) - i);
  }
}

function currentLevel(current, level, m) {
  if (current === null) {
    return;
  }
  if (level === 1) {
    current.level = m + 1;
    return;
  } else {
    currentLevel(current.left, level - 1, m);
    currentLevel(current.right, level - 1, m);
  }
  return;
}

function traversal(current) {
  if (current === null) {
    return current;
  }
  current.show();
  traversal(current.left);
  traversal(current.right);
  return;
}

function adjust(current) {
  if (current === null) {
    return current;
  }
  if (current === root) {
    if (root.left) {
      root.left.x = root.x - 300;
    }
    if (root.right) {
      root.right.x = root.x + 300;
    }
  } else {
    if (current.left) {
      current.left.x = constrain(current.x - (current.left.level * 70), 30, width - 30);
    }
    if (current.right) {
      current.right.x = constrain(current.x + (current.right.level * 70), 30, width - 30);
    }
  }
  adjust(current.left);
  adjust(current.right);
  return;
}

function insert(current, val, x, y) {
  if (current === null) {
    current = new leaf(val, x, y);
    this.col = "red";
    return current;
  }
  if (val < current.value) {
    setTimeout(current.col = "red", 2000);
    current.show();
    setTimeout(current.col = "green", 2000);
    current.left = insert(current.left, val, current.x - 150, current.y + 100);
  } else if (val > current.value) {
    setTimeout(current.col = "red", 2000);
    current.show();
    setTimeout(current.col = "green", 2000);
    current.right = insert(current.right, val, current.x + 150, current.y + 100);
  }
  return current;
}

function leaf(val, x, y) {
  this.value = val;
  this.left = null;
  this.right = null;
  this.x = x;
  this.y = y;
  this.level;
  this.col = "green";
  this.show = function() {
    strokeWeight(5);
    stroke(0);
    if (this.left) {
      line(this.x, this.y, this.left.x, this.left.y);
    }
    if (this.right) {
      line(this.x, this.y, this.right.x, this.right.y);
    }
    fill(this.col);
    circle(this.x, this.y, 50);
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text(this.value, this.x, this.y + 10);
  }
  this.highlight = function(col) {
    noFill();
    stroke(col);
    circle(this.x, this.y, 60);
  }
}
