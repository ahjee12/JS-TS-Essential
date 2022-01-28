function makeInfiniteEnergyGenerator(){
    let energy = 0;
    return function (booster = 0){
        if(booster){
            energy += booster;
        } else {
            energy++;
        }

        return energy;
    };
}

function* infiniteEnergyGenerator() {
    let energy = 1;
    while(true){
        const booster = yield energy;

        if(booster){
            energy += booster;
        } else {
            energy++;
        }
    }
}

const energy = makeInfiniteEnergyGenerator();

for(let i =0; i<5; i++){
    console.log(energy());
}

console.log(energy(5));

// const energyGenerator = infiniteEnergyGenerator();


// for(let i =0; i<5; i++){
// yield는 value: , done: true or false return함!
//     console.log(energyGenerator.next());
// }
// next()로 인자 값 전달하면 yield energy에 들어가서 booster에 값을 전달 
// console.log(energyGenerator.next(5))


/*★★★변수에 넣어지든 단독 호출이든, a()호출되는 순간, 
function작동(진행)함!!
변수 = 함수 일 경우
변수에 함수 return값이 저장됨
★★★★★★★★★★★★★★★★*/
// function a() {
  
//     alert('A!');

//     function b(){
//         alert('B!'); 
//     }

//     return b;
// }

// var s = a();
// alert('break');
// s();
// a();