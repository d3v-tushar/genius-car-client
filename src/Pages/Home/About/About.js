import React from 'react';
import person from '../../../assets/images/about_us/person.jpg';
import parts from '../../../assets/images/about_us/parts.jpg';

const About = () => {
    return (
        <div className="hero my-20">
        <div className="hero-content flex-col lg:flex-row">
            <div className='relative w-1/2'>
            <img src={person} className="w-4/5 rounded-lg shadow-2xl" alt='about' />
            <img src={parts} className="absolute right-5 top-1/2 w-3/5 border-8 rounded-lg shadow-2xl" alt='about' />
            </div>
            <div className='w-1/2'>
                <p className='text-2xl font-bold text-orange-600 '>About Us</p>
            <h1 className="my-5 text-5xl font-bold">We are qualified <br /> & of experience <br />in this field</h1>
            <p className="py-6">There Are Many Variation Of Passages Of Lorem Ipsum Available, But The Mejority Have Suffered Alteration in Some Form, By injected Humour, Or Randomised Words Which Don't Look Even Slightly Believeable</p>
            <p className='py-6'>The Mejority Have Suffered Alteration in Some Form, By injected Humour, Or Randomised Words Which Don't Look Even Slightly Believeable</p>
            <button className="btn btn-primary bg-orange-600">Get More Info</button>
            </div>
        </div>
        </div>
    );
};

export default About;