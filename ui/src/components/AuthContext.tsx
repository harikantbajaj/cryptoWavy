"use client";

import { account } from "@/lib/appwrite";
import { ID, Models, OAuthProvider } from "appwrite";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type Session = {
  userId: string;
  name: string;
  email: string;
};

const UserContext = createContext<{
  current: Session | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}>({
  current: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export function useUser() {
  return useContext(UserContext);
}

export function AuthProvider(props: React.PropsWithChildren<unknown>) {
  const [user, setUser] = useState<Session | null>(null);
  const router = useRouter();

  async function login(email: string, password: string) {
    const loggedIn: Models.Session = await account.createEmailPasswordSession(
      email,
      password,
    );

    const user = await account.get();

    setUser({
      userId: loggedIn.userId,
      name: user.name,
      email: user.email,
    });
    window.location.replace("/dashboard");
  }

  async function loginWithGoogle() {
    await account.createOAuth2Session(
      OAuthProvider.Google,
      new URL("/dashboard", window.location.href).toString(),
    );
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    router.push("/");
  }

  async function register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
  }

  async function init() {
    try {
      const loggedIn = (await account.get()) as unknown as {
        $id: string;
        name: string;
        email: string;
      };
      const user = await account.get();

      setUser({
        userId: loggedIn.$id,
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      console.log("Error initializing user:", err);
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{ current: user, login, logout, register, loginWithGoogle }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
