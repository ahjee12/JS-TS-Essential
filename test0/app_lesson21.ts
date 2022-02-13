//인터페이스를 타입 같이 지정
interface Container {
    tagName: string;
    className: string;
    children?: string[];
    getTagName: () => string;
    getClassName: () => string;
}

abstract class Shape {
    public static MIN_BORDER_WIDTH = 0;
    public static MAX_BORDER_WIDTH = 30;

    public readonly name: string = 'Shape';
    protected _borderWidth: number;
    private action!: string;

    constructor(borderWidth: number =0){
        this._borderWidth = borderWidth;
    }

    //메소드란
    // 객체에 저장된 function
    //추상 메소드 abstract: 
    //class가 abstract일 때만 사용 가능!
    //하위 class가 반드시 실체적 코드 구현을 지시함!
    //형상, 속성만 제공
    abstract area: () => number;

    set borderWidth(width: number){
        //static속성이기 때문에 this. 이렇게 못 씀
        if(width >= Shape.MIN_BORDER_WIDTH && width <= Shape.MAX_BORDER_WIDTH){
            this._borderWidth = width;
        } else {
            throw new Error('borderWidth 허용 범위를 벗어난 동작을 시도했습니다.');
        }
    }
    
    get borderWidth(): number{
        return this._borderWidth;
    }
}

//extend: 모든 걸 상속 받음
class Circle extends Shape{
    //radius를 내부에서만 사용할 수 있도록 만드는 방법: 
    //읽고 쓰기 가능 & 외부 보호 -> private으로 지정 & 바깥쪽에서 사용하는 건 getter or setter
    //외부 보호만 -> readonly로 지정

    //shape에 없는 속성 : _radius
    private _radius: number
    //shape에 있는 속성 : name 
    // 속성 메커니즘:  우선 하위 class인 Circle내부에 있는 거 먼저 찾고 없으면 상위 class에서 찾음
    // 그래도 없으면 undefined
    public name: string = 'Circle';


    constructor(radius: number){
        //super: 상위class를 뜻함! 
        super();
        this._radius = radius;
    }

    get radius(){
        return this._radius;
    }
    
    area = () => this._radius * this._radius * Math.PI;
}  

class Rect extends Shape {
    private _width: number;
    private _height: number;

    constructor(width: number, height:number){
        super();

        //초기화
        this._width = width;
        this._height = height;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    area = () => this._width * this._height;
}

const circle = new Circle(50);
const rect = new Rect(150, 200); 

console.log(rect.borderWidth);
console.log(rect.name);
console.log(circle.name);

try{
    rect.borderWidth = 10;
} catch(e){
    console.error(e);
}

//클래스 자체를 설계하는 설계도
//타입을 지정할 땐 일반적으로
//class MyContainer: 타입명 {}
class MyContainer implements Container{
    //private, protected은 interface에 기술 안 함
    //private name: string
    tagName: string; 
    className: string;

    constructor(tagName:string, className:string){
        this.tagName = tagName;
        this.className = className;
    }

    getTagName = () => this.tagName;
    getClassName = () => this.className;
}

console.log('done');

//public: 인스턴스 객체에 그대로 드러나서 사용할 수 있는 것
//private: 해당 클래스에서만 통용! 하위, 상위 class에서 모두 접근 불가 오직 자체 class에서만!
//protected: 상속 하위class에서도 접근 가능
// '!'지시어: 값 생략 가능 