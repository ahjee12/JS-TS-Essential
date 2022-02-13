
//자바스크립트 컨텍스트: 실행 컨텍스트 메커니즘을 가지고 있음
const person = {
    name: 'Kim min tae',
    age:40,
    getAge() {
        return this.age;
    }
};

person.age;
//getAge함수를 실행하는 순간 소유자가 누구냐가 결정됨
person.getAge();

//const age = person.getAge();
const age = person.getAge;

// age();

age.call(person); 


class Person{
    name: string;
    age: number;
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
        //언제 어디서 호출되더라도 현재 this로 고정!!
        this.getAge = this.getAge.bind(this);
    }

    getAge(){
        return this.age;
    }

    //렉시컬 constext - arrow함수 사용 - 만들어 질 때부터 this로 고정됨
    //this가 다른 객체로 연결되는 걸 바꿀 수 없음
    //this가 꼬일 일 없음
    getName = () => this.name;
}

const p1 = new Person('Kim mintae', 30);

p1.getAge();

//const myAge = p1.getAge();
const myAge = p1.getAge;

//객체 이름을 call해줘야 함!
// myAge.call(p1);
myAge();

//렉시컬 context 특별한 문법 필요
p1.getName();

const x = p1.getName;
x();

