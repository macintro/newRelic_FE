import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for toBeInTheDocument()

import CustomerSearchPage from './CustomerSearchPage';
import { customerLookUp, companyLookUp } from '../../utils/services';

// Mock services
jest.mock('../../utils/services', () => ({
  customerLookUp: jest.fn(),
  companyLookUp: jest.fn(),
}));

describe('CustomerSearchPage', () => {
  beforeEach(() => {
    // Mock response data for customerLookUp and companyLookUp
    customerLookUp.mockResolvedValue({ status: 200, data: [{ fName: 'John', lName: 'Doe', companyName: 'ABC Inc' }] });
    companyLookUp.mockResolvedValue({ status: 200, data: [{ id: 1, companyName: 'ABC Inc' }] });
  });

  it('renders without crashing', async () => {
    render(<CustomerSearchPage />);
    
    // Wait for initial data to be fetched and component to be fully rendered
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Doe')).toBeInTheDocument();
    });
  });

});
