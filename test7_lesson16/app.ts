// 객체 문법
type Box = {
    width:number;
    height:number;
    borderRadius:number;
    backgroundColor:string;
    //있을 수도 없을 수도 
    borderWidth?: number;
    //속성명을 값으로 취급
    ['className']?: string;
}

let box: Box = {
    width:200,
    height:200,
    borderRadius:5,
    backgroundColor:'red',
}

// 함수 이용
function makeBox(
    width:number,
    height:number,
    borderRadius:number,
    backgroundColor:string,
) : Box {
    //쉼표는 속성
    //key: value 생략법
    //인자로 데이터를 받아서 
    return {
        width,height,borderRadius,backgroundColor
    }; 
}
//--> 차이점 
//힘수 이용할 때 
//함수 사용 목적: 복제, 수정하기 좋음 
makeBox(100, 100, 0, 'blue');

//-----------------------------------------------------------

// 클래스 이용
class Shape implements Box{
    width:number;
    height:number;
    borderRadius:number;
    backgroundColor:string;

    constructor(
        width:number,
        height:number,
        borderRadius:number,
        backgroundColor:string,
    ) {
        this.width = width;
        this.height = height;
        this.borderRadius = borderRadius;
        this.backgroundColor = backgroundColor;
    }
}

const boxShape = new Shape(10, 10, 0, 'blue');

//-----------------------------------------------------------

// 객체 변형
box.borderRadius = 10;
box['className'] = 'box rounded';

//동적 바인딩
//typescript는 바로 안됨 type에 color type넣어야 함
//box.color = 'blue'

const box1 = box;

//객체 복사: 참조 아닌 기존 객체를 본 딴 객체를 새로 만들고 싶을 때

//첫 번째 입력에 된 객체/ 그 뒤로 주어진 객체 모두를 첫 번째 객체에 결합 후 리턴
//빈 객체 {}, 추가하고 싶은 객체
const box2 = Object.assign({}, box);
//★★전개 연산자★★
//빈 객체 {...기존 객체, }
const box4 = {...box, borderRadius: 10};
// JSON.stringify 
const box3 = JSON.parse(JSON.stringify(box));

