"use client";

import { useState } from "react";
import Image from "next/image";

import { calculateCarRent, generateCarImageUrl } from "@/utils";
import { CarProps } from "@/types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive, displacement, cylinders, combination_mpg, highway_mpg, fuel_type, car_class } = car;

  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain' />
      </div>
      
      {/* Кнопка Show More - добавлена сразу после изображения */}
      <button 
        className="car-card__show-more-btn" 
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Скрыть детали" : "Показать детали"}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={showDetails ? "rotated" : ""}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      {/* Дополнительные детали, которые показываются по нажатию кнопки */}
      {showDetails && (
        <div className="car-card__additional-details">
          <div className="car-card__details-grid">
            <div className="car-card__detail-item">
              <span className="car-card__detail-label">Год</span>
              <span className="car-card__detail-value">{year}</span>
            </div>
            
            <div className="car-card__detail-item">
              <span className="car-card__detail-label">Класс</span>
              <span className="car-card__detail-value">{car_class || "N/A"}</span>
            </div>
            
            <div className="car-card__detail-item">
              <span className="car-card__detail-label">Тип топлива</span>
              <span className="car-card__detail-value">{fuel_type}</span>
            </div>
            
            <div className="car-card__detail-item">
              <span className="car-card__detail-label">Объем двигателя</span>
              <span className="car-card__detail-value">{displacement} л</span>
            </div>
            
            <div className="car-card__detail-item">
              <span className="car-card__detail-label">Цилиндры</span>
              <span className="car-card__detail-value">{cylinders}</span>
            </div>
            
            <div className="car-card__detail-item">
              <span className="car-card__detail-label">Загородный расход</span>
              <span className="car-card__detail-value">{highway_mpg} MPG</span>
            </div>
            
            <div className="car-card__detail-item">
              <span className="car-card__detail-label">Смешанный расход</span>
              <span className="car-card__detail-value">{combination_mpg} MPG</span>
            </div>
          </div>
        </div>
      )}

      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;