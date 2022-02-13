function add(x: number, y: number): number {
    return x + y;
}

type ObjType ={
    x: number;
    y: number;
}

// const json = `{"x": 20, "y":20}` 으로 실행 
// -> x를 문자열로 바꿈/ 런타임 상황에 있음
// => add 함수가 정상 동작하지 않음
const json = `{"x":"abc", "y":20}`;

const obj: ObjType= JSON.parse(json) as ObjType;
add(10, 20);

add(obj.x, obj.y)

