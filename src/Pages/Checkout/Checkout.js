import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useTitle from '../../CustomHook/useTitle';

const Checkout = () => {
    useTitle('Checkout');
    const { _id, title, price} = useLoaderData();
    const {user} = useContext(AuthContext);

    const handlePlaceOrder = event =>{
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        };

        // if(phone.length > 10){
        //     alert('Phone Number Should be 10 Number or Longer')
        // }
        // else{

        // }

        fetch('https://genius-car-server-three-snowy.vercel.app/orders', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization : `Bearer ${localStorage.getItem('genius-Token')}`
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.acknowledged){
                alert('Order Placed Successfully');
                form.reset();
            }
        })
            
        .catch(error => console.log(error));
    }
    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className='text-4xl'>{title}</h2>
                <h4 className='text-3xl'>{price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <input name='firstName' required type="text" placeholder='First Name' className='input input-ghost w-full input-bordered' />
                <input name='lastName' required type="text" placeholder='Last Name' className='input input-ghost w-full input-bordered' />
                <input name='phone' required type="text" placeholder='Your Phone' className='input input-ghost w-full input-bordered' />
                <input name='email' type="text" placeholder='Your Email' defaultValue={user?.email} className='input input-ghost w-full input-bordered' readOnly/>
                </div>
                <textarea name='message' className='textarea textarea-bordered h-24 w-full' placeholder='Your Message'></textarea>
                <input className='btn' type="submit" value='Place Your Order'></input>
            </form>
        </div>
    );
};

export default Checkout;