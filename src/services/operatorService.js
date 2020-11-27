/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-11-21 10:57:28
 */

import request from 'utils/request'
import { stringify } from 'qs';

//列表
export async function list(params) {
    console.log('=====================list params:',params)
    return request(`/api/operate/operateorgs/page?${stringify(params)}`);
}

//新增和修改
export async function add(params) {
  console.log('=====================list params:',params)
  return request('/api/operate/operateorgs/submitCompany', {
    method: 'POST',
    body: params,
  });
}

//详情
export async function detail(params) {
  console.log('=====================list params:',params)
  return request(`/api/operate/operateorgs/companyDetail?${stringify(params)}`);
}

//启用和禁用
export async function changeStatus(params) {
  console.log('=====================list params:',params)
  return request('/api/operate/operateorgs/updateStatus', {
    method: 'POST',
    body: params,
  });
}

//修改运营时间
export async function changeOperateDate(params) {
  console.log('=====================list params:',params)
  return request('/api/operate/operateorgs/setPeriod', {
    method: 'POST',
    body: params,
  });
}
