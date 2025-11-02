// Effet typing tagline
const tagline = "L'agence UGC qui capture l'authenticité des marques à travers des créateurs uniques.";
const taglineEl = document.getElementById('tagline');
let i = 0;
function typeWriter() {
    if (i < tagline.length) {
        taglineEl.textContent += tagline.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}
setTimeout(typeWriter, 1000);

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
document.querySelectorAll('.about-content, .service-card, .video-card, .pricing-card').forEach(el => observer.observe(el));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// === LECTURE DES VIDÉOS LOCALES (sans popup) ===
const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(card => {
    const video = card.querySelector('video');
    const playIcon = card.querySelector('.play-icon');

    // Fonction pour basculer lecture/pause
    function toggleVideo(e) {
        e.stopPropagation();
        
        if (!video.paused) {
            video.pause();
            playIcon.style.display = 'flex';
        } else {
            // Mettre toutes les autres vidéos en pause
            document.querySelectorAll('.video-card video').forEach(v => {
                if (v !== video) {
                    v.pause();
                    v.parentElement.querySelector('.play-icon').style.display = 'flex';
                }
            });
            video.play();
            playIcon.style.display = 'none';
        }
    }

    // Événements sur le bouton play et la vidéo
    playIcon.addEventListener('click', toggleVideo);
    video.addEventListener('click', toggleVideo);

    // Quand la vidéo est terminée
    video.addEventListener('ended', () => {
        playIcon.style.display = 'flex';
    });
});

// === POPUP EMAIL ===
let emailSubmitted = false;

const emailPopup = document.getElementById('emailPopup');
const popupOverlay = document.getElementById('popupOverlay');
const closePopup = document.getElementById('closePopup');
const emailForm = document.getElementById('emailForm');

// Afficher la popup après 7 secondes
setTimeout(() => {
    if (!emailSubmitted) {
        emailPopup.classList.add('active');
        popupOverlay.classList.add('active');
    }
}, 7000);

// Fermer la popup email
function closeEmailPopup() {
    emailPopup.classList.remove('active');
    popupOverlay.classList.remove('active');
}

closePopup.addEventListener('click', closeEmailPopup);

// Le formulaire se soumet automatiquement via FormSubmit
// Marquer comme soumis avant l'envoi pour éviter que la popup ne réapparaisse
emailForm.addEventListener('submit', () => {
    emailSubmitted = true;
});

// === ANIMATIONS DES CARTES ===
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.video-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.pricing-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// === FAQ TOGGLE ===
const faqToggle = document.getElementById('faqToggle');
const faqContent = document.getElementById('faqContent');

faqToggle.addEventListener('click', () => {
    faqToggle.classList.toggle('active');
    faqContent.classList.toggle('active');
});

// === MODAL PACK ===
const packModal = document.getElementById('packModal');
const closePackModal = document.getElementById('closePackModal');
const packCTAs = document.querySelectorAll('.pack-cta');
const packHidden = document.getElementById('packHidden');
const selectedPackName = document.getElementById('selectedPackName');
const packMessage = document.getElementById('packMessage');

// Ouvrir le modal au clic sur un CTA
packCTAs.forEach(cta => {
    cta.addEventListener('click', () => {
        const packName = cta.dataset.pack;
        
        packModal.classList.add('active');
        popupOverlay.classList.add('active');
        
        selectedPackName.textContent = packName;
        packHidden.value = packName;
        packMessage.value = `Bonjour,\n\nJe souhaite en savoir plus sur le ${packName}.\n\nMerci de me recontacter pour discuter des détails.\n\nCordialement,`;
        
        setTimeout(() => {
            packModal.querySelector('input[name="Nom"]').focus();
        }, 100);
    });
});

// Fermer le modal pack
function closePackModalFunc() {
    packModal.classList.remove('active');
    popupOverlay.classList.remove('active');
}

closePackModal.addEventListener('click', closePackModalFunc);

// Fermer au clic sur l'overlay
popupOverlay.addEventListener('click', () => {
    if (packModal.classList.contains('active')) {
        closePackModalFunc();
    } else if (emailPopup.classList.contains('active')) {
        closeEmailPopup();
    }
});

// Support clavier (Échap pour fermer)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (packModal.classList.contains('active')) {
            closePackModalFunc();
        }
        if (emailPopup.classList.contains('active')) {
            closeEmailPopup();
        }
    }
});