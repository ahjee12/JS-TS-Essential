import {NewsFeed, NewsDetail} from '../types'

export class Api {

    // ajax: XMLHttpRequest;
    xhr: XMLHttpRequest;
    url: string;
  
    constructor(url: string) {
      // this.ajax = new XMLHttpRequest();
      this.xhr = new XMLHttpRequest();
      this.url = url;
    }
    //비동기
    async getRequestWithPromise<AjaxResponse>(): Promise<AjaxResponse> {
      //동기처럼 쓰기
      const response = await fetch(this.url);
      return await response.json() as AjaxResponse;

    } 

    // XHR to Fetch & Promise
    // getRequestWithPromise<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    //   fetch(this.url)
    //         .then(response => response.json())
    //         .then(cb)
    //         .catch(()=>{
    //           console.error('데이터를 불러오지 못했습니다.')
    //         })
    // } 

    // function() {함수 이름 (인자)}
    // 함수이름: (인자: type) => type
    // getRequest<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    //   this.xhr.open('GET', this.url);
    //   this.xhr.addEventListener('load', () => {
    //     cb(JSON.parse(this.xhr.response));
    //   })
    //   this.xhr.send();
    // }

    // getRequest<AjaxResponse>(): AjaxResponse {
    //   this.ajax.open('GET', this.url, false);
    //   this.ajax.send();
  
    //   return JSON.parse(this.ajax.response) as AjaxResponse;
    // }
  }
  
export class NewsFeedApi extends Api {
  async getDataWithPromise(): Promise<NewsFeed[]> {
    return this.getRequestWithPromise<NewsFeed[]>();
  }
    // getDataWithPromise(cb: (data: NewsFeed[]) => void): void {
    //   return this.getRequestWithPromise<NewsFeed[]>(cb);
    // }

    // getData(cb: (data: NewsFeed[]) => void): void {
    //   return this.getRequest<NewsFeed[]>(cb);
    // }

    // getData(): NewsFeed[] {
    //   return this.getRequest<NewsFeed[]>();
    // }
  }
  
export class NewsDetailApi extends Api {
  async getDataWithPromise(): Promise<NewsDetail> {
    return this.getRequestWithPromise<NewsDetail>();
  }
    // getDataWithPromise(cb: (data: NewsDetail) => void): void {
    //   return this.getRequestWithPromise<NewsDetail>(cb);
    // }
    // getData(cb: (data: NewsDetail) => void): void {
    //   return this.getRequest<NewsDetail>(cb);
    // }
      // getData(): NewsDetail[] {
      //   return this.getRequest<NewsDetail[]>();
      // }
    
  }