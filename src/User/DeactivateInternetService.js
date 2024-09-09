import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeactivateInternetService = ({ internetServices = [] }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Effect to set the selected service if available
    useEffect(() => {
        if (internetServices.length > 0) {
            setSelectedService(internetServices[0]);  // Automatically select the first service
        } else {
            setSelectedService(null);
        }
    }, [internetServices]);

    // Function to deactivate the selected Internet service
    const deactivateService = async () => {
        if (!selectedService) {
            setError('No Internet service selected.');
            return;
        }

        try {
            const { serviceId, startDate } = selectedService;
            const response = await axios.post(
                'http://localhost:8082/user/api/deactivate-internet-service',
                null, // No request body needed
                {
                    params: { availedServiceId: serviceId, startDate },
                    withCredentials: true
                }
            );

            setMessage(response.data);
            setError('');
        } catch (err) {
            setMessage('');
            setError('Error deactivating Internet service.');
            console.error(err);
        }
    };

    return (
        <div>
            {selectedService ? (
                <div>
                    <button onClick={deactivateService}>
                        Deactivate Internet Service
                    </button>
                </div>
            ) : internetServices.length === 0 ? (
                <p>No Internet services available to deactivate.</p>
            ) : (
                <p>Loading service details...</p>
            )}
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default DeactivateInternetService;
