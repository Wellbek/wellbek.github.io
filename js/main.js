const cursor = document.querySelector(".cursor");
const links = document.querySelectorAll("a");
const zoomables = document.querySelectorAll(".zoomable");
const pulse_buttons = document.querySelectorAll(".pulse")

// Currently applied project filters
const currFilters = { "c": null, "l": null, "f": null}

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

    // Ensure zoomables are re-selected after DOM content loads
    const updatedZoomables = document.querySelectorAll(".zoomable");
    updatedZoomables.forEach((zoom) => {
        zoom.addEventListener("mouseenter", () => {
            zoom.style.transform = "scale(1.1)";
        });

        zoom.addEventListener("mouseleave", () => {
            zoom.style.transform = "scale(1)";
        });
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
    const entries = document.querySelectorAll('.project-entry');

    const projectsDiv = document.getElementById('projects');
    projectsDiv.style.height = '600px'; // Reset project div size

    let visibleCount = 0; // Counter for visible projects

    if (tag === 'all') {
        // Reset all filters to null
        currFilters["c"] = null;
        currFilters["l"] = null;
        currFilters["f"] = null;
    } else {
        const prefix = tag.charAt(0);
        const filterValue = tag.substring(2) === 'all' ? null : tag;
        switch (prefix) {
            case 'c':
                currFilters["c"] = filterValue;
                break;
            case 'l':
                currFilters["l"] = filterValue;
                break;
            case 'f':
                currFilters["f"] = filterValue;
                break;
        }
    }

    // Loop through all items and show/hide based on the filter
    entries.forEach(function(entry) {
        const tags = entry.getAttribute('data-tags').split(' ');

        const isCategoryMatch = currFilters["c"] === null || tags.includes(currFilters["c"]);
        const isLanguageMatch = currFilters["l"] === null || tags.includes(currFilters["l"]);
        const isFrameworkMatch = currFilters["f"] === null || tags.includes(currFilters["f"]);

        if (isCategoryMatch && isLanguageMatch && isFrameworkMatch) {
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

    updateDropdowns();
}

function updateDropdowns() {
    const counts = {
        categories: {},
        languages: {},
        frameworks: {}
    };

    // Get all projects that are currently visible
    const visibleProjects = document.querySelectorAll('.project-entry[style*="display: flex"]');

    visibleProjects.forEach(project => {
        const tags = project.getAttribute('data-tags').split(' ');
        tags.forEach(tag => {
            const prefix = tag.charAt(0);
            switch (prefix) {
                case 'c':
                    counts.categories[tag] = (counts.categories[tag] || 0) + 1;
                    break;
                case 'l':
                    counts.languages[tag] = (counts.languages[tag] || 0) + 1;
                    break;
                case 'f':
                    counts.frameworks[tag] = (counts.frameworks[tag] || 0) + 1;
                    break;
            }
        });
    });

    // Update dropdowns
    updateDropdown('category-filter', counts.categories, 'Categories');
    updateDropdown('language-filter', counts.languages, 'Languages');
    updateDropdown('framework-filter', counts.frameworks, 'Frameworks');
}

function updateDropdown(selectId, counts, filterName) {
    const select = document.getElementById(selectId);

    // Clear existing options
    select.innerHTML = '';

    // Create and append default "All" option
    const allOption = document.createElement('option');
    allOption.value = filterName.toLowerCase().charAt(0) + ":all";
    allOption.text = `All ${filterName}`;
    select.appendChild(allOption);

    // Create and append options with counts
    for (const [key, count] of Object.entries(counts)) {
        const option = document.createElement('option');
        option.value = key;
        option.text = `${key.substring(2).charAt(0).toUpperCase() + key.substring(2).slice(1)} (${count})`; // Capitalize first letter and add count
        select.appendChild(option);
    }

    // Set the currently selected option
    const selectedValue = currFilters[selectId.split('-')[0][0]];
    if (selectedValue) {
        select.value = selectedValue;
    } else {
        select.value = `${selectId.split('-')[0][0]}:all`; // Reset to "All" if no specific filter is applied
    }
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

document.getElementById('email-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    
    // Here you would typically send the email using a backend service
    // For this example, we'll just log to the console
    console.log('Sending email to:', email);
    console.log('Message:', message);
    
    // Clear the form
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    
    alert('Thank you for your message. I\'ll get back to you soon!');
});

let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll down
        header.style.top = "-80px"; // Adjust based on your header height
    } else {
        // Scroll up
        header.style.top = "0";
    }
    lastScrollTop = scrollTop;
});


function appear() {
    const reveals = document.querySelectorAll('.appear');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150; // when appearing should begin

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('visible');
        } 
    }
}

function sendMail() {
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Use the mailto protocol
    window.location.href = `mailto:wellmeyer.louis@gmail.com?subject=Message from ${email}&body=${encodeURIComponent(message)}`;
}

window.addEventListener('scroll', appear);

window.onload = function() {
    filterDivs('all');
    appear()
};

