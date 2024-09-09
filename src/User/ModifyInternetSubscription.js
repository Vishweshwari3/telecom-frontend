import React, { useState } from 'react';
import axios from 'axios';
import { Select, Button, Spin, Alert } from 'antd';
import './Styling_Components/styles.css'; // Import your CSS file here

const { Option } = Select;

const ModifyInternetSubscription = () => {
  const [filteredServices, setFilteredServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch filtered internet services from the backend
  const fetchFilteredServices = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:8082/user/api/modify-internet-subscription', {
        params: { serviceName, serviceType },
        withCredentials: true,
      });
      console.log('Fetched filtered services:', response.data); // Log fetched data
      setFilteredServices(response.data);
    } catch (err) {
      setError('Failed to fetch services. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Only fetch filtered services when the button is clicked
  const handleFilterClick = () => {
    fetchFilteredServices();
  };

  // Function to handle the combined action (deactivate and request to admin)
  const handleAction = async (service) => {
    const availedServiceId = prompt('Enter the ID of the service to terminate:');
    const startDate = prompt('Enter the start date of the service (YYYY-MM-DD):');

    if (!availedServiceId || !startDate) {
      alert('Both Service ID and Start Date are required.');
      return;
    }

    // Deactivate the service
    try {
      const deactivateResponse = await axios.post(
        'http://localhost:8082/user/api/deactivate-internet-service',
        null,
        {
          params: { availedServiceId, startDate },
          withCredentials: true,
        }
      );
      alert(deactivateResponse.data); // Display success message
      setFilteredServices((prev) =>
        prev.filter((service) => service.serviceId !== availedServiceId)
      );
    } catch (err) {
      alert('Error deactivating internet service.');
      console.error(err);
      return;
    }

    // Send request to admin using serviceId from the service object
    try {
      const requestResponse = await axios.post(
        'http://localhost:8082/api/internet-services/subscribe',
        null,
        {
          params: { serviceId: service.serviceId }, // Use serviceId here
          withCredentials: true,
        }
      );
      alert('Request sent to admin successfully!');
    } catch (err) {
      alert('Error sending request to admin.');
      console.error(err);
    }
  };

  return (
    <div className="services-container">
      <h2>Modify Internet Subscription</h2>
      <div>
        <label>
          Service Name:
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Enter service name"
          />
        </label>
      </div>
      <div>
        <label>
          Service Type:
          <Select
            value={serviceType}
            onChange={(value) => setServiceType(value)}
            placeholder="Select a service type"
            style={{ width: 200 }}
          >
            <Option value="Basic">Basic</Option>
            <Option value="Standard">Standard</Option>
            <Option value="Premium">Premium</Option>
          </Select>
        </label>
      </div>
      <Button
        className="btn"
        onClick={handleFilterClick}
        disabled={loading}
        type="primary"
      >
        {loading ? <Spin /> : 'Filter Services'}
      </Button>

      {error && <Alert message={error} type="error" />}

      {filteredServices.length > 0 ? (
        <table className="services-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Service Type</th>
              <th>Monthly Cost</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service) => (
              <tr key={service.serviceId}>
                <td>{service.serviceName}</td>
                <td>{service.serviceType}</td>
                <td>${service.monthlyCost.toFixed(2)}</td>
                <td>{service.description}</td>
                <td>
                  <Button
                    onClick={() => handleAction(service)}
                    className="btn-combined"
                    type="danger"
                  >
                    Terminate & Request Admin
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No available services found.</p>
      )}
    </div>
  );
};

export default ModifyInternetSubscription;




















