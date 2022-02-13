type UniqObject = {
    id: string;
    [key: string]: string | number | boolean;
}

const makeObject = (): UniqObject => ({
    id: '1234',
})

console.log(makeObject());
console.log(makeObject());

// npm install @types/uuid

