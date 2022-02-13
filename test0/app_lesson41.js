//1. 배열 연산
//인자에 고정된 인자 넣는 경우 1. 해당 함수에 인자 전달할 때 넣으면 번잡해짐
// 2. 안 넣어도 되는 걸 넣을 떄? + 함수 내에서 그 인자를 두 번 이상 쓸 때 수정 간편
//map안에 map 넣어야 하는 경우 1. 그래야 함
//  text.split(splitter) 실행 후 [0: KIM 1: MIN 2: TAE]
// .map((word, wi)=> word.split('')) 실행 후 0,......,
//1. 전에 썼던 인자 쓸 일 있을 때?

//★★Q. 힌 즐 return 표시 없는 arrow function만 가능 
const simpleCamel = (text, splitter = ' ') => text.split(splitter)
                        .map((word, wi)=> word.split('')
                            .map((c, ci) => wi >0 && ci === 0 ? c.toUpperCase() :c.toLowerCase())
                            .join(''))
                        .join('');


//2. 반복문                        
function convertCamelName(name){
    let camelName = '';

    for(let i =0, newSpace = false; i < name.length; i++){
        if(name[i] == ' '){
            newSpace = true;
            continue;
        }

        if(newSpace){
            camelName = camelName + name[i].toUpperCase();
            newSpace = false;
        } else {
            camelName = camelName + name[i].toLowerCase();
        }
    }

    return camelName;
}

const camelName1 = convertCamelName('Kim min tae');
const camelName2 = simpleCamel('KIM MIN TAE');

console.log(camelName1);
console.log(camelName2);

//continue는 다음 if문 줄여주는 역할
