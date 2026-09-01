import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import GlobalChatbot from './GlobalChatbot';

// Mock translation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() }
  })
}));

describe('GlobalChatbot', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  beforeEach(() => {
    // Reset fetch mock
    global.fetch = vi.fn() as any;
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => 'test-api-key'),
        setItem: vi.fn(),
      },
      writable: true
    });
  });

  it('opens chat, sends a message, and renders response', async () => {
    const mockResponse = {
      candidates: [{ content: { parts: [{ text: 'I am Sahayak, here to help.' }] } }]
    };
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    render(
      <MemoryRouter>
        <GlobalChatbot />
      </MemoryRouter>
    );

    // Initial state: closed, button visible
    const openButton = screen.getByRole('button', { name: /Open Ask Sahayak chat/i });
    expect(openButton).toBeInTheDocument();

    // Open chat
    fireEvent.click(openButton);

    // Chat panel should be open
    expect(screen.getByText('Ask Sahayak')).toBeInTheDocument();

    // Send a message
    const input = screen.getByPlaceholderText('Ask a question...');
    fireEvent.change(input, { target: { value: 'What is Phase I?' } });
    
    const sendButton = screen.getByRole('button', { name: /Send message/i });
    fireEvent.click(sendButton);

    // Verify user message is rendered
    expect(screen.getByText('What is Phase I?')).toBeInTheDocument();

    // Wait for AI response to be rendered
    await waitFor(() => {
      expect(screen.getByText('I am Sahayak, here to help.')).toBeInTheDocument();
    });

    // Verify fetch was called with correct endpoint
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('generativelanguage.googleapis.com'),
      expect.any(Object)
    );
  });

  it('shows fallback message on API failure', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    render(
      <MemoryRouter>
        <GlobalChatbot />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Open Ask Sahayak chat/i }));

    const input = screen.getByPlaceholderText('Ask a question...');
    fireEvent.change(input, { target: { value: 'Fail test' } });
    fireEvent.click(screen.getByRole('button', { name: /Send message/i }));

    await waitFor(() => {
      expect(screen.getByText("I'm having trouble connecting to Gemini API. Please check your API key or network.")).toBeInTheDocument();
    });
  });
});
