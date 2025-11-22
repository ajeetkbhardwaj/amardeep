// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Testimonials Slider
const testimonials = document.querySelectorAll('.testimonial');
const sliderBtns = document.querySelectorAll('.slider-btn');
let currentSlide = 0;

function showSlide(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
    sliderBtns.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
}

sliderBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
}, 5000);

// Form Submission
const bookingForm = document.getElementById('bookingForm');
const successMessage = document.getElementById('successMessage');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send data to a server
    console.log('Booking Request:', data);
    
    // Show success message
    successMessage.style.display = 'block';
    bookingForm.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Set minimum date to today for event date picker
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Animate elements on scroll
const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .about-text, .stats');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

animatedElements.forEach(el => {
    animationObserver.observe(el);
});

// Animated Counter for Stats
const statsSection = document.querySelector('.stats');

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statBoxes = entry.target.querySelectorAll('.stat-box h3');
            statBoxes.forEach(counter => {
                const targetText = counter.innerText;
                const target = parseInt(targetText.replace('+', ''), 10);
                let current = 0;
                const increment = target / 100; // Adjust speed by changing 100

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.innerText = Math.ceil(current) + (targetText.includes('+') ? '+' : '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = targetText; // Ensure it ends on the exact number
                    }
                };
                updateCounter();
            });
            observer.unobserve(entry.target); // Run the counter only once
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    counterObserver.observe(statsSection);
}

// Active Nav Link Highlighting on Scroll
const sections = document.querySelectorAll('section[id]');
const navLi = document.querySelectorAll('.nav-links li a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLi.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { rootMargin: '-50% 0px -50% 0px' }); // Activates when section is in the middle of the screen

sections.forEach(section => {
    sectionObserver.observe(section);
});
