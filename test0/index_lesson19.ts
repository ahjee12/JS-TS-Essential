type Book = {
    title: string;
    copyright?: string;
    author?: string;
};

const books: string[] = [
    "헨리 6세",
    "리처드 3세",
    "실수 연발",
    "말괄량이 길들이기",
    "헨리 8세",
];

//for문 반복문  if문 등과 달리 문이 아니라 식임!
books.forEach((book: string, idx: number, books: string[]) => {
    console.log(book, idx);
})


const bookObject: Book[] = books.map((book:string) =>{
    return {
        title:book,
        author: undefined,
    };
});

console.log(bookObject);
 
//map을 연결하는 이유: 
const ShakespeareOneBooks: Book[] = books.map((book: string) => ({
    title:book
}))
.map((book: Book) => ({
    ...book,
    author: "William Shakespeare"
}));

console.log(ShakespeareOneBooks);

const bookTitleToBookObject = (book: string) => ({title: book});
const makeAuthor = (name: string) => (book: Book) => ({
    ...book,
    author: name
});

const shakespeareTwoBooks: Book[] = books
.map(bookTitleToBookObject)
.map(makeAuthor("William Shakespeare"));

console.log(shakespeareTwoBooks);


const henry: Book[] = shakespeareTwoBooks.filter((book: Book) =>
    book.title.includes("헨리")
);

console.log(henry);

const someNumbers: number[] = [10,5,3,14,56];

const someNumber = someNumbers.reduce((a:number, b:number) => a + b , 0)

console.log(someNumber);

type SomeObject = {
    [key: string]: string | number;
};

const someObjects: SomeObject[] = [
    { border: "none"},
    { fontSize: 24},
    {className: "box sm-box"},
];

const someObject: SomeObject = someObjects.reduce(
    (a: SomeObject, b: SomeObject) => ({...a, ...b}),
    {}
);
console.log(someObject)

function sumNumbers(): number{
    //return arguments.reduce... 이렇게 치면 오류!
    // arguments는 유사 배열임, 배열과 같은 자료 구조(순서 있음, 몇 개 있는지 알 수 있음)이지만 
    // map, filter, reduce, forEach 메소드 못 씀
    return Array.from(arguments).reduce((a:number, b:number) => a + b, 0);
}

// console.log(sumNumbers(10,20,30,40,50))

function sumNumbersForTypeScript(...args: number[]) : number{
    return args.reduce((a:number, b:number) => a + b , 0);
}

console.log(sumNumbersForTypeScript(10,20,30,40,50))