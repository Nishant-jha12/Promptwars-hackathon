import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PhaseTwo from './PhaseTwo';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ 
    t: (key: string, defaultValue?: any) => (typeof defaultValue === 'string' ? defaultValue : key)
  })
}));

describe('PhaseTwo component', () => {
  it('renders Phase I and Phase II comparison cards correctly', () => {
    render(
      <MemoryRouter>
        <PhaseTwo />
      </MemoryRouter>
    );
    
    // Check titles
    expect(screen.getByText(/Phase I: Houselisting & Housing Census/i)).toBeInTheDocument();
    expect(screen.getByText(/Phase II: Population Enumeration/i)).toBeInTheDocument();
    
    // Check Phase I dates
    expect(screen.getByText(/1 April – 30 September 2026/i)).toBeInTheDocument();
    
    // Check Phase II banner
    expect(screen.getByText(/Phase II is already underway in Ladakh and snow-bound districts, since 17 August 2026/i)).toBeInTheDocument();
  });
});
