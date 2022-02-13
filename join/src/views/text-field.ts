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

    if (this.data.require) {
      this.addValidateRule(RequireRule);
    }

    nextTick(this.attachEventHandler);
  }

  private validate = (): ValidateRule | null => {
    const target = this.data.text ? this.data.text.trim() : '';

    const invalidateRules = this.validateRules
      .filter(validateRule => validateRule.rule.test(target) !== validateRule.match);

    return (invalidateRules.length > 0) ? invalidateRules[0] : null;
  }

  private buildData = () => {
    const isInvalid: ValidateRule | null = this.validate();

    //최초 아무 입력 안 했을 때 벨리데이션 걸려도 무시
    if (this.updated) {
      return {
        ...this.data, 
        updated: this.updated,
        valid: !isInvalid,
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

  private onChange = (e: Event) => {
    const { value, id } = e.target as HTMLInputElement;
  
    if (id === this.data.id) {
      this.updated = true;
      this.data.text = value;
      this.update();
    }
  }

  private attachEventHandler = () => {
    document.querySelector(this.container)?.addEventListener('change', this.onChange);
  }

  private update = () => {
    const container = document.querySelector(`#field-${this.data.id}`) as HTMLElement;
    const docFrag = document.createElement('div');

    docFrag.innerHTML = this.template(this.buildData());
    //최초의 textField 클래스가 ui를 만들 때와는 달리 - render,
    //바깥 ui가 아닌 안쪽 ui만 변경할 필요 있음
    //상위에 이벤트 핸들러를 검, 
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

  public addValidateRule = (rule:ValidateRule) => {
    this.validateRules.push(rule);
  }

  public render = (append: boolean = false) => {
    const container = document.querySelector(this.container) as HTMLElement;

    if (append) {
      const divFragment = document.createElement('div');
      divFragment.innerHTML = this.template(this.buildData());

      container.appendChild(divFragment.children[0]);
    } else {
      container.innerHTML = this.template(this.buildData());
    }
  }
}
