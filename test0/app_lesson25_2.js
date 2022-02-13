function increment(){
    let saveNumber = 1;
    return function() {
        //함수 바깥에 있는 변수에 접근
        // 클로저라는 특별한 공간에 저장함
        return saveNumber++;
    }
}

const inc = increment();
console.log(inc) //ƒ() {return saveNumber++;}, 클로저에 여전히 저장돼 있음  
console.log(inc());
console.log(inc());
console.log(inc());

//saveNumber는 지역변수인데 어떻게 살아나는 걸까

// saveNumber = 200;

//typescript에서는 간단
// class MyObj {
//     Private saveNumber: Number;
// }