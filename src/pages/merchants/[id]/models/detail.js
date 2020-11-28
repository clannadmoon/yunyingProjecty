/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-08-20 14:16:32
 */
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'

const { queryUser } = api
import * as Service from '../../../../services/shopService'

export default {
  namespace: 'merchantsDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/merchants/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'merchantsDetail/query', payload: { merchantCode: match[1] } })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const { code, message, data } = yield call(Service.detail, payload)
      if (!code) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data,
          },
        })
      } else {
        console.error(data)
        //throw data
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
