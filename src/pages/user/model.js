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
        if (pathToRegexp('/user').exec(location.pathname)) {
          console.log("========================================location.query:", location.query)
          let payload = {}
          if (Object.keys(location.query).length > 0) {
            payload = location.query
          } else {
            payload = { current: 1, size: 10 }
          }
         
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

      const {success,data} = yield call(Service.list, payload)
     
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.records,
            pagination: {
              current: Number(payload.current) || 1,
              pageSize: Number(payload.size) || 10,
              total: data.total,
            },
          },
        })
      }
    },


    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeUser, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeUserList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createUser, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(updateUser, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    //启用和禁用
    *changeStatus({ payload }, { call, put, select }) {
      const data = yield call(Service.changeStatus, {...payload })
      if (data.success) {
        yield put({
          type: 'query',
          payload: {
            
          },
        })
      } else {
        throw data
      }
    },

    //设置有效运营时间
    *changeOperateDate({ payload }, { call, put }) {
      console.log('============payload:',payload)
      const data = yield call(Service.changeOperateDate, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
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
