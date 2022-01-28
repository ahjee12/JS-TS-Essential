//차이점 1. type 또는 '|' 
export type YesOrNo = 'Y' | 'N';
export type DayOfWeek = '월' | '화' | '수' | '목' | '금' | '토' | '일';
export enum DayOfTheWeek {'월', '화', '수', '목', '금', '토','일'};

export type Name = string;
export type Email = string;
export type FooFunction = () => string;

//차이점 2. type은 같은 이름으로 다른 type 만들 수 없음
export interface IUser {
    readonly id : number;
    readonly name : Name;
    email: string;
    receiveInfo: boolean;
    active : YesOrNo; 
}

export interface IUser {
    //있어도 되고 없어도 된다는 의미
    address?: string;
}

export type TUser = {
    readonly id : number;
    readonly name : string;
    email: Email;
    receiveInfo : boolean;
    active : YesOrNo;
}

// export type TUser = {
//     address?: string;
// }

export interface IUserProfile extends IUser{
    profileImage: string;
    github?: string;
    twitter?: string;
}

export type TUserProfile = IUser & {
    profileImage: string;
    github?: string;
    twitter?: string;
}

export interface Color {
    fontColor: string;
    strokeColor: string;
    borderColor: string;
    backgroundColor : string;
}

export type Display = {
    display: 'none' | 'block';
    visibility: boolean;
    opacity : number;
}

export type Geometry = {
    width:number;
    height:number;
    padding:number;
    margin:number;
}

export interface IStyle extends Color, Display, Geometry{
    tagName : string;
}

export type TStyle = Color & Display & Geometry & {
    tagName : string; 
}

//★★뭉뚱그려 표현하기★★
//속성명(key값)은 string, value는 number
export interface IOnlyNumberValueObject  {
    //key자리에는 객체 key이름처럼 아무 이름 써도 됨
    [key:string]:number;
}

export type TOnlyBooleanValueObject = {
    [prop:string]: boolean;
}

export interface IGetApi {
    (url:string, search?: string): Promise<string>
}

export type TGetApi = {
    (url:string, search?: string): Promise<string>
}

export interface IRect {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

//생성자를 interface로 묘사함 
//반환값은 IRect 즉 Rect클래스의 인스턴스이다라고 정해줌 
//왜 셍상자 타입을 인터페이스에서 묘사하나? 
 
//본래 생성자를 new Rect로 생성자 호출하는 거 (인스턴스 객체 만드는 거)는 
//Rect 클래스 자체가 설계도이기 때문에 
//IRectConstruct같은 interface가 필요 없음 
 
//but> new Rect로 생성자 호출하는 '함수' createDefaultRect를 만든다고 하면
//class Rect를 넘기고 class Rect 생성자 호출하게 될 때,, 이 때 필요함
//class Rect 자체를 인자로 transfer할 때!!!!
//interface에서 생성자 호출new 타입 정해주는 게 있으면
// -> 클래스를 인자로 전달하고 생성자 호출하는 함수가 따로 있다고 알아차릴 수 있음
export interface IRectConstruct {
    new (x: number, y: number, width:number, height:number): IRect;
}


