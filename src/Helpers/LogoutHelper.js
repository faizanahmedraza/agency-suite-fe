const logout = (status) => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("permissions");
    window.location.href = "/login";
};

const LogoutHelper = {
    logout,
};

export default LogoutHelper;
