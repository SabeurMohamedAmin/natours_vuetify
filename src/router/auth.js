import LoginView from "../views/LoginView.vue";

const authRoutes = [
  //user profile
  {
    path: "/profile",
    name: "profilePage",
    component: () =>
      import(/* webpackChunkName: "LoginView" */ "../views/ProfileView.vue"),
  },
  // /auth/signup
  {
    path: "/auth/signup",
    name: "signupPage",
    component: () =>
      import(/* webpackChunkName: "LoginView" */ "../views/LoginView.vue"),
  },
  //   // /auth/login
  {
    path: "/auth/login",
    name: "loginPage",
    component: () =>
      import(/* webpackChunkName: "LoginView" */ "../views/LoginView.vue"),
  },

  //  // /auth/logout
  {
    path: "/auth/logout",
    name: "logoutPage",
    component: () =>
      import(/* webpackChunkName: "LoginView" */ "../views/LogoutView.vue"),
  },

  //   // /auth/email_password_reset
  {
    path: "/auth/email_password_reset",
    name: "resetPasswordPage",
    component: ()=>import (/*webpackChunkName: "EmailPasswordReset" */ "../views/EmailPasswordReset.vue"),
  },
  //   // /auth/password_reset
  {
    path: "/auth/password_reset",
    name: "PasswordRestPage",
    component: () =>
      import(/* webpackChunkName: "PassworderResetView" */ "../views/PasswordResetView.vue"),
  },
  //
  {
    path: "/auth/password_update",
    name: "PasswordUpdatePage",
    component: LoginView,
  },
];

export default authRoutes;
