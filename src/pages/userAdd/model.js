/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-08-20 14:16:32
 */
const { pathToRegexp } = require("path-to-regexp")
// import api from 'api'

import * as Service from '../../services/operatorService'


// const { queryUser } = api

const paramsData = {
  "enterpriseName": "test1-update",
  "creditNumber": "testty0001",
  "registrationNumber": "testgs0001",
  "businessStatus": "runing",
  "establishDate": "2020-01-01 00:00:00",
  "approveDate": "2020-01-01 00:00:00",
  "registeredCapital": 1000001,
  "paidCapital": 1000001,
  "inIndustry": "3951",
  "comType": "unlimited_company",
  "businessTerm": "2030-01-01",
  "registrationAuthority": "北京朝阳",
  "personnelSize": 100,
  "insuredPersonnelSize": 100,
  "comRegion": "北京",
  "comAddress": "北京朝阳",
  "userName": "法人test001",
  "userCardNo": "法人000000000000000001",
  "userNation": "汉",
  "userSex": "1",
  "userAge": "50",
  "userBirthday": "1980-10-25",
  "userAddress": "sxyc",
  "orgCode": "testty0001",
  "orgName": "test1",
  "taxpayerNumber": "test000001"
}

export default {
  namespace: 'addUser',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        // const match = pathToRegexp('/user/:id').exec(pathname)
        // if (match) {
        //   dispatch({ type: 'query', payload: { id: match[1] } })
        // }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      // console.log("=======================:",pageDetailDATA)
      // // const data = yield call(queryUser, payload)
      // // const { success, message, status, ...other } = data
      // const {success,other} = {success:true,other:pageDetailDATA}
      // if (success) {
      //   yield put({
      //     type: 'querySuccess',
      //     payload: {
      //       data: other,
      //     },
      //   })
      // } else {
      //   throw data
      // }
    },
    *add({ payload }, { call, put }) {
      
      //const {success,data} = yield call(Service.add, paramsData)
      const result = yield call(Service.add, paramsData)

      console.log("=======================:",result)
    }
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
