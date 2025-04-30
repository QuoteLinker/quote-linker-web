import { render, screen } from '@testing-library/react';
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

  it('applies motion div wrapper', () => {
    const { container } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );

    // The motion.div should be the first child
    expect(container.firstChild).toHaveAttribute('data-testid', 'motion-div');
  });
}); 