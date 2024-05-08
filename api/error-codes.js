const errorCodes = [
  {
    code: "UNKNOWN_ERROR",
    message: "Something went wrong. Please try again later.",
  },
  {
    code: "SERVER_ERROR",
    message: "Our server had a little problem. Please try again later.",
  },
  {
    code: "UNAUTHORIZED",
    message: "You need to be authenticated to perform this action.",
  },
  {
    code: "FORBIDDEN",
    message: "You are not allowed to perform this action.",
  },
  {
    code: "INVALID_TOKEN",
    message: "There's something wrong with your data.",
  },
  {
    code: "INVALID_USER_ID",
    message: "There's something wrong with your data",
  },
  {
    code: "INVALID_EMAIL",
    message: "The email you provided is invalid. Please provide a valid email.",
  },
  {
    code: "INVALID_NAME",
    message: "The name you provided is invalid. Please provide a valid name.",
  },
  {
    code: "INVALID_NICKNAME",
    message:
      "The nickname you provided is invalid. Please provide a valid nickname.",
  },
  {
    code: "INVALID_GENRE",
    message: "The genre you provided is invalid. Please provide a valid genre.",
  },
  {
    code: "INVALID_AVATAR",
    message:
      "The avatar you provided is invalid. Please provide a valid avatar.",
  },
  {
    code: "FILE_MISSING",
    message: "There's something wrong with the file you provided.",
  },
  {
    code: "INVALID_QUERY",
    message: "Your query does not seem valid. Please provide a valid query.",
  },
  {
    code: "INVALID_TITLE",
    message: "The title you provided is invalid. Please provide a valid title.",
  },
  {
    code: "INVALID_AUTHOR",
    message:
      "The author you provided is invalid. Please provide a valid author.",
  },
  {
    code: "INVALID_VISIBILITY",
    message:
      "You've chosen an invalid visibility option. Please provide a valid visibility option.",
  },
  {
    code: "INVALID_EXCEPTION",
    message:
      "The exception you provided is invalid. Please provide a valid exception.",
  },
  {
    code: "INVALID_ID",
    message: "There's something wrong with the data you are interacting with.",
  },
  {
    code: "FILE_UPLOAD_ERROR",
    message:
      "We couldn't upload your file for some reason. Please try again later.",
  },
  {
    code: "USER_NOT_FOUND",
    message: "We couldn't find the user you are looking for.",
  },
];

export function getErrorMessage(code) {
  const error = errorCodes.find((error) => error.code === code);
  return error
    ? error.message
    : "Something went wrong. Please try again later.";
}
