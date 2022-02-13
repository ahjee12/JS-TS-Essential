const sourceObject = {
    a:1,
    b:2,
    c:3,
    d:4,
    e:5,
};

const targetObject = {
    aGroup:{
        a:1,
        b:2,
    },
    bGroup:{
        c:3,
        d:4,
        e:5,
    }
};

const groupInfo = {
    aGroup: ['a', 'b'],
    bGroup: ['c', 'd', 'e'],
};

//1.인자로 키값 전달 받을 때 info.group 이런 표현 안됨 info[group]으로 쓰기!
//[group] : info[group]
//2. 객체 return시 많이 보게 되는 표현
// {return { : }} 보단 ({ : })
function makeGroup(source, info){
    const merge = (a, b) => ({...a, ...b});
    // console.log(Object.keys(info));
    return Object.keys(info)
        .map(group => ({ [group] : info[group]
            .map(k => ({ [k]: source[k]}))
            .reduce(merge, {}) //{aGroup: {a: 1, b: 2}} /{bGroup: {c: , d: , e: }}
        }))
        .reduce(merge, {}); //{aGroup: {a: 1, b: 2}, bGroup: {c: , d: , e: }}
}

console.log(makeGroup(sourceObject, groupInfo))