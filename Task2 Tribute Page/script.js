document.addEventListener("DOMContentLoaded", function () {
    let isDarkMode = true;

    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Theme";
    toggleButton.style.position = "fixed";
    toggleButton.style.bottom = "20px";
    toggleButton.style.right = "20px";
    toggleButton.style.padding = "10px";
    toggleButton.style.backgroundColor = "#ffcc00";
    toggleButton.style.color = "black";
    toggleButton.style.border = "none";
    toggleButton.style.cursor = "pointer";

    toggleButton.addEventListener("click", function () {
        document.body.style.background = isDarkMode ? "white" : "#121212";
        document.body.style.color = isDarkMode ? "black" : "white";
        isDarkMode = !isDarkMode;
    });

    document.body.appendChild(toggleButton);
});
