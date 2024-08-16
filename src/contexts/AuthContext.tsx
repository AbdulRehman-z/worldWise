import { createContext, ReactNode, useContext, useReducer } from "react";

type AuthContextProps = {
  children: ReactNode;
};

type AuthContext = {
  user: typeof FAKE_USER | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

type State = {
  user: typeof FAKE_USER | null;
  isAuthenticated: boolean;
};

type AuthActions =
  | {
      type: "login";
      payload: typeof FAKE_USER;
    }
  | {
      type: "logout";
    };

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState: State = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: State, action: AuthActions): State {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      throw new Error("unknown action");
  }
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthContextProvider({ children }: AuthContextProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "Context should be accessed from inside of the CitiesContextProvider"
    );
  }
  return context;
}
