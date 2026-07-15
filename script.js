// Theme Toggle Functionality
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

// Update theme button icon
function updateThemeIcon() {
    const icon = themeBtn.querySelector('i');
    if (body.getAttribute('data-theme') === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

updateThemeIcon();

themeBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = body.getAttribute('data-theme') === 'dark' 
            ? 'rgba(17, 24, 39, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = body.getAttribute('data-theme') === 'dark' 
            ? 'rgba(17, 24, 39, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    }
});

// Projects Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Skill bars animation on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Domain Details Modal
const modal = document.getElementById('domainModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

function showDomainDetails(domain) {
    let content = '';
    
    if (domain === 'embedded') {
        content = `
            <h2>Embedded Systems</h2>
            <p>My expertise in embedded systems encompasses a wide range of technologies and applications:</p>
            
            <h3>Core Technologies</h3>
            <ul>
                <li><strong>Microcontrollers:</strong> Arduino, ESP32, STM32, PIC</li>
                <li><strong>Programming:</strong> C/C++, Embedded C, Assembly</li>
                <li><strong>Communication:</strong> UART, SPI, I2C, WiFi, Bluetooth</li>
                <li><strong>Sensors:</strong> Temperature, Humidity, Motion, Light sensors</li>
            </ul>
            
            <h3>Project Experience</h3>
            <ul>
                <li>IoT-based home automation systems</li>
                <li>Real-time health monitoring devices</li>
                <li>Autonomous vehicle control systems</li>
                <li>Industrial automation solutions</li>
            </ul>
            
            <h3>Tools & Platforms</h3>
            <ul>
                <li>Arduino IDE, PlatformIO</li>
                <li>Keil uVision, STM32CubeIDE</li>
                <li>Proteus</li>
                
            </ul>
        `;
    } else if (domain === 'vlsi') {
        content = `
            <h2>VLSI Design</h2>
            <p>My VLSI design expertise covers digital circuit design, verification, and layout optimization:</p>
            
            <h3>Design Languages</h3>
            <ul>
                <li><strong>Verilog HDL:</strong> Digital circuit modeling and synthesis</li>
                <li><strong>VHDL:</strong> Hardware description and simulation</li>
                <li><strong>SystemVerilog:</strong> Advanced verification and testbenches</li>
            </ul>
            
            <h3>Design Areas</h3>
            <ul>
                <li>Arithmetic Logic Units (ALU)</li>
                <li>Memory controllers and cache design</li>
                <li>Communication protocol implementations</li>
            </ul>
            
            <h3>Tools & Software</h3>
            <ul>
                <li>Cadence Virtuoso, Genus & Innovus </li>
                <li>ModelSim</li>
                <li>Xilinx Vivado</li>
            </ul>
            
            <h3>Verification & Testing</h3>
            <ul>
                <li>Functional verification using testbenches</li>
                <li>Timing analysis and optimization</li>
                <li>Power analysis and low-power design</li>
                <li>FPGA prototyping and validation</li>
            </ul>
        `;
    }
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
}

// Close modal when clicking the close button
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
// Contact form submission
document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("54tpu9w1plbumwRs9"); // Your public key

    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        // Create a status message element under the form
        let statusEl = document.createElement('p');
        statusEl.className = 'form-status';
        contactForm.appendChild(statusEl);

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const email = contactForm.querySelector('input[name="email"]').value.trim();
            const subject = contactForm.querySelector('input[name="subject"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();

            statusEl.textContent = '';
            statusEl.className = 'form-status';

            if (!name || !email || !subject || !message) {
                statusEl.textContent = 'Please fill in all fields.';
                statusEl.classList.add('error');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                statusEl.textContent = 'Please enter a valid email address.';
                statusEl.classList.add('error');
                return;
            }

            const fullMessage = `Subject: ${subject}\n\n${message}`;

            const templateParams = {
                name: name,
                email: email,
                message: fullMessage
            };

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            emailjs.send('service_mju56z8', 'template_eqrkxqn', templateParams)
                .then(function () {
                    statusEl.textContent = 'Thanks for reaching out — I\'ll get back to you soon!';
                    statusEl.classList.add('success');
                    contactForm.reset();
                }, function (error) {
                    statusEl.textContent = 'Something went wrong sending your message. Please email me directly at suriyab.1215@gmail.com instead.';
                    statusEl.classList.add('error');
                    console.error('EmailJS error:', error);
                })
                .finally(function () {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
        });
    }
});


// Add scroll animations to elements
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.domain-card, .project-card, .skill-category');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Video background controls
const video = document.getElementById('bgVideo');

// Ensure video plays on mobile devices
if (video) {
    video.play().catch(err => {
        console.log('Video autoplay failed:', err);
    });

    // Add video quality adjustment based on device
    if (window.innerWidth < 768) {
        video.style.minWidth = '180%';
        video.style.minHeight = '180%';
    }

    // Pause video when not in view (performance optimization)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.25 });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
}

// Enhanced hero text animation
window.addEventListener('load', () => {
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.opacity = '0';
        setTimeout(() => {
            heroText.style.transition = 'opacity 1s ease-in-out';
            heroText.style.opacity = '1';
        }, 300);
    }
});

// Add smooth reveal animation for project cards
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    projectObserver.observe(card);
});

// Enhanced scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}
