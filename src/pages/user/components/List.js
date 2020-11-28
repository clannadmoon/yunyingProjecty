import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Link,connect } from 'umi'
import styles from './List.less'
import { history } from 'umi'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleChange = (record) => {
    const { onDeleteItem, onChangeStatus, onEditItem, i18n } = this.props
    onEditItem({ operateCode:record.operateCode });
    // history.push({
    //   pathname: `/userAdd?operateCode=${record.operateCode}`,
    //   //query: { operateCode:record.operateCode },
    // })
  }

  handleMenuClick = (record) => {
    const { onChangeStatus } = this.props
    onChangeStatus({ operateCode:record.operateCode,enableFlag:record.enableFlag === 0 ? 1 : 0 });
  }

  //设置有效时间
  handelDate = (record) => {
    const { onChangeDate } = this.props
    onChangeDate({ operateCode:record.operateCode});
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        width:200,
        title: <Trans>运营商名称</Trans>,
        dataIndex: 'orgName',
        key: 'orgName',
        fixed: 'left',
        render: (text, record) => <Link to={`user/${record.operateCode}`}>{text}</Link>,
      },
      {
        width:100,
        title: <Trans>组织类型</Trans>,
        dataIndex: 'orgTypeName',
        key: 'orgTypeName',
        render: text => <span>{text ? text :'-'}</span>,
      },
      {
        title: <Trans>添加时间</Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        width:80,
        title: <Trans>状态</Trans>,
        dataIndex: 'enableFlag',
        key: 'enableFlag',
        render: text => <span>{!text ? '已禁用' : '启用中'}</span>,
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
        width: 130,
        render: (text, record) => {
          return (
            <div className={styles.detailContainer}>
              <span onClick={() => {
                this.handleChange(record)
              }}>修改</span>
              <span onClick={() => {
                this.handelDate(record)
              }}>设置</span>
              <span onClick={() => {
                this.handleMenuClick(record)
              }}>{record.enableFlag ? '启用' : '禁用'}</span>
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
