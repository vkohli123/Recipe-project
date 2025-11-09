import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In a real app, send to a monitoring service here.
    // For now, log so unit tests and dev can see the stack.
    // Example integration point: window.__MONITOR__?.captureException({ error, info });
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-6xl bg-red-50 border border-red-200 rounded p-4 mt-6">
          <h2 className="text-red-600 font-semibold">Something went wrong</h2>
          <p className="text-sm text-red-700 mt-2">{this.state.error?.message || 'Unexpected error'}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
