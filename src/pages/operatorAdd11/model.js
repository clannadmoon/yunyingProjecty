/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-08-20 14:16:32
 */
const { pathToRegexp } = require("path-to-regexp")

import * as Service from '../../services/operatorService'
import { sexArr,companyTypeArr, companyStatusArr,industryArr} from '../operator/common'
import moment from 'moment'

const ParamsData = {
        enterpriseName: "",
        creditNumber: "",
        registrationNumber: "",
        businessStatus:'',
        businessScope:'',
        establishDate: '',
        approveDate: '',
        registeredCapital: 1,
        paidCapital: '',
        inIndustry: '',
        comType: '',
        businessTerm: '',
        registrationAuthority: "",
        personnelSize: '',
        insuredPersonnelSize: '',
        comRegion: "",
        comAddress: "",
        legalUserName: "",
        legalCardNo: "",
        legalNation: "",
        legalSex: '',
       
        legalBirthday: '',
        userAddress: "",
        taxpayerNumber: "",


        // userAge: "10",
        // orgCode: "test",
        // orgName: "test",
}

export default {
  namespace: 'operatorAdd111',

  state: {
    loading:true,
    data: {},
    form:{...ParamsData},
    detailType: 'create' //'create' 'modify'
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        //console.log('==============location.query', pathToRegexp('/operatorAdd').exec(location.pathname))
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
        yield put(window.history.back())
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
