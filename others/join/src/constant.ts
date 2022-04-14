import { ValidateRule } from './types';

export const RequireRule: ValidateRule = {
  rule: /.+/,
  //입력값 들어가 있어야 함 -> true
  match: true,
  message: '필수 입력 항목입니다.',
};

export const CantContainWhitespace: ValidateRule = {
  rule: /\s/,
  //공백 있으면 안됨 -> false
  match: false,
  message: '공백을 포함할 수 없습니다.',
};

export const CantStartNumber: ValidateRule = {
  rule: /^\d/,
  // ^: 첫 글자 숫자이면 안됨 -> false
  match: false,
  message: '숫자로 시작하는 아이디는 사용할 수 없습니다.',
}

export const MinimumLengthLimit = (limit: number): ValidateRule => ({
  rule: new RegExp(`(.){${limit}}`),
  match: true,
  message: `최소한 ${limit}글자 이상 이어야 합니다.`,
});
