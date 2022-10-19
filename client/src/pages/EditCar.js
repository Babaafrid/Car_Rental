import { Col, Row, Form, Input } from 'antd'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import {CloseSquareOutlined} from '@ant-design/icons';
import { useParams,Link } from 'react-router-dom';
import { addCar, editCar, getAllCars } from "../redux/actions/carsActions";
function EditCar() {

  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.alertsReducer)
  const [car, setCar] = useState()
  const [totalcars, settotalcars] = useState([]);
  const { carid } = useParams();

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      settotalcars(cars)
      setCar(cars.find((o) => o._id === carid));
    }
  }, [cars]);


  function onFinish(values) {
    values._id = car._id;

    dispatch(editCar(values))
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
          {totalcars.length > 0 && (
            <Form
              initialValues={car}
              className="box1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Car</h3>

              <hr />
              <Form.Item
                name="name"
                label="Car name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image url"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rentPerHour"
                label="Rent per hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <div className="text-right">
                <button className="btn1">Edit CAR</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>

    </DefaultLayout>
  )
}

export default EditCar