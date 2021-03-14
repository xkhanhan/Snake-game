/**
 * 时间 : 2020 - 9 - 25
 * 问题 : 食物有一定的概率长在蛇的身体上，
 */
let squarWidth = 20;
let squarHeight = 20;
let divWidth = 600;
let divHeight = 600;
let over = document.getElementsByClassName('over')[0];
let message = '';

// 抽象方块类
class Squar {
    /**
   * 
   * @param {*} x 坐标x
   * @param {*} y 坐标y
   * @param {*} childClassName 方块css的类名
   * @param {*} fatherDom 父标签
   */
    constructor(x, y, className, fatherDom) {
        // 坐标
        this.x = x * squarWidth;
        this.y = y * squarHeight;
        // 类名
        this.className = className;
        // 父标签
        this.fatherDom = fatherDom;
        // 创建dom 并设置信息
        this.dom = document.createElement('div');


    }

    crurt() {
        this.dom.className = this.className;
        this.dom.style.top = this.y + 'px';
        this.dom.style.left = this.x + 'px';
        this.fatherDom.appendChild(this.dom);
    }

    // 移除页面发给发
    remove() {
        this.fatherDom.removeChild(this.dom);
    }
}

// 蛇身体类
class ChreamSquar extends Squar {
    constructor(x, y, className, fatherDom) {
        super(x, y, className, fatherDom)
    }
}

// 食物类
class Food extends Squar {
    constructor(className, fatherDom) {
        super(0, 0, className, fatherDom);
        let x =  Math.ceil(Math.random() * 29)
        let y = Math.ceil(Math.random() * 29)
        this.x = x * squarWidth;
        this.y = y * squarHeight;
        this.post = [x,y];
        // 父标签

       

    }
    // 判断两个值是否相等
    isNot(value1) {
        console.log(value1);

        console.log(this.post);
        const valX1 = value1[0];
        const valY1 = value1[1];

        if (valX1 == 0 && valX1 == 0 && this.post[0] == 0 && valY1 == 0 && this.post[1] == 0 && valY1 == this.post[1]) {
            return true;
        } else if (Object.is(valX1, this.post[0]) && Object.is(valY1, this.post[1])) {
            return false;
        } else {
            return false;
        }

    }
}

// 蛇类
class Chream {
    constructor(fatherDom) {
        // 蛇的信息
        this.post = [];
        // 头部信息
        this.head = null;
        // 身体
        this.body = [];
        // 尾部信息
        this.tail = null;
        // 方向
        this.direaction = null;
        // 方向类型
        this.direactionNum = {
            left: { X: -1, Y: 0 },
            right: { X: 1, Y: 0 },
            top: { X: 0, Y: -1 },
            bottom: { X: 0, Y: 1 }
        }

        
        // 蛇头部
        
        const chreamHead = new ChreamSquar(5, 0, 'chreamHead', fatherDom);
        chreamHead.crurt();
        this.post.push([5, 0]);
        this.head = chreamHead;

        // 身体1
        const chreamBody1 = new ChreamSquar(4, 0, 'chreamBody', fatherDom);
        // 渲染身体
        chreamBody1.crurt();
        // 存入蛇身坐标信息
        this.post.push([4, 0]);
        // 存入身体信息
        this.body.push(chreamBody1)

        const chreamBody2 = new ChreamSquar(3, 0, 'chreamBody', fatherDom);
        // 渲染身体
        chreamBody2.crurt();
        // 存入蛇身坐标信息
        this.post.push([3, 0]);
        // 存入身体信息
        this.body.push(chreamBody2)

        const chreamBody3 = new ChreamSquar(2, 0, 'chreamBody', fatherDom);
        // 渲染身体
        chreamBody3.crurt();
        // 存入蛇身坐标信息
        this.post.push([2, 0]);
        // 存入身体信息
        this.body.push(chreamBody3)

        // 身体2
        const tail = new ChreamSquar(1, 0, 'chreamBody', fatherDom);
        // 渲染
        tail.crurt();
        // 添加蛇尾坐标信息
        this.post.push([1, 0]);
        // 存储蛇尾信息
        this.tail = tail

        // 对身体形成链表关系
        chreamHead.last = null;
        chreamHead.next = chreamBody1;

        chreamBody1.last = chreamHead;
        chreamBody1.next = chreamBody2;

        chreamBody2.last = chreamBody1;
        chreamBody2.next = chreamBody3;

        chreamBody3.last = chreamBody2;
        chreamBody3.next = tail;

        tail.last = chreamBody3;
        tail.next = null;

        //设置当前方向
        this.direaction = this.direactionNum.right;

    }

    move(nextPost) {
        let head = this.head
        let p = this.tail;
        let n = this.post.length - 1;
        //拿取蛇头下一位置数组
        while (p != null) {

            if (p == head) {
                let x = nextPost[0] * squarWidth;
                let y = nextPost[1] * squarHeight;
                p.dom.style.left = `${x}px`;
                p.dom.style.top = `${y}px`;

                // 自身位置信息更新
                p.x = x;
                p.y = y;
                // 更新位置信息
                this.post[n] = [...nextPost];
            } else {
                p.dom.style.left = `${p.last.x}px`;
                p.dom.style.top = `${p.last.y}px`;

                // 自身位置信息更新
                p.x = p.last.x;
                p.y = p.last.y;

                // 更新位置信息
                this.post[n] = [p.last.x / squarWidth, p.last.y / squarHeight];
            }
            p = p.last;
            n--;
        }
    }

    // 清除身体
    remove() {
        const { head } = this;
        let p = head;
        while (p != null) {
            p.remove()
            p = p.next;
        }
    }
}


// 游戏类
class Game {
    constructor(name) {
        // 初始化
        this.init(name);

        // 移动
        this.chreamGo();

        // 绑定键盘事件
        this.keyDown();
    }
    chreamGo (){
            // 蛇移动
            this.intervals = setInterval(() => {
            if (this.getNexPost()) {
                this.chream.move(this.getNexPost())
            }
            return;
        }, 100)
    }

    // 游戏初始化
    init(name) {
        // 获取父级
        this.fatherDom = document.getElementById(name) || document.getElementsByClassName(name)[0]
        this.tcurDiv = document.getElementsByClassName('tcur')[0];

        const { fatherDom,tcurDiv } = this;
            // 闯将一个蛇对象
        this.chream = new Chream(fatherDom);
        // 创建一个食物类
        this.food = new Food('food', fatherDom, this.chream.post);
        // 渲染食物
        this.food.crurt();
        // 分数
        this.tcur = 0;
        tcurDiv.innerHTML = this.tcur;
    }

    getNewFood () {
        const { chream } = this;
        let chreamPost = chream.post;
        for(let i = 0; i < chreamPost.length; i++) {
            if(this.food.isNot(chreamPost[i])) {
                console.log('x');
                this.food = new Food(className, fatherDom, chreamPost);
                this.food.crurt();
            }
        }
    }


    // 获取蛇的下一个位置
    getNexPost() {
        const { chream, food } = this;
        let nextPost = [
            chream.head.x / squarWidth + chream.direaction.X,
            chream.head.y / squarHeight + chream.direaction.Y
        ]

        // 遍历自身位置
        const value = chream.post;
        const length = value.length;
        for (let i = 0; i < length; i++) {
            const x = value[i][0];
            const y = value[i][1];
            // 撞上自己

            if (x === nextPost[0] && y === nextPost[1]) {
                message = '你撞上自己了';
                this.die();
                return false;
            }
            // 撞上墙
            else if (nextPost[0] < 0 || nextPost[1] < 0 || nextPost[0] >= divWidth / squarWidth || nextPost[1] >= divHeight / squarHeight) {
                message = '你撞上墙了';
                this.die();
                return false;
            }
            // 判断是否撞上食物
          
            else if (nextPost[0] == food.post[0] && nextPost[1] == food.post[1]) {
                this.cetFood();
                return true;
            }

        }
        return nextPost;
    }

    // 蛇死亡
    die() {
        this.chream.remove();
        this.food.remove();
        clearInterval(this.intervals);
         //打开按钮
         kai = true;
         over.style.display = 'block';
         over.innerHTML = '游戏结束！' + message;
         btn1.style.display = 'block';
    }

    // 吃到食物
    cetFood() {
        this.food.remove();//清除食物
        // 创建一个新的食物
        this.food = new Food('food', this.fatherDom, this.chream.post);
        this.food.crurt();

        // 蛇身长度加一
        let tailX = this.chream.tail.x / squarWidth;
        let tailY = this.chream.tail.y / squarHeight;
        // 身体1
        const chreamBody = new ChreamSquar(tailX, tailY, 'chreamBody', this.fatherDom);

        this.chream.tail.next = chreamBody;
        chreamBody.last = this.chream.tail;
        chreamBody.next = null;
        this.chream.tail = chreamBody;//存储蛇尾信息
        this.chream.post.push( [tailX, tailY] )
        chreamBody.crurt([tailX, tailY]);//添加入父盒子

        // 分数加一
        this.tcur += 1
        this.tcurDiv.innerHTML = this.tcur;
    }

    // 键盘事件
    keyDown() {
        const { chream } = this;
        document.onkeydown = function (e) {
            let event = e || window.e;//兼容
            switch (event.which) {
                case 37://左
                    chream.direaction = chream.direactionNum.left;
                    break;
                case 38://上
                    chream.direaction = chream.direactionNum.top;
                    break;
                case 39://右
                    chream.direaction = chream.direactionNum.right;
                    break;
                case 40://下
                    chream.direaction = chream.direactionNum.bottom;
                    break;
            }
        }
    }

}

let btn1 = document.getElementsByClassName('go')[0];
let btn2 = document.getElementById('app');
let game
//开始按钮
let kai = true;
btn1.onclick = function (e) {
    e.stopPropagation()
    if (kai) {
        over.style.display = 'none';
        this.style.display = 'none';
        //创建一个蛇
        game = new Game('warp');
        kai = false;
    }
}
//暂停按钮
let men = false;
btn2.onclick = function () {
    if (kai) {
        return;
    }
    if (men) {
        over.style.display = 'none';
        game.chreamGo();
        men = false;
    } else {
        clearInterval(game.intervals);
        over.style.display = 'block';
        over.innerHTML = '点击页面继续';
        men = true;
    }

}
