Array.prototype.MyMap = function(cb){
    let arr = [];

    for(let i=0; i < this.length; i++){
        arr.push(cb(this[i], i , this));
    }

    return arr;
}

[1,2,3].MyMap((n) => n * 2)


/*
많은 메소드는 콜백 함수를 인자로 받음
객체 하나에 메소드 연결
Array.prototype.MyMap = function(cb){
    let arr = [];
    
    for(let i = 0; i <this.length; i++){
        arr.push(cb(this[i], i, this))
    }

    return arr;
}
*/

















