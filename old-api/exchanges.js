import { fetchApi } from "./fetch-api";

async function getMyExchanges(token) {
  const data = await fetchApi("/exchanges/my", "GET", {
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

async function getBookExchanges(token, bookId) {
  const data = await fetchApi(`/exchanges/${bookId}`, "GET", {
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

async function request(token, { bookId }) {
  const data = await fetchApi("/exchanges/request", "POST", {
    body: JSON.stringify({
      bookId,
    }),
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

async function swap(token, { exchangeId }) {
  const data = await fetchApi("/exchanges/swap", "POST", {
    body: JSON.stringify({
      exchangeId,
    }),
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

async function accept(token, { exchangeId, bookId }) {
  const data = await fetchApi("/exchanges/accept", "POST", {
    body: JSON.stringify({
      exchangeId,
      bookId,
    }),
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
  getMyExchanges,
  getBookExchanges,
  request,
  swap,
  accept,
};
