module.exports.validateRegisterInput = (
  username,
  role,
  password,
  confirmPassword
) => {
  const errors = {};
  if (!username || username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (!role || role.trim() === "") {
    errors.role = "Role must not be empty";
  } else {
    if (role !== "student" && role !== "teacher") {
      errors.role = "Role must be a either teacher or student ";
    }
  }
  if (!password || password === "") {
    errors.password = "Password must not empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
