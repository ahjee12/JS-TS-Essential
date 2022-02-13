function double(x) {
    return x * 2;
}

const doubleV2 = (x) => {
    return x * 2;
}

class Double {
    x;

    constructor(x){
        this.x = x;
    }

    getValue(){
        return this.x * 2;
    }
}

const d = new Double(10);

d.getValue();