/* global window */

import { history } from 'umi'
import { stringify } from 'qs'
import store from 'store'
const { pathToRegexp } = require("path-to-regexp")
import { ROLE_TYPE } from 'utils/constant'
import { queryLayout } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import {getAccessToken,removeAll} from '../utils/authority'
import { dynamicRoutes } from '../services/menu';

import config from 'config'

import api from 'api'
const { queryRouteList, logoutUser, queryUserInfo } = api

import {routeDATA,loginDATA,userDATA} from '../pages/login/common'

const handleRoute = (routeArr)=> {
  let routeArrOut = [
    {
      "id": "1",
      "icon": "dashboard",
      "name": "仪表盘",
      "zh": {
          "name": "仪表盘"
      },
      "pt-br": {
          "name": "仪表盘"
      },
      "route": "/dashboard"
  }
  ]
  routeArr.forEach((item1) => {
    let obj = {
      id: item1.id,
      icon: item1.source, 
      name: item1.name,
      route: item1.path,
      menuParentId: "-1",
    };
    routeArrOut.push(obj);
    let children = item1.children
    if (children) {
      children.forEach((item2) => {
        let obj = {
          id: item2.id,
          icon: item2.source, 
          name: item2.name,
          route: item2.path,
          menuParentId: item1.id,
          breadcrumbParentId: item1.id,
        };
        routeArrOut.push(obj);
      })
    }
  })
  return routeArrOut;
}

const goDashboard = () => {
  if (pathToRegexp(['/', '/login']).exec(window.location.pathname)) {
    history.push({
      pathname: '/dashboard',
    })
  }
}

export default {
  namespace: 'app',
  state: {
    routeList: [
      {
        id: '1',
        icon: 'laptop',
        name: 'Dashboard',
        zhName: '仪表盘',
        router: '/dashboard',
      },
    ],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {

      // store isInit to prevent query trigger by refresh
      const isInit = store.get('isInit')
     
      // if (isInit) {
      //   goDashboard()
      //   return
      // }
      const { locationPathname } = yield select(_ => _.app)

      const {success,msg,data } = yield call(dynamicRoutes);
      
      if (success) {
        const { success, user } = userDATA
        
         const list = routeDATA
        //const list = handleRoute(data)
        console.log('>>>>>>>>>>>list:',list)
        const { permissions } = user
        let routeList = list
        if (true) {
        // if (
        //   permissions.role === ROLE_TYPE.ADMIN ||
        //   permissions.role === ROLE_TYPE.DEVELOPER
        // ) {
          permissions.visit = list.map(item => item.id)
        } else {
          routeList = list.filter(item => {
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid
                ? permissions.visit.includes(item.mpid) || item.mpid === '-1'
                : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true,
            ]
            return cases.every(_ => _)
          })
        }
        store.set('routeList', routeList)
        store.set('permissions', permissions)

 
        let myUser = localStorage.getItem('sword-current-user')
        let pp = myUser && JSON.parse(myUser)
        let userTmp = {
          ...pp,
          username:pp.account
        }
        store.set('user', userTmp)
        store.set('isInit', true)
        goDashboard()
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        history.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname,
          }),
        })
      }
    },

    *signOut({ payload }, { call, put }) {
      //const data = yield call(logoutUser)
      //if (data.success) {
      removeAll();
        store.set('routeList', [])
        store.set('permissions', { visit: [] })
        store.set('user', {})
        store.set('isInit', false)
        yield put({ type: 'query' })
      // } else {
      //   throw data
      // }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },
  },
}
