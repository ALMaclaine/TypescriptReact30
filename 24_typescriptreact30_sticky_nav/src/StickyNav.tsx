import React, {useRef, useEffect, MutableRefObject} from 'react';
import Header from "./Header";
import Nav from "./Nav";
import SiteWrap from "./SiteWrap";

function StickyNav() {
    const navRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

    useEffect((): void | (() => void) => {
        if (navRef.current === null) return;
        const offsetTop = navRef.current.offsetTop;

        function fixNav(): void {
            if (navRef.current === null) return;
            if (window.scrollY >= offsetTop) {
                document.body.style.paddingTop = `${navRef.current.offsetHeight}px`;
                document.body.classList.add('fixed-nav');
            } else {
                document.body.classList.remove('fixed-nav');
                document.body.style.paddingTop = '0';
            }
        }

        window.addEventListener('scroll', fixNav);

        return () => {
            window.removeEventListener('scroll', fixNav);
        }
    })

    return <>
        <Header/>
        <Nav ref={navRef}/>
        <SiteWrap/>
    </>;
}

export default StickyNav;
