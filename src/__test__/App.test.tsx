import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App review', () => {
  test('should display heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /Vite \+ React/i })
    ).toBeInTheDocument();
  });
});
