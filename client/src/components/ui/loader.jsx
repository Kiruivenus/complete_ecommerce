// components/ui/loader.jsx
export function Loader() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-opacity-50 bg-gray-200 fixed inset-0 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }
  