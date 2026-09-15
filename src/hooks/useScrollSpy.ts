import { useEffect, useRef } from 'react';
import { SECTION_ROUTES, getRouteByPath, getRouteById } from '../utils/navigation';

export function useScrollSpy(onAdminTrigger?: () => void) {
  const isUserScrollingRef = useRef(true);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. Clean up any trailing /# or raw hash on startup
    if (window.location.hash === '#' || window.location.hash === '#/') {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // 2. Initial Deep Linking: Check pathname on initial page load
    const currentPath = window.location.pathname;
    const initialRoute = getRouteByPath(currentPath);

    if (currentPath === '/admin' && onAdminTrigger) {
      onAdminTrigger();
    } else if (initialRoute && initialRoute.id !== 'hero') {
      // Delay slightly for initial layout rendering
      const timer = window.setTimeout(() => {
        const el = document.getElementById(initialRoute.id);
        if (el) {
          const yOffset = -70;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          document.title = initialRoute.title;
        }
      }, 350);
      return () => clearTimeout(timer);
    }

    // 3. Handle Browser Back / Forward (popstate)
    const handlePopState = () => {
      const route = getRouteByPath(window.location.pathname);
      if (route) {
        if (route.id === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(route.id);
          if (el) {
            const yOffset = -70;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
        document.title = route.title;
      }
    };

    window.addEventListener('popstate', handlePopState);

    // 4. ScrollSpy Observer to keep URL path cleanly synchronized with view
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Active when section occupies middle 20% of viewport
      threshold: 0
    };

    let activeSectionId = 'hero';

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const route = getRouteById(id);
          if (route && activeSectionId !== id) {
            activeSectionId = id;
            if (window.location.pathname !== route.path && isUserScrollingRef.current) {
              window.history.replaceState({ sectionId: id }, route.title, route.path);
              document.title = route.title;
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all mapped sections
    SECTION_ROUTES.forEach((route) => {
      if (route.id !== 'hero') {
        const el = document.getElementById(route.id);
        if (el) observer.observe(el);
      }
    });

    // Check top of page for root path
    const handleScrollTopCheck = () => {
      if (window.scrollY < 120 && activeSectionId !== 'hero') {
        activeSectionId = 'hero';
        const heroRoute = SECTION_ROUTES[0];
        if (window.location.pathname !== heroRoute.path) {
          window.history.replaceState({ sectionId: 'hero' }, heroRoute.title, heroRoute.path);
          document.title = heroRoute.title;
        }
      }
    };

    window.addEventListener('scroll', handleScrollTopCheck, { passive: true });

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('scroll', handleScrollTopCheck);
      observer.disconnect();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [onAdminTrigger]);
}
