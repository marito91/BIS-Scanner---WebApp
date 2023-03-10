//npm install --save jwt-decode

import jwtDecode from "jwt-decode"; // Npm package that manages json web token

// The following function will check for authentication in the local storage, when the information has been fetched from the server. If validations are ok then the session will be authenticated and the client will have access to the complete application.
export function auth() {
  let resp = false;
  try {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const payload = jwtDecode(token);
      if (payload.email) {
        resp = true;
      }
    }
  } catch (error) {
    console.log(error);
  }

  return resp;
}
