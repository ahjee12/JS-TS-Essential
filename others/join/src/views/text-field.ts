import { nextTick } from '../utils';
import { ValidateRule } from '../types';
import template from './text-field.template';
import { RequireRule } from '../constant';

type Props = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number';
  placeholder?: string;
  text?: string;
  require: boolean;
}

const DefaultProps: Props = {
  id: '',
  text: '',
  label: 'label',
  type: 'text',
  placeholder: '',
  require: false,
};

export default class TextField {
  private template = template;
  private container: string;
  private data: Props;  
  private updated: boolean = false;
  private validateRules: ValidateRule[] = [];

  constructor(container: string, data: Props) {
    this.container = container;
    this.data = { ...DefaultProps, ...data };

    //Q
    //new연산 TextField require은 모두 true임
    if (this.data.require) {
      this.addValidateRule(RequireRule);
    }

    nextTick(this.attachEventHandler);
  }

  //app.ts에서 fields 테스트할 때 , buildData()에서 객체 전달할 때
  //4 정규식 테스트 -> 
  private validate = (): ValidateRule | null => {
    //new연산 처음할 땐 text에 들어가는 게 없음, target =''
    //단순 안전장치인 건가
    const target = this.data.text ? this.data.text.trim() : '';

    //new연산 처음할 땐, this.validateRules = []
    //this.validateRules = [{},...,{}]
    //정규식 test메소드
    const invalidateRules = this.validateRules
      .filter(validateRule => validateRule.rule.test(target) !== validateRule.match);

    //invalid 할 때
    //invalidateRules[0] - RequireRule: {rule, match, message}
    return (invalidateRules.length > 0) ? invalidateRules[0] : null;
  }

  //4
  private buildData = () => {
    const isInvalid: ValidateRule | null = this.validate();

    //onChange없으면  
    if (this.updated) {
      return {
        ...this.data, 
        updated: this.updated, 
        valid: !isInvalid, // isInvalid true이면 안 맞는 다는 뜻이고 false이면 맞는 다는 뜻/ 
        validateMessage: !!isInvalid ? isInvalid.message : ''   
      }

    } else {         
      return {        
        ...this.data, 
        updated: this.updated,
        valid: true,
        validateMessage: ''
      }
    }
  }

  //2
  private onChange = (e: Event) => {
    //object destructuring
    const { value, id } = e.target as HTMLInputElement;
  
    //onChange event가 text-field에서 발생했을 때
    if (id === this.data.id) {
      this.updated = true;
      this.data.text = value;
      this.update();
    }
  }

  //2
  private attachEventHandler = () => {  
    document.querySelector(this.container)?.addEventListener('change', this.onChange);
  }

  //3
  private update = () => {
   //Q
    const container = document.querySelector(`#field-${this.data.id}`) as HTMLElement;
    const docFrag = document.createElement('div');

    docFrag.innerHTML = this.template(this.buildData());
   
    //바깥 ui가 아닌 안쪽 ui만 변경할 필요 있음
    container.innerHTML = docFrag.children[0].innerHTML;
  }

  public get name(): string {
    return this.data.id;
  }

  public get value(): string {
    return this.data.text || '';
  }

  public get isValid(): boolean {
    return !this.validate();
  }

  //1
  public addValidateRule = (rule:ValidateRule) => {
    this.validateRules.push(rule);
  }

  public render = (append: boolean = false) => {
    const container = document.querySelector(this.container) as HTMLElement;

    //왜 나뉘어 있는가
    if (append) {
      const divFragment = document.createElement('div');
      divFragment.innerHTML = this.template(this.buildData());

      container.appendChild(divFragment.children[0]);
    } else {
      container.innerHTML = this.template(this.buildData());
    }
  }
}
