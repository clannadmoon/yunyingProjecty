/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-11-21 10:57:28
 */

import request from 'utils/request'
import { stringify } from 'qs';

//列表
export async function list(params) {
    return request(`/api/merchants/operatemerchants/list?${stringify(params)}`);
}

//新增和修改
export async function add(params) {
  return request('/api/merchants/operatemerchants/saveOrUpdateCompany', {
    method: 'POST',
    body: params,
  });
}

//详情
export async function detail(params) {
  return request(`/api/merchants/operatemerchants/companyDetail?${stringify(params)}`);
}

//启用和禁用
export async function changeStatus(params) {
  return request('/api/merchants/operatemerchants/updateStatus', {
    method: 'POST',
    body: params,
  });
}

//修改运营时间
export async function changeOperateDate(params) {
  return request('/api/merchants/operatemerchants/updateAvailablePeriod', {
    method: 'POST',
    body: params,
  });
}
