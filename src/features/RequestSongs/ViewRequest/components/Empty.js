function Empty({ title, message = "", children }) {
  return (
    <div className="my-12 flex flex-col items-center justify-center px-6">
      <span className="text-center text-lg font-semibold">{title}</span>
      <span className="text-md mt-1 text-center text-gray-400">{message}</span>
      {children}
    </div>
  );
}

export default Empty;
