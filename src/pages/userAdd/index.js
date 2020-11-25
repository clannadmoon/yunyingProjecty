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

import { Form, Input,Row,Col, InputNumber, Radio, Modal, Cascader,Button,Select } from 'antd'

import { pageDetailLabelDATA, companyTypeArr, companyStatusArr } from '../user/common'

const FormItem = Form.Item
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 14,
  },
  wrapperCol: {
    span: 14,
  },
}

@connect(({ addUser }) => ({ addUser }))
class UserDetail extends PureComponent {
  onSumbit = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'addUser/add',
      payload: {},
    })
  }

  render() {
    const { addUser } = this.props
    const { data } = addUser

    return (
      <Page inner>
        <div className={styles.content}>
          <Form
            {...formItemLayout}
            name="control-ref"
            layout="vertical"
          >
            <Row>
              <Col span={8}>
                <FormItem name='enterpriseName' rules={[{ required: true }]}
                  label={'企业名称'} hasFeedback>
                  <Input />
                </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='creditNumber' rules={[{ required: true }]}
              label={'统一社会信用代码'} hasFeedback>
              <Input />
            </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='registrationNumber' rules={[{ required: false }]}
              label={'工商注册号'} hasFeedback>
              <Input />
            </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={8}>
              <FormItem name='taxpayerNumber' rules={[{ required: false }]}
              label={'纳税人识别号'} hasFeedback>
              <Input />
            </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='organizationNumber' rules={[{ required: false }]}
              label={'组织机构代码'} hasFeedback>
              <Input />
            </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='comType' rules={[{ required: false }]}
              label={'企业类型'} hasFeedback>
                  <Select defaultValue="lucy" >
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
            </Row>

            <Row>
              <Col span={8}>
              <FormItem name='userName' rules={[{ required: true }]}
              label={'法定代表人'} hasFeedback>
              <Input />
            </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='registeredCapital' rules={[{ required: false }]}
              label={'注册资本'} hasFeedback>
              <Input />
            </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='establishDate' rules={[{ required: false }]}
              label={'成立日期'} hasFeedback>
              <Input />
            </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={8}>
              <FormItem name='registrationAuthority' rules={[{ required: false }]}
              label={'登记机关'} hasFeedback>
              <Input />
            </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='approveDate' rules={[{ required: false }]}
              label={'核准日期'} hasFeedback>
              <Input />
            </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='businessStatus' rules={[{ required: true }]}
              label={'登记状态'} hasFeedback>
              <Input />
            </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={8}>
              <FormItem name='comAddress' rules={[{ required: false }]}
              label={'住所'} hasFeedback>
              <Input />
            </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='userCardType' rules={[{ required: false }]}
              label={'法人证件类型'} hasFeedback>
              <Input />
            </FormItem>
              </Col>
              <Col span={8}>
              <FormItem name='userCardNo' rules={[{ required: true }]}
              label={'法人证件号'} hasFeedback>
              <Input />
            </FormItem>
              </Col>
            </Row>
            <Form.Item >
        <Button type="primary"  onClick={() => this.onSumbit()} >
          Submit
        </Button>
      </Form.Item>
            
      </Form>
        </div>
      </Page>
    )
  }
}

UserDetail.propTypes = {
  addUser: PropTypes.object,
}

export default UserDetail
