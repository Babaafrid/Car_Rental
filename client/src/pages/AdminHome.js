import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
function AdminHome() {
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

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24} xs={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <a href="/addcar" style={{ color: "white" }}>
                ADD CAR
              </a>
            </button>
          </div>
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
                  <div className="mr-4">
                    <Link to={`/editcar/${car._id}`}>
                      <EditOutlined
                        className="mr-3"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>
                    <Popconfirm
                      title="Are you sure to delete this car?"
                      onConfirm={() => {
                        dispatch(deleteCar({ carid: car._id }));
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>
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

export default AdminHome;
