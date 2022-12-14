import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useTitle from "../../CustomHook/useTitle";
import OrderRow from "./OrderRow";

const Orders = () => {
  useTitle('Orders');
  const { user, logOut } = useContext(AuthContext);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch(`https://genius-car-server-three-snowy.vercel.app/orders?email=${user?.email}`, {
      headers: {
        authorization : `Bearer ${localStorage.getItem('genius-Token')}`
      }
    })
      .then((res) =>{
        if(res.status === 401 || res.status === 403){
          logOut()
        }
        return res.json()
      })
      .then((data) =>{
        setOrder(data)
      });
  }, [user?.email, logOut]);

  const handleDelete = (id) =>{
    const proceed = window.confirm('Are You Sure, You Want to cancel this order?');
        if(proceed){
            fetch(`https://genius-car-server-three-snowy.vercel.app/orders/${id}`, {
                method: 'DELETE',
                headers: {
                  authorization : `Bearer ${localStorage.getItem('genius-Token')}`
                }
            })
            .then(res => res.json)
            .then(data =>{
                console.log(data);
                const remaining = order.filter(order => order._id !== id);
                setOrder(remaining);
                // if(data.deletedCound > 0){
                //     alert('Deleted Successfully');
                //     const remaining = order.filter(order => order._id !== id);
                //     setOrder(remaining);
                // }
            })
        }
    };

    const handleStatusUpdate = id =>{
        fetch(`https://genius-car-server-three-snowy.vercel.app/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type' : 'application/json',
                authorization : `Bearer ${localStorage.getItem('genius-Token')}`
            },
            body: JSON.stringify({status: 'Approved'})
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.modifiedCount > 0){
                const remaining = order.filter(order => order._id !== id);
                const approving = order.find(order => order._id === id);
                approving.status = 'Approved';
                
                const newOrders = [approving, ...remaining];
                setOrder(newOrders);
            }
        })
    };

  return (
    <div>
      <h2 className="text-5xl">You have {order.length} Orders</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
           {
            order.map(order => <OrderRow 
            key={order._id} 
            order={order}
            handleDelete={handleDelete}
            handleStatusUpdate={handleStatusUpdate}
            ></OrderRow>)
           }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
