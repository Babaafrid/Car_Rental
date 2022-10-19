import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {CloseSquareOutlined} from '@ant-design/icons';
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { useParams,Link } from 'react-router-dom';
import moment from "moment";
import Spinner from '../components/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import StripeCheckout from "react-stripe-checkout";
import { bookCar } from "../redux/actions/bookingActions";
const { RangePicker } = DatePicker
function CarBooking() {
  const { cars } = useSelector((state) => state.carsReducer)
  const { loading } = useSelector((state) => state.alertsReducer)
  const [car, setcar] = useState({})
  const dispatch = useDispatch()
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const { carid } = useParams();
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id === carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <div className='d-flex justify-content-between p-2 mt-2'>
      <br />
      <div className='mr-4'>
      <Link to={`/`}><CloseSquareOutlined className="mr-0" style={{color:'red', cursor: "pointer"}}/></Link>
      </div>
      </div>
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img src={car.image} className="carimg2 box1 w-100" data-aos='flip-left' data-aos-duration='1500' />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal">Car Info</Divider>
          <div style={{ textAlign: "right" }}>
            <h4><b>{car.name}</b></h4>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>
          <Divider type="horizontal">Select Time Slots</Divider>
          <RangePicker showTime={{ format: "HH:mm" }} format="MMM DD yyyy HH:mm" onChange={selectTimeSlots} />
          <br />
          <button className='btn1 mt-2' onClick={() => { setShowModal(true) }}>See Booked Slots</button>
          {from && to && (
            <div>
              <p>Total Hours: <b>{totalHours}</b></p>
              <p>Rent Per Hour : <b>{car.rentPerHour}</b></p>
              <Checkbox onChange={(e) => {
                if (e.target.checked) {
                  setdriver(true);
                }
                else {
                  setdriver(false);
                }
              }}>Driver Required</Checkbox>
              <h3>Total Amount : {totalAmount}</h3>
              <StripeCheckout
                billingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100}
                stripeKey="pk_test_51LfyuySHzp4460YwamOa4wyIl9L9mpH0227Ux0J0g29Ze4O7vBo6qoKCdaOtihSJgnhOxAU6pGWTYe8ZLteZbCoZ00hAl1aRcU"
              >
                <button className="btn1">
                  Book Now
                </button>
              </StripeCheckout>
            </div>
          )}
        </Col>
        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="ant-btn"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  )
}

export default CarBooking