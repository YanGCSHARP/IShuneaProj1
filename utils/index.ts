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
  // Используем сервис Imagin Studio
  const url = new URL("https://cdn.imagin.studio/getimage");
  
  const customerKey = process.env.NEXT_PUBLIC_IMAGIN_API_KEY || "hrjavascript-mastery";
  
  url.searchParams.append('customer', customerKey);
  url.searchParams.append('make', car.make);
  url.searchParams.append('modelFamily', car.model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${car.year}`);
  
  if (angle) {
    url.searchParams.append('angle', angle);
  }

  return `${url}`;
};
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

// Альтернативная функция с mock данными


export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  // Альтернативный API - NHTSA Vehicle API
  try {
    // Базовый URL для NHTSA API
    let url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${manufacturer}?format=json`;
    
    console.log("Fetching from NHTSA API URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Response:", result);
    
    // Преобразуем данные NHTSA в наш формат
    return transformNhtsaData(result.Results, filters);
  } catch (error) {
    console.error("Error fetching cars from API:", error);
    
    // В случае ошибки пробуем другой API
    return tryAlternativeApi(filters);
  }
}

// Функция для преобразования данных NHTSA в наш формат
function transformNhtsaData(nhtsaData: any[], filters: FilterProps): CarProps[] {
  return nhtsaData.slice(0, filters.limit || 10).map((vehicle, index) => ({
    city_mpg: Math.floor(Math.random() * 30) + 10, // Генерируем случайные значения
    class: "N/A",
    combination_mpg: Math.floor(Math.random() * 30) + 10,
    cylinders: Math.floor(Math.random() * 8) + 4,
    displacement: Math.floor(Math.random() * 5) + 1,
    drive: "FWD",
    fuel_type: filters.fuel || "gas",
    highway_mpg: Math.floor(Math.random() * 40) + 20,
    make: vehicle.Make_Name,
    model: vehicle.Model_Name,
    transmission: "a",
    year: filters.year || 2022,
    image_url: `/car-images/${vehicle.Make_Name.toLowerCase()}-${vehicle.Model_Name.toLowerCase()}.jpg`
  }));
}

// Функция для попытки использования альтернативного API
async function tryAlternativeApi(filters: FilterProps): Promise<CarProps[]> {
  try {
    // Попробуем использовать другой API, например, Automotive API от RapidAPI
    const rapidApiResponse = await fetch(
      `https://automotive-api.p.rapidapi.com/models?make=${filters.manufacturer}&year=${filters.year}`,
      {
        headers: {
          'X-RapidAPI-Key': '965b240e7emshe3267eeefc24adfp12eaa9jsn5a82ba6bc859',
          'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
        }
      }
    );

    if (rapidApiResponse.ok) {
      const result = await rapidApiResponse.json();
      return transformAutomotiveApiData(result, filters);
    }
    
    throw new Error("All APIs failed");
  } catch (error) {
    console.error("All API attempts failed:", error);
    throw new Error("Unable to fetch car data from any API");
  }
}

// Функция с mock данными для использования при ошибках API

