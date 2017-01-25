const TOKEN_IDENTIFIER = 'id_token';
const CODE_STRIP_REGEX = new RegExp(/^\s+|\n+|\r+|\s+$/, 'g');
const ANALYTICS_KEY = process.env.NODE_ENV === 'production' ? 'UA-86402640-2' : 'UA-86402640-1';
const SHOULD_DISPLAY_TEST = true; // Flag selecting the type of quiz to be presented (general test or multiple quizzes)

export {
  TOKEN_IDENTIFIER,
  CODE_STRIP_REGEX,
  ANALYTICS_KEY,
  SHOULD_DISPLAY_TEST,
};
