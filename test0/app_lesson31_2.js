const p = new Promise((resolve, reject) => {
    //동기적 상황
    // resolve('OK');
    //비동기적 상황 
    setTimeout(() =>{
        resolve('OK');
        // reject('실패');
    },2000)
});

// p.then(function(ok){
//     console.log(ok);
// }).catch(function(error){
//     console.log(error)
// })

//p 객체가 가지고 있는 then 메소드 
//then메소드에 인자로 함수로 받음
//성공하면 resolve가 인자로 받아 then메소드로 전달
//실패하면 reject가 인자로 받아 then에소드에 전달
p.then((ok) => {
    console.log(ok)
}).catch((error) =>{
    console.log(error)
})

//장점: callback 하나일 때는 더 복잡해 보이지만 여러 비동기 상황을 순차적으로 엮을 때 좀더 단순해짐 
p.then(function(ok){
    console.log('첫번째 성공')
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve('두번째 성공');
        },3000)
    })
})
.then(function(ok){
    console.log(ok)
})

.catch(function(error){
    console.log(error)
})

