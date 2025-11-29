document.addEventListener('DOMContentLoaded', () => {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  const body = document.body;
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('site-navigation');
  const mobileCta = document.querySelector('.mobile-cta');
  const fadeTargets = document.querySelectorAll('.fade-up');
  const contactForms = document.querySelectorAll('[data-contact-form]');
  const portalLink = document.getElementById('portal-link');

  const parseJson = (value, fallback = {}) => {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://teresafostertherapy.com/#practice',
    'name': 'Teresa R. Foster, L.C.S.W.',
    'url': 'https://teresafostertherapy.com/',
    'image': 'https://teresafostertherapy.com/img/IMG_4086.jpeg',
    'email': 'tfosterlcsw@gmail.com',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '101 W. Kirkwood Avenue, Suite 222',
      'addressLocality': 'Bloomington',
      'addressRegion': 'IN',
      'postalCode': '47404',
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 39.166625,
      'longitude': -86.534531
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        'opens': '09:00',
        'closes': '17:00'
      }
    ],
    'areaServed': {
      '@type': 'State',
      'name': 'Indiana'
    },
    'sameAs': [
      'https://www.google.com/maps/place/Teresa+R.+Foster,+L.C.S.W./@39.166625,-86.534531,17z',
      'https://www.psychologytoday.com/us/therapists/teresa-r-foster-lcsw-bloomington-in/244796'
    ]
  };

  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.textContent = JSON.stringify(schemaData);
  document.head.appendChild(schemaScript);

  const ctaVariants = parseJson(body.dataset.ctaVariants, null);
  const analyticsId = document.documentElement.dataset.analyticsId || body.dataset.analyticsId;

  const initializeAnalytics = () => {
    if (!analyticsId || analyticsId === 'G-XXXXXXXXXX') {
      return;
    }

    if (!document.querySelector('script[data-gtag-loader]')) {
      const gtagScript = document.createElement('script');
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
      gtagScript.async = true;
      gtagScript.setAttribute('data-gtag-loader', 'remote');
      document.head.appendChild(gtagScript);
    }

    window.gtag('js', new Date());
    window.gtag('config', analyticsId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  };

  initializeAnalytics();

  const getCtaVariant = () => {
    if (!ctaVariants) return null;
    const keys = Object.keys(ctaVariants);
    if (!keys.length) return null;

    try {
      const stored = window.localStorage.getItem('tfoster_cta_variant');
      if (stored && keys.includes(stored)) {
        return stored;
      }
    } catch (error) {
      // Ignore storage errors
    }

    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    try {
      window.localStorage.setItem('tfoster_cta_variant', randomKey);
    } catch (error) {
      // Ignore storage errors
    }

    return randomKey;
  };

  const ctaVariantKey = getCtaVariant();
  const ctaVariantText = ctaVariantKey && ctaVariants ? ctaVariants[ctaVariantKey] : null;

  if (ctaVariantText) {
    document.querySelectorAll('[data-ab-test="book-cta"]').forEach((button) => {
      button.textContent = ctaVariantText;
      button.setAttribute('data-cta-variant', ctaVariantKey);
    });

    if (mobileCta) {
      mobileCta.textContent = ctaVariantText;
      mobileCta.setAttribute('data-cta-variant', ctaVariantKey);
    }
  }

  const trackEvent = (name, params = {}) => {
    if (window.gtag && analyticsId && analyticsId !== 'G-XXXXXXXXXX') {
      window.gtag('event', name, { ...params, page_location: window.location.href });
    }
  };

  if (ctaVariantKey) {
    trackEvent('cta_variant_impression', { variant: ctaVariantKey });
  }

  document.querySelectorAll('[data-track-event]').forEach((element) => {
    element.addEventListener('click', () => {
      const eventName = element.getAttribute('data-track-event');
      const variant = element.getAttribute('data-cta-variant');
      trackEvent(eventName, variant ? { variant } : undefined);
    });
  });

  if (navToggle && navList) {
    const closeNav = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navList.classList.remove('is-open');
    };

    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('is-open');
    });

    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          closeNav();
        }
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNav();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        closeNav();
      }
    });
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    fadeTargets.forEach((element) => {
      if (!element.classList.contains('is-visible')) {
        observer.observe(element);
      }
    });
  } else {
    fadeTargets.forEach((element) => element.classList.add('is-visible'));
  }

  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  const portalUrl = body.dataset.portalUrl;
  if (portalUrl && portalLink) {
    portalLink.setAttribute('href', portalUrl);
    portalLink.addEventListener('click', () => trackEvent('portal_visit'));

    if (window.location.pathname.endsWith('intake.html')) {
      window.setTimeout(() => {
        window.location.assign(portalUrl);
      }, 800);
    }
  }

  if (contactForms.length && body.dataset.contactEndpoint) {
    const endpoint = body.dataset.contactEndpoint;
    contactForms.forEach((form) => {
      form.setAttribute('action', endpoint);

      form.addEventListener('submit', (event) => {
        const formData = new FormData(form);
        const name = formData.get('Name') || '';
        const email = formData.get('Email') || '';
        trackEvent('contact_submit', { label: 'contact_form' });

        if (endpoint.startsWith('mailto:')) {
          event.preventDefault();
          const phone = formData.get('Phone') || '';
          const message = formData.get('Message') || '';
          const subject = encodeURIComponent('Consultation request from website');
          const bodyLines = [
            `Name: ${name}`,
            `Email: ${email}`,
            phone ? `Phone: ${phone}` : '',
            '',
            'Message:',
            message,
          ]
            .filter(Boolean)
            .join('\n');
          const mailtoUrl = `${endpoint}?subject=${subject}&body=${encodeURIComponent(bodyLines)}`;
          window.location.href = mailtoUrl;
        }
      });
    });
  }
});
