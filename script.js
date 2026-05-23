// Case Study Modal Logic
function openCaseModal(caseId) {
    const modal = document.getElementById('caseModal');
    const modalBody = document.getElementById('modalBody');
    const content = document.getElementById(`${caseId}-content`);

    if (modal && modalBody && content) {
        modalBody.innerHTML = content.innerHTML;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeCaseModal() {
    const modal = document.getElementById('caseModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Global click handler to close modal
window.addEventListener('click', (event) => {
    const modal = document.getElementById('caseModal');
    if (event.target === modal) {
        closeCaseModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const parent = link.parentElement;
                if (parent.classList.contains('has-dropdown') && window.innerWidth <= 1200) {
                    e.preventDefault();
                    parent.classList.toggle('active');
                } else {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    // Remove active from all dropdowns
                    const allDropdowns = mainNav.querySelectorAll('.has-dropdown');
                    allDropdowns.forEach(d => d.classList.remove('active'));
                }
            });
        });
    }

    // Partners Slider Logic
    const partnersTrack = document.querySelector('.partners-track');
    const partnersPrev = document.querySelector('.partners-prev');
    const partnersNext = document.querySelector('.partners-next');

    if (partnersTrack && partnersPrev && partnersNext) {
        partnersNext.addEventListener('click', () => {
            partnersTrack.scrollBy({ left: 300, behavior: 'smooth' });
        });
        partnersPrev.addEventListener('click', () => {
            partnersTrack.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    // Scroll Reveal Animation Logic
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Inject WhatsApp Button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = "https://wa.me/919943766959";
    whatsappBtn.className = "whatsapp-float";
    whatsappBtn.target = "_blank";
    whatsappBtn.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.445 0 .081 5.363.079 11.969c0 2.112.552 4.173 1.6 6.01L0 24l6.17-1.618a11.82 11.82 0 005.877 1.564h.005c6.604 0 11.967-5.367 11.97-11.97a11.85 11.85 0 00-3.51-8.435" fill="currentColor"/>
        </svg>
    `;
    document.body.appendChild(whatsappBtn);

    // FormSubmit AJAX handling for all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Ensure all inputs have name attributes
        const inputs = form.querySelectorAll('input:not([type="submit"]), textarea, select');
        inputs.forEach((input, index) => {
            if (!input.name) {
                let generatedName = input.id || input.placeholder || `field_${index}`;
                // Clean up placeholder text if used as name
                generatedName = generatedName.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
                if (!generatedName) generatedName = `field_${index}`;
                input.name = generatedName;
            }
        });

        // Add hidden fields if they don't exist
        const hiddenFields = [
            { name: '_subject', value: `New Submission from ${document.title}` },
            { name: '_template', value: 'table' },
            { name: '_captcha', value: 'false' },
            { name: '_bcc', value: '' }, // Add secondary email here if needed
            { name: '_autoresponse', value: 'Thank you for your message. We have received it and will get back to you shortly.' }
        ];

        hiddenFields.forEach(field => {
            if (!form.querySelector(`input[name="${field.name}"]`)) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = field.name;
                input.value = field.value;
                form.appendChild(input);
            }
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
            
            if (submitBtn) {
                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;
            }

            const formData = new FormData(form);

            // FormSubmit blocks AJAX from localhost with CORS. Mocking success for local testing.
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                setTimeout(() => {
                    showFormMessage('Success! Your message has been sent successfully.', 'success');
                    form.reset();
                    if (submitBtn) {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    }
                }, 1500);
                return;
            }

            fetch('https://formsubmit.co/ajax/contact@bkdadvisors.in', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === 'true' || data.success === true) {
                    showFormMessage('Success! Your message has been sent successfully.', 'success');
                    form.reset();
                } else {
                    showFormMessage('Oops! Something went wrong. Please try again.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showFormMessage('Oops! Something went wrong. Please try again.', 'error');
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            });

            function showFormMessage(text, type) {
                let msgDiv = form.querySelector('.form-submit-msg');
                if (!msgDiv) {
                    msgDiv = document.createElement('div');
                    msgDiv.className = 'form-submit-msg';
                    msgDiv.style.marginTop = '15px';
                    msgDiv.style.fontSize = '15px';
                    msgDiv.style.fontWeight = '600';
                    msgDiv.style.textAlign = 'center';
                    msgDiv.style.transition = 'opacity 0.4s ease';
                    form.appendChild(msgDiv);
                }
                msgDiv.style.color = type === 'success' ? '#10b981' : '#ef4444';
                msgDiv.style.opacity = '1';
                msgDiv.textContent = text;
                
                setTimeout(() => {
                    msgDiv.style.opacity = '0';
                }, 5000);
            }
        });
    });
});

