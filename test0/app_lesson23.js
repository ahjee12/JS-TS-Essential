const c1 = {
    name: 'C1',
    color: 'red',
};

const c2 = {
    name: 'C2',
    width:300,
};

const c3 = {
    name: 'C3',
    height:100,
};

console.log(c1);
console.log(c2);
console.log(c3);

// Object;

// c1.__proto__

//★to String이라는 메소드는 어디서 나타난 걸까★
//프로토타입 체이닝
//모든 객체에는 __proto__라고 하는 속성이 있음
//__proto__는 최상위 Object를 가리키고 있음
//c1 객체가 가지고 있는 메소드를 찾음 -> 없으면 최상위 Object

// console.log(c1.toString());

c1.__proto__ = c2;
console.log(c1.width); //300나옴 

c3.__proto__ = c2;

//함수는 일반 객체와 달리 prototype이라고 하는 풀네임 속성도 있음
function Foo(name){
    this.name = name;
    //this.__proto__ = Foo.prototype;
}

Foo.prototype.lastName = "WooWa";

//new연산자
//this.__proto__ = Foo.prototype 속성을 연결시킴
//class에 넣고 new연산 or function 밖에서 prototype.속성 넣고 new연산
const f = new Foo('Kim min tae');

console.log(f.name); // name만 나옴
console.log(f.lastName); //Woowa 나옴