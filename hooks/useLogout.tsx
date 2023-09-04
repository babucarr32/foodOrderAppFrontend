import * as SecureStore from "expo-secure-store";
import { userIdAtom } from "../jotaiAtoms/jotaiAtoms";
import { useAtom } from "jotai";

const useLogout = () => {
  const [, setUserId] = useAtom(userIdAtom);

  const Logout = async (cb?: Function) => {
    await SecureStore.deleteItemAsync("foodOrder");
    setUserId("");
    cb && cb();
  };

  return { Logout };
};

export default useLogout;
