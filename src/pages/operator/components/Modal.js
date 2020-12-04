/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-11-25 20:27:28
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio,DatePicker, Modal, Cascader } from 'antd'
import { Trans } from '@lingui/react'
import city from 'utils/city'
import moment from 'moment'

const { RangePicker } = DatePicker;
const FormItem = Form.Item
const dateFormat = 'YYYY/MM/DD';


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class OperatorModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      startTime:moment().subtract(3, 'months'),
      endTime:moment().add(3, 'months'),
    }
  }

  handleOk = () => {
    const { item = {}, onOk } = this.props
    const { startTime,endTime } = this.state
    
    let params = {
      ...item,
      startTime:  `${moment(startTime).format('YYYY-MM-DD')} 00:00:00`,
      endTime:  `${moment(endTime).format('YYYY-MM-DD')} 00:00:00`,
    }
    onOk(params)
  }

  onChangeStartTime = (value) => {
    console.log(value)
    this.setState({
      startTime:value
    })
  }
  onChangeEndTime = (value) => {
    console.log(value)
    this.setState({
      endTime:value
    })
  }

  render() {
    const {  item = {}, onOk, form, ...modalProps } = this.props
    const { startTime,endTime } = this.state
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form  name="control-ref" layout="horizontal">
          <FormItem name='name' rules={[{ required: true }]}
            label='运营开始时间'  {...formItemLayout}>
            <DatePicker
              defaultValue={startTime}
              format={dateFormat}
              disabledDate={(current) => {
                  // Can not select days before today and today
                
                console.log('current',current)
                  return current && current > moment().endOf('day');
              }}
              onChange={this.onChangeStartTime}
            />
          </FormItem>
          <FormItem name='name' rules={[{ required: true }]}
          label='运营结束时间'  {...formItemLayout}>
          <DatePicker
            defaultValue={endTime}
              format={dateFormat}
              disabledDate={(current) => {
                console.log('current',current)
                // Can not select days before today and today
                return current && current < moment().endOf('day');
             }}
            onChange={this.onChangeEndTime}
          />
        </FormItem>
          
        </Form>
      </Modal>
    )
  }
}

OperatorModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default OperatorModal
