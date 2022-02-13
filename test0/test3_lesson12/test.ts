type MyObject = {
    name: string;
    age: number;
    getFamilyName: () => string;
    getLastName: () => string;
    getBloodType: () => string;
    getBtype: () => string;
}
//객체를 만드는 방법 #1
//객체 안에 들어가 있는 데이터 종류: 속성, 메소드 
const obj: MyObject = {
    name: 'Min Tae',
    age: 40,
    getFamilyName: function (){
        return 'Kim';
    },
    getBloodType: function(){
        return 'B';
    },
    getBtype(){
        return 'BB'
    },
    getLastName: () => 'Kim'
};

obj.name;
obj.age;
obj.getFamilyName();

//동적 바인딩
obj.bloodType = 'A'
delete obj.bloodType;
//delete못 하게 하려면 타입 만들어서 지정해 주기

//타입 지정한 상태로 delete가능하게 하려면 타입에서 optional 설정

//속성값에 문제 있을 때 못잡음
obj.age = -10;


//객체를 만드는 방법 #2
class Person {
    _bloodType: string;
    
    constructor(bloodTypeName: string){
        this._bloodType = bloodTypeName;
    }

    //class로 만들어진 인스턴스 객체에서만 만들 수 있음
    //setter
    set bloodType(bType: string){
        if(bType === 'A' || bType === 'B' || bType === 'O' || btype === 'AB'){
            this._bloodType = bType;
        }
    }
    //getter
    get bloodType(){
        return `${this._bloodType} 형`
    }
}
 
const p1 = new Person('B')
p1.bloodType;
//방어 코드 작성법
//안쪽에선 코드 바깥에선 데이터
p1.bloodType = 'C';
//p1.boodType()이런 식의 접근이 아니라 속성에 접근하는 것처럼 하려면 set 붙임


