import React, { createContext, useContext, useState, useCallback } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastMessage['type'], title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'success', title?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed top-20 right-5 z-[9999] flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl shadow-xl border flex items-start gap-3 transition-all transform duration-200 animate-slide-in ${
              toast.type === 'success'
                ? 'bg-surface-container-lowest text-on-surface border-primary/40'
                : toast.type === 'error'
                ? 'bg-error-container text-on-error-container border-error/40'
                : 'bg-surface-container-lowest text-on-surface border-outline-variant/60'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && (
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
              )}
              {toast.type === 'error' && (
                <span className="material-symbols-outlined text-error text-[20px]">error</span>
              )}
              {toast.type === 'info' && (
                <span className="material-symbols-outlined text-secondary text-[20px]">info</span>
              )}
              {toast.type === 'warning' && (
                <span className="material-symbols-outlined text-amber-600 text-[20px]">warning</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              {toast.title && <div className="font-semibold text-xs text-on-surface mb-0.5">{toast.title}</div>}
              <div className="text-xs text-on-surface-variant font-medium leading-relaxed">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-outline hover:text-on-surface p-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback if used outside provider
    return {
      showToast: (msg: string) => {
        console.log('[Toast]', msg);
      }
    };
  }
  return context;
};
