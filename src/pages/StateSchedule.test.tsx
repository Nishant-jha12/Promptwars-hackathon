import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StateSchedule from './StateSchedule';

describe('StateSchedule Component', () => {
  it('filters states by search term correctly', () => {
    render(<StateSchedule />);
    
    // Check initial state rendering
    expect(screen.getByText('Maharashtra')).toBeInTheDocument();
    expect(screen.getByText('Assam')).toBeInTheDocument();

    // Type in search box
    const searchInput = screen.getByLabelText('Search your state');
    fireEvent.change(searchInput, { target: { value: 'assam' } });

    // Assam should be visible, Maharashtra should be filtered out
    expect(screen.getByText('Assam')).toBeInTheDocument();
    expect(screen.queryByText('Maharashtra')).not.toBeInTheDocument();
  });
});
