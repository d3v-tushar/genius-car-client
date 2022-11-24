import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);
    const [isAsc, setIsAsc] = useState(true);
    const [search, setSearch] = useState('');
    const searchRef = useRef();

    const handleSearch = () =>{
        setSearch(searchRef.current.value);
    };

    useEffect(()=>{
        fetch(`https://genius-car-server-three-snowy.vercel.app/services?search=${search}&order=${isAsc ? 'asce' : 'disc'}`)
        .then(res => res.json())
        .then(data => setServices(data))
        .catch(error => console.error(error));
    }, [isAsc, search]);
    
    return (
        <div>
            <div className='text-center mb-4'>
                <p className='text-2xl font-bold text-orange-600'>Services</p>
                <h2 className="text-5xl font-semibold">Our Service Area</h2>
                <p>The Mejority Have Suffered Alteration in Some Form, By injected Humour, Or Randomised <br />Words Which Don't Look Even Slightly Believeable</p>
                <button onClick={() => setIsAsc(!isAsc)} className='btn btn-outline mt-4'>{isAsc ? "Ascending" : "Descending"}</button>
                
                <div className="form-control grid justify-center mt-4">
                <div className="input-group mx-auto">
                    <input ref={searchRef} type="text" placeholder="Search…" className="input input-bordered" />
                    <button onClick={handleSearch} className="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
                </div>
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