import MySongs from "@features/MySongs";
import useSession from "@hooks/useSession";
import SignInMethod from "@components/SignInMethod";
import disc from "@assets/img/gimmesong_logo.png";

function ProtectedMySongs() {
  const { user } = useSession();

  return user ? (
    <MySongs />
  ) : (
    <div className="mx-auto mt-14 flex max-w-md flex-col items-center justify-center rounded-2xl bg-white px-12 py-4">
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

export default ProtectedMySongs;
