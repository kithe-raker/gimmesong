import { useNavigate, useLocation } from "react-router-dom";

function OnOtherPage() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="group flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border hover:bg-gray-100"
    >
      <svg
        className="text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H6M12 5l-7 7 7 7" />
      </svg>
    </button>
  );
}

export default OnOtherPage;
