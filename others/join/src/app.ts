import template from './app.template';
import { CantContainWhitespace, CantStartNumber, MinimumLengthLimit } from './constant';
import { AnyObject } from './types';
import { TextField, PasswordField, AddressField } from './views';

export default class App {
  template = template;
  container: HTMLElement;
  data: AnyObject;
  fields: AnyObject[];
  active: boolean = false;

  constructor(container: string, data: AnyObject = {}) {
    this.container = document.querySelector(container) as HTMLElement;
    this.data = data;
    this.fields = [];

    //new연산 이후부턴 해당 객체 메소드 사용 시작!
    this.initialize();
    
    setInterval(this.validFieldMonitor, 1000/30);
  }

  //1
  private initialize = () => {
    //전달 해야할 데이터 정보가 많을 땐 객체로 한꺼번에 넘길 수 있음
    const nameField = new TextField('#required-fields', { 
      id: 'name', label: '이름', type: 'text', placeholder: '이름을 입력해주세요', require: true,
    });

    const idField = new TextField('#required-fields', { 
      id: 'id', label: '아이디', type: 'text', placeholder: '아이디를 입력해주세요', require: true,
    });

    const emailField = new TextField('#required-fields', { 
      id: 'email', label: '이메일', type: 'email', placeholder: '이메일을 입력해주세요', require: true,
    });
    
    const passwordField = new PasswordField('#required-fields', { 
      id: 'password', label: '비밀번호', placeholder: '비밀번호를 입력해주세요', 
    });

    const addressField = new AddressField('#optional-fields', {
      id: 'address', label: '배송지 주소',
    });

    idField.addValidateRule(CantContainWhitespace);
    idField.addValidateRule(CantStartNumber);
    idField.addValidateRule(MinimumLengthLimit(3));

    emailField.addValidateRule(CantContainWhitespace);

    //fields 배열 변수에 만들어진 모든 객체 넣음
    this.fields.push(nameField);
    this.fields.push(idField);
    this.fields.push(emailField);
    this.fields.push(passwordField);
    this.fields.push(addressField);
  }

  //2
  private validFieldMonitor = () => {
    const btnJoin = this.container.querySelector('#btn-join') as HTMLButtonElement;

    //
    if (this.fields.filter(field => field.isValid).length === this.fields.length) {
      this.active = true;
      btnJoin.classList.remove('bg-gray-300');
      btnJoin.classList.add('bg-green-500');
    } else {
      this.active = false;
      btnJoin.classList.remove('bg-green-500');
      btnJoin.classList.add('bg-gray-300');
    }
  }

  private onSubmit = (e: Event) => {
    //새로고침 방지
    e.preventDefault();

    // 참일 때
    if (!this.active) return;

    const submitData: AnyObject = this.fields
        .map(field => ({ [field.name]: field.value }))
        .reduce((a, b) => ({ ...a, ...b }), {});

    console.log(submitData);
  }

  //3
  public render = () => {
    // 가장 바깥 ui rendering
    this.container.innerHTML = this.template(this.data);
    // 안쪽 fields rendering
    this.fields.forEach(field => {
      field.render(true);
    });
 
    this.container.addEventListener('submit', this.onSubmit);
  }
}
