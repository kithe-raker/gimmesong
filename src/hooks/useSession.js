import useUserStore from "@store/user";
import { useLocalStorage } from "@hooks/useLocalStorage";

const useSession = () => {
  const { user, setUser: setStoreUser } = useUserStore();
  const [localUser, setLocalUser] = useLocalStorage("user", null);

  const setUser = (val) => {
    setStoreUser(val);
    setLocalUser(val);
  };

  // due to sign in / sign out method, that update value on local storage,
  // but react component doesn't know that value was updated
  // so, this nullish coalescing will help us to return live state of user object
  return {
    user: localUser ?? user,
    setUser,
  };
};

export default useSession;
