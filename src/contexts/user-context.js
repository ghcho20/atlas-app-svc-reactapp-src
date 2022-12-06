import React, { createContext, useState } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "../env.js";

const app = new App(APP_ID);

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const emailPasswordLogin = async (email, password) => {
    const credentials = Credentials.emailPassword(email, password);
    const authenticatedUser = await app.logIn(credentials);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const emailPasswordSignup = async (email, password) => {
    try {
      await app.emailPasswordAuth.registerUser(email, password);
      return emailPasswordLogin(email, password);
    } catch (err) {
      throw err;
    }
  };

  const fetchUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.refreshCustomData();
      setUser(app.currentUser);
      return app.currentUser;
    } catch (err) {
      throw err;
    }
  };

  const logOutUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.logOut();
      setUser(null);
      return true;
    } catch (err) {
      throw err;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        emailPasswordLogin,
        emailPasswordSignup,
        logOutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
