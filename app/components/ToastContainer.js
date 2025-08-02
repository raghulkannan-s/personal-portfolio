'use client';

import Toast from './Toast';

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-24 right-6 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => removeToast(toast.id)}
          duration={0} // Duration is handled by the hook
        />
      ))}
    </div>
  );
}
