interface Store {
  currentPage: number;
  feeds: NewsFeed[];
}

interface News {
  readonly id: number;
  readonly time_ago: string;
  readonly title: string;
  readonly url: string;
  readonly user: string;
  readonly comments_count: number;
}

interface NewsFeed extends News {
  readonly points: number;
  read?: boolean;
}

interface NewsDetail extends News {
  readonly points: number;
  readonly content: string;
  readonly comments: NewsComment[];
}
 
interface NewsComment extends News {
  readonly content: string;
  readonly comments: NewsComment[];
  readonly level: number;                          
}  

const container: HTMLElement | null = document.getElementById('root');
const ajax: XMLHttpRequest = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const store: Store = {
  currentPage: 1,
  feeds: [],
};

//mixins 왜 사용? 
//유연성
//다중 상속 지원 : api하나 뿐만 아니라!! api1, api2, 등 가능!!  
function applyApiMixins(targetClass: any, baseClass: any[]): void{
  baseClasses.forEach(baseClass => {
    Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
      const descriptor = Object.getOwnPropertyDescriptor(baseClass.prototype, name);
      
      if (descriptor) {
        Object.defineProperty(targetClass.prototype, name, descriptor);
      }            
    });
  });
}

//mixin은 생성자 없음
class Api {
  // url: string;
  // ajax: XMLHttpRequest;

  //생성자 초기화
  // constructor(url: string){
  //   this.url = url;
  //   this.ajax = new XMLHttpRequest()
  // }

  //★하위 class에서 사용★할 용도로 만든 메소드 
  //prtected 왜 씀: getRequest는 바깥쪽에서 호출할 필요 없음 
  //extends 일 때는 생성자 값을 다른 함수에서 전달하고 this로 가져오면 됐음 but mixin은 허위 class에서 직접 인자 가져와야 함
  getRequest<AjaxResponse>(url: string): AjaxResponse {
    const ajax = new XMLHttpRequest()
    ajax.open('GET', url, false);
    ajax.send();
  
    return JSON.parse(ajax.response);
  }
}

class NewsFeedApi{
  getData(): NewsFeed[]{
    //A
    // ajax.open('GET', url, false);
    // ajax.send();
  
    // return JSON.parse(ajax.response);
    // 상위 클래스api에서 만든 생성자를 가자고 만든,
    // getRequest 메소드
    // return this.getRequest<NewsFeed[]>()

    return this.getRequest<NewsFeed[]>(NEWS_URL)
  }
}

class NewsDetailApi {
  getData(id: string): NewsDetail[]{
    // ajax.open('GET', url, false);
    // ajax.send();
  
    // return JSON.parse(ajax.response);
    // return this.getRequest<NewsDetail[]>()

    return this.getRequest<NewsDetail[]>(CONTENT_URL.replace('@id', id))
  }
}

// 이렇게까지 extends쓰면 mixin은 왜 쓰는가?
// 보통은 class extends로 충분 
interface NewsFeedApi extends Api{}
interface NewsDetailApi extends Api{}

// 하위 class, 상위 class
// target class, base class
applyApiMixins(NewsFeedApi, [Api])
applyApiMixins(NewsDetailApi, [Api] )
// 호출받는 함수에서  
// function getData(url: string): NewsFeed[] | NewsDetail[ ] {
//   ajax.open('GET', url, false);
//   ajax.send();

//   return JSON.parse(ajax.response);
// }

// 호출하는 쪽에서 유형 명시
// function getData<AjaxResponse>(url: string): AjaxResponse {
//     ajax.open('GET', url, false);
//     ajax.send();
  
//     return JSON.parse(ajax.response);
// }
  

function makeFeeds(feeds: NewsFeed[]): NewsFeed[] {
  for (let i = 0; i < feeds.length; i++) {
    feeds[i].read = false;
  }

  return feeds;
}


function updateView(html: string): void{
  if(container != null){
    container.innerHTML = html;
  }else{
    console.error('최상위 컨테이너가 없어 UI를 진행하지 못합니다')
  }
}

function newsFeed(): void { 
  //const NEWS_URL
  //extend는 바깥 함수에서 url전달 -> 하위 class this -> 상위 class
  //extends 상위 class에서는 general하게 써줘야 해서 url특정해서 못 씀!
  //mixin은 extends처럼 하위class에서 this로 못 받음 , 하위class에서 직접 url전달 
  // const api = new NewsFeedApi(NEWS_URL)

  let api = new NewsFeedApi()
  let newsFeed: NewsFeed[] = store.feeds;
  const newsList = [];
  let template = `
    <div class="bg-gray-600 min-h-screen">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                Previous
              </a>
              <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
                Next
              </a>
            </div>
          </div> 
        </div>
      </div>
      <div class="p-4 text-2xl text-gray-700">
        {{__news_feed__}}        
      </div>
    </div>
  `;

  if (newsFeed.length === 0) {
    //getDate api호출을 위해 사용
    //getRequest api class, ★하위 class에서 사용★할 용도로 만든 메소드 
    //getRequest는 바깥쪽에서 호출할 필요 없음 
    // newsFeed = store.feeds = makeFeeds(api.getData(<NewsFeed[]>(NEWS_URL)));
    newsFeed = store.feeds = makeFeeds(api.getData());
    console.log(newsFeed)
  }

  for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
      <div class="p-6 ${newsFeed[i].read ? 'bg-red-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
        <div class="flex">
          <div class="flex-auto">
            <a href="#/show/${newsFeed[i].id}">${newsFeed[i].title}</a>  
          </div>
          <div class="text-center text-sm">
            <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${newsFeed[i].comments_count}</div>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="grid grid-cols-3 text-sm text-gray-500">
            <div><i class="fas fa-user mr-1"></i>${newsFeed[i].user}</div>
            <div><i class="fas fa-heart mr-1"></i>${newsFeed[i].points}</div>
            <div><i class="far fa-clock mr-1"></i>${newsFeed[i].time_ago}</div>
          </div>  
        </div>
      </div>    
    `);
  }

  template = template.replace('{{__news_feed__}}', newsList.join(''));
  template = template.replace('{{__prev_page__}}', String(store.currentPage > 1 ? store.currentPage - 1 : 1));
  template = template.replace('{{__next_page__}}', String(store.currentPage + 1));
  
  updateView(template)
  
}

function newsDetail(): void {
  const id = location.hash.substr(7);
  // 하위 class 자체에 인자 전달하면
  // const api = new NewsDetailApi(CONTENT_URL.replace('@id', id))

  const api = new NewsDetailApi()
  // const newsContent = getData<NewsDetail[]>(CONTENT_URL.replace('@id', id))
  // 하위 class 에 있는 선택된 함수에 인자 전달됨 -> this.메소드-
  // 상위 class에 인자 전달
  // 상위 class 해당 메소드로 값 나옴
  const newsContent = api.getData()
  let template = `
    <div class="bg-gray-600 min-h-screen pb-8">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/${store.currentPage}" class="text-gray-500">
                <i class="fa fa-times"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="h-full border rounded-xl bg-white m-6 p-4 ">
        <h2>${newsContent.title}</h2>
        <div class="text-gray-400 h-20">
          ${newsContent.content}
        </div>

        {{__comments__}}

      </div>
    </div>
  `;

  for(let i=0; i < store.feeds.length; i++) {
    if (store.feeds[i].id === Number(id)) {
      store.feeds[i].read = true;
      break;
    }
  }

  updateView(template.replace('{{__comments__}}', makeComment(newsContent.comments)))
  
}

function makeComment(comments: NewsComment[]): string {
  const commentString = [];

  for(let i = 0; i < comments.length; i++) {
    const comment: NewsComment = comments[i]

    commentString.push(`
      <div style="padding-left: ${comment.level * 40}px;" class="mt-4">
        <div class="text-gray-400">
          <i class="fa fa-sort-up mr-2"></i>
          <strong>${comment.user}</strong> ${comment.time_ago}
        </div>
        <p class="text-gray-700">${comment.content}</p>
      </div>      
    `);

    if (comment.comments.length > 0) {
      commentString.push(makeComment(comment.comments));
    }
  }

  return commentString.join('');
}

function router() {
  const routePath = location.hash;

  if (routePath === '') {
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail()
  }
}

window.addEventListener('hashchange', router);

router();
