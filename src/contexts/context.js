import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const SystemContext = createContext();

// Create a provider component
export const SystemProvider = ({ children }) => {
  // Define your initial state
  const initialState = {
    active: false,
    smokeDetected: false,
    fireDetected: false,
    temperature: 0,
  };

  // Set up state
  const [systemState, setSystemState] = useState(initialState);

  // Function to fetch system state from the backend
  const fetchSystemState = async () => {
    try {
      const response = await axios.get('your_backend_endpoint_here');
      setSystemState(response.data);
    } catch (error) {
      console.error('Error fetching system state:', error);
    }
  };

  // Use useEffect to fetch system state when the component mounts
  useEffect(() => {
    fetchSystemState();
  }, []);

  return (
    <SystemContext.Provider value={{ systemState, fetchSystemState }}>
      {children}
    </SystemContext.Provider>
  );
};
