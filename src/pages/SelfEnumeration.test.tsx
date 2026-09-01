import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SelfEnumeration from './SelfEnumeration';

// Mock translation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: any) => (typeof defaultValue === 'string' ? defaultValue : key),
    i18n: { language: 'en' }
  }),
}));

// Mock canvas-confetti
vi.mock('canvas-confetti', () => {
  return {
    default: vi.fn()
  };
});

describe('SelfEnumeration Wizard', () => {
  it('navigates through steps and generates valid 11-digit H-prefixed SE ID', () => {
    render(
      <MemoryRouter>
        <SelfEnumeration />
      </MemoryRouter>
    );
    
    // Step 1: Household Details
    expect(screen.getByText(/Building Material/i)).toBeInTheDocument();
    
    // Click Next
    const nextBtn1 = screen.getByText('Next');
    fireEvent.click(nextBtn1);
        // Step 2: Household Members is now replaced with the summary capture fields.
    // In our refactored wizard, Step 2 now contains the Caste Selection.
    expect(screen.getAllByLabelText(/SC \/ ST \/ Other Selection/i)[0]).toBeInTheDocument();
    
    // We can just click Next
    const nextBtn2 = screen.getByText('Next');
    fireEvent.click(nextBtn2);
    
    // Step 3: Review
    expect(screen.getByText(/Review & Submit/i)).toBeInTheDocument();
    const submitBtn = screen.getByText(/Submit & Generate ID/i);
    fireEvent.click(submitBtn);
    
    // Step 4: SE ID Verification
    expect(screen.getByText(/Self-Enumeration Complete!/i)).toBeInTheDocument();
    
    // Find the generated SE ID
    // It should be 11 characters starting with H
    const generatedIdElement = screen.getByText(/^H\d{10}$/);
    expect(generatedIdElement).toBeInTheDocument();
    expect(generatedIdElement.textContent).toMatch(/^H\d{10}$/);
  });
});
