//js 객체와 비슷하게 생김
//js 객체 변환 용도로 만들어 졌음
//문자열 더블 쿼드 써야함!!!
//데이터를 주고 받기 위해 만들어짐
//문자열, 숫자, 배열, 객체, boolean 타입 지원
//함수 지원 안 함!!
//문자열에 오류가 일어날 경우 
const jsonString = `
    {
        "name": "Kim min tae",
        "age": false,
        "bloodType": 'B'
    }
`;



//json 오류 일어날 경우 대비 try catch 써야함 
try{
    //json -> 객체로 변환, 
    const myJson = JSON.parse(jsonString);
    
    //업데이트용
    console.log(myJson.name);
    
    //객체 -> json 문자열로 변환/ 서버에 전송 또는 DB에 저장 
    console.log(JSON.stringify((myJson)));

} catch(e){
    console.log('다시한번 시도해 주세요.')
}