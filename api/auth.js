import { fetchApi } from "./fetch-api";

async function login(idToken) {
  const data = await fetchApi("/auth/login", "POST", {
    body: JSON.stringify({
      token: idToken,
    }),
  });
  if (data?.success === true) {
    return data.data;
  } else if (data?.success === false) {
    if (data.issues && data.issues.length > 0) {
      return data.issues[0];
    } else {
      return { code: "UNKNOWN_ERROR" };
    }
  } else {
    return { code: "UNKNOWN_ERROR" };
  }
}

async function board({ userId, email, nickname, preferredGenres, avatar }) {
  const body = new FormData();
  body.append("userId", userId);
  body.append("email", email);
  body.append("nickname", nickname);
  body.append("preferredGenres", JSON.stringify(preferredGenres));
  body.append("avatar", avatar);
  const data = await fetchApi("/auth/board", "POST", {
    body,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (data?.success === true) {
    return data.data;
  } else if (data?.success === false) {
    if (data.issues && data.issues.length > 0) {
      return data.issues[0];
    } else {
      return { code: "UNKNOWN_ERROR" };
    }
  } else {
    return { code: "UNKNOWN_ERROR" };
  }
}

async function modify(token, { nickname, preferredGenres, avatar }) {
  const body = new FormData();
  if (nickname) {
    body.append("nickname", nickname);
  }
  if (preferredGenres) {
    body.append("preferredGenres", JSON.stringify(preferredGenres));
  }
  if (avatar) {
    body.append("avatar", avatar);
  }
  const data = await fetchApi("/auth/modify", "PATCH", {
    body,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  if (data?.success === true) {
    return data.data;
  } else if (data?.success === false) {
    if (data.issues && data.issues.length > 0) {
      return data.issues[0];
    } else {
      return { code: "UNKNOWN_ERROR" };
    }
  } else {
    return { code: "UNKNOWN_ERROR" };
  }
}

async function getMe(token) {
  const data = await fetchApi("/auth/me", "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data?.success === true) {
    return data.data;
  } else if (data?.success === false) {
    if (data.issues && data.issues.length > 0) {
      return data.issues[0];
    } else {
      return { code: "UNKNOWN_ERROR" };
    }
  } else {
    return { code: "UNKNOWN_ERROR" };
  }
}

export default { login, board, modify, getMe };
