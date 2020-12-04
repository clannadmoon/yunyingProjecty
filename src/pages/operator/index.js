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
@connect(({ operator, loading }) => ({ operator, loading }))
class Operator extends PureComponent {
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
    const { dispatch, operator, loading } = this.props
    const { list, pagination } = operator

    return {
      dataSource: list,
      loading: loading.effects['operator/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          size: page.pageSize,
        })
      },
      onChangeStatus: payload => {
        dispatch({
          type: 'operator/changeStatus',
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
          type: 'operator/showModal',
          payload: {
            currentItem: item,
          },
        })
      },
      onEditItem(item) {
        history.push({
          pathname: `/operatorAdd`,
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
        this.handleRefresh({
          ...value,
        })
      },
      onAdd() {
        history.push('/operatorAdd')
      },
    }
  }

  get modalProps() {
    const { dispatch, operator, loading, i18n } = this.props
    const { currentItem, modalVisible } = operator

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
          type: 'operator/changeOperateDate',
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'operator/hideModal',
        })
      },
    }
  }

  render() {
    const { operator } = this.props
    return (
      <Page inner>
        <Filter {...this.filterProps} />
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Operator.propTypes = {
  operator: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Operator