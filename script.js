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
    const jsonData = Object.fromEntries(formData.entries());
    
    // Send data to Formspree
    fetch(bookingForm.action, {
        method: 'POST',
        body: JSON.stringify(jsonData),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            successMessage.style.display = 'block';
            successMessage.style.backgroundColor = ''; // Reset to default success style
            successMessage.style.color = ''; 
            successMessage.style.borderColor = '';
            successMessage.textContent = "Thank you! Your booking request has been received. We'll contact you within 24 hours.";
            bookingForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        // Show error message with error styling
        successMessage.style.display = 'block';
        successMessage.style.backgroundColor = 'rgba(var(--color-error-rgb), 0.1)';
        successMessage.style.color = 'var(--color-error)';
        successMessage.style.borderColor = 'var(--color-error)';
        successMessage.textContent = 'Oops! There was a problem sending your message. Please try again.';
    });
    
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

// Custom Language Toggle Logic
const langToggle = document.getElementById('langToggle');

if (langToggle) {
    // Check cookie on load to set correct button text
    if (document.cookie.includes('googtrans=/en/hi') || document.cookie.includes('googtrans=/auto/hi')) {
        langToggle.innerText = 'English';
    }

    langToggle.addEventListener('click', () => {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            const currentLang = combo.value;
            const newLang = (currentLang === 'hi') ? 'en' : 'hi';
            combo.value = newLang;
            combo.dispatchEvent(new Event('change'));
            langToggle.innerText = (newLang === 'hi') ? 'English' : 'हिंदी';
        }
    });
}
