function calculateCircleArea(radius){
    return radius * radius * Math.PI;
}

function calculateRectArea(width, height){
    return width * height;
}

// circle 클래스
class Circle {
    //클래스 내부 샾: class 내부 private 속성이라는 의미!
    //외부에서 Circle.#radius 이렇게 못씀
    #radius;

    constructor(radius){
        this.#radius = radius;
    }
    get radius(){
        return this.#radius;
    }

    area = () => this.#radius * this.#radius * Math.PI;
}

// rect 클래스
class Rect {
    #width;
    #height;

    constructor(width, height){
        this.#width = width;
        this.#height = height;
    }

    get width(){
        return this.#width;
    }

    get height(){
        return this.#height;
    }

    area = () => this.#width * this.#height;
}

const circle = new Circle(50);
const rect = new Rect(150,200);

 
console.log(calculateCircleArea(circle.radius));
console.log(calculateRectArea(rect.width, rect.height));

//객체가 스스로의 행위까지 포함하고 있으면 사용자 입장에서 사용하기 좋음
//코드 심플
//타입스크립트는 private, protected
console.log(circle.area())
console.log(rect.area())