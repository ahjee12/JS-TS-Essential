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

interface RouteInfo {
  path: string;
  page: View;
}

// const container: HTMLElement | null = document.getElementById('root');
// const ajax: XMLHttpRequest = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const store: Store = {
  currentPage: 1,
  feeds: [],
};

class Api {
  url: string;
  ajax: XMLHttpRequest;

  //생성자 초기화
  constructor(url: string){
    this.url = url;            
    this.ajax = new XMLHttpRequest()
  }

  //★하위 class에서 사용★할 용도로 만든 메소드 
  //prtected 왜 씀: getRequest는 바깥쪽에서 호출할 필요 없음 
  protected getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open('GET', this.url, false);
    this.ajax.send();
  
    return JSON.parse(this.ajax.response);
  }
}

class NewsFeedApi extends Api {
  getData(): NewsFeed[]{
    //A
    // ajax.open('GET', url, false);
    // ajax.send();
  
    // return JSON.parse(ajax.response);
    // 상위 클래스api에서 만든 생성자를 가자고 만든,
    // getRequest 메소드
    return this.getRequest<NewsFeed[]>()
  }
}

class NewsDetailApi extends Api {
  getData(): NewsDetail[]{
    // ajax.open('GET', url, false);
    // ajax.send();
  
    // return JSON.parse(ajax.response);
    return this.getRequest<NewsDetail[]>();
  }
}

//1. 상속 받은 class에서 접근 2. 상속 관계 없는 바깥에서 접근
//★★★상위 class 생성자 인자는 모두 하위 class 아님 그 밖 함수에서 전달해야 함★★★★★★★★★★★★★★★
abstract class View {
  //하위 class에서 접근 불가!
  private template: string;
  private renderTemplate: string;
  private container: HTMLElement;
  private htmlList: string[];
  
  constructor(containerId: string, template: string) {
    const containerElement = document.getElementById(containerId);

    if(!containerElement){
      throw '최상위 컨테이너가 없어 UI를 진행하지 못합니다.'
    }

    this.container = containerElement;
    this.template = template;
    this.renderTemplate = template
    this.htmlList = [];
  }

  //protected 하위 class에서만 접근 가능
  protected updateView(): void{
    this.container.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
    // if(container != null){
    //   container.innerHTML = html;
    // }else{
    //   console.error('최상위 컨테이너가 없어 UI를 진행하지 못합니다')
    // }
  }

  protected addHtml(htmlString: string): void{
    this.htmlList.push(htmlString)
  } 

  protected getHtml(): string{
    const snapshot = this.htmlList.join('')
    // this.htmlList = []
    this.clearHtmlList()
    // return this.htmlList.join('')
    return snapshot; 
  }

  protected setTemplateData(key: string, value: string): void{
    //이 한 줄 코드만 있을 경우, tmeplate의 특정 key부분을 value로 바꾸고 나서 
    //원본 template이 사라지기 때문에 render용 생성자 renderTemplate 만듦
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value )
  }

  private clearHtmlList(): void{
    this.htmlList = []
  }

  //이런 규격의 메소드를 하위class에서는 반드시 구현해야 하는 의무 생김!
  abstract render(): void;

}

class Router {
  // 클래스 안 인터페이스는 constructor에서 definitely assigned in the constructor!!
  defaultRoute: RouteInfo | null;
  routeTable: RouteInfo[];

  constructor(){
    // const routePath = location.hash;
    //이벤트에서 route호출, this.route가 router의 인스턴스가 아니게 됨!!
    window.addEventListener('hashchange', this.route.bind(this));
    this.routeTable = []
    this.defaultRoute = null;
    // if (routePath === '') {
    //   newsFeed();
    // } else if (routePath.indexOf('#/page/') >= 0) {
    //   store.currentPage = Number(routePath.substr(7));
    //   newsFeed();
    // } else {
    //   newsDetail()
    // }
  }

  setDefaultPage(page: View): void{
    //ul 업데이트: render
    //viewrender -> page로 이동
    this.defaultRoute = {
      path: '',
      page: page,
    }
  }

  addRoutePath(path: string, page: View): void{
    this.routeTable.push({
      path: path,
      page: page,
    })
  }

  route(){
    const routePath = location.hash;
    if(routePath === '' && this.defaultRoute){
      this.defaultRoute?.page.render()
    }

    for(const routeInfo of this.routeTable){
      if(routePath.indexOf(routeInfo.path) >= 0){
          routeInfo.page.render()
          break;
      }
    }
  }
 
}

  //호출받는 함수에서  
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

//아래 function NewsFeed 복붙!
class NewsFeedView extends View{
  //속성
  //this 에는 속성 정의 안 돼서 여기에 쓰는 건가
   api: NewsFeedApi;
   feeds: NewsFeed[]; 
 
  //하위 class 인자 = 상위 class 인자 - 자체 정의 인자
  //외부에서 인자 받기
  constructor(containerId: string){
    let template: string = `
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
    //상위 class의 생성자를 명시적으로 호출해 줘야 함
    super(containerId, template)
    //const NEWS_URL
        
    
    //★★★★★★★★★★★★★★★★★★★★
    this.api = new NewsFeedApi(NEWS_URL)
    //Q 왜 아래 if문에서 feeds에 아무것도 없을 때 ajax 데이터 가져오는데 
    // this.feeds = store.feeds 이건 왜 있는 것인가?!!!
    // NewsDetailView render for문에서 'store.feeds[i]'read true로 바꾸는 부분 다음에 넣어도 됨
    // 여기서 NewsDetailView store feeds read true로 바뀐 거 -> this.feeds에 반영 
    // makeFeeds() 꼭 필요한가? store만 있어도 되지 않나?
    this.feeds = store.feeds; 
    // const newsList = [];

    if (this.feeds.length === 0) {
      //getData api호출을 위해 사용
      //getRequest api class, ★하위 class에서 사용★할 용도로 만든 메소드 
      //getRequest는 바깥쪽에서 호출할 필요 없음 
      // newsFeed = store.feeds = makeFeeds(api.getData(<NewsFeed[]>(NEWS_URL)));
      // newsFeed = store.feeds = this.makeFeeds(this.api.getData());
      this.feeds = store.feeds = this.api.getData();
      this.makeFeeds()
      console.log(newsFeed)
    }
  
  }
 

  // const newsList: string[] = [];
  render(): void{
    store.currentPage = Number(location.hash.substr(7) || 1 )
    for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
      //구조분해 할당
      const {id, title, comments_count, user, points, time_ago, read} = this.feeds[i]
      this.addHtml(`
        <div class="p-6 ${read ? 'bg-red-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
          <div class="flex">
            <div class="flex-auto">
              <a href="#/show/${id}">${title}</a>  
            </div>
            <div class="text-center text-sm">
              <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${comments_count}</div>
            </div>
          </div>
          <div class="flex mt-3">
            <div class="grid grid-cols-3 text-sm text-gray-500">
              <div><i class="fas fa-user mr-1"></i>${user}</div>
              <div><i class="fas fa-heart mr-1"></i>${points}</div>
              <div><i class="far fa-clock mr-1"></i>${time_ago}</div>
            </div>  
          </div>
        </div>    
      `);
    }
    this.setTemplateData('news_feed', this.getHtml());
    this.setTemplateData('prev_page', String(store.currentPage > 1 ? store.currentPage - 1 : 1));
    this.setTemplateData('next_page', String(store.currentPage + 1));
    
    this.updateView()
  }

  //독립된 함수와는 달리 인스턴스 객체에 접근 가능
  //인자 받지 않음, 리턴도 없음 
  private makeFeeds(): void {
    for (let i = 0; i < this.feeds.length; i++) {
      this.feeds[i].read = false;
    }
  }
}

class NewsDetailView extends View{
  constructor(containerId: string){
  //   const id = location.hash.substr(7);
  // // 하위 class 자체에 인자 전달하면
  //   const api = new NewsDetailApi(CONTENT_URL.replace('@id', id))
  //   // const newsDetail = getData<NewsDetail[]>(CONTENT_URL.replace('@id', id))
  //   // 하위 class 에 있는 선택된 함수에 인자 전달됨 -> this.메소드-
  //   // 상위 class에 인자 전달
  //   // 상위 class 해당 메소드로 값 나옴
  //   const newsDetail = api.getData()
  let template = `
      <div class="bg-gray-600 min-h-screen pb-8">
        <div class="bg-white text-xl">
          <div class="mx-auto px-4">
            <div class="flex justify-between items-center py-6">
              <div class="flex justify-start">
                <h1 class="font-extrabold">Hacker News</h1>
              </div>
              <div class="items-center justify-end">
                <a href="#/page/{{__currentPage__}}" class="text-gray-500">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="h-full border rounded-xl bg-white m-6 p-4 ">
          <h2>{{__title__}}</h2>
          <div class="text-gray-400 h-20">
          {{__content__}}
          </div>
          {{__comments__}}
        </div>
      </div>
    `;
    
    //밖에서 이 하위 class를 '객체'로 만들어서 사용함 ex) let x = new NewsDetailView(a)
    //super(a)쓰면  생성자 인자로 넣은 a가 상위 class에 전달
    //★★사전적 정의: super은 상위class생성자 메소드를 부르고
    //상위 properties(this.container)와  methods에 access할 때 씀!!!
     super(containerId, template)
  }

  render(): void{
    const id = location.hash.substr(7);
    const api = new NewsDetailApi(CONTENT_URL.replace('@id', id))
    const newsDetail: NewsDetail = api.getData()

      for(let i=0; i < store.feeds.length; i++) {
        if (store.feeds[i].id === Number(id)) {
          store.feeds[i].read = true;
          break;
        }

        this.setTemplateData('comments', this.makeComment(newsDetail.comments))
        this.setTemplateData('currentPage', String(store.currentPage))
        this.setTemplateData('title', newsDetail.title)
        this.setTemplateData('content', newsDetail.title)

        this.updateView()
      }
    }

    // const commentString = [];
   private  makeComment(comments: NewsComment[]): string {
    
      for(let i = 0; i < comments.length; i++) {
        const comment: NewsComment = comments[i]
    
        this.addHtml(`
          <div style="padding-left: ${comment.level * 40}px;" class="mt-4">
            <div class="text-gray-400">
              <i class="fa fa-sort-up mr-2"></i>
              <strong>${comment.user}</strong> ${comment.time_ago}
            </div>
            <p class="text-gray-700">${comment.content}</p>
          </div>      
        `);
    
        if (comment.comments.length > 0) {
          this.addHtml(this.makeComment(comment.comments));
        }
      }
    
      return this.getHtml()
    }
}

const router: Router = new Router();
//api는 
const newsFeedViw = new NewsFeedView('root');
const newsDetailView = new NewsDetailView('root');

router.setDefaultPage(newsFeedView)
router.addRoutePath('/page/', newsFeedView);
router.addRoutePath('/show/', newsDetailView);

router.route()
// function makeFeeds(feeds: NewsFeed[]): NewsFeed[] {
//   for (let i = 0; i < feeds.length; i++) {
//     feeds[i].read = false;
//   }

//   return feeds;
// }


// function updateView(html: string): void{
//   if(container != null){
//     container.innerHTML = html;
//   }else{
//     console.error('최상위 컨테이너가 없어 UI를 진행하지 못합니다')
//   }
// }

// function newsFeed(): void { 
//   //const NEWS_URL
//   const api = new NewsFeedApi(NEWS_URL)
//   let newsFeed: NewsFeed[] = store.feeds;
//   const newsList = [];
//   let template = `
//     <div class="bg-gray-600 min-h-screen">
//       <div class="bg-white text-xl">
//         <div class="mx-auto px-4">
//           <div class="flex justify-between items-center py-6">
//             <div class="flex justify-start">
//               <h1 class="font-extrabold">Hacker News</h1>
//             </div>
//             <div class="items-center justify-end">
//               <a href="#/page/{{__prev_page__}}" class="text-gray-500">
//                 Previous
//               </a>
//               <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
//                 Next
//               </a>
//             </div>
//           </div> 
//         </div>
//       </div>
//       <div class="p-4 text-2xl text-gray-700">
//         {{__news_feed__}}        
//       </div>
//     </div>
//   `;

//   if (newsFeed.length === 0) {
//     //getDate api호출을 위해 사용
//     //getRequest api class, ★하위 class에서 사용★할 용도로 만든 메소드 
//     //getRequest는 바깥쪽에서 호출할 필요 없음 
//     // newsFeed = store.feeds = makeFeeds(api.getData(<NewsFeed[]>(NEWS_URL)));
//     newsFeed = store.feeds = makeFeeds(api.getData());
//     console.log(newsFeed)
//   }

//   for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
//     newsList.push(`
//       <div class="p-6 ${newsFeed[i].read ? 'bg-red-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
//         <div class="flex">
//           <div class="flex-auto">
//             <a href="#/show/${newsFeed[i].id}">${newsFeed[i].title}</a>  
//           </div>
//           <div class="text-center text-sm">
//             <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${newsFeed[i].comments_count}</div>
//           </div>
//         </div>
//         <div class="flex mt-3">
//           <div class="grid grid-cols-3 text-sm text-gray-500">
//             <div><i class="fas fa-user mr-1"></i>${newsFeed[i].user}</div>
//             <div><i class="fas fa-heart mr-1"></i>${newsFeed[i].points}</div>
//             <div><i class="far fa-clock mr-1"></i>${newsFeed[i].time_ago}</div>
//           </div>  
//         </div>
//       </div>    
//     `);
//   }

//   template = template.replace('{{__news_feed__}}', newsList.join(''));
//   template = template.replace('{{__prev_page__}}', String(store.currentPage > 1 ? store.currentPage - 1 : 1));
//   template = template.replace('{{__next_page__}}', String(store.currentPage + 1));
  
//   updateView(template)
  
// }

// function newsDetail(): void {
//   const id = location.hash.substr(7);
//   // 하위 class 자체에 인자 전달하면
//   const api = new NewsDetailApi(CONTENT_URL.replace('@id', id))
//   // const newsContent = getData<NewsDetail[]>(CONTENT_URL.replace('@id', id))
//   // 하위 class 에 있는 선택된 함수에 인자 전달됨 -> this.메소드-
//   // 상위 class에 인자 전달
//   // 상위 class 해당 메소드로 값 나옴
//   const newsContent = api.getData()
//   let template = `
//     <div class="bg-gray-600 min-h-screen pb-8">
//       <div class="bg-white text-xl">
//         <div class="mx-auto px-4">
//           <div class="flex justify-between items-center py-6">
//             <div class="flex justify-start">
//               <h1 class="font-extrabold">Hacker News</h1>
//             </div>
//             <div class="items-center justify-end">
//               <a href="#/page/${store.currentPage}" class="text-gray-500">
//                 <i class="fa fa-times"></i>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="h-full border rounded-xl bg-white m-6 p-4 ">
//         <h2>${newsContent.title}</h2>
//         <div class="text-gray-400 h-20">
//           ${newsContent.content}
//         </div>

//         {{__comments__}}

//       </div>
//     </div>
//   `;

//   for(let i=0; i < store.feeds.length; i++) {
//     if (store.feeds[i].id === Number(id)) {
//       store.feeds[i].read = true;
//       break;
//     }
//   }

//   updateView(template.replace('{{__comments__}}', makeComment(newsContent.comments)))
  
// }

// function makeComment(comments: NewsComment[]): string {
//   const commentString = [];

//   for(let i = 0; i < comments.length; i++) {
//     const comment: NewsComment = comments[i]

//     commentString.push(`
//       <div style="padding-left: ${comment.level * 40}px;" class="mt-4">
//         <div class="text-gray-400">
//           <i class="fa fa-sort-up mr-2"></i>
//           <strong>${comment.user}</strong> ${comment.time_ago}
//         </div>
//         <p class="text-gray-700">${comment.content}</p>
//       </div>      
//     `);

//     if (comment.comments.length > 0) {
//       commentString.push(makeComment(comment.comments));
//     }
//   }

//   return commentString.join('');
// }

// function router() {
//   const routePath = location.hash;
//   if (routePath === '') {
//     newsFeed();
//   } else if (routePath.indexOf('#/page/') >= 0) {
//     store.currentPage = Number(routePath.substr(7));
//     newsFeed();
//   } else {
//     newsDetail()
//   }
// }

// window.addEventListener('hashchange', router);

// router();
