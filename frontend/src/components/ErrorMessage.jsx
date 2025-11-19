export const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
      <p className="text-red-700 text-sm">{error}</p>
    </div>
  );
};


