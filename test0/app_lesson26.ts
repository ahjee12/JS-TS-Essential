type User = {
    id: number;
    name: string;
}

type Address = {
    zipcode: string;
    address: string;
}

function pipeOne(value: any): any {
    return value;
}

//확정되지 않은 타입 
function pipeTwo<T>(value: T): T {
    return value
}

//any 쓰더라도 제네릭 T 처럼 number 인자로 전달하면 number 타입으로 인식                 
let p1 = pipeOne(10);
//호출하는 순간 T 타입 확정됨
let p2 = pipeTwo('10');
let p3 = pipeTwo(true);

const pipeObjectOne = <T>(obj: T): T => {
    return obj;
}

let po1 = pipeObjectOne({id: 1, name: '김', zipcode: 50213});
let po2 = pipeObjectOne<User>({id: 1, name: '김', zipcode: 50213});

class State <S, Config={}> {
    private _state: S;
    config: Config;

    constructor(state: S, config: Config) {
        this._state = state;
        this.config = config;
    }

    getState(): S {
        return this._state;
    }
}

let s1 = new State <Address, { active: boolean}> ({
    zipcode: 50213,
    address: '서울시',
}, {
    active: true,
})

const s1Data = s1.getState();

console.log(s1Data.zipcode, s1Data.address, s1.config.active);

//key extends keyof Type에서 Type은 객체, 객체에서 key를 뽑아냄 
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key){
    return obj[key];
}

let x = {a:1, b:2, c:3, d:4};

getProperty(x, "a");
getProperty(x, "m");

// 
interface KeyPair <T, U> {
    key: T;
    value: U;
}

let kv1 : KeyPair<number, string> = {key:1, value: 'Kim'};
let kv2 : KeyPair<number, number> = {key:2, value: 12345};