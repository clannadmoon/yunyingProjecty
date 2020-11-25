/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-08-20 14:16:32
 */
import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import { accountLogin } from './service';
import { getPageQuery, formatRoutes, formatButtons } from '../../utils/utils';
//import { reloadAuthorized } from '../../utils/Authorized';

import { dynamicRoutes, dynamicButtons } from '../../services/menu';

import {routeDATA,loginDATA} from './common'
import {
  setAuthority,
  setAccessToken,
  setToken,
  setCurrentUser,
  setRoutes,
  setButtons,
  removeAll,
} from '../../utils/authority';

const { loginUser } = api

const goDashboard = () => {
  if (pathToRegexp(['/', '/login']).exec(window.location.pathname)) {
    history.push({
      pathname: '/dashboard',
    })
  }
}

export default {
  namespace: 'login',

  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/login').exec(location.pathname)) {
        }
      })
    },
  },
  effects: {
    *login({ payload }, { put, call, select }) {

      console.log('=================:',payload)
      const response = yield call(accountLogin, payload);

      console.log('=================response:',response)
      
      
      if (response.success) {
        const { success, data } = response;
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: success,
            type: 'login',
            data: { ...data },
          },
        });
        const responseRoutes = yield call(dynamicRoutes);
        const responseButtons = yield call(dynamicButtons);
        yield put({
          type: 'saveMenuData',
          payload: {
            routes: responseRoutes.data,
            buttons: responseButtons.data,
          },
        });

        
        //reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        } else {
          window.location.href = `${window.location.origin}/dashboard`;
          
        }
      // yield put(routerRedux.replace(redirect || '/'));
      }

      
      // const { locationQuery } = yield select(_ => _.app)

      // if (data.success) {
      //   const { from } = locationQuery
      //   yield put({ type: 'app/query' })
      //   if (!pathToRegexp('/login').exec(from)) {
      //     if (['', '/'].includes(from)) history.push('/dashboard')
      //     else history.push(from)
      //   } else {
      //     history.push('/dashboard')
      //   }
      // } else {
      //   throw data
      // }
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          type: 'logout',
          data: {
            authority: 'guest',
            logout: true,
          },
        },
      });
      console.log("=================================/login")
      //reloadAuthorized();
      yield put(
        history.redirect({
          pathname: '/login',
        })
      );
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      const { status, type } = payload;

      if (status) {
        const {
          data: { tokenType, accessToken, authority, account, userName, avatar },
        } = payload;
        const token = `${tokenType} ${accessToken}`;
        setToken(token);
        setAccessToken(accessToken);
        setAuthority(authority);
        setCurrentUser({ avatar, account, name: userName, authority });
      } else {
        removeAll();
      }

      return {
        ...state,
        status: type === 'login' ? (status ? 'ok' : 'error') : '',
        type: payload.type,
      };
    },
    saveMenuData(state, { payload }) {
      const { routes, buttons } = payload;
      setRoutes(formatRoutes(routes));
      setButtons(formatButtons(buttons));
      return {
        ...state,
      };
    },
  },
}
