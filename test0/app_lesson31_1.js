//
function double(x){
    return x*2;
}
//동기 코드 - 순차적 실행 
//위 라인이 실행되는 동안 아래 라인이 실행될 수 없는 것
//앞 코드 다음 코드가 묶여 있음
const x = double(100);
const y = x;

function calcValue(a, b, cb){
    setTimeout(() => {
        cb(a + b);
    }, 100)
}

//★비동기 코드 - 순차적으로 실행이 안 됨★
//0.1초 지나기 전 이미 const j = v 실행됨
//v = undefined
const v = calcValue(10,20);
const j = v;

//비동기 callback 함수 - 여러개 있으면 복잡해짐 -> Promise 등장
//안쪽 callback함수가 실행된 순서는 const m = c보다 늦음
const c = calcValue(10, 20, (result) =>{console.log(result)})
const m = c;

const r = calcValue(10, 20, (result) => {
    console.log(result);
});
const z = r;

