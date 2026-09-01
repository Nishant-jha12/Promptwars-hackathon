import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TrustSafety from './TrustSafety';

describe('TrustSafety Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('handles a scam message and displays the scam verdict', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    render(<TrustSafety />);
    const textarea = screen.getByLabelText(/Suspicious message text/i);
    const analyzeBtn = screen.getByRole('button', { name: /Analyze Message/i });

    // Enter a message with OTP
    fireEvent.change(textarea, { target: { value: 'Share your OTP to complete Census verification' } });
    fireEvent.click(analyzeBtn);

    // Use findBy to wait for async state resolution and find exact verdict heading and text
    const scamHeading = await screen.findByRole('heading', { name: /^scam$/i, level: 3 });
    expect(scamHeading).toBeInTheDocument();

    const scamMessage = await screen.findByText(
      'This looks like a SCAM. Official census workers will never ask you to share an OTP over the phone, send links via SMS/WhatsApp to update data, or ask for fees. Please report this to the cybercrime helpline at 1930.'
    );
    expect(scamMessage).toBeInTheDocument();
  });

  it('handles a suspicious message and displays the suspicious verdict', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    render(<TrustSafety />);
    const textarea = screen.getByLabelText(/Suspicious message text/i);
    const analyzeBtn = screen.getByRole('button', { name: /Analyze Message/i });

    // Enter an ambiguous message
    fireEvent.change(textarea, { target: { value: 'Census officer will come tomorrow' } });
    fireEvent.click(analyzeBtn);

    // Wait for the suspicious verdict heading and message
    const suspiciousHeading = await screen.findByRole('heading', { name: /^suspicious$/i, level: 3 });
    expect(suspiciousHeading).toBeInTheDocument();

    const suspiciousMessage = await screen.findByText(
      'This could be suspicious. Be careful. Official data is only collected in person or on the official portal se.census.gov.in.'
    );
    expect(suspiciousMessage).toBeInTheDocument();
  });

  it('handles a safe message response from the AI analyzer', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            text: 'SAFE\nThis message refers to the official portal se.census.gov.in and is safe.',
          }),
      } as Response)
    );

    render(<TrustSafety />);
    const textarea = screen.getByLabelText(/Suspicious message text/i);
    const analyzeBtn = screen.getByRole('button', { name: /Analyze Message/i });

    fireEvent.change(textarea, { target: { value: 'Visit se.census.gov.in to participate in self enumeration' } });
    fireEvent.click(analyzeBtn);

    // Wait for safe verdict
    const safeHeading = await screen.findByRole('heading', { name: /^safe$/i, level: 3 });
    expect(safeHeading).toBeInTheDocument();

    const safeMessage = await screen.findByText(
      'This message refers to the official portal se.census.gov.in and is safe.'
    );
    expect(safeMessage).toBeInTheDocument();
  });
});
