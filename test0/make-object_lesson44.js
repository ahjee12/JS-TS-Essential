class HeaderListData {
    //new 연산 인자 받는 곳 or 하위 클래스 
    constructor(source, separator = ','){
        const rawData = source.split('\n');
        //split는 쪼개는 역할 정도만 함!! 들어오는 순서대로 쪼개고 배열로 감싸기
        //rawData: ['', '', '', '']/ length: 4
        
        this.headers = rawData[0].split(separator);
        //length: 1
        this.rows = rawData.filter((row, index) => index > 0)
                           .map(row => row.split(separator));
        //this.rows: [['보헤', '2018',  '11%', '싱어'], ... ,[, , , , ]]/ length: 3
        
    }

    //index: 
    row = index => this.rows[index]
        .map((row, index) =>[ this.headers[index], row]);
         //[[, '보헤'], [, '2018'], [, '11%'], [, '싱어']], 

    get length (){
        return this.row.length
    }

    get columnLength(){
        return this.headers.length;
    }
}

//객체 
//생성자 없는 경우 부모 클래스 생성자 사용
export default class MakeObject extends HeaderListData{
    //생성자 없는 경우, 상위 클래스 것을 상속 받음
    //인자에 배열 또는 객체가 오면 구조분해 할당 가능
    //메소드
    toObject = index => this.row(index)
                            .reduce((a, [key,value]) => ({...a, [key]: value}),{});

    //메소드
    //Array(this.length): length 길이의 빈 배열 return 
    toAllObject = () =>Array(this.length)
                        .fill(0)
                        .map((item, index) => this.toObject(index))
}
//reduce((previousValue, currentValue, currentIndex, array) => { /* ... */ }, initialValue)