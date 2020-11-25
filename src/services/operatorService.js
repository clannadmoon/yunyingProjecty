/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-11-21 10:57:28
 */

import request from 'utils/request'
import { stringify } from 'qs';

export async function list(params) {
    console.log('=====================list params:',params)
    return request(`/api/operate/operateorgs/page?${stringify(params)}`);
}

export async function add(params) {
  console.log('=====================list params:',params)
  return request('/api/operate/operateorgs/submitCompany', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  console.log('=====================list params:',params)
  return request(`/api/operate/operateorgs/companyDetail?${stringify(params)}`);
}

export async function changeStatus(params) {
  console.log('=====================list params:',params)
  return request('/api/operate/operateorgs/updateStatus', {
    method: 'POST',
    body: params,
  });
}
