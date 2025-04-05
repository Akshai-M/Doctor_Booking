import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";
import React from "react";
import {
  User,
  Phone,
  Globe,
  MapPin,
  BriefcaseMedical,
  TrendingUp,
  Wallet,
  Clock,
} from "lucide-react";

function DoctorForm({ onFinish, initivalValues }) {
  const labelWithIcon = (IconComponent, label) => (
    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <IconComponent size={16} style={{ color: '#007bff' }} />
      {label}
    </span>
  );

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initivalValues,
        ...(initivalValues && {
          timings: [
            moment(initivalValues?.timings[0], "HH:mm"),
            moment(initivalValues?.timings[1], "HH:mm"),
          ],
        }),
      }}
      style={{
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1
        className="card-title mt-3"
        style={{
          fontSize: "1.8rem",
          fontWeight: "600",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Personal Information
      </h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label={labelWithIcon(User, "First Name")}
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input placeholder="First Name" style={{ borderRadius: "6px" }} />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label={labelWithIcon(User, "Last Name")}
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Last Name" style={{ borderRadius: "6px" }} />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label={labelWithIcon(Phone, "Phone Number")}
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone Number" style={{ borderRadius: "6px" }} />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label={labelWithIcon(Globe, "Website")}
            name="website"
            rules={[{ required: true }]}
          >
            <Input placeholder="Website" style={{ borderRadius: "6px" }} />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label={labelWithIcon(MapPin, "Address")}
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" style={{ borderRadius: "6px" }} />
          </Form.Item>
        </Col>
      </Row>

      <hr style={{ border: "1px solid #e0e0e0", margin: "20px 0" }} />
      <h1
        className="card-title mt-3"
        style={{
          fontSize: "1.8rem",
          fontWeight: "600",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Professional Information
      </h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label={labelWithIcon(BriefcaseMedical, "Specialization")}
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specialization" style={{ borderRadius: "6px" }} />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label={labelWithIcon(TrendingUp, "Experience")}
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="Experience" type="number" style={{ borderRadius: "6px" }} />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label={labelWithIcon(Wallet, "Fee Per Consultation")}
            name="feePerCunsultation"
            rules={[{ required: true }]}
          >
            <Input placeholder="Fee Per Consultation" type="number" style={{ borderRadius: "6px" }} />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label={labelWithIcon(Clock, "Timings")}
            name="timings"
            rules={[{ required: true }]}
          >
            <TimePicker.RangePicker format="HH:mm" style={{ width: "100%", borderRadius: "6px" }} />
          </Form.Item>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-4">
        <Button
          className="primary-button"
          htmlType="submit"
          style={{
            backgroundColor: "#1890ff",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            fontWeight: "600",
            border: "none",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default DoctorForm;
