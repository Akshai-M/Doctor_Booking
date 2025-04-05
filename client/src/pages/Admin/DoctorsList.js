import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import { User, Phone, Calendar, CheckCircle, XCircle } from "lucide-react"; // Import Lucid Icons

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Failed to fetch doctors.");
    }
  };

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-doctor-account-status",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getDoctorsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status.");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <User size={18} style={{ marginRight: "8px", color: '#007bff' }} />
          <span>{record.firstName} {record.lastName}</span>
        </div>
      ),
      width: "25%",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Phone size={18} style={{ marginRight: "8px",color: '#007bff' }} />
          <span>{text}</span>
        </div>
      ),
      width: "20%",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Calendar size={18} style={{ marginRight: "8px", color: '#007bff' }} />
          <span>{moment(record.createdAt).format("DD-MM-YYYY")}</span>
        </div>
      ),
      width: "20%",
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
            color: status === "approved" ? "green" : status === "pending" ? "orange" : "red",
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {record.status === "pending" && (
            <CheckCircle
              onClick={() => changeDoctorStatus(record, "approved")}
              size={24}
              color="green"
              style={{ cursor: "pointer" }}
              title="Approve"
            />
          )}
          {record.status === "approved" && (
            <XCircle
              onClick={() => changeDoctorStatus(record, "blocked")}
              size={24}
              color="red"
              style={{ cursor: "pointer"}}
              title="Block"
            />
          )}
        </div>
      ),
      width: "20%",
    },
  ];

  // Styling objects
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
      <div style={{padding:"20px"}}>
        <h1 style={titleStyle}>Doctors List</h1>
        <hr style={hrStyle} />
        <div style={tableWrapperStyle}>
          <Table columns={columns} dataSource={doctors} style={tableStyle} rowKey="_id"/>
        </div>
      </div>
    </Layout>
  );
}

export default DoctorsList;