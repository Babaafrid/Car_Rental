import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
const { RangePicker } = DatePicker;
function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  function setFilter(values) {
    const selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    const selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    const temp = totalCars.filter((car) => {
      if (car.bookedTimeSlots.length === 0) {
        return true;
      }
      const isOverlapping = car.bookedTimeSlots.some((booking) => {
        return (
          selectedFrom.isBetween(booking.from, booking.to, null, "[)") ||
          selectedTo.isBetween(booking.from, booking.to, null, "(]") ||
          moment(booking.from).isBetween(
            selectedFrom,
            selectedTo,
            null,
            "(]"
          ) ||
          moment(booking.to).isBetween(selectedFrom, selectedTo, null, "[)")
        );
      });

      return !isOverlapping;
    });

    setTotalcars(temp);
  }

  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={setFilter}
          />
        </Col>
      </Row>

      {loading === true && <Spinner />}

      <Row justify="center" gutter={16} className="mt-5">
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 box1 mt-3">
                <img src={car.image} className="carimg w-100" alt="" />
                <div className="car-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>
                      <b>{car.name}</b>
                    </p>
                    <p>{car.rentPerHour} Per Hour /-</p>
                  </div>
                  <div>
                    <button className="btn1 mr-2">
                      <Link
                        to={`/booking/${car._id}`}
                        style={{ color: "white" }}
                      >
                        Book Now
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
