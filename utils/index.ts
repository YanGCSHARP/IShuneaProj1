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
  // Используем сервис Imagin Studio с данными из NHTSA API
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
}
// Создаем отдельную функцию для клиентского использования
// Функция для обновления параметров поиска на клиентской стороне
export const updateSearchParamsClient = (params: Record<string, string | number>) => {
  if (typeof window === 'undefined') return '';

  const searchParams = new URLSearchParams(window.location.search);
  
  // Обновляем все переданные параметры
  Object.entries(params).forEach(([key, value]) => {
    if (value && value.toString().trim() !== '') {
      searchParams.set(key, value.toString());
    } else {
      searchParams.delete(key);
    }
  });

  return `${window.location.pathname}?${searchParams.toString()}`;
};

// Функция для удаления параметров поиска
export const deleteSearchParams = (type: string) => {
  if (typeof window === 'undefined') return '';

  const newSearchParams = new URLSearchParams(window.location.search);
  newSearchParams.delete(type.toLocaleLowerCase());

  return `${window.location.pathname}?${newSearchParams.toString()}`;
};

// И серверную версию для использования в getServerSideProps
export const updateSearchParams = (currentParams: string, type: string, value: string) => {
  const searchParams = new URLSearchParams(currentParams);
  searchParams.set(type, value);
  return searchParams.toString();
};





// Альтернативная функция с mock данными


export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  try {
    // Если указан производитель, используем NHTSA API
    if (manufacturer) {
      const nhtsaUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${manufacturer}?format=json`;
      console.log("Fetching from NHTSA API URL:", nhtsaUrl);

      const response = await fetch(nhtsaUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Преобразуем данные NHTSA в наш формат
      return transformNhtsaData(result.Results || [], filters);
    }

    // Если производитель не указан, возвращаем пустой массив
    return [];
  } catch (error) {
    console.error("Error fetching cars from NHTSA API:", error);
    // В случае ошибки возвращаем mock данные
    return getMockCars(filters);
  }
}

// Функция для преобразования данных NHTSA в наш формат
function transformNhtsaData(nhtsaData: any[], filters: FilterProps): CarProps[] {
  const { year, model, fuel, limit } = filters;
  
  return nhtsaData
    .filter(vehicle => {
      // Фильтрация по модели
      if (model && !vehicle.Model_Name.toLowerCase().includes(model.toLowerCase())) {
        return false;
      }
      return true;
    })
    .slice(0, limit || 10)
    .map((vehicle, index) => ({
      city_mpg: Math.floor(Math.random() * 30) + 10,
      class: "N/A",
      combination_mpg: Math.floor(Math.random() * 30) + 10,
      cylinders: Math.floor(Math.random() * 8) + 4,
      displacement: Math.floor(Math.random() * 5) + 1,
      drive: ["fwd", "rwd", "awd"][Math.floor(Math.random() * 3)],
      fuel_type: fuel || ["gas", "electricity", "diesel"][Math.floor(Math.random() * 3)],
      highway_mpg: Math.floor(Math.random() * 40) + 20,
      make: vehicle.Make_Name,
      model: vehicle.Model_Name,
      transmission: "a",
      year: year || 2022, // Используем год из фильтров
    }));
}

// Функция с mock данными для использования при ошибках API
function getMockCars(filters: FilterProps): CarProps[] {
  const { manufacturer, year, model, limit, fuel } = filters;
  
  const mockCars = [
    {
      city_mpg: 23,
      class: "compact car",
      combination_mpg: 24,
      cylinders: 4,
      displacement: 1.6,
      drive: "fwd",
      fuel_type: "gas",
      highway_mpg: 26,
      make: "toyota",
      model: "corolla",
      transmission: "a",
      year: 2022
    },
    {
      city_mpg: 21,
      class: "compact car",
      combination_mpg: 24,
      cylinders: 4,
      displacement: 2.0,
      drive: "fwd",
      fuel_type: "gas",
      highway_mpg: 29,
      make: "honda",
      model: "civic",
      transmission: "a",
      year: 2022
    },
    {
      city_mpg: 19,
      class: "SUV",
      combination_mpg: 22,
      cylinders: 4,
      displacement: 2.5,
      drive: "awd",
      fuel_type: "gas",
      highway_mpg: 26,
      make: "mazda",
      model: "cx-5",
      transmission: "a",
      year: 2022
    }
  ];

  return mockCars.filter(car => {
    if (manufacturer && car.make.toLowerCase() !== manufacturer.toLowerCase()) return false;
    if (year && car.year !== year) return false;
    if (model && !car.model.toLowerCase().includes(model.toLowerCase())) return false;
    if (fuel && car.fuel_type.toLowerCase() !== fuel.toLowerCase()) return false;
    return true;
  }).slice(0, limit || 10);
}