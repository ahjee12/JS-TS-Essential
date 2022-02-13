//함수 정의문
function myFn(){
    return 100;    
}

const result   = myFn()

//식, 값 값은 세미콜론
 const myFnV2 = function(){
     return 100;
 };

 myFnV2()
 myFnV2.call();
 myFnV2.apply()

 //즉시 실행 함수
( function (){
     console.log('즉시');
 })()

 const a = function (){     
    return 50;
 }

 //가변인자를 처리하는 함수
 //함수에 넣어지는 인자 수는 변할 수 있음 
 function sum(a, b, ...arg){
     let s = 0;

     for(let i = 0; i<arg.length; i++){
         s = s + arg[i]
     }
     return s; 
 }
 const arr = [10, 20, 30]
 const abcSum = sum(10, 20, 30, 40);
 sum.call(null, 10, 20, 30);
 sum.apply(null, arr) 


 //aroow function은 익명이 기본임
const sumV2 = (a, b, ...args) =>{
    let s = 0;

    for(let i = 0; i<args.length; i++){
        s = s + args[i]
    }
    return s; 
} 

//★★arrow function 1 line code!!★★★
//return값이면 brace생략 가능!!!
const ten = () => 10

//기존 function처럼 return 쓰는 거!!
const nine = () =>{
    return 9
}

function* gen(){
    yield 10;
    yield 20;
    return 30;
}

const g = gen();

g.next();
g.next();

//비동기 함수
async function myTask(){

}
