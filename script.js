document.addEventListener("DOMContentLoaded", function () {
    // 1. Dynamic Booking Modal Handling
    const bookingModalEl = document.getElementById('bookingModal');
    let bookingModal = null;
    
    if (bookingModalEl) {
        bookingModal = new bootstrap.Modal(bookingModalEl);
    }

    const openBookingBtns = document.querySelectorAll('.open-booking-btn');
    const serviceSelect = document.getElementById('serviceSelect');

    openBookingBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const serviceName = this.getAttribute('data-service') || 'General Booking';
            
            if (serviceSelect) {
                // Find matching option or set to default
                let matchFound = false;
                for (let i = 0; i < serviceSelect.options.length; i++) {
                    if (serviceSelect.options[i].value.toLowerCase() === serviceName.toLowerCase()) {
                        serviceSelect.selectedIndex = i;
                        matchFound = true;
                        break;
                    }
                }
                if (!matchFound) {
                    serviceSelect.value = "General Booking";
                }
            }

            if (bookingModal) {
                bookingModal.show();
            }
        });
    });

    // 2. Booking Form Submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('آپ کی بکنگ کی درخواست موصول ہو گئی ہے! ہماری ٹیم جلد آپ سے رابطہ کرے گی۔');
            if (bookingModal) {
                bookingModal.hide();
            }
            bookingForm.reset();
        });
    }

    // 3. Contact Form Interactive Validation
    const contactForm = document.getElementById('contactForm');
    const contactAlert = document.getElementById('contactAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            if (!contactForm.checkValidity()) {
                e.stopPropagation();
                contactForm.classList.add('was-validated');
            } else {
                contactForm.classList.remove('was-validated');
                if (contactAlert) {
                    contactAlert.classList.remove('d-none');
                    contactAlert.classList.add('d-flex');
                }
                contactForm.reset();
                setTimeout(() => {
                    if (contactAlert) {
                        contactAlert.classList.add('d-none');
                        contactAlert.classList.remove('d-flex');
                    }
                }, 5000);
            }
        });
    }

    // 4. Newsletter Form Handling
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('نیوز لیٹر سبسکرائب کرنے کا شکریہ!');
            newsletterForm.reset();
        });
    }
});