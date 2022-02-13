const userName = 'Kim mintae';
const bolder = text => `<b>${text}</b>`;


console.log(`HI~ ${userName}`);

console.log(`HI~ ${bolder(userName)}`);

function div(strings, ...fns){
    const flat = s => s.split('\n').join('');

    return function (props){
        return `<div style="${flat(strings[0]) + (fns[0] && fns[0](props)) + flat(strings[1])}"</div>`
    }
}

//tagged tamplate
//``부분:  div 함수에 첫 번째 인자로 전달
//※`` 부분이 쪼개져서 string 배열에 들어감!! - 달러 브레이스 기준으로 쪼개짐
//달러 브레이스 ${} : 나오는 순서대로 다음 인자로 전달
const Div = div`
    font-size: 20px;
    color: ${props => props.active ? 'white' : 'gray'};
    border: none;
`;

console.log(Div({ active: false }))