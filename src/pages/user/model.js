/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-08-20 14:16:32
 */
import modelExtend from 'dva-model-extend'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryUserList,
  createUser,
  removeUser,
  updateUser,
  removeUserList,
} = api

import * as Service from '../../services/operatorService'

import {pageDATA} from './common'

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log("========================================:",pathToRegexp('/user').exec(location.pathname))
        if (pathToRegexp('/user').exec(location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {

      let params = {
        current: payload.page,
        size:payload.pageSize,
      }
      const {success,data} = yield call(Service.list, params)
     console.log("========================================:",data)
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.records,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *changeStatus({ payload }, { call, put, select }) {
      const data = yield call(Service.changeStatus, {...payload })
      // const { selectedRowKeys } = yield select(_ => _.user)
      // if (data.success) {
      //   yield put({
      //     type: 'updateState',
      //     payload: {
      //       selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
      //     },
      //   })
      // } else {
      //   throw data
      // }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
