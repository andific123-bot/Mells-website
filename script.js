document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================================
    // 1. Mobile Menu & Dropdown Toggles
    // ==========================================================================
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function (e) {
            e.stopPropagation();
            navbarCollapse.classList.toggle('show');
        });
    }

    const dropdownToggles = document.querySelectorAll('.hover-dropdown > a');
    dropdownToggles.forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                e.stopPropagation();
                const parent = this.parentElement;
                const menu = parent.querySelector('.dropdown-menu');

                if (menu) {
                    menu.classList.toggle('show');
                }
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (window.innerWidth < 992 && navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        }
    });

    // ==========================================================================
    // 2. Dynamic Booking Modal Handling
    // ==========================================================================
    const bookingModalEl = document.getElementById('bookingModal');
    let bookingModal = null;

    if (bookingModalEl && typeof bootstrap !== 'undefined') {
        bookingModal = new bootstrap.Modal(bookingModalEl);
    }

    const openBookingBtns = document.querySelectorAll('.open-booking-btn');
    const serviceSelect = document.getElementById('serviceSelect');

    openBookingBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const serviceName = this.getAttribute('data-service') || 'General Booking';

            if (serviceSelect) {
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

    // ==========================================================================
    // 3. Booking Form Submission
    // ==========================================================================
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Your booking request has been received! Our team will contact you shortly.');
            if (bookingModal) {
                bookingModal.hide();
            }
            bookingForm.reset();
        });
    }

    // ==========================================================================
    // 4. Contact Form Interactive Validation
    // ==========================================================================
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

    // ==========================================================================
    // 5. Newsletter Form Handling
    // ==========================================================================
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // ==========================================================================
    // 6. Dynamic Image & Service Handler
    // ==========================================================================
    const urlParams = new URLSearchParams(window.location.search);
    const serviceKey = urlParams.get('service');

    const servicesData = {
        'ac-services': {
            title: "AC Services & Duct Cleaning",
            image: "images/AC Service.avif",
            desc: "Professional AC cleaning, deep duct cleaning, coil wash, and gas refilling."
        },
        'furniture-cleaning': {
            title: "Furniture & Sofa Cleaning",
            image: "images/sofa Cleaning.avif",
            desc: "High-pressure steam cleaning for sofas, carpets, armchairs, and mattresses."
        },
        'deep-cleaning': {
            title: "Home Deep Cleaning",
            image: "images/home deep cleaning.avif",
            desc: "Full home deep cleaning service including kitchen, washrooms, balcony, and floor polishing."
        },
        'water-pipeline': {
            title: "Water Tank & Pipeline Services",
            image: "images/water tank and pipeline service.avif",
            desc: "Hygienic water tank sterilization, pipeline flushing, and leak inspection."
        },
        'pest-control': {
            title: "Pest Control Services",
            image: "images/Pest Control.avif",
            desc: "Safe and eco-friendly pest extermination for cockroaches, bedbugs, termites, and pests."
        },
        'mold-removal': {
            title: "Mold Removal & Remediation",
            image: "images/Mold Removal & Remediation.avif",
            desc: "Advanced mold removal, anti-fungal wall treatments, and humidity control."
        },
        'environmental-testing': {
            title: "Indoor Air Quality Testing",
            image: "images/air-testing.jpg",
            desc: "Comprehensive testing for indoor air purity, dust mites, allergens, and airborne toxic particles."
        },
        'maid-services': {
            title: "Professional Maid Services",
            image: "images/maid-service.jpg",
            desc: "Trained and verified maids for daily, weekly, or monthly housekeeping tasks."
        },
        'painting-moving': {
            title: "Painting & Maintenance",
            image: "images/painting.jpg",
            desc: "Interior/exterior wall painting, drywall repairs, and general home maintenance."
        },
        'packages': {
            title: "Annual Care Packages",
            image: "images/annual-packages.jpg",
            desc: "All-in-one customized annual maintenance packages for hassle-free home care."
        }
    };

    if (serviceKey && servicesData[serviceKey]) {
        const data = servicesData[serviceKey];

        const imgElement = document.getElementById('sidebarServiceImg');
        if (imgElement) {
            imgElement.src = data.image;
            imgElement.alt = data.title;
        }

        const pageTitle = document.getElementById('pageTitle');
        const serviceHeaderTitle = document.getElementById('serviceHeaderTitle');
        const serviceHeaderDesc = document.getElementById('serviceHeaderDesc');
        const contentTitle = document.getElementById('contentTitle');
        const contentDesc = document.getElementById('contentDesc');

        if (pageTitle) pageTitle.innerText = `${data.title} - MELLS`;
        if (serviceHeaderTitle) serviceHeaderTitle.innerText = data.title;
        if (serviceHeaderDesc) serviceHeaderDesc.innerText = data.desc;
        if (contentTitle) contentTitle.innerText = `About ${data.title}`;
        if (contentDesc) contentDesc.innerText = data.desc;
    }
});