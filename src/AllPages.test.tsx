import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import DataViz from './pages/DataViz';
import EnumerationSummary from './pages/EnumerationSummary';
import LegalTerms from './pages/LegalTerms';
import TrustSafety from './pages/TrustSafety';
import StateSchedule from './pages/StateSchedule';
import PhaseTwo from './pages/PhaseTwo';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: any) => (typeof defaultValue === 'string' ? defaultValue : key),
    i18n: { language: 'en', changeLanguage: vi.fn() }
  }),
}));

// Mock Recharts to avoid issues in JSDOM
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  BarChart: ({ children }: any) => <div>{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
  Legend: () => <div />,
  PieChart: ({ children }: any) => <div>{children}</div>,
  Pie: ({ children }: any) => <div>{children}</div>,
  Cell: () => <div />,
}));

describe('Basic Render Tests for Pages to ensure 90+ Coverage', () => {
  it('renders DataViz without crashing', () => {
    render(
      <MemoryRouter>
        <DataViz />
      </MemoryRouter>
    );
    expect(screen.getByText(/Census Data Explorer/i)).toBeInTheDocument();
  });

  it('renders EnumerationSummary without crashing', () => {
    render(
      <MemoryRouter>
        <EnumerationSummary />
      </MemoryRouter>
    );
    expect(screen.getByText(/My Enumeration Summary/i)).toBeInTheDocument();
  });

  it('renders LegalTerms without crashing', () => {
    render(
      <MemoryRouter>
        <LegalTerms />
      </MemoryRouter>
    );
    expect(screen.getByText(/Legal & Privacy Framework/i)).toBeInTheDocument();
  });

  it('renders TrustSafety without crashing', () => {
    render(
      <MemoryRouter>
        <TrustSafety />
      </MemoryRouter>
    );
    expect(screen.getByText(/Trust/i)).toBeInTheDocument();
  });

  it('renders StateSchedule without crashing', () => {
    render(
      <MemoryRouter>
        <StateSchedule />
      </MemoryRouter>
    );
    expect(screen.getByText(/State-Wise Schedule/i)).toBeInTheDocument();
  });

  it('renders PhaseTwo without crashing', () => {
    render(
      <MemoryRouter>
        <PhaseTwo />
      </MemoryRouter>
    );
    expect(screen.getByText(/first fully digital census/i)).toBeInTheDocument();
  });
});
