import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import Navigation from './components/Navigation';
import VoiceAssistant from './components/VoiceAssistant';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: any) => (typeof defaultValue === 'string' ? defaultValue : key),
    i18n: { language: 'en', changeLanguage: vi.fn() }
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() }
}));

describe('Component Render Tests', () => {
  it('renders Navigation and handles click', () => {
    const handleReadPage = vi.fn();
    const handleStopReading = vi.fn();
    render(
      <MemoryRouter>
        <Navigation t={(k) => k} i18n={{ language: 'en', changeLanguage: vi.fn() }} handleReadPage={handleReadPage} handleStopReading={handleStopReading} />
      </MemoryRouter>
    );
    expect(screen.getAllByText('nav_home').length).toBeGreaterThan(0);
    
    // Toggle mobile menu to boost branch coverage
    const toggleBtn = screen.getByRole('button', { name: /Open navigation menu/i });
    fireEvent.click(toggleBtn);
    expect(screen.getAllByText('nav_schedule').length).toBeGreaterThan(0);
  });

  it('renders VoiceAssistant', () => {
    // Mock SpeechRecognition for test
    (window as any).SpeechRecognition = vi.fn();
    
    render(
      <MemoryRouter>
        <VoiceAssistant />
      </MemoryRouter>
    );
    // Voice assistant starts hidden/minimal
    expect(screen.getByRole('button', { name: /Start voice assistant/i })).toBeInTheDocument();
  });
});
