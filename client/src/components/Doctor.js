import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, IndianRupee, Clock } from 'lucide-react'; // Import from lucid-react

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      className="doctor-card"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        backgroundColor: 'white',
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <h2
        className="doctor-card-title"
        style={{
          fontSize: '1.5rem',
          marginBottom: '10px',
          color: '#333',
        }}
      >
        {doctor.firstName} {doctor.lastName}
      </h2>
      <hr
        className="doctor-divider"
        style={{
          border: '0.5px solid #e0e0e0',
          margin: '15px 0',
        }}
      />

      <div className="doctor-detail" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <Phone className="doctor-icon" size={18} style={{ marginRight: '8px', color: '#007bff' }} />
        <span style={{ fontWeight: '600', marginRight: '4px' }}>Phone:</span>
        {doctor.phoneNumber}
      </div>

      <div className="doctor-detail" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <MapPin className="doctor-icon" size={18} style={{ marginRight: '8px', color: '#007bff' }} />
        <span style={{ fontWeight: '600', marginRight: '4px' }}>Address:</span>
        {doctor.address}
      </div>

      <div className="doctor-detail" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <IndianRupee className="doctor-icon" size={18} style={{ marginRight: '8px', color: '#007bff' }} />
        <span style={{ fontWeight: '600', marginRight: '4px' }}>Fee:</span>
        ₹{doctor.feePerCunsultation}
      </div>

      <div className="doctor-detail" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <Clock className="doctor-icon" size={18} style={{ marginRight: '8px', color: '#007bff' }} />
        <span style={{ fontWeight: '600', marginRight: '4px' }}>Timings:</span>
        {doctor.timings[0]} - {doctor.timings[1]}
      </div>
    </div>
  );
};

export default DoctorCard;