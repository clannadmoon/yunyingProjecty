import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Link } from 'umi'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
@connect(({ user, loading }) => ({ user, loading }))
class List extends PureComponent {
  handleChange = (record) => {
    const { onDeleteItem, onEditItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: `确认禁用该运营商？`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  handleMenuClick = (record) => {
    const { dispatch, user } = this.props
    dispatch({
      type: 'user/changeStatus',
      payload: {
        operateCode: selectedRowKeys,
        enableFlag:1
      },
    })
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>运营商名称</Trans>,
        dataIndex: 'orgName',
        key: 'orgName',
        fixed: 'left',
        render: (text, record) => <Link to={`user/${record.operateCode}`}>{text}</Link>,
      },
      {
        title: <Trans>组织类型</Trans>,
        dataIndex: 'orgType',
        key: 'orgType',
        render: text => <span>{text ?  '个人':'企业'}</span>,
      },
      {
        title: <Trans>添加时间</Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: <Trans>状态</Trans>,
        dataIndex: 'enableFlag',
        key: 'enableFlag',
        render: text => <span>{text ? '已禁用' : '启用中'}</span>,
      },
      {
        title: <Trans>更新时间</Trans>,
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
      {
        title: <Trans>操作</Trans>,
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
          return (
            <div className={styles.detailContainer}>
              <span onClick={ ()=>{this.handleChange(record)}}>修改</span>
              <span onClick={ ()=>{this.handleMenuClick(record)}}>{ record.enableFlag ?  '启用':'禁用'}</span>
            </div>
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
