import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);
    const [isAsc, setIsAsc] = useState(true);

    useEffect(()=>{
        fetch(`https://genius-car-server-three-snowy.vercel.app/services?order=${isAsc ? 'asce' : 'disc'}`)
        .then(res => res.json())
        .then(data => setServices(data))
        .catch(error => console.error(error));
    }, [isAsc]);
    
    return (
        <div>
            <div className='text-center mb-4'>
                <p className='text-2xl font-bold text-orange-600'>Services</p>
                <h2 className="text-5xl font-semibold">Our Service Area</h2>
                <p>The Mejority Have Suffered Alteration in Some Form, By injected Humour, Or Randomised <br />Words Which Don't Look Even Slightly Believeable</p>
                <button onClick={() => setIsAsc(!isAsc)} className='btn btn-outline mt-4'>{isAsc ? "Ascending" : "Descending"}</button>
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