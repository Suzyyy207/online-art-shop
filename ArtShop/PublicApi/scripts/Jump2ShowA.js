function jump2Show(id) {
    localStorage.setItem("id", id);
    const url = link.href;
	window.location.href = url;
}