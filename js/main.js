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

document.addEventListener('DOMContentLoaded', function() {
    const projectImage = document.querySelector('.project-image');
    const videoLoop = document.querySelector('.video-loop');

    projectImage.addEventListener('mouseenter', function() {
        videoLoop.currentTime = 0; // Restart the video
        videoLoop.play(); // Ensure the video plays on hover
    });

    projectImage.addEventListener('mouseleave', function() {
        videoLoop.pause(); // Pause the video when not hovering
    });
});

document.getElementById('moreProjectsBtn').addEventListener('click', function() {
    const projectsDiv = document.getElementById('projects');

    if (!isOverflown(projectsDiv)) return
    
    const currentHeight = projectsDiv.offsetHeight;
    
    projectsDiv.style.height = currentHeight + 600 + 'px';
});

function filterDivs(tag) {
    // Get all the divs with class 'item'
    var entries = document.querySelectorAll('.project-entry');

    const projectsDiv = document.getElementById('projects');
    projectsDiv.style.height = 600 + 'px'; // reset project div size

    let visibleCount = 0; // Counter for visible projects

    // Loop through all items and show/hide based on the filter
    entries.forEach(function(entry) {
        // Determine if the item should be visible
        if (tag === 'all' || entry.getAttribute('data-tags').includes(tag)) {
            entry.style.display = 'flex'; // Show the item
            // Add/remove 'reverse' class to alternate items
            if (visibleCount % 2 === 1) {
                entry.classList.add('reverse');
            } else {
                entry.classList.remove('reverse');
            }
            visibleCount++; // Increment visible count
        } else {
            entry.style.display = 'none'; // Hide the item
        }
    });
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

window.onload = function() {
    filterDivs('all');
};