const cursor = document.querySelector(".cursor");
const links = document.querySelectorAll("a");
const zoomables = document.querySelectorAll(".zoomable");
const pulse_buttons = document.querySelectorAll(".pulse")

// Update cursor position based on mouse movement
document.addEventListener("mousemove", (e) => {
    cursor.setAttribute(
        "style",
        "top: " + (e.clientY - 10) + "px; left: " + (e.clientX - 10) + "px;"
    );
});

// Add event listeners for mouse enter and leave on links
links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
        cursor.classList.add("hovered"); // Add hovered class to enlarge cursor
    });

    link.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovered"); // Remove hovered class to shrink cursor
    });
});

zoomables.forEach((zoom) => {
    zoom.addEventListener("mouseenter", () => {
        zoom.style.transform = "scale(1.1)"
    });

    zoom.addEventListener("mouseleave", () => {
        zoom.style.transform = "scale(1)"
    });
})

pulse_buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
        button.style.transform = "scale(1.2)"
        button.classList.add("active");
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "scale(1)"
        button.classList.remove("active");
    });
})