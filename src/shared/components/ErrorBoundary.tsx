import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  // This static method is called after an error is thrown by a descendant component.
  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // This method is called after an error has been thrown by a descendant component.
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ padding: '20px', border: '1px solid red', color: 'red' }}>
          <h2>Oops! Something went wrong.</h2>
          <p>We're sorry for the inconvenience. Please try again later.</p>
          {/* Optionally show error details in development */}
          {import.meta.env.VITE_NODE_ENV === 'development' &&
            this.state.error && (
              <details style={{ whiteSpace: 'pre-wrap' }}>
                {this.state.error.message}
                <br />
                {this.state.error.stack}
              </details>
            )}
        </div>
      );
    }

    return this.props.children;
  }
}
