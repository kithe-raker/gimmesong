import useSession from "@hooks/useSession";

function Profile() {
  const { user } = useSession();
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-[60px] pt-[80px]">
      <div></div>
    </div>
  );
}

export default Profile;
