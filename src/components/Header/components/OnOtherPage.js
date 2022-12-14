import { useNavigate, useLocation } from "react-router-dom";

function OnOtherPage() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="group flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border hover:bg-gray-100"
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" y="0.5" width="35" height="35" rx="17.5" stroke="black" />
        <path
          d="M12.4697 17.4697C12.1768 17.7626 12.1768 18.2374 12.4697 18.5303L17.2426 23.3033C17.5355 23.5962 18.0104 23.5962 18.3033 23.3033C18.5962 23.0104 18.5962 22.5355 18.3033 22.2426L14.0607 18L18.3033 13.7574C18.5962 13.4645 18.5962 12.9896 18.3033 12.6967C18.0104 12.4038 17.5355 12.4038 17.2426 12.6967L12.4697 17.4697ZM24 17.25H13V18.75H24V17.25Z"
          fill="black"
        />
      </svg>
    </button>
  );
}

export default OnOtherPage;
