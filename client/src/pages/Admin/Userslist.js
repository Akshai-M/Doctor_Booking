import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import { User, Mail, Calendar, Slash } from "lucide-react"; // Import Lucid Icons

function Userslist() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <User size={18} style={{ marginRight: "8px", color: '#007bff' }} /> {text}
        </div>
      ),
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Mail size={18} style={{ marginRight: "8px", color: '#007bff' }} /> {text}
        </div>
      ),
      width: "30%",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Calendar size={18} style={{ marginRight: "8px", color: '#007bff' }} /> {moment(record.createdAt).format("DD-MM-YYYY")}
        </div>
      ),
      width: "20%",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <h1 className="anchor">Block</h1>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-header">Users List</h1>
      <hr />
      <Table columns={columns} dataSource={users}/>
    </Layout>
  );
}

export default Userslist;
