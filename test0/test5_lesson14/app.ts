function delay(ms: number) : Promise<string> {
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            //짝수
            if(Math.floor(Math.random() *10) % 2 ===0){
                resolve('success');
            } else {
                reject('failure');;
            }
        }, ms);
    });
}

//promise패턴이지만 then, catch에서 callback함수를 제공해야 함
delay(3000)
    .then((result: string) =>{
        console.log('done promise' + result);
    })
    .catch((error: string) =>{
        console.error('fail promise!' + error);
    });

//동기코드처럼 비동기코드 쓰기
//함수에 async
// 
async function main(){
    try{
        console.log('start job')
        //peomise를 반환하는 함수 앞에 
        const result = await delay(3000);
        //callback함수가 아닌데도 3초 지나 다음 라인으로 넘어감
        //동기함수 같았음 바로 실행됨
        console.error('done async!' + result);
    } catch(e) {
        console.error('fail async' + e);
    }
}

main();