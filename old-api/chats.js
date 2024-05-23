import { fetchApi } from "./fetch-api";

async function getMyChats(token) {
  const data = await fetchApi("/chats", "GET", {
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

async function getMyChat(token, exchangeId) {
  const data = await fetchApi(`/chats/${exchangeId}`, "GET", {
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

export default {
  getMyChats,
  getMyChat,
};
