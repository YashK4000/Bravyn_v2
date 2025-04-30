//Form Validation and Submission
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('form-success');
const errorMessage = document.getElementById('form-error');
const submitButton = document.getElementById('submit-button');

function showMessage(element) {
  element.style.opacity = '1';
  setTimeout(() => {
    element.style.opacity = '0';
  }, 4000);
}

function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !emailRegex.test(email)) {
    return false;
  }
  return true;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    errorMessage.textContent = 'Please enter a valid name, email and phone number.';
    showMessage(errorMessage);
    return;
  }

  const formData = new FormData(form);

  // Disable the button and add spinner
  submitButton.disabled = true;
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = 'Sending <span class="spinner"></span>';

  try {
    const response = await fetch('https://formspree.io/f/xpwdqdjo', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      successMessage.textContent = 'Thank you! We\'ll be in touch soon.';
      showMessage(successMessage);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    errorMessage.textContent = 'Oops! Something went wrong. Please try again.';
    showMessage(errorMessage);
  } finally {
    // Re-enable the button and remove spinner
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  }
});

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
