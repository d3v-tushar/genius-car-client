import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServices(data))
        .catch(error => console.error(error));
    }, [])
    return (
        <div>
            <div className='text-center mb-4'>
                <p className='text-2xl font-bold text-orange-600'>Services</p>
                <h2 className="text-5xl font-semibold">Our Service Area</h2>
                <p>The Mejority Have Suffered Alteration in Some Form, By injected Humour, Or Randomised <br />Words Which Don't Look Even Slightly Believeable</p>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;