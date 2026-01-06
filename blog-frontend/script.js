// Step 1: Define the API URL globally
const API_URL = window.location.origin + "/api";// <--- Replace this later with your real Render link

// Simple Reveal Animation
window.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.hero-title');
    const mainImg = document.querySelector('.main-img-wrapper img');

    // Animate title upwards
    title.style.opacity = '0';
    title.style.transform = 'translateY(50px)';

    setTimeout(() => {
        title.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';

        // Slight zoom on image
        mainImg.style.transform = 'scale(1.1)';
    }, 300);
});

const items = document.querySelectorAll('.journal-item');
const reveal = document.querySelector('.hover-reveal');
const revealImg = document.querySelector('.hover-reveal-img');

items.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const imgPath = item.getAttribute('data-img');
        revealImg.src = imgPath;
        reveal.classList.add('active');
    });

    item.addEventListener('mouseleave', () => {
        reveal.classList.remove('active');
    });

    item.addEventListener('mousemove', (e) => {
        // Offset so the image isn't directly under the cursor
        const x = e.clientX + 20;
        const y = e.clientY - 200;
        reveal.style.transform = `translate(${x}px, ${y}px)`;
    });
});

window.addEventListener('scroll', () => {
    const parallaxText = document.querySelector('.parallax-bg-text');
    if (parallaxText) {
        // Calculate how far the section is from the top
        const scrollPosition = window.pageYOffset;
        // Move text horizontally based on scroll
        parallaxText.style.transform = `translateX(${scrollPosition * 0.15}px)`;
    }
});

const pillarObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a delay based on the card's index for a "wave" effect
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 150);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.pillar-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.8s ease-out";
    pillarObserver.observe(card);
});

const spotlight = document.querySelector('.spotlight-image');
const playBtn = document.querySelector('.play-btn-wrap');

spotlight.addEventListener('mousemove', (e) => {
    const rect = spotlight.getBoundingClientRect();
    const x = e.clientX - rect.left - 50; // 50 is half the width
    const y = e.clientY - rect.top - 50;  // 50 is half the height

    // Smoothly animate the play button towards the cursor
    playBtn.style.transform = `translate(${x}px, ${y}px)`;
});

spotlight.addEventListener('mouseleave', () => {
    // Reset to center
    playBtn.style.transform = `translate(-50%, -50%)`;
});

const subscribeBtn = document.querySelector('.input-group button');

subscribeBtn.addEventListener('mousemove', (e) => {
    const rect = subscribeBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    subscribeBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});

subscribeBtn.addEventListener('mouseleave', () => {
    subscribeBtn.style.transform = `translate(0px, 0px)`;
});

const tags = document.querySelectorAll('.tag');

document.addEventListener('mousemove', (e) => {
    tags.forEach(tag => {
        const rect = tag.getBoundingClientRect();
        const tagX = rect.left + rect.width / 2;
        const tagY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
            Math.pow(e.clientX - tagX, 2) + Math.pow(e.clientY - tagY, 2)
        );

        // If the mouse is close, scale the tag slightly
        if (distance < 150) {
            const scale = 1 + (150 - distance) / 1000;
            tag.style.transform = `scale(${scale})`;
        } else {
            tag.style.transform = `scale(1)`;
        }
    });
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;

        // Close other items if you want only one open at a time
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
        });

        item.classList.toggle('active');
    });
});

const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');

menuToggle.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    // Stop body scrolling
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    // Enable body scrolling
    document.body.style.overflow = 'auto';
});

// Close menu if user clicks a link
document.querySelectorAll('.main-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

const infoDrawer = document.getElementById('infoDrawer');
const drawerClose = document.getElementById('drawerClose');
const exitBtn = document.getElementById('exitBtn');

// Elements to update inside the drawer
const drawerTitle = document.getElementById('drawerTitle');
const drawerImg = document.getElementById('drawerImg');
const drawerCat = document.getElementById('drawerCat');

// Add click event to each journal item
document.querySelectorAll('.journal-item').forEach(item => {
    item.addEventListener('click', () => {
        // Get data from the item
        const title = item.querySelector('.item-title').innerText;
        const cat = item.querySelector('.item-tag').innerText;
        const img = item.getAttribute('data-img');

        // Update drawer content
        drawerTitle.innerText = title;
        drawerCat.innerText = cat;
        drawerImg.src = img;

        // Show drawer
        infoDrawer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

// Close logic
[drawerClose, exitBtn].forEach(el => {
    el.addEventListener('click', () => {
        infoDrawer.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

const pillarData = {
    "01": {
        title: "Culture & Design",
        desc: "Exploring the visual and social trends that shape our modern environment.",
        links: ["Minimalist Architecture in 2025", "The Color Palette of Solitude", "Bauhaus in the Digital Age"]
    },
    "02": {
        title: "Human Intelligence",
        desc: "Focusing on the psychology behind creativity, habit-building, and focus.",
        links: ["Flow State Mastery", "The Science of Deep Work", "Why We Dream of Order"]
    },
    "03": {
        title: "The Digital Frontier",
        desc: "Navigating the complexities of AI, digital ethics, and our future tech landscape.",
        links: ["AI as a Creative Partner", "The Privacy Manifesto", "Decentralizing the Future"]
    }
};

const pillarDetails = document.getElementById('pillarDetails');
const closePillar = document.getElementById('closePillar');

document.querySelectorAll('.pillar-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const num = card.querySelector('.pillar-number').innerText;
        const data = pillarData[num];

        // Inject Data
        document.getElementById('activePillarNum').innerText = num;
        document.getElementById('activePillarTitle').innerText = data.title;
        document.getElementById('activePillarDesc').innerText = data.desc;

        const linkContainer = document.getElementById('pillarLinks');
        linkContainer.innerHTML = data.links.map(link => `<li><a href="#">${link} →</a></li>`).join('');

        // Show Overlay
        pillarDetails.style.display = 'flex';
        pillarDetails.classList.add('active');
    });
});

closePillar.addEventListener('click', () => {
    pillarDetails.classList.remove('active');
    setTimeout(() => { pillarDetails.style.display = 'none'; }, 600);
});

// Data for the 3 sub-links
const insightContent = {
    "Minimalist Architecture in 2025": "This essay covers how sustainable materials are redefining the luxury home market in Northern Europe.",
    "The Color Palette of Solitude": "An analysis of how 'Off-White' and 'Sage' tones impact mental clarity in workspace design.",
    "Bauhaus in the Digital Age": "How the 100-year-old design principles are being applied to modern mobile app interfaces.",
    "Flow State Mastery": "Practical steps to reaching deep focus in under 15 minutes using environmental triggers.",
    "The Science of Deep Work": "Recent neurological studies prove that multitasking is a myth. Here is the data.",
    "Why We Dream of Order": "Psychological exploration of why humans find minimalist grids so satisfying.",
    "AI as a Creative Partner": "Moving past fear: How to use AI to brainstorm without losing your unique human voice.",
    "The Privacy Manifesto": "10 steps to securing your digital footprint in an era of mass surveillance.",
    "Decentralizing the Future": "A look at how Web3 might actually return power to individual content creators."
};

const pillarModal = document.getElementById('pillarModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

// Update the click event for the links inside the Pillar Details
document.getElementById('pillarLinks').addEventListener('click', (e) => {
    // Check if the clicked element is an anchor tag
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const linkText = e.target.innerText.replace(' →', ''); // Clean the text

        // Inject content into the modal
        modalTitle.innerText = linkText;
        modalBody.innerText = insightContent[linkText] || "Summary coming soon...";

        // Show the modal
        pillarModal.style.display = 'flex';
    }
});

// Close Modal logic
document.getElementById('modalClose').addEventListener('click', () => {
    pillarModal.style.display = 'none';
});

// Close modal if user clicks outside of it
window.onclick = function (event) {
    if (event.target == pillarModal) {
        pillarModal.style.display = 'none';
    }
}

const fullStudyPanel = document.getElementById('fullStudyPanel');
const expandStudyBtn = document.getElementById('expandStudy');
const closeFullStudy = document.getElementById('closeFullStudy');

const fullContentData = {
    "Minimalist Architecture in 2025": "<p>In 2025, architecture has moved beyond simple 'white boxes'. We are seeing a shift toward biophilic minimalism—where the structure mimics nature. Using sustainable timber and smart-glass technology, these homes aren't just energy efficient; they are designed to lower the inhabitant's cortisol levels by 20%...</p><p>The integration of indoor gardens and natural light flow is no longer a luxury but a standard for mental health architecture.</p>",
    "Flow State Mastery": "<p>The concept of 'Flow' was first coined by Mihaly Csikszentmihalyi, but in the digital age, reaching it is harder than ever. Our research shows that the average office worker is interrupted every 11 minutes...</p><p>To master flow, you must implement the '90-minute Sprint' followed by 15 minutes of non-digital rest. This allows the prefrontal cortex to reset without entering the dopamine-loop of social media scrolling.</p>"
    // Add more content as needed...
};

expandStudyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const currentTitle = document.getElementById('modalTitle').innerText;

    // Set content for the full panel
    document.getElementById('studyTitle').innerText = currentTitle;
    document.getElementById('studySubject').innerText = currentTitle;
    document.getElementById('studyBodyText').innerHTML = fullContentData[currentTitle] || "<p>The full depth of this analysis is currently being curated. Please check back shortly for the complete report.</p>";

    // Launch the panel
    fullStudyPanel.classList.add('active');
});

closeFullStudy.addEventListener('click', () => {
    fullStudyPanel.classList.remove('active');
});

const videoOverlay = document.getElementById('videoOverlay');
const promoVideo = document.getElementById('promoVideo');
const closeVideo = document.getElementById('closeVideo');

// Get both the play button wrap and the outline button
const playTriggers = [
    document.querySelector('.play-btn-wrap'),
    document.querySelector('.btn-outline')
];

playTriggers.forEach(trigger => {
    if (trigger) {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            videoOverlay.style.display = 'flex';
            setTimeout(() => {
                videoOverlay.classList.add('active');
            }, 10);

            // Auto-play logic (works if the iframe URL has autoplay=1)
            const videoSrc = promoVideo.src;
            if (!videoSrc.includes('autoplay=1')) {
                promoVideo.src += "&autoplay=1";
            }
        });
    }
});

closeVideo.addEventListener('click', () => {
    videoOverlay.classList.remove('active');
    setTimeout(() => {
        videoOverlay.style.display = 'none';

        // IMPORTANT: Reset the iframe src to STOP the video sound
        const videoSrc = promoVideo.src;
        promoVideo.src = videoSrc.replace("&autoplay=1", "");
    }, 500);
});

const newsletterForm = document.getElementById('newsletterForm');
const initialUI = document.getElementById('newsletterFormInitial');
const successUI = document.getElementById('newsletterSuccess');
const subscribeBtnText = document.getElementById('subscribeBtn');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Change button to "Processing" state
    subscribeBtnText.innerText = "Sending...";
    subscribeBtnText.style.opacity = "0.5";
    subscribeBtnText.disabled = true;

    // 2. Simulate server delay (1.5 seconds)
    setTimeout(() => {
        // 3. Hide Initial Form and Show Success
        initialUI.style.display = "none";
        successUI.style.display = "block";

        // Optional: Log the email to console to show the "Brain" captured it
        const email = document.getElementById('subscriberEmail').value;
        console.log("New Subscriber Captured: " + email);

        // 4. Trigger a small confetti effect (Optional but "Excellent")
        createConfetti();
    }, 1500);
});

// Simple CSS confetti logic
function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.width = '10px';
        div.style.height = '10px';
        div.style.backgroundColor = ['#2d4635', '#7a7a7a', '#f4f1ea'][Math.floor(Math.random() * 3)];
        div.style.left = Math.random() * 100 + 'vw';
        div.style.top = '-10px';
        div.style.zIndex = '9999';
        div.style.borderRadius = '50%';
        document.body.appendChild(div);

        div.animate([
            { transform: 'translateY(0) rotate(0)', opacity: 1 },
            { transform: `translateY(100vh) rotate(720deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'linear'
        }).onfinish = () => div.remove();
    }
}

// 1. Get all tags and all journal items
const journalItems = document.querySelectorAll('.journal-item');

tags.forEach(tag => {
    tag.addEventListener('click', (e) => {
        // e.preventDefault(); // Uncomment if you don't want the URL to change

        const filterValue = tag.getAttribute('data-filter');

        // 2. Scroll to the Journal Section smoothly
        document.querySelector('.journal-section').scrollIntoView({
            behavior: 'smooth'
        });

        // 3. Filter Logic
        journalItems.forEach(item => {
            // We look at the tag text inside each journal item
            const itemTag = item.querySelector('.item-tag').innerText.toLowerCase();

            if (itemTag.includes(filterValue)) {
                item.style.display = 'flex';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
                // Delay hiding to allow the fade-out animation
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
            }
        });
    });
});

const resetBtn = document.getElementById('resetFilter');
const filterStatus = document.getElementById('filterStatus');

resetBtn.addEventListener('click', () => {
    journalItems.forEach(item => {
        item.style.display = 'flex';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 10);
    });
    filterStatus.style.display = 'none';
});

// Update the tag click listener to show the status bar
tags.forEach(tag => {
    tag.addEventListener('click', () => {
        filterStatus.style.display = 'block';
    });
});

const faqView = document.getElementById('faqView');
const askFormView = document.getElementById('askFormView');
const askSuccess = document.getElementById('askSuccess');

const openAskForm = document.getElementById('openAskForm');
const backToFaq = document.getElementById('backToFaq');
const questionForm = document.getElementById('questionForm');
const resetFaqBtn = document.getElementById('resetFaqBtn');

// Switch to Form
openAskForm.addEventListener('click', () => {
    faqView.style.display = 'none';
    askFormView.style.display = 'block';
});

// Switch back to FAQ
backToFaq.addEventListener('click', () => {
    askFormView.style.display = 'none';
    faqView.style.display = 'block';
});

// Handle Submission
questionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    askFormView.style.display = 'none';
    askSuccess.style.display = 'block';
});

// Reset everything
resetFaqBtn.addEventListener('click', () => {
    askSuccess.style.display = 'none';
    faqView.style.display = 'block';
    questionForm.reset();
});

// --- 1. Parallax Effect for Background Text ---
window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY;
    const parallaxText = document.getElementById('parallaxBg');
    if (parallaxText) {
        // Moves the text horizontally as you scroll
        parallaxText.style.transform = `translate(${-50 + (scrollValue * 0.02)}%, -50%)`;
    }
});

// --- 2. Magnetic Link Effect ---
const footerMagnets = document.querySelectorAll('.magnet-wrap');

footerMagnets.forEach((wrap) => {
    const link = wrap.querySelector('a');

    wrap.addEventListener('mousemove', (e) => {
        const box = wrap.getBoundingClientRect();
        const centerX = box.left + box.width / 2;
        const centerY = box.top + box.height / 2;

        // Calculate distance from center
        const x = e.clientX - centerX;
        const y = e.clientY - centerY;

        // Pull the link 40% towards the mouse
        link.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
        link.style.color = "#2d4635"; // Highlight color
    });

    wrap.addEventListener('mouseleave', () => {
        // Return to original position
        link.style.transform = `translate(0px, 0px)`;
        link.style.color = "#1a1a1a";
        link.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";

        setTimeout(() => {
            link.style.transition = "none";
        }, 500);
    });
});

// Map the links to their respective overlays
const footerLinks = {
    'Archives': document.getElementById('archiveOverlay'),
    'Contact': document.getElementById('contactOverlay'),
    'Newsletter': document.querySelector('.newsletter-section') // Scrolls to Newsletter
};

document.querySelectorAll('.footer-col a').forEach(link => {
    link.addEventListener('click', (e) => {
        const linkText = link.innerText.trim();

        if (footerLinks[linkText]) {
            e.preventDefault();

            if (linkText === 'Newsletter') {
                // Smooth scroll to Newsletter section
                footerLinks[linkText].scrollIntoView({ behavior: 'smooth' });
            } else {
                // Open the specific overlay
                const targetOverlay = footerLinks[linkText];
                targetOverlay.style.display = 'flex';
                setTimeout(() => targetOverlay.classList.add('active'), 10);
                document.body.style.overflow = 'hidden'; // Stop background scroll
            }
        }
    });
});

// Logic to close overlays
document.querySelectorAll('.close-overlay').forEach(btn => {
    btn.addEventListener('click', () => {
        const overlay = btn.closest('.footer-overlay');
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 400);
    });
});

const backToTop = document.getElementById('backToTop');
const progressPath = document.getElementById('progressPath');
const pathLength = 126; // Match the dasharray in CSS

window.addEventListener('scroll', () => {
    // 1. Calculate Progress
    const scroll = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength / height);

    // Update the circle stroke
    progressPath.style.strokeDashoffset = progress;

    // 2. Toggle Visibility
    if (scroll > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// 3. Smooth Scroll to Top
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

async function fetchJournalPosts() {
    const journalList = document.querySelector('.journal-list');

    try {
        // FIXED: Added missing backticks and corrected container reference
        const response = await fetch(`${API_URL}/api/posts/all`);
        const posts = await response.json();

        if (posts.length === 0) {
            journalList.innerHTML = '<p class="empty-msg">No stories yet. Be the first to write.</p>';
            return;
        }

        journalList.innerHTML = '';

        posts.forEach((post, index) => {
            const date = new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
            });

            const currentUser = localStorage.getItem('username');
            const isOwner = currentUser === post.authorName;

            const postHTML = `
                <article class="journal-item" data-id="${post._id}" >
                    <div class="item-meta">0${index + 1} / ${date}</div>
                    <div class="item-content">
                        <h3 class="item-title">${post.title}</h3>
                        <p class="item-tag">${post.category} — By ${post.authorName || 'Guest'}</p>
                    </div>
                    <div class="item-controls" style="display: flex; align-items: center; gap: 15px;">
                        ${isOwner ? `<button onclick="deletePost('${post._id}')" class="delete-btn">Delete</button>` : ''}
                        <div class="item-arrow">→</div>
                    </div>
                </article>
            `;
            journalList.insertAdjacentHTML('beforeend', postHTML);
        });

    } catch (error) {
        console.error("Error loading journal:", error);
    }
}

// Ensure this runs when the page loads
document.addEventListener('DOMContentLoaded', fetchJournalPosts);

async function loadJournal() {
    const container = document.getElementById('journalList');
    if (!container) return;

    try {
        const response = await fetch(`${API_URL}/api/posts/all`);
        const posts = await response.json();

        if (posts.length === 0) {
            container.innerHTML = '<p style="padding-left: 80px;">The journal is currently empty.</p>';
            return;
        }

        // 1. Create an empty string to hold all posts
        let allPostsHTML = '';
        const currentUser = localStorage.getItem('username');

        posts.forEach((post, index) => {
            const date = new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
            });

            const isOwner = currentUser === post.authorName;

            // 2. Add the HTML to our string variable instead of the DOM
            // ... inside your posts.forEach loop ...
            // ... inside your loadJournal loop ...
            allPostsHTML += `
    <article class="journal-item" 
             data-id="${post._id}" 
             data-content="${post.content}" 
             data-img="${post.imageUrl || 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800'}">
        <div class="item-meta">0${index + 1} / ${date}</div>
        <div class="item-content">
            <h3 class="item-title">${post.title}</h3>
            <p class="item-tag">${post.category}</p>
        </div>
        <div class="item-controls">
            ${isOwner ? `<button class="delete-btn">Delete</button>` : ''}
            <div class="item-arrow">→</div>
        </div>
    </article>
`;
        });

        // 3. Inject EVERYTHING at once (much faster)
        container.innerHTML = allPostsHTML;
        initHoverReveal();

    } catch (err) {
        console.error("Error loading journal:", err);
    }
}

// Separate function for the Hover animation
function initHoverReveal() {
    const items = document.querySelectorAll('.journal-item');
    const reveal = document.querySelector('.hover-reveal');
    const revealImg = document.querySelector('.hover-reveal-img');

    if (!reveal || items.length === 0) return;

    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const imgPath = item.getAttribute('data-img') || 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800';
            revealImg.src = imgPath;
            reveal.classList.add('active');
        });

        item.addEventListener('mousemove', (e) => {
            // This math ensures perfect alignment regardless of scroll
            const x = e.clientX + 20;
            const y = e.clientY - 200; // Centers image vertically to cursor
            reveal.style.transform = `translate(${x}px, ${y}px)`;
        });

        item.addEventListener('mouseleave', () => {
            reveal.classList.remove('active');
        });
    });
}



// Make sure it runs when the page opens
document.addEventListener('DOMContentLoaded', loadJournal);

document.addEventListener('mousemove', (e) => {
    const circle = document.querySelector('.animated-circle');
    if (!circle) return;

    // Calculate mouse movement intensity
    const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.02;

    circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Put this at the bottom of script.js
const journalList = document.getElementById('journalList');

if (journalList) {
    journalList.addEventListener('click', async (e) => {
        // Find the post container
        const item = e.target.closest('.journal-item');
        if (!item) return;

        // 1. CHECK FOR DELETE BUTTON
        if (e.target.classList.contains('delete-btn')) {
            // This line is the magic fix! It stops the click from "bubbling" up to the post
            e.stopPropagation();

            const postId = item.getAttribute('data-id');
            if (confirm("Permanently remove this entry?")) {
                await deletePost(postId);
            }
            return; // Exit the function here so the drawer code below never runs
        }

        // 2. DRAWER LOGIC (Only runs if the code above didn't "return")
        const title = item.querySelector('.item-title')?.innerText || "Untitled";
        const category = item.querySelector('.item-tag')?.innerText || "General";
        const content = item.getAttribute('data-content') || "";
        const imgPath = item.getAttribute('data-img');

        const dTitle = document.getElementById('drawerTitle');
        const dCat = document.getElementById('drawerCat');
        const dImg = document.getElementById('drawerImg');
        const dTextContainer = document.querySelector('.drawer-text');
        const infoDrawer = document.getElementById('infoDrawer');

        if (dTitle) dTitle.innerText = title;
        if (dCat) dCat.innerText = category;
        if (dImg) dImg.src = imgPath;
        if (dTextContainer) {
            dTextContainer.innerHTML = `<p>${content}</p><br><a href="#" class="full-read-btn">Read Full Essay →</a>`;
        }

        if (infoDrawer) {
            infoDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
}


// Logic to close the drawer
// Attach to both the 'X' button and the dark overlay
const closeElements = ['exitBtn', 'drawerClose'];

closeElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('click', () => {
            document.getElementById('infoDrawer').classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});

async function deletePost(id) {
    const token = localStorage.getItem('token'); // Get your login key

    try {
        const response = await fetch(`${API_URL}/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token, // Send the token here!
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Refresh the journal so the post disappears
            loadJournal();
        } else {
            const error = await response.json();
            alert(error.msg || "Failed to delete");
        }
    } catch (err) {
        console.error("Delete error:", err);
    }
}

