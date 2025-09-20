import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Loader = () => {

    const loaderRef = useRef();
    const circleRef = useRef();
    const textRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });

        tl.to(circleRef.current, {
            scale: 1.2,
            duration: 0.8,
            ease: 'power2.inOut',
        });

        gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
        );
    }, []);

    return (
        <div
            ref={loaderRef}
            className="h-screen w-screen flex flex-col items-center justify-center bg-white text-black"
        >
            <div
                ref={circleRef}
                className="w-20 h-20 rounded-full bg-indigo-600 mb-6"
            ></div>
            <div ref={textRef} className="text-xl font-semibold tracking-wide">
                Loading, please wait...
            </div>
        </div>
    );
};

export default Loader;