import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Toaster } from 'react-hot-toast';
import QuoteForm from './QuoteForm';

// Mock Firestore and GA4
jest.mock('@/utils/firebase', () => ({
  db: { collection: jest.fn(() => ({ add: jest.fn() })) }
}));

const mockGA4 = jest.fn();
jest.mock('@/utils/ga4', () => ({
  fireEvent: (...args: any[]) => mockGA4(...args)
}));

global.fetch = jest.fn();

describe('QuoteForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderForm = () => render(
    <>
      <Toaster />
      <QuoteForm productType="Auto" />
    </>
  );

  it('shows validation errors for empty required fields', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /get my free quote/i }));
    expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/last name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/a valid phone number is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/a valid 5-digit zip code is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/please select at least one insurance type/i)).toBeInTheDocument();
    expect(await screen.findByText(/you must consent to be contacted/i)).toBeInTheDocument();
  });

  it('submits successfully and fires GA4 event', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Lead submitted successfully!' })
    });
    renderForm();
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '555-555-5555' } });
    fireEvent.change(screen.getByLabelText(/zip code/i), { target: { value: '12345' } });
    fireEvent.click(screen.getByLabelText(/auto/i));
    fireEvent.click(screen.getByLabelText(/consent to be contacted/i));
    fireEvent.click(screen.getByRole('button', { name: /get my free quote/i }));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(await screen.findByText(/quote request submitted successfully!/i)).toBeInTheDocument();
    expect(mockGA4).toHaveBeenCalledWith('lead_submit', expect.any(Object));
  });
});
