//대문자 이유: 함수 사용 시 new 호출 필요하다는 걸 표시!!
function CartV1(){
    this.cart = [];
    this.currentId = 0;
    //this.__proto__ = CarV1.prototype;
}

//인스턴스 객체 맴버들은 위 함수 바깥에 있음 불편함
//인스턴스 객체에 등장하게 될 메소드
CartV1.prototype.getNewId = function(){
    this.currentId++;
    return this.currentId;
}

//인스턴스에는 드러나지 않음
CartV1.createItem = function(name, price){
    return {name,price}  
}

CartV1.prototype.addItem = function(item){
    this.cart.push({
        ...item,
        id: this.getNewId(), 
    });
};

CartV1.prototype.clearCart = function(item){
    this.cart = [];
    this.currentId = 0;
};

//class가 아닌 함수에 사용하고 있음
//new 연산자를 함수 호출 앞에서 사용하게 되면,
//암묵적 메커니즘 작동
// 1. 빈 객체를 CartV1에게 전달
// this객체는 새로 만들어진 인스턴스 객체
// 2. CartV1의 prototype속성을 this 객체의 __prototype__에 할당
// 3. 함수 종료 시 , this객체를 리턴하게 돼 있음
// shoppingCartV1  = this. t

//new연산자는 함수를 제어할 수 없음, new없어도 오류 안 뜸 
//const shoppingCartV1 =  CartV1();
//new 안 쓰면 빈 객체 전달 못 함
//this가 전역 객체인 window를 가리키게 됨!
const shoppingCartV1 = new CartV1();

shoppingCartV1.addItem(CartV1.createItem('수박', 8000));
shoppingCartV1.addItem(CartV1.createItem('사과', 12000));
shoppingCartV1.addItem(CartV1.createItem('두부', 2000));

console.log(shoppingCartV1.cart);

class CartV2 {
    static createItem = (name, price) => ({
        name, price
    });

    cart;
    currentId;

    constructor(){
        this.currentId = 0;
        this.cart = [];
    }

    getNewId = () => {
        this.currentId++;
        return this.currentId;
    }

    addItem = item => {
        this.cart.push({
            ...item,
            id: this.getNewId(),
        });
    }

    clearCart = () =>{
        this.currentId = 0;
        this.cart = [];
    }
}

const shoppingCartV2 = new CartV2();

shoppingCartV2.addItem(CartV2.createItem('수박', 8000));
shoppingCartV2.addItem(CartV2.createItem('사과', 12000));
shoppingCartV2.addItem(CartV2.createItem('두부', 2000));

console.log(shoppingCartV2.cart);