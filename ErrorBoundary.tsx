import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
          return this.props.fallback;
      }
      return (
        <div className="p-4 m-4 rounded-lg bg-red-900/50 border border-red-500 text-red-200">
            <h2 className="font-bold text-lg mb-2">Something went wrong.</h2>
            <p>An unexpected error occurred. Please try refreshing the application.</p>
            <details className="mt-4 text-xs text-red-300">
                <summary>Error Details</summary>
                <pre className="mt-2 p-2 bg-black/30 rounded-md whitespace-pre-wrap">
                    {this.state.error?.toString()}
                </pre>
            </details>
        </div>
      );
    }

    return this.props.children;
  }
}
