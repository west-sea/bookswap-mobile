import { fetchApi } from "./fetch-api";

async function searchUsers(token, text) {
  const data = await fetchApi(`/users/search?text=${text}`, "GET", {
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
  searchUsers,
};
