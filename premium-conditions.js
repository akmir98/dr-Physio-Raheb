window.addEventListener('scroll', () => {
    document.querySelector('.header').classList.toggle('scrolled', window.scrollY > 100);
});
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.fa-bars');
    const nav = document.querySelector('.header nav');
    if (menuBtn && nav) menuBtn.addEventListener('click', () => nav.classList.toggle('mobile-active'));

    const revealTargets = document.querySelectorAll('.hp-fade, .hp-step');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('hp-visible'); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.15 });
    revealTargets.forEach(el => observer.observe(el));

    const YOUTUBE_ID = "HDsCri1-oHE"; // general clinic overview video — same across all condition pages
    const modal = document.getElementById('hpVideoModal');
    const iframe = document.getElementById('hpVideoIframe');
    const openVideo = () => { iframe.src = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1`; modal.classList.add('hp-open'); };
    const closeVideo = () => { modal.classList.remove('hp-open'); iframe.src = ""; };
    document.getElementById('hpVideoTrigger').addEventListener('click', openVideo);
    document.getElementById('hpWatchBtn').addEventListener('click', openVideo);
    document.getElementById('hpModalClose').addEventListener('click', closeVideo);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeVideo(); });
});

// FAQ accordion
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hp-faq-item').forEach(item => {
        const q = item.querySelector('.hp-faq-q');
        const a = item.querySelector('.hp-faq-a');
        q.addEventListener('click', () => {
            const isOpen = item.classList.contains('hp-faq-open');
            document.querySelectorAll('.hp-faq-item').forEach(i => {
                i.classList.remove('hp-faq-open');
                i.querySelector('.hp-faq-a').style.maxHeight = null;
            });
            if (!isOpen) {
                item.classList.add('hp-faq-open');
                a.style.maxHeight = a.scrollHeight + 'px';
            }
        });
    });
});
