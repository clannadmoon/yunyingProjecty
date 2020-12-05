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

import { Form, Input,Row,Col,Divider,Typography, InputNumber,Descriptions, Radio, Modal, Cascader,Button,Select,DatePicker, Spin } from 'antd'

import { sexArr,companyTypeArr, companyStatusArr,industryArr} from '../operator/common'

import moment from 'moment'

const { Title } = Typography;
const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 14,
  },
  wrapperCol: {
    span: 14,
  },
}

@connect(({ operatorAdd }) => ({ operatorAdd }))
class Detail extends PureComponent {
  
  constructor(props) {
    super(props)
    this.state = {
      form: {    
        enterpriseName: "",
        creditNumber: "",
        registrationNumber: "",
        businessStatus: companyStatusArr[0].value,
        businessScope:'',
        establishDate: moment(),
        approveDate:  moment(),
        registeredCapital: 1,
        paidCapital: 1,
        inIndustry: industryArr[0].value,
        comType: companyTypeArr[0].value,
        businessTerm: moment(),
        registrationAuthority: "",
        personnelSize: 10,
        insuredPersonnelSize: 10,
        comRegion: "",
        comAddress: "",
        userName: "",
        userCardNo: "",
        userNation: "",
        userSex: sexArr[0].value,
       
        userBirthday: moment(),
        userAddress: "",
        taxpayerNumber: "",


        userAge: "10",
        orgCode: "test",
        orgName: "test",
      }  
    }
  }
  
  componentDidMount() {
    const { dispatch,location } = this.props
    const query = location.query
    if (query.operateCode) {
      dispatch({
        type: 'operatorAdd/updateState',
        payload:{detailType:'modify'},
      })
      dispatch({
        type: 'operatorAdd/query',
        payload:{companyCode:query.operateCode},
      })   
    } else {
      dispatch({
        type: 'operatorAdd/updateState',
        payload: { loading:false},
      })
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'operatorAdd/clear',
      payload:{},
    })
  }


 
 handleOk = values => {
   console.log("=====values:", values)

   const { operatorAdd, dispatch } = this.props
   const {detailType, form} = operatorAdd
   
   let params = {
     ...values,
     establishDate: values.establishDate ? moment(values.establishDate).format('YYYY-MM-DD HH:MM:SS') : '',
     approveDate: values.approveDate ? moment(values.approveDate).format('YYYY-MM-DD HH:MM:SS') : '',
     businessTerm: values.businessTerm ? moment(values.businessTerm).format('YYYY-MM-DD HH:MM:SS') : '',
     userBirthday: values.userBirthday ? moment(values.userBirthday).format('YYYY-MM-DD HH:MM:SS') : '',


     userAge: "10",
     orgCode: "test",
     orgName: "test",
   }

   if (detailType === 'modify') {
     params.operateCode = form.operateCode;
    } 
    dispatch({ type: 'operatorAdd/add', payload: params })
 }
  

  render() {
    const { operatorAdd } = this.props
    const { form,loading,detailType } = operatorAdd

   
    
    if (loading) {
      return (
        <Page inner>
          <div className={styles.content}>
              <Spin></Spin>
          </div>
        </Page>
      )
    }

    console.log("1111111:", form)
    return (
      <Page inner>
        <div className={styles.content}>
          <Title level={4}>{detailType === 'create' ? '新增运营商信息' : '修改运营商信息'}</Title>
       
          <Form
            {...formItemLayout}
            initialValues={{ ...form }}
            name="control-ref"
            layout="vertical"
            onFinish={this.handleOk}
          >

            <Divider orientation="left">工商信息</Divider>
            <Row>
              <Col span={8}>
              <FormItem name='enterpriseName' rules={[{ required: true }]}
                label={'企业名称'} >
                  <Input />
              </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='creditNumber' rules={[{ required: true }]}
                label={'统一社会信用代码'} >
                <Input />
              </FormItem>
              </Col>
              <Col span={8}>
                
                <FormItem name='taxpayerNumber' rules={[{ required: true }]}
                label={'纳税人识别号'} >
                <Input />
              </FormItem>
                </Col>
              
            </Row>
            <Row>
              <Col span={8}>
              <FormItem name='businessStatus' rules={[{ required: true }]}
              label={'登记状态'} >
              <Select defaultValue={companyStatusArr[0].value } >
              {
                companyStatusArr.map((item,index) => {
                  return (
                    <Option value={item.value}>{ item.label}</Option>  
                  )
                })
                    }
                    </Select>
              </FormItem>
           
              </Col>
              <Col span={8}>
              <FormItem name='comType' rules={[{ required: true }]}
              label={'企业类型'} >
                  <Select defaultValue={companyTypeArr[0].value } >
                    {
                      companyTypeArr.map((item,index) => {
                        return (
                          <Option value={item.value}>{ item.label}</Option>  
                        )
                      })
                    }
                </Select>
            </FormItem>
                </Col>
              <Col span={8}>
              <FormItem name='inIndustry' rules={[{ required: false }]}
              label={'所属行业'} >
              {/* <Select defaultValue={industryArr[0].value } >
              {
                industryArr.map((item,index) => {
                  return (
                    <Option value={item.value}>{ item.label}</Option>  
                  )
                })
              }
          </Select> */}
                     <Input />
                </FormItem>
                </Col>
            </Row>

            <Row>
              <Col span={8}>
              
                  <FormItem name='registrationNumber' rules={[{ required: false }]}
                label={'工商注册号'} >
                <Input />
                </FormItem> 
              </Col> 
             

              <Col span={8}>
             
              <FormItem name='comRegion' rules={[{ required: false }]}
            label={'所属地区'} >
            <Input />
          </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='registrationAuthority' rules={[{ required: false }]}
              label={'登记机关'} >
              <Input />
            </FormItem>
              </Col>
             
            </Row>

            <Row>
            <Col span={8}>
            <FormItem name='comAddress' rules={[{ required: false }]}
            label={'住所'} >
            <Input />
          </FormItem>
            </Col>

            <Col span={8}>
            <FormItem name='businessScope' rules={[{ required: false }]}
            label={'经营范围'} >
            <Input />
          </FormItem>
            </Col>
            <Col span={8}>
            <FormItem name='registeredCapital' rules={[{ required: false }]}
              label={'注册资本'} >
                  <InputNumber min={ 1}/>
            </FormItem>
            </Col>
           
            </Row>


            <Row>
              <Col span={8}>
              <FormItem name='paidCapital' rules={[{ required: false }]}
              label={'实缴资本'} >
              <InputNumber min={ 1}/>
            </FormItem>
              </Col>

              <Col span={8}>
              <FormItem name='personnelSize' rules={[{ required: false }]}
            label={'人员规模'} >
            <InputNumber />
          </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='insuredPersonnelSize' rules={[{ required: false }]}
            label={'参保人员'} >
            <InputNumber />
          </FormItem>
              </Col>
             
            </Row>

          

            <Row>
              <Col span={8}>
              <FormItem name='businessTerm' rules={[{ required: false }]}
              label={'营业期限'} >
              <DatePicker  />
            </FormItem>
              </Col>

              <Col span={8}>
              <FormItem name='establishDate' rules={[{ required: false }]}
              label={'成立日期'} >
              <DatePicker  />
            </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='approveDate' rules={[{ required: false }]}
              label={'核准日期'} >
              <DatePicker  />
            </FormItem>
                
              </Col>
             
            </Row>
  
            <Divider orientation="left">法人信息</Divider>

            <Row>
            <Col span={8}>
            <FormItem name='userName' rules={[{ required: true }]}
            label={'法定代表人'} >
            <Input />
          </FormItem>
            </Col>

              <Col span={8}>
              <FormItem name='userCardNo' rules={[{ required: true }]}
            label={'法人证件号'} >
            <Input />
          </FormItem>
           
            </Col>
            <Col span={8}>
            <FormItem name='userCardType' rules={[{ required: false }]}
            label={'法人证件类型'} >
            <Input />
          </FormItem>
            </Col>
           
            </Row>
            
            <Row>
            <Col span={8}>
            <FormItem name='userNation' rules={[{ required: false }]}
            label={'法人民族'} >
            <Input />
          </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='userSex' rules={[{ required: false }]}
            label={'法人性别'} >
             <Select >
                    {
                      sexArr.map((item,index) => {
                        return (
                          <Option value={item.value}>{ item.label}</Option>  
                        )
                      })
                    }
                </Select>
          </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='userBirthday' rules={[{ required: false }]}
            label={'法人生日'} >
             <DatePicker  />
          </FormItem>
              </Col>
            </Row>


            <Row>
              <Col span={8}>
              <FormItem name='userAddress' rules={[{ required: false }]}
              label={'法人地址'} >
              <Input />
            </FormItem>
              </Col>

            </Row>  
            <Form.Item >
              <Row>
                <Col span={20}></Col>
                <Col span={4}>
            <Button
              type="primary"
              htmlType="submit"
              //loading={loading.effects.login}
            >
              <div>提交</div>
            </Button>
            </Col>
          </Row>
       
      </Form.Item>
            
      </Form>
        </div>
      </Page>
    )
  }
}

Detail.propTypes = {
  operatorAdd: PropTypes.object,
}

export default Detail
