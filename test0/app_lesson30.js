
//전역 스코프
let myname = 'kim';

function foo() {
    let x = 10;

    console.log(myname);
    console.log(x);

    //호이스팅 메커니즘 
    //함수 먼저 만들어진 다음에 호출됨
    bar();
    //함수 식에는 적용 안 됨
    zoo();

    //스코프: 안쪽에서 바깥쪽으로 접근 가능 
    function bar(){
        let y = 10;

        console.log(x); // 10 
        console.log(myname); //'Kim'
    }

    //함수식
    const zoo = function(){

    };

    if(x ===10){
        let x = 100;

        console.log(x);
    }

    bar();
}

foo();
console.log(x);
