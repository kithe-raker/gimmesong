import SignInMethod from "@components/SignInMethod";

import disc from "@assets/img/gimmesong_logo.png";
function SignInBox({className=""}) {
  return (
    <div className={`mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl bg-white px-12 py-4 ${className}`}>
      <img className="mt-6 w-60" src={disc} alt="disc" />
      <h1 className="gimmesong-primary-font mt-6 text-5xl">Sign In</h1>
      <span className="mt-3 text-center text-lg leading-6 text-gray-400">
        Connect with other by <br />
        giving songs
      </span>
      <SignInMethod className="mt-12" />
    </div>
  );
}

export default SignInBox;
