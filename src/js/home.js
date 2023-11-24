
document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        initStopVideoOnScroll();
        initHeaderHightlightOnScroll();
        initHeroAnimations();
        initButtonsHover();
    }
    initPhoneSlider();
});

function initStopVideoOnScroll() {
    const video = document.querySelector('[data-hero-video]');
    const stopTimeout = 22 * 1000;

    if (!video) {
        return;
    }

	const config = {
		rootMargin: '0px -100px',
		threshold: 0
	}
	const callback = (entry) => {
        const videoElement = entry[0].target;
        if (!entry[0].isIntersecting) {
            videoElement.pause();
            return
        } 
        videoElement.play();
	}

	const observer = new IntersectionObserver(callback, config);

    observer.observe(video);

    // остановить спустя 20сек
    setTimeout(()=> {
        video.pause();
    }, stopTimeout);
}

function initHeaderHightlightOnScroll() {
    const navbar = document.querySelector('.header .navbar');
    const headerPlaceholder = document.querySelector('[data-header-intersection-observer-placeholder]');

    if (!headerPlaceholder) {
        return;
    }

	const config = {
		rootMargin: '400px 0px',
		threshold: 0
	}
	const callback = (entry) => {
        if (!entry[0].isIntersecting) {
            navbar.classList.add('vue-sticky-element--stuck', 'vue-sticky-element--show', 'fixed')
            return
        } 
        navbar.classList.remove('vue-sticky-element--stuck', 'vue-sticky-element--show', 'fixed')
	}

	const observer = new IntersectionObserver(callback, config);

    observer.observe(headerPlaceholder);
}

function initHeroAnimations() {
    const heroPlaceholder = document.querySelector('[data-hero-intersection-observer-placeholder]');
    const hero = document.querySelector('[data-hero]');

    if (!heroPlaceholder) {
        return;
    }
    const config = {
        rootMargin: '50px 0px',
        threshold: 0,
    };
	const callback = (entry) => {
        if (!entry[0].isIntersecting) {
            hero.classList.add('animate');
            return
        } 
        hero.classList.remove('animate')
	}

	const observer = new IntersectionObserver(callback, config);

    observer.observe(heroPlaceholder    );
}

function initButtonsHover() {
    const buttons = document.querySelectorAll('.hero button[aria-hidden]');
    const video = document.querySelector('[data-hero-video]');
    const VIDEO_IN_SECONDS = 22;

    buttons.forEach((button) => {
        let idleTime;

        button.addEventListener('mouseenter', () => {
            idleTime = video.currentTime
            video.currentTime = Math.random() * (VIDEO_IN_SECONDS - 0) + 0;
            video.pause();
        });
        button.addEventListener('mouseleave', () => {
            video.currentTime = idleTime;
            video.play();
        });
    });
}

function initPhoneSlider() {
    // jQuery
    const phoneSlider = $('[data-slick]');

    phoneSlider.slick({
        arrows: false,
        slidesToShow: 1, 
        slidesToScroll: 1,
        autoplay: false,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 3500,
        responsive: [{
            breakpoint: 767,
            settings: {
                draggable: true,
                touchMove: true,
                autoplaySpeed: 1500,
            }
        }],
    });

    phoneSlider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        $(`[data-phone-button="${currentSlide +1}"]`).removeClass('active');
        $(`[data-phone-button="${nextSlide +1}"]`).addClass('active');
    });

    $('[data-phone-button]').on('mouseenter', (e) => {
        const relatedSlideId = $(e.target).data('phone-button');
        phoneSlider.slick('slickGoTo', relatedSlideId -1);
    });
}