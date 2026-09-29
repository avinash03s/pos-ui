import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 text-center">
      <p className="text-sm font-semibold text-orange-500">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-gray-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={handleGoBack}
        className="mt-8 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
      >
        Go back
      </button>
    </div>
  );
};

export default PageNotFound;