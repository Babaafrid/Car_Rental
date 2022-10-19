import React from 'react'
import { Row, Col, Form, Input } from 'antd'
import { NavLink } from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { userLogin } from "../redux/actions/userActions";
import Spinner from '../components/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
function Login() {
  const dispatch = useDispatch()
  const {loading} = useSelector(state=>state.alertsReducer)
  function onFinish(values){
    dispatch(userLogin(values))
    console.log(values);
  }
  return (
    <div className='login'>
      {loading && (<Spinner />)}
      <Row gutter={16} className='d-flex align-items-center'>
        <Col lg={16} style={{ position: 'relative' }}>
          <img 
          data-aos="zoom-in-up"
          data-aos-duration='1500'
          className='w-100' src="https://c4.wallpaperflare.com/wallpaper/191/217/135/car-black-car-rolls-royce-phantom-vehicle-wallpaper-preview.jpg" alt="" />
          {/* <h1 className='login-logo'>AMCARS</h1> */}
        </Col>
        <Col lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
            <h1>Login</h1>
            <Form.Item name='username' label='Username' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <button className='btn1 mt-2 mb-3'>Login</button>
            <br />
            <NavLink to="/register" activeclassname="active">Not registered? Click Here to Register</NavLink>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login