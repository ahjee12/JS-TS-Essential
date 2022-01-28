function doException(){
    throw new Error('오류!');
}

function main(){
    try{
        doException();
    }catch(e){
        console.log(e);
    }finally{
        console.log('done');
    }

}

main();