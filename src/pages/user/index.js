import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { history } from 'umi'
import { connect } from 'umi'
import { Row, Col, Button, Popconfirm } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import moment from 'moment'
@withI18n()
@connect(({ user, loading }) => ({ user, loading }))
class User extends PureComponent {
  handleRefresh = newQuery => {
    const { location } = this.props
    const { query, pathname } = location

    history.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }

  handleDeleteItems = () => {

  }

  get listProps() {
    const { dispatch, user, loading } = this.props
    const { list, pagination } = user

    return {
      dataSource: list,
      loading: loading.effects['user/query'],
      pagination,
      onChange: page => {

        

        this.handleRefresh({
          current: page.current,
          size: page.pageSize,
        })
      },
      onChangeStatus: payload => {
        dispatch({
          type: 'user/changeStatus',
          payload,
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current
                : pagination.current,
          })
        })
      },
      onChangeDate: item => {
        dispatch({
          type: 'user/showModal',
          payload: {
            currentItem: item,
          },
        })
      },
      onEditItem(item) {
        history.push({
          pathname: `/userAdd`,
          query: item,
        })
        // dispatch({
        //   type: 'user/showModal',
        //   payload: {
        //     modalType: 'update',
        //     currentItem: item,
        //   },
        // })
      },
    }
  }

  get filterProps() {
    const { location, dispatch, i18n } = this.props
    const { query } = location

    return {
      i18n,
      filter: {
        ...query,
      },
      onFilterChange: value => {
        if (value && value.createTime && value.createTime.length > 0) {
          value.queryStartDate = moment(value.createTime[0]).format('YYYY-MM-DD');  
          value.queryEndDate = moment(value.createTime[0]).format('YYYY-MM-DD');
                delete value.createTime
        }
       
        this.handleRefresh({
          ...value,
        })
      },
      onAdd() {
        history.push('/userAdd')
      },
    }
  }

  get modalProps() {
    const { dispatch, user, loading, i18n } = this.props
    const { currentItem, modalVisible } = user

    return { 
      item: currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      //confirmLoading: loading.effects[`user/changeOperateDate`],
      title: `设置运营有效时间`,
      centered: true,
      onOk: data => {
        console.log('data',data)
        dispatch({
          type: 'user/changeOperateDate',
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'user/hideModal',
        })
      },
    }
  }

  render() {
    const { user } = this.props
    return (
      <Page inner>
        <Filter {...this.filterProps} />
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default User
