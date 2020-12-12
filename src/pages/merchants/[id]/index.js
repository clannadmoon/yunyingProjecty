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


import { sexArr,companyTypeArr, companyStatusArr,industryArr} from '../common'

const SexObj = {}
sexArr.forEach(({label,value}) => {
  SexObj[value]=label
})
const CompanyTypeObj = {}
companyTypeArr.forEach(({label,value}) => {
  CompanyTypeObj[value]=label
})
const CompanyStatusObj = {}
companyStatusArr.forEach(({label,value}) => {
  CompanyStatusObj[value]=label
})
const IndustryObj = {}
industryArr.forEach(({label,value}) => {
  IndustryObj[value]=label
})

@connect(({ merchantsDetail }) => ({ merchantsDetail }))
class Detail extends PureComponent {
  render() {
    const { merchantsDetail } = this.props
    const { data } = merchantsDetail
    
    return (
      <Page inner>
        <div className={styles.content}>
        <Descriptions title="企业工商信息">
            <Descriptions.Item label="商户企业名称">{ data.merchantName ? data.merchantName :'-'}</Descriptions.Item>
            <Descriptions.Item label="统一社会信用代码">{data.creditNumber ? data.creditNumber : '-'}</Descriptions.Item>
            <Descriptions.Item label="纳税人识别号">{ data.taxpayerNumber ? data.taxpayerNumber :'-'}</Descriptions.Item>
            <Descriptions.Item label="工商注册号">{ data.registrationNumber ? data.registrationNumber :'-'}</Descriptions.Item>
            <Descriptions.Item label="登记状态">{ data.businessStatus ? CompanyStatusObj[data.businessStatus] :'-'}</Descriptions.Item>
            <Descriptions.Item label="企业类型">{ data.comType ? CompanyTypeObj[data.comType] :'-'}</Descriptions.Item>
            <Descriptions.Item label="所属行业">{ data.inIndustry ? IndustryObj[data.inIndustry] :'-'}</Descriptions.Item>

            <Descriptions.Item label="工商注册号">{ data.registrationNumber ? data.registrationNumber :'-'}</Descriptions.Item>
            <Descriptions.Item label="所属地区">{ data.comRegion ? data.comRegion :'-'}</Descriptions.Item>
            <Descriptions.Item label="登记机关">{data.registrationAuthority ? data.registrationAuthority : '-'}</Descriptions.Item>
            <Descriptions.Item label="住所">{ data.comAddress ? data.comAddress :'-'}</Descriptions.Item>
            <Descriptions.Item label="经营范围">{ data.businessScope ? data.businessScope :'-'}</Descriptions.Item>
            <Descriptions.Item label="注册资本">{ data.registeredCapital ? data.registeredCapital :'-'}</Descriptions.Item>
            <Descriptions.Item label="实缴资本">{ data.paidCapital ? data.paidCapital :'-'}</Descriptions.Item>
            <Descriptions.Item label="人员规模">{ data.personnelSize ? data.personnelSize :'-'}</Descriptions.Item>
            <Descriptions.Item label="参保人员">{ data.insuredPersonnelSize ? data.insuredPersonnelSize :'-'}</Descriptions.Item>
            <Descriptions.Item label="营业期限">{ data.businessTerm ? data.businessTerm :'-'}</Descriptions.Item>
            <Descriptions.Item label="成立日期">{ data.establishDate ? data.establishDate :'-'}</Descriptions.Item>
            <Descriptions.Item label="核准日期">{ data.approveDate ? data.approveDate :'-'}</Descriptions.Item>

          </Descriptions>
          

          <div className={ styles.descriptionsContent}>
          <Descriptions title="企业联系人">
            <Descriptions.Item label="法定代表人">{ data.legalUserName ? data.legalUserName :'-'}</Descriptions.Item>
            <Descriptions.Item label="法人证件号">{ data.legalCardNo ? data.legalCardNo :'-'}</Descriptions.Item>
            <Descriptions.Item label="法人证件类型">{ data.legalCardType ? data.legalCardType :'-'}</Descriptions.Item>
            <Descriptions.Item label="法人民族">{ data.legalNation ? data.legalNation :'-'}</Descriptions.Item>
            <Descriptions.Item label="法人性别">{ data.legalSex ? SexObj[data.legalSex] :'-'}</Descriptions.Item>
              <Descriptions.Item label="法人生日">{data.legalBirthday ? data.legalBirthday : '-'}</Descriptions.Item>
              <Descriptions.Item label="法人地址">{ data.userAddress ? data.userAddress :'-'}</Descriptions.Item>
          
          
            </Descriptions>
            </div>
        </div>
      </Page>
    )
  }
}

Detail.propTypes = {
  merchantsDetail: PropTypes.object,
}

export default Detail
