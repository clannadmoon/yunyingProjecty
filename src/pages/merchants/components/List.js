import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { Link,connect } from 'umi'
import styles from './List.less'
import { history } from 'umi'

const { confirm } = Modal

class List extends PureComponent {
  handleChange = (record) => {
    const { onDeleteItem, onChangeStatus, onEditItem, } = this.props
    onEditItem({ operateCode:record.operateCode });
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
    const { onDeleteItem, onEditItem, ...tableProps } = this.props

    const columns = [
      {
        width:200,
        title: <div>商户名称</div>,
        dataIndex: 'merchantName',
        key: 'merchantName',
        fixed: 'left',
        render: (text, record) => <Link to={`merchants/${record.operateCode}`}>{text}</Link>,
      },
      {
        width:100,
        title: <div>组织类型</div>,
        dataIndex: 'orgTypeName',
        key: 'orgTypeName',
        render: text => <span>{text ? text :'-'}</span>,
      },
      {
        title: <div>添加时间</div>,
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        width:80,
        title: <div>状态</div>,
        dataIndex: 'enableFlag',
        key: 'enableFlag',
        render: text => <span>{text ? '已禁用' : '启用中'}</span>,
      },
      {
        title: <div>更新时间</div>,
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
      {
        title: <div>操作</div>,
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
          showTotal: total => `总计：${total} 条`,
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
