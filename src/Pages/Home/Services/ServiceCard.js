import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const ServiceCard = ({service}) => {
    const {img, price, title, _id} = service;
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl my-4">
      <figure className="p-5">
        <img className="rounded-xl h-72" src={img} alt="Shoes" />
      </figure>
      <div className="card-body flex">
        <div>
        <h2 className="card-title">{title}</h2>
        <p className="text-2xl text-orange-600 font-semibold">Price: ${price}</p>
        </div>
        <div className="card-actions absulate top-5 justify-end">
         <Link to={`/checkout/${_id}`}><button><span className="text-xl text-orange-600"><FaArrowRight/></span></button></Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
