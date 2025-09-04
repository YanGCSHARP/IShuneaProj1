import { CarProps, FilterProps } from "../types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};


export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
} 

// Создаем отдельную функцию для клиентского использования
export const updateSearchParamsClient = (type: string, value: string) => {
  if (typeof window === 'undefined') return '';

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  return `${window.location.pathname}?${searchParams.toString()}`;
};

// И серверную версию для использования в getServerSideProps
export const updateSearchParams = (currentParams: string, type: string, value: string) => {
  const searchParams = new URLSearchParams(currentParams);
  searchParams.set(type, value);
  return searchParams.toString();
};



export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  // Правильные заголовки для Cars API
  const headers = {
    'x-rapidapi-key': '9ed9dae2a5msh0261f153bd3aa77p11b587jsncb81ac8152a2',
		'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
  };

  try {
    // Создаем URL с параметрами
    const url = new URL('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars');
    
    // Добавляем параметры только если они есть
    if (manufacturer) url.searchParams.append('make', manufacturer);
    if (year) url.searchParams.append('year', year.toString());
    if (model) url.searchParams.append('model', model);
    if (limit) url.searchParams.append('limit', limit.toString());
    if (fuel) url.searchParams.append('fuel_type', fuel);

    console.log("API URL:", url.toString());

    const response = await fetch(url.toString(), { headers });

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      // Для отладки посмотрим текст ответа
      const errorText = await response.text();
      console.error("Error response:", errorText);
      return [];
    }

    const result = await response.json();
    console.log("API Response:", result);
    return result;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}