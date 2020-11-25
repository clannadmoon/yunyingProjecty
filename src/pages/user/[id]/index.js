/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-08-20 14:16:32
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Page } from 'components'
import styles from './index.less'
import { Descriptions } from 'antd';

import { pageDetailLabelDATA } from '../common'


@connect(({ userDetail }) => ({ userDetail }))
class UserDetail extends PureComponent {
  render() {
    const { userDetail } = this.props
    const { data } = userDetail
    
    return (
      <Page inner>
        <div className={styles.content}>
        <Descriptions title="企业工商信息">
            <Descriptions.Item label="运营商企业名称">{ data.enterpriseName ? data.enterpriseName :'-'}</Descriptions.Item>
          <Descriptions.Item label="统一社会信用代码">{ data.creditNumber ? data.creditNumber :'-'}</Descriptions.Item>
          <Descriptions.Item label="工商注册号">{ data.registrationNumber ? data.registrationNumber :'-'}</Descriptions.Item>
          <Descriptions.Item label="纳税人识别号">{ data.taxpayerNumber ? data.taxpayerNumber :'-'}</Descriptions.Item>
            <Descriptions.Item label="组织机构代码">{ data.organizationNumber ? data.organizationNumber :'-'}</Descriptions.Item>
            <Descriptions.Item label="法定代表人">{ data.userName ? data.userName :'-'}</Descriptions.Item>
            <Descriptions.Item label="类型">{ data.comType ? data.comType :'-'}</Descriptions.Item>
            <Descriptions.Item label="成立时间">{ data.establishDate ? data.establishDate :'-'}</Descriptions.Item>
            <Descriptions.Item label="住所">{ data.comAddress ? data.comAddress :'-'}</Descriptions.Item>
            <Descriptions.Item label="法人证件类型">{ data.userCardType ? data.userCardType :'-'}</Descriptions.Item>
            <Descriptions.Item label="法人证件号">{ data.userCardNo ? data.userCardNo :'-'}</Descriptions.Item>

          </Descriptions>
          

          <div className={ styles.descriptionsContent}>
          <Descriptions title="企业联系人">
          <Descriptions.Item label="联系人姓名">{ data.userName ? data.userName :'-'}</Descriptions.Item>
          <Descriptions.Item label="联系人手机号">{ data.userCardNo ? data.userCardNo :'-'}</Descriptions.Item>
          <Descriptions.Item label="联系人与企业关系">{ data.userCardNo ? data.userCardNo :'-'}</Descriptions.Item>
          <Descriptions.Item label="联系人证件类型">{ data.userCardNo ? data.userCardNo :'-'}</Descriptions.Item>
          <Descriptions.Item label="联系人证件号">{ data.userCardNo ? data.userCardNo :'-'}</Descriptions.Item>
            </Descriptions>
            </div>
        </div>
      </Page>
    )
  }
}

UserDetail.propTypes = {
  userDetail: PropTypes.object,
}

export default UserDetail
