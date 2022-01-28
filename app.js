const container = document.getElementById('root')
const ajax = new XMLHttpRequest();
const content = document.createElement('div')
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENTS_URL = 'https://api.hnpwa.com/v0/item/@id.json'

const store = {
  currentPage: 1,
  feeds: [],
}


function getData(url) {
  ajax.open('GET', url, false); 
  ajax.send();

  return JSON.parse(ajax.response);
}

function makeFeed(feeds){
  for(let i = 0; i <feeds.lengh; i ++){
    feeds[i].read = false;
  }

  return feeds;
}

//이벤트 hashchange 
function newsDetail(){
  //해당 해시 id 위치!
  console.log('해시가 변경됨');
  const id = location.hash.substr(7)
  console.log(id);

  const newsContent = getData(CONTENTS_URL.replace('@id', id));
  console.log(newsContent);

  // const title = document.createElement('h1');

  // title.innerHTML = newsContent.title;
  // content.appendChild(title);

  // container.innerHTML = `
  //   <h1>${newsContent.title}</h1>

  //   <div>
  //     <a href="#/page/${store.currentPage}">목록으로</a>
  //   </div>
  // `;

  let template = `
    <div class="bg-gray-600 min-h-screen pb-8">
      <div class="bg-white text-xl">
          <div class="flex justify-between p-6">
            <div>
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div>
              <a href="#/page/${store.currentPage}" class="text-gray-500">
                <i class="fa fa-times"></i>
              </a>
            </div>
          </div>
      </div>

      <div class="h-full border rounded-xl bg-white m-6 p-4">
        <h2>${newsContent.title}</h2>
        <div class="text-gray-400 h-20">
          ${newsContent.content}
        </div>

        {{__comments__}}

      </div>
    </div>
  `;

  for(let i = 0; i <store.feeds.length; i ++){
    //const id = location.hash.substr(7)
    if(store.feeds[i].id === Number(id)){
      store.feeds[i].read = true;
      break;
    }
  }

  function makeComment(comments, called = 0) {
    const commentString = []
    // let called = 0
    // console.log(called)
    for(let i = 0; i < comments.length; i++){
      commentString.push(
        `
        <div style="padding-left: ${called * 40}px;" class="mt-4">
          <div class="text-gray-400">
            <i class="fa fa-sort-up mr-2"></i>
            <strong>${comments[i].user}</strong> ${comments[i].time_ago}
          </div>
          <p class="text-gray-700">${comments[i].content}</p>
        </div>      
      `);

      //comments[i]는 댓글
      //comments[i].comments는 대댓글
      if(comments[i].comments.length > 0){
        // called ++;
        commentString.push(makeComment(comments[i].comments, called + 1))
        console.log(called)
      }
    }

    return commentString.join('');

  }

  template = template.replace('{{__comments__}}', makeComment(newsContent.comments));
  container.innerHTML = template;
  // container.innerHTML = template.replace('{{__comments__}}', makeComment(newsContent.comments));

}//newsDetail

//라우터에게 줌
// window.addEventListener('hashchange', newsDetail)

window.addEventListener('keydown', (event)=>{
  // event.defaultPrevented()
})



function newsFeed() {
  // const newsFeed = getData(NEWS_URL);
  // let newsFeed ='';
  let newsFeed = store.feeds
  // const ul = document.createElement('ul');
  const newsList = [];
  let template = `
    <div class="bg-gray-600 min-h-screen">
      <div class="bg-white text-xl">
        
          <div class="flex justify-between items-center py-6 px-4">
              <div class="flex justify-start">
                <h1 class="font-extrabold">해커 뉴스</h1>
              </div>
              <div class="items-center justify-end">
                <a href="#/page/{{__prev_page__}}" class="text-gray-500">이전 페이지</a>
                <a href="#/page/{{__next_page__}}" class="text-gray-500">다음 페이지</a>
              </div>
          </div>
        
      </div>
      <div class="p-4 text-2xl text-gray-700">
        {{__news_feed__}}
      </div>
    </div>
  `;
  //의미 no
  // newsList.push('<ul>');
  if(newsFeed.length === 0){

    //getData로 데이터 불러오는 게 배열임!
    newsFeed = store.feeds = makeFeed(getData(NEWS_URL))
  }


  for(let i = (store.currentPage -1)*10 ; i < store.currentPage*10; i++) {
    //태그 create먼저

    // const li = document.createElement('li');
    // const a = document.createElement('a');
    // const div = document.createElement('div')

    //하나 하나 appendChild/ ul.appendChild -> 한꺼번에 div에 innerHTML/ ul.appendChild -> List배열 처음과 끝 List.push ul 또는 아예 template  
    // ---> 셋 다 최종 container.innerHTML

    // a.href = `#${newsFeed[i].id}`;
    // a.innerHTML = `${newsFeed[i].title}(${newsFeed[i].comments_count})`;

    // a.addEventListener('click',function(){})
    // li.appendChild(a)
    // ul.appendChild(li);

    //배열로!
    // div.innerHTML = 
    // `<li>
    //   <a href = "#${newsFeed[i].id}">
    //     ${newsFeed[i].title}(${newsFeed[i].comments_count})
    //   </a>
    // </li>`

    //flex-auto : flex: 1 1 auto
    newsList.push(
      `<div class="p-6 ${newsFeed[i].read ? 'bg-red-500': 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100"> 
        <div class="flex">
          <div class="flex-auto">
            <a href = "#/show/${newsFeed[i].id}">
              ${newsFeed[i].title}
            </a>
          </div>
          <div class = "text-center text-sm">
            <div class = "w-10 text-white bg-green-300 rounded-lg px-0 py-2">
              ${newsFeed[i].comments_count}
            </div>
          </div>
        </div>
        <div clas= "flex">
          <div>
            <div class="flex mt-3">
              <div class="grid grid-cols-3 text-sm text-gray-500">
                <div>
                  <i class = "fas fa-user mr-1">${newsFeed[i].user}</i>
                </div>
                <div>
                  <i class = "fas fa-heart mr-1">${newsFeed[i].points}</i>
                </div>
                <div>
                  <i class = "fas fa-clock mr-1">${newsFeed[i].time_ago}</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`  
    )

    //두 가지 다 됨
    // ul.appendChild(div.children[0])
    // ul.appendChild(div.firstElementChild)

    
}
//뉴스 피드에 뉴스 리스트 배열 넣기
template = template.replace('{{__news_feed__}}', newsList.join(''))
// newsList.push(`</ul>`)
// container.appendChild(ul);
// container.appendChild(content);

//의미 no
// newsList.push(
// `
//   <div>
//     <a href="#/page/${store.currentPage - 1 >1 ? store.currentPage -1 : 1 }">이전 페이지</a>
//     <a href="#/page/${store.currentPage + 1}">다음 페이지</a>
//   </div>
// `
// )
template = template.replace('{{__prev_page__}}', store.currentPage - 1 >1 ? store.currentPage -1 : 1)
template = template.replace('{{__next_page__}}', store.currentPage + 1)
container.innerHTML = template

}//newsFeed



function router(){
  // newsFeed();
  const routePath = location.hash;

  // #/page/${store.currentPage}
  //맨 처음 hash 없을 떄, 목록으로
  //href에 #만 있는 경우 빈값을 반환해서  routePath === ''이 참이 됨 
  if(routePath === ''){
    newsFeed()

  //#/page/ 이전 , 다음 페이지
  //newsFeed 함수 호출 전, 이전 다음 페이지 버튼에 있는 hash 번호가 뭔지가 중요!
  }else if(routePath.indexOf('#/page/')>=0){
    // console.log(routePath.indexOf('#/page/'));
    //문자열로 반환
    // routePath: #/page/id  에서 #포함 7번째
    store.currentPage = Number(routePath.substr(7));
   
    newsFeed()

    // 이렇게 하면 클릭하는 버튼 hash 번호와 똑같이  
    // console.log(store.currentPage)
    // store.currentPage>1 ? store.currentPage : store.currentPage + 1 
    // console.log(store.currentPage)

  //★ #/show/ 타이틀 ★
  }else{
    newsDetail()
  }

}//router

//헤시 체인지 경우의 수가 타이틀 클릭했을 때만 있는 경우  바로 newsDetail()로 가면 됐음
//but, 체인지 경우의 수가 2개 이상돼서 router가 필요해짐
window.addEventListener('hashchange', router)

router()
