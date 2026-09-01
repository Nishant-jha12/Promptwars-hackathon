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
    
    // Fill out Step 1 to get coverage on handlers
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'Maharashtra' } });
    fireEvent.change(selects[1], { target: { value: 'Owned' } });
    fireEvent.change(selects[2], { target: { value: 'Concrete' } });

    // Click Next
    const nextBtn1 = screen.getByText('Next');
    fireEvent.click(nextBtn1);
    
    // Step 2: Demographics
    expect(screen.getAllByLabelText(/SC \/ ST \/ Other Selection/i)[0]).toBeInTheDocument();
    // Fill out step 2
    const inputs = screen.getAllByRole('spinbutton');
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: '4' } });
    }
    
    // Click Next
    const nextBtn2 = screen.getByText('Next');
    fireEvent.click(nextBtn2);
    
    // Step 3: Review
    expect(screen.getByText(/Review & Submit/i)).toBeInTheDocument();
    
    // Test the "Back" button to get branch coverage
    const backBtn = screen.getByText('Back');
    fireEvent.click(backBtn);
    expect(screen.getAllByLabelText(/SC \/ ST \/ Other Selection/i)[0]).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next')); // Go to Review again
    
    const submitBtn = screen.getByText(/Submit & Generate ID/i);
    fireEvent.click(submitBtn);
    
    // Step 4: SE ID Verification
    expect(screen.getByText(/Self-Enumeration Complete!/i)).toBeInTheDocument();
    
    // Find the generated SE ID
    const generatedIdElement = screen.getByText(/^H\d{10}$/);
    expect(generatedIdElement).toBeInTheDocument();
    expect(generatedIdElement.textContent).toMatch(/^H\d{10}$/);
  });
});
