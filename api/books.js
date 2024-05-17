import { fetchApi } from "./fetch-api";

async function getFeed(token) {
  const data = await fetchApi("/books/feed", "GET", {
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

async function searchBooks(token, text) {
  const data = await fetchApi(`/books/search?text=${text}`, "GET", {
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

async function getUserBookshelf(token, userId) {
  const data = await fetchApi(`/books/bookshelf/${userId}`, "GET", {
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

async function getMyBookshelf(token) {
  const data = await fetchApi(`/books/bookshelf/my`, "GET", {
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

async function uploadBook(
  token,
  { title, author, genre, visibility, exceptions, cover }
) {
  const body = new FormData();
  body.append("title", title);
  body.append("author", author);
  body.append("genre", genre);
  body.append("visibility", visibility);
  body.append("exceptions", JSON.stringify(exceptions));
  body.append("cover", cover);
  const data = await fetchApi("/books/upload", "POST", {
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

async function editBook(
  token,
  bookId,
  { title, author, genre, visibility, exceptions, cover }
) {
  const body = new FormData();
  if (title) {
    body.append("title", title);
  }
  if (author) {
    body.append("author", author);
  }
  if (genre) {
    body.append("genre", genre);
  }
  if (visibility) {
    body.append("visibility", visibility);
  }
  if (exceptions) {
    body.append("exceptions", JSON.stringify(exceptions));
  }
  if (cover) {
    body.append("cover", cover);
  }
  const data = await fetchApi(`/books/${bookId}/edit`, "PATCH", {
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

export default {
  getFeed,
  searchBooks,
  getUserBookshelf,
  getMyBookshelf,
  uploadBook,
  editBook,
};
