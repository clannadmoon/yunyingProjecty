/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-08-20 14:16:32
 */
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'

const { queryUser } = api
import * as Service from '../../../../services/operatorService'

import { pageDetailDATA,pageDetailLabelDATA } from '../../common'

export default {
  namespace: 'userDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/user/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'userDetail/query', payload: { companyCode: match[1] } })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const { code, message, data } = yield call(Service.detail, payload)
      // const { success, message, status, ...other } = data
      // const {success,other} = {success:true,other:pageDetailDATA}
      if (!code) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
