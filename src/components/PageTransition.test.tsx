import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageTransition from './PageTransition';

describe('PageTransition', () => {
  it('renders children correctly', () => {
    render(
      <PageTransition>
        <div data-testid="test-child">Test Content</div>
      </PageTransition>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies motion div with correct attributes', () => {
    const { container } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );

    const motionDiv = container.firstChild as HTMLElement;
    expect(motionDiv).toHaveAttribute('data-testid', 'motion-div');
  });
});
