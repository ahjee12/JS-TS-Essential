let saveNumber = 1;

function increment(){
    // let saveNumber = 1;
    // return function(){
    //     return saveNumber++
    // }
    return saveNumber++;
}

console.log(increment());
console.log(increment());

saveNumber = 200;

console.log(increment());