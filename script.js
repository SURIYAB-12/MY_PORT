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
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const subject = contactForm.querySelector('input[name="subject"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }

            const fullMessage = `Subject: ${subject}\n\n${message}`;

            const templateParams = {
                name: name,
                email: email,
                message: fullMessage
            };

            emailjs.send('service_mju56z8', 'template_eqrkxqn', templateParams)
                .then(function () {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                }, function (error) {
                    alert('Oops... Something went wrong.');
                    console.error(error);
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
