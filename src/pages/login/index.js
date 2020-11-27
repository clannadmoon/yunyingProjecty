import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Button, Row, Col, Input, Form } from 'antd'
import { GlobalFooter } from 'components'
import { GithubOutlined } from '@ant-design/icons'
import { Trans, withI18n } from '@lingui/react'
import { setLocale } from 'utils'
import config from 'utils/config'

import { getCaptchaImage } from '../../services/user';
import { setCaptchaKey } from '../../utils/authority';


import styles from './index.less'

const FormItem = Form.Item

@withI18n()
@connect(({ loading, dispatch }) => ({ loading, dispatch }))
class Login extends PureComponent {


  constructor(props) {
    super(props)
    this.state = {
      // 默认白色背景
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    };
  }


  componentDidMount() {
     this.refreshCaptcha();
  }

  refreshCaptcha = () => {
    // 获取验证码
    getCaptchaImage().then(resp => {
      const {data} = resp;
      if (data.key) {
        this.setState({ image: data.image });
        setCaptchaKey(data.key);
      }
    });
  };

  render() {
    const { dispatch, loading, i18n } = this.props


    const { image } = this.state;
    
    const handleOk = values => {
      dispatch({ type: 'login/login', payload: values })
    }

    
    let footerLinks = [
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/zuiidea/antd-admin',
        blankTarget: true,
      },
    ]

    if (config.i18n) {
      footerLinks = footerLinks.concat(
        config.i18n.languages.map(item => ({
          key: item.key,
          title: (
            <span onClick={setLocale.bind(null, item.key)}>{item.title}</span>
          ),
        }))
      )
    }

    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            {/* <img alt="logo" src={config.logoPath} /> */}
            <span>两两数智运营平台</span>
          </div>
          <Form
            onFinish={handleOk}
            >
            <FormItem name="account" 
              rules={[{ required: true,message: '请输入用户名' }]} hasFeedback>
                <Input
                  placeholder={i18n.t`Username`}
                />
            </FormItem>
            <FormItem name="password"
              rules={[{ required: true,message: '请输入密码' }]} hasFeedback>
                <Input
                  type="password"
                  placeholder={i18n.t`Password`}
                />
            </FormItem>
            <FormItem
              name="code"
              rules={[{ required: true,message: '请输入图形码' }]}>
            <div className={styles.yanzhengContainer}>
                <Input
                  placeholder={'图形码'}
                  />
                <img
                  alt="captcha"
                  src={image}
                  className={styles.getImgCaptcha}
                  onClick={this.refreshCaptcha}
                />
                </div>
          </FormItem>


            <Row>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading.effects.login}
              >
                <Trans>Sign in</Trans>
              </Button>
              
            </Row>
          </Form>
        </div>
        <div className={styles.footer}>
          <GlobalFooter links={footerLinks} copyright={config.copyright} />
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
