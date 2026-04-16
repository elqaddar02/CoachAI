import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('=== APP CRASH ===', error?.message, error?.stack, errorInfo?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0B0E14',
          color: '#F3F4F6',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'monospace'
        }}>
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '800px',
            width: '100%'
          }}>
            <h2 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '1.25rem' }}>
              🚨 Runtime Error — App Crash
            </h2>
            <p style={{ color: '#fca5a5', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              {this.state.error?.message || 'Unknown error'}
            </p>
            <pre style={{
              background: '#1F2937',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              fontSize: '12px',
              color: '#9CA3AF',
              whiteSpace: 'pre-wrap',
              maxHeight: '400px'
            }}>
              {this.state.error?.stack}
              {'\n\n--- Component Stack ---\n'}
              {this.state.errorInfo?.componentStack}
            </pre>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '1rem',
                background: '#6366f1',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontFamily: 'monospace'
              }}
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
