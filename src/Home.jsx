// eslint-disable-next-line
import React, { useState, useRef, useEffect } from "react";
import leftArrow from "./assets/arrow-left.svg";
import rightArrow from "./assets/arrow-right.svg";
import { gsap, Power3 } from "gsap";


const testimonials = [
    {
        name: "Julia Cameron",
        title: "Creative Director, VISA",
        image: `${require("./assets/image3.jpg")}`,
        quote:
            "It's all good. I was amazed at the quality of the Design. We've seen amazing results already."
    },
    {
        name: "Mark Jacobs",
        title: "Tech Lead, Google",
        image: `${require("./assets/image.jpg")}`,
        quote:
            "The rebranding has really helped our business. Definitely worth the investment."
    },
    {
        name: "Lisa Bearings",
        title: "Brand Coordinator, Facebook",
        image: `${require("./assets/image2.jpg")}`,
        quote:
            "The service was excellent. Absolutely wonderful! A complete redesign did it for us."
    }
];



function Home() {
    const imageWidth = 460;
    let imageList = useRef(null);
    let testimonialList = useRef(null);
    let effect = useRef(true);
    const [state, setState] = useState({
        isActive1: true,
        isActive2: false,
        isActive3: false
    });
    const [move, setMove] = useState(false);

    //Image transition
    const slideUp = (index, duration, multiplied = 1) => {
        gsap.to(imageList.children[index], duration, {
            y: -imageWidth * multiplied,
        });
    };
    //Image transition
    const slideDown = (index, duration, multiplied = 1) => {
        gsap.to(imageList.children[index], duration, {
            y: imageWidth * multiplied,
        });
    };

    const scale = (index, duration) => {
        gsap.from(imageList.children[index], duration, {
            scale: 1.2,
            ease: Power3.easeOut
        });
    };

    const fadeIn = (index, duration) => {
        gsap.to(testimonialList.children[index], duration, {
            opacity: 1,
            delay: 1,
        });
    }

    const fadeOut = (index, duration) => {
        gsap.to(testimonialList.children[index], duration, {
            opacity: 0
        });
    }



    const prevSlide = () => {
        if (move !== true) return;
        setMove(false);
        if (imageList.children[0].classList.contains("active")) {
            setState({ isActive1: false, isActive3: true });
            //Image transition
            slideUp(2, 0, 3);
            slideUp(2, 1, 2);
            scale(2, 1);
            slideDown(0, 1);
            slideDown(1, 1);
            //content transtion
            fadeOut(0, 1);
            fadeIn(2, 1);
        } else if (imageList.children[1].classList.contains("active")) {
            setState({ isActive2: false, isActive1: true });
            //Image transition
            slideUp(0, 0);
            slideDown(0, 1, 0);
            slideDown(1, 1, 0);
            slideDown(2, 1, 2);
            scale(0, 1);
            //content transtion
            fadeOut(1, 1);
            fadeIn(0, 1);
        } else if (imageList.children[2].classList.contains("active")) {
            setState({ isActive2: true, isActive3: false });
            slideUp(2, 1);
            slideUp(1, 0, 2);
            slideUp(1, 1);
            scale(1, 1);
            //content transtion
            fadeOut(2, 1);
            fadeIn(1, 1);
        }
        setTimeout(() => {
            setMove(true);
        }
            , 1000);
    };

    const nextSlide = () => {
        if (move !== true) return;
        setMove(false);
        if (imageList.children[0].classList.contains("active")) {
            setState({ isActive1: false, isActive2: true });
            //Image transition
            slideUp(0, 1);
            slideUp(1, 1);
            scale(1, 1);
            slideUp(2, 1);
            slideUp(2, 0);
            fadeOut(0, 1);
            fadeIn(1, 1);
        } else if (imageList.children[1].classList.contains("active")) {
            setState({ isActive2: false, isActive3: true });
            //Image transition
            slideDown(0, 1);
            slideUp(1, 1, 2);
            slideUp(2, 1, 2);
            scale(2, 1);
            //content transition
            fadeOut(1, 1);
            fadeIn(2, 1);
        } else if (imageList.children[2].classList.contains("active")) {
            setState({ isActive1: true, isActive3: false });
            //Image transition
            slideUp(2, 1, 3);
            slideUp(0, 1, 0);
            slideUp(1, 0, 0);
            scale(0, 1);
            //content transition
            fadeOut(2, 1);
            fadeIn(0, 1);
        }
        setTimeout(() => {
            setMove(true);
        }
            , 1000);
    };
    useEffect(() => {
        if (effect.current) {
            effect.current = false;
            gsap.from(testimonialList.children[0], {
                duration: 1,
                y: -900,
                ease: Power3.easeOut,
                stagger: {
                    amount: 0.5
                }
            });
            gsap.to(testimonialList.children[0], 3, {
                opacity: 1,
                Power3: {
                    ease: "power3.out"
                }
            });
            gsap.from(imageList.children[0], {
                duration: 1,
                y: 900,
                ease: Power3.easeOut,
                stagger: {
                    amount: 0.5
                }
            });
            gsap.to(imageList.children[0], 3, {
                opacity: 1,
                Power3: {
                    ease: "power3.out"
                }
            });
            setMove(true);
        }
    }, []);
    return (
        <section className="testimonial-section h-[100vh] flex justify-center items-center w-full md:p-4 mx-auto">
            <div className="testimonial__container w-full max-w-7xl h-[600px] relative">
                {/* Left arrow */}
                <div
                    onClick={prevSlide}
                    className="arrows-left absolute hover:shadow-md flex items-center justify-center px-2 bottom-0 top-0 cursor-pointer rounded-md transition-all duration-300 ease-in-out">
                    <span>
                        <img src={leftArrow} alt="left arrow" />
                    </span>
                </div>
                {/* Right arrow */}
                <div
                    onClick={nextSlide}
                    className="arrows-right absolute hover:shadow-md flex items-center justify-center px-2 bottom-0 top-0 right-0 cursor-pointer rounded-md transition-all duration-300 ease-in-out">
                    <span>
                        <img src={rightArrow} alt="right arrow" />
                    </span>
                </div>

                {/* Testimonials */}
                <div className="inner flex flex-col md:flex-row justify-center items-center h-screen md:h-[600px]">
                    {/* Images */}
                    <div className="t-image md:w-[500px] md:h-[600px] flex justify-center items-center">
                        <ul
                            ref={el => (imageList = el)}
                            className="absolute h-[300px] md:h-[460px] w-[250px] md:w-[340px] overflow-hidden" id="ul">
                            <li className={state.isActive1 ? "active" : ""}>
                                <img src={testimonials[0].image} alt={testimonials[0].name} />
                            </li>
                            <li className={state.isActive2 ? "active" : ""}>
                                <img src={testimonials[1].image} alt={testimonials[1].name} />
                            </li>
                            <li className={state.isActive3 ? "active" : ""}>
                                <img src={testimonials[2].image} alt={testimonials[2].name} />
                            </li>
                        </ul>
                    </div>

                    {/* Content */}
                    <div className="t-content w-[500px] h-[600px] flex items-center justify-center">
                        <ul
                            ref={el => (testimonialList = el)}
                            className="absolute overflow-hidden w-[500px] h-[400px] flex items-center justify-center" id="content-ul">
                            <li className={state.isActive1 ? "active" : ""}>
                                <div className="t-content__inner">
                                    <p className="quote">{testimonials[0].quote}</p>
                                    <h3 className="name">{testimonials[0].name}</h3>
                                    <p className="title">{testimonials[0].title}</p>
                                </div>
                            </li>
                            <li className={state.isActive2 ? "active" : ""}>
                                <div className="t-content__inner">
                                    <p className="quote">{testimonials[1].quote}</p>
                                    <h3 className="name">{testimonials[1].name}</h3>
                                    <p className="title">{testimonials[1].title}</p>
                                </div>
                            </li>
                            <li className={state.isActive3 ? "active" : ""}>
                                <div className="t-content__inner">
                                    <p className="quote">{testimonials[2].quote}</p>
                                    <h3 className="name">{testimonials[2].name}</h3>
                                    <p className="title">{testimonials[2].title}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </section>
    );





}

export default Home;
