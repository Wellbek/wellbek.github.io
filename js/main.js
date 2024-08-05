const cursor = document.querySelector(".cursor");
const links = document.querySelectorAll("a");
const images = document.querySelectorAll("img");

// Update cursor position based on mouse movement
document.addEventListener("mousemove", (e) => {
    cursor.setAttribute(
        "style",
        "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;"
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

images.forEach((img) => {
    img.addEventListener("mouseenter", () => {
        // cursor.classList.add("hovered"); // Add hovered class to enlarge cursor
        img.style.transform = "scale(1.1)"
    });

    img.addEventListener("mouseleave", () => {
        // cursor.classList.remove("hovered"); // Remove hovered class to shrink cursor
        img.style.transform = "scale(1)"
    });
})