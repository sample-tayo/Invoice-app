import { useNavigate } from "react-router-dom";

export default function GoBack() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="mt-4 flex items-start gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-light cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={(e) => {
          e.preventDefault();
          handleGoBack();
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <p
        className="text-sm font-light text-light cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          handleGoBack();
        }} 
      >
        Go Back
      </p>
    </div>
  );
}
