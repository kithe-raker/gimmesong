import SignInBox from "@components/SignInBox";
import MySongs from "@features/MySongs";
import useSession from "@hooks/useSession";

function ProtectedMySongs() {
  const { user } = useSession();

  return user ? <MySongs /> : <SignInBox className="mt-14"/>;
}

export default ProtectedMySongs;
