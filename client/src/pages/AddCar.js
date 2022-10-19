import { Col, Row, Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {CloseSquareOutlined} from '@ant-design/icons';
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { addCar } from '../redux/actions/carsActions'

function AddCar() {

  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.alertsReducer)

  function onFinish(values) {

    values.bookedTimeSlots = []

    dispatch(addCar(values))
    console.log(values)
  }

  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <div className='d-flex justify-content-between p-2 mt-2'>
      <br />
      <div className='mr-4'>
      <Link to={`/admin`}><CloseSquareOutlined className="mr-0" style={{color:'red', cursor: "pointer"}}/></Link>
      </div>
      </div>
      <Row justify='center mt-3'>
        <Col lg={12} sm={24} xs={24} className='p-2'>
          <Form className='box1 p-2' layout='vertical' onFinish={onFinish}>
            <h3>Add New Car</h3>
            <hr />
            <Form.Item name='name' label='Car name' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='image' label='Image url' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='rentPerHour' label='Rent per hour' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='capacity' label='Capacity' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='fuelType' label='Fuel Type' rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <div className='text-right'>
              <button className='btn1'>ADD CAR</button>
            </div>

          </Form>
        </Col>
      </Row>

    </DefaultLayout>
  )
}

export default AddCar