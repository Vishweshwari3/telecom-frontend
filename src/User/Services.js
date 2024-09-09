import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import './Styling_Components/Services.css';
import { Divider } from "antd";

function Services() {
    const [internetServices, setInternetServices] = useState([]);
    const [tvServices, setTvServices] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const [internetResponse, tvResponse] = await Promise.all([
                    axios.get('http://localhost:8082/api/internet-services/', { withCredentials: true }),
                    axios.get('http://localhost:8082/api/tv-services/', { withCredentials: true })
                ]);

                setInternetServices(internetResponse.data);
                setTvServices(tvResponse.data);
            } catch (err) {
                setError('Error fetching services.');
                console.error('Error fetching services:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Function to handle subscription using query parameters
    const handleSubscribe = async (serviceId, isInternetService) => {
        try {
            const apiUrl = isInternetService
                ? `http://localhost:8082/api/internet-services/subscribe`
                : `http://localhost:8082/api/tv-services/subscribe`;

            // POST request with query params instead of request body
            const requestResponse = await axios.post(
                apiUrl,
                null, // No body
                {
                    params: { serviceId }, // Send serviceId as query param
                    withCredentials: true,
                }
            );

            alert('Request sent to admin successfully!');

        } catch (err) {
            alert('Error sending request to admin.');
            console.error('Error details:', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Internet Services</h1>
            <div className="services-grid">
                {internetServices.length === 0 ? (
                    <p>No internet services available.</p>
                ) : (
                    internetServices.map(service => (
                        service.active && (
                            <div className="service-box" key={service.serviceId}>
                                <h2>{service.serviceName}</h2>
                                <p><strong>Type:</strong> {service.serviceType}</p>
                                <p><strong>Benefits:</strong> {service.benefits}</p>

                                <div className="speed-info">
                                    <p>
                                        <FontAwesomeIcon icon={faDownload} className="icon" />
                                        <strong>Download Speed:</strong> {service.serviceDownloadSpeed} Mbps
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faUpload} className="icon" />
                                        <strong>Upload Speed:</strong> {service.serviceUploadSpeed} Mbps
                                    </p>
                                </div>

                                <p className="plan-cost">${service.monthlyCost}/month</p>

                                {/* Subscribe button */}
                                <button
                                    className="subscribe-btn"
                                    onClick={() => handleSubscribe(service.serviceId, true)}
                                >
                                    Subscribe
                                </button>
                            </div>
                        )
                    ))
                )}
            </div>

            <Divider />

            <h1>TV Services</h1>
            <div className="services-grid">
                {tvServices.length === 0 ? (
                    <p>No TV services available.</p>
                ) : (
                    tvServices.map(service => (
                        service.active && (
                            <div className="service-box" key={service.serviceId}>
                                <h2>{service.serviceName}</h2>
                                <p><strong>Type:</strong> {service.serviceType}</p>
                                <p><strong>Benefits:</strong> {service.benefits}</p>

                                <div className="speed-info">
                                    <p>
                                        <FontAwesomeIcon icon={faDownload} className="icon" />
                                        <strong>Download Speed:</strong> {service.serviceDownloadSpeed} Mbps
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faUpload} className="icon" />
                                        <strong>Upload Speed:</strong> {service.serviceUploadSpeed} Mbps
                                    </p>
                                </div>

                                <p className="plan-cost">${service.monthlyCost}/month</p>

                                {/* Subscribe button */}
                                <button
                                    className="subscribe-btn"
                                    onClick={() => handleSubscribe(service.serviceId, false)}
                                >
                                    Subscribe
                                </button>
                            </div>
                        )
                    ))
                )}
            </div>
        </div>
    );
}

export default Services;
