import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

// Lucide icons
import { Check, X, Phone, CalendarClock, UserRound } from "lucide-react";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/doctor/get-appointments-by-doctor-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Failed to fetch appointments.");
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/change-appointment-status",
        {
          appointmentId: record._id,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error changing appointment status.");
    }
  };

  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "_id",
      key: "_id",
      ellipsis: true,
      width: "15%",
    },
    {
      title: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UserRound size={18} style={{ color: '#007bff' }} /> Patient Name
        </span>
      ),
      dataIndex: "name",
      key: "name",
      render: (text, record) => <span>{record.userInfo?.name || "N/A"}</span>,
      width: "20%",
    },
    {
      title: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Phone size={18} style={{ color: '#007bff' }} /> Phone
        </span>
      ),
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
    {
      title: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CalendarClock size={18} style={{ color: '#007bff' }} /> Appointment Date & Time
        </span>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")}
        </span>
      ),
      width: "25%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status) => (
        <span
          style={{
            fontWeight: "600",
            color:
              status === "approved" ? "green" : status === "pending" ? "orange" : "red",
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        record.status === "pending" && (
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button
              onClick={() => changeAppointmentStatus(record, "approved")}
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                padding: "6px 10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                lineHeight: "1",
              }}
            >
              <Check size={16} /> 
            </button>
            <button
              onClick={() => changeAppointmentStatus(record, "rejected")}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                padding: "6px 10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                lineHeight: "1",
              }}
            >
              <X size={16} /> 
            </button>
          </div>
        ),
    }
    
  ];

  useEffect(() => {
    getAppointmentsData();
  }, []);

  const titleStyle = {
    fontSize: "2.2rem",
    fontWeight: "600",
    textAlign: "center",
    margin: "30px 0 15px 0",
    color: "#374151",
    fontFamily: "'Roboto', sans-serif",
    letterSpacing: "0.5px",
  };

  const hrStyle = {
    width: "120px",
    height: "3px",
    border: "none",
    background: "linear-gradient(to right, #6366f1, #3b82f6)",
    borderRadius: "10px",
    margin: "0 auto 30px auto",
  };

  const tableWrapperStyle = {
    padding: "0 25px 50px",
  };

  const tableStyle = {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Open Sans', sans-serif",
    border: "1px solid #e5e7eb",
  };

  return (
    <Layout>
      <h1 style={titleStyle}>Doctor Appointments</h1>
      <hr style={hrStyle} />
      <div style={tableWrapperStyle}>
        <Table
          columns={columns}
          dataSource={appointments}
          pagination={{ pageSize: 7 }}
          style={tableStyle}
          rowKey="_id"
        />
      </div>
    </Layout>
  );
}

export default DoctorAppointments;
