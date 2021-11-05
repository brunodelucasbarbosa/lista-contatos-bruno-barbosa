import { createContext } from "react"
import useUserProvider from "../hooks/useUserProvider";

const UserContext = createContext({});

export function UserProvider(props) {
  const userProvider = useUserProvider();

  return (
    <UserContext.Provider value={userProvider}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;



/*
toast.error('Usuário não encontrado!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
        */