const o = {
    age: 10,
    ['test']: '아',
    ['tes t']: '앗'
}

o.test
o['test t']; 
let x;

//차이점

//1. default 키
// 순차적 numberic key와 value -?[]
// 그 외 key와 value -> {}
// a = {}
// a = new Object()

//2. 사용 가능 함수
// array도 object임! but> 함수 사용 가능 
// concat
// every   
// filer
// forEach
// join
// indexOf
// lastIndexOf
// map
// pop
// push
// reverse
// shift
// slice
// some
// sort
// splice
// toSource
// toString
// unshift
// valueOf 


// []에 non numeric key 
// let a = [] or let a = Array()
//a['A'] = 'Athens'
//a.A = 'Athens'
//console.log(a.length) '0'나옴!!!

//[{}]이렇게 같이 쓰는 이유
// []으로 length, push, splice 쓰기
// {}으로 key값 커스텀

const colors = ['red', 'yellow'];

// const yellow = colors[1]; 대신 분해 할당
const [red, yellow, black] = colors;

 // 대입문 : 복사 
 // 객체 : 참조 무조건!!
 let Object = {
     isLoading: false,
 }

// (o) => {
//  o.isLoading = true;
//  }

  
foo = (a) => {
    a.isLoading = true;
}

foo(Object)

const value = 1;
//switch는 value가 어떤 case과 같을 때
 switch(value){
    case 1:
    case 2:
    case 3:
    case 4: 
 }

 const age = 1;
 if (age === 1){

 }else if(age === 2){
     
 }


const arr =['a', 'b', 'c', 'd']
 
//for in 문 key이름 찾을 때
//배열에서 key는 순차적 
//객체에서 key는 string
for (const index in arr){

}