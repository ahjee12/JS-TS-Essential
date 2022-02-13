function main(){
    const BUBBLING_PHASE = false;
    const CAPTURING_PHASE = true;
    const PHASE_NAME = ['NONE', 'CAPTURING', 'TARGET', 'BUBBLING']

    function eventLogger({target, currentTarget, eventPhase}){
        console.log(`${target.dataset.name}, ${currentTarget.dataset.name}, ${PHASE_NAME[eventPhase]}`);
    }

    let divs = document.querySelectAll('div');
    //마지막 인자가 false일 때, target(안쪽) -> currentTarget(바깥쪽)
    //true일 때, target(바깥쪽) -> currentTarget(안쪽)
    divs.forEach(div => div.addEventListener('click', eventLogger, BUBBLING_PHASE));
}

document.addEventListener('DOMContentLoaded', main);