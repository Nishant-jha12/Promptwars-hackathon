import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CitizenDashboard from './CitizenDashboard';

// Mock translation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: any) => (typeof defaultValue === 'string' ? defaultValue : key),
    i18n: { language: 'en' }
  }),
}));

describe('CitizenDashboard Component', () => {
  it('allows 1-click demo Aadhaar e-KYC login and renders household details', () => {
    render(<CitizenDashboard />);
    
    // Check initial login screen
    expect(screen.getByText(/Aadhaar e-KYC Authentication/i)).toBeInTheDocument();

    // Click 1-Click Instant Demo Login button
    const demoLoginBtn = screen.getByText(/1-Click Instant Demo Login/i);
    fireEvent.click(demoLoginBtn);

    // Verify authenticated state
    expect(screen.getByRole('heading', { name: /Rajesh S. Sharma/i })).toBeInTheDocument();
    expect(screen.getByText(/XXXX-XXXX-4821/i)).toBeInTheDocument();
    expect(screen.getAllByText(/H8492019482/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Geo-Tagged Residential Building/i)).toBeInTheDocument();
  });
});
