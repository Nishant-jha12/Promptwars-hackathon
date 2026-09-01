import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock VoiceAssistant to avoid Web Speech API errors in jsdom
vi.mock('./components/VoiceAssistant', () => ({
  default: () => <div data-testid="mock-voice-assistant" />
}));

describe('App Component', () => {
  it('renders and allows language switching', async () => {
    render(<App />);
    
    // Check default disclaimer in English
    expect(screen.getByText(/Unofficial hackathon prototype/i)).toBeInTheDocument();

    // Find language selector (desktop or mobile, we just take the first one)
    const langSelect = screen.getAllByLabelText(/Select Language/i)[0];
    
    // Switch to Hindi
    fireEvent.change(langSelect, { target: { value: 'hi' } });
    
    // Verify translation changed
    expect(screen.getByText(/अनौपचारिक हैकथॉन प्रोटोटाइप/i)).toBeInTheDocument();
  });
});
