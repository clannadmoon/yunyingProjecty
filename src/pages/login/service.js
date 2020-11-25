/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-11-19 18:41:07
 */

import { stringify } from 'qs';
import request from '../../utils/request';
import func from '../../utils/Func';
import { getCaptchaKey } from '../../utils/authority';
import { captchaMode } from '../../defaultSettings';

// =====================用户===========================

export async function accountLogin(params) {
  const values = params;
  values.grantType = captchaMode ? 'captcha' : 'password';
    values.scope = 'all';
    values.tenantId = '000000';
    values.type = 'account';
    return request('/api/blade-auth/token', {
        
        headers: {
            'Captcha-key': getCaptchaKey(),
            'Captcha-code': values.code,
        },
        method: 'POST',
        body: func.toFormData(params),  
  });
}
