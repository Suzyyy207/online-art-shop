function logout() {
    localStorage.setItem("name", "");
    const url = link.href;
	window.location.href = url;
}