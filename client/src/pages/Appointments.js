import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/user/get-appointments-by-user-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  useEffect(() => {
    getAppointmentsData();
  }, []);

  // Inline styles
  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    textAlign: "center",
    margin: "24px 0 10px 0",
    color: "#1f3c88",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const hrStyle = {
    width: "100px",
    height: "4px",
    border: "none",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    borderRadius: "10px",
    margin: "0 auto 24px auto",
  };

  const tableWrapperStyle = {
    padding: "0 20px 40px",
  };

  return (
    <Layout>
      <h1 style={titleStyle}>Appointments</h1>
      <hr style={hrStyle} />
      <div style={tableWrapperStyle}>
        <Table
          columns={columns}
          dataSource={appointments}
          pagination={{ pageSize: 6 }}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)",
            fontFamily: "'Segoe UI', sans-serif",
          }}
        />
      </div>
    </Layout>
  );
}

export default Appointments;
