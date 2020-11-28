/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-08-20 14:16:32
 */
const { pathToRegexp } = require("path-to-regexp")

import * as Service from '../../services/shopService'
import { sexArr,companyTypeArr, companyStatusArr,industryArr} from '../user/common'
import moment from 'moment'

const ParamsData = {
        enterpriseName: "",
        creditNumber: "",
        registrationNumber: "",
        businessStatus: companyStatusArr[0].value,
        businessScope:'',
        establishDate: moment(),
        approveDate:  moment(),
        registeredCapital: 1,
        paidCapital: 1,
        inIndustry: industryArr[0].value,
        comType: companyTypeArr[0].value,
        businessTerm: moment(),
        registrationAuthority: "",
        personnelSize: 10,
        insuredPersonnelSize: 10,
        comRegion: "",
        comAddress: "",
        userName: "",
        userCardNo: "",
        userNation: "",
        userSex: sexArr[0].value,
       
        userBirthday: moment(),
        userAddress: "",
        taxpayerNumber: "",


        userAge: "10",
        orgCode: "test",
        orgName: "test",
}

export default {
  namespace: 'merchantsAdd',

  state: {
    loading:true,
    data: {},
    form:{...ParamsData},
    detailType: 'create' //'create' 'modify'
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        //console.log('==============location.query', pathToRegexp('/merchantsAdd').exec(location.pathname))
      })
    },
  },

  effects: {
    *query({ payload }, { call, put,select }) {
      const { form } = yield select(state => state.addUser)
      const { code, message, data } = yield call(Service.detail, payload)
      if (!code) {
        let params = {
          ...form,
          ...data,
          establishDate: data.establishDate ? moment(data.establishDate) : moment(),
          approveDate:  data.approveDate ? moment(data.approveDate) : moment(),
          businessTerm:data.businessTerm ? moment(data.businessTerm) : moment(),
          userBirthday: data.userBirthday ? moment(data.userBirthday) : moment(),
        }
        yield put({
          type: 'updateState',
          payload: {
            form: params,
            loading:false,
          },
        })
      } else {
        yield put({
          type: 'updateState',
          payload: {
            loading:false,
          },
        })
        throw data
      }
    },

    *add({ payload }, { call, put }) {
      const data = yield call(Service.add, payload)
      if (data.success) {
        yield put(history.back())
      } else {
        //throw data
      }  
    },
    //清除查询条件
    *clear({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          data: {},
          form:{...ParamsData},
          detailType: 'create',
          loading:true,
        },
      })
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
