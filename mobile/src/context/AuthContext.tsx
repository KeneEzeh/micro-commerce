import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/client";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  isAdmin: boolean;
  exp?: number;
}

interface AuthContextType {
  userToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({} as any);

let logoutFromInterceptor: (() => void) | null = null;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setUserToken(token);
        const decoded: DecodedToken = jwtDecode(token);
        setIsAdmin(decoded.isAdmin);
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const saveToken = async (token: string) => {
    setUserToken(token);
    await AsyncStorage.setItem("token", token);
    const decoded: DecodedToken = jwtDecode(token);
    console.log("Logged in user", decoded);
    setIsAdmin(decoded.isAdmin);
  };

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    await saveToken(res.data.accessToken);
  };

  const register = async (email: string, password: string) => {
    const res = await api.post("/auth/register", { email, password });
    await saveToken(res.data.accessToken);
  };

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem("token");
  };

  logoutFromInterceptor = logout;
  return (
    <AuthContext.Provider
      value={{ userToken, login, register, logout, loading, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const getLogoutFunction = () => logoutFromInterceptor;

export const useAuth = () => useContext(AuthContext);
