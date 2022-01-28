//객체 만드는 법 세 번째
const myObj = Object.create(null, {
    name: {
        value: 'Kim',
        writeable: true,
        configurable: false,
    },
    
})
//writeable true: 수정 / type readonly
//configuarable: true: 삭제 / type optional
myObj.name = 'Hey'