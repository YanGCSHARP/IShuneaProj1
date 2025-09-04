import { fetchCars } from "@/utils";
import { HomeProps } from "@/types";

import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  
  let allCars = [];
  let errorMessage = "";

  try {
    allCars = await fetchCars({
      manufacturer: params.manufacturer || "toyota", // Значение по умолчанию
      year: params.year || 2022,
      fuel: params.fuel || "",
      limit: params.limit || 10,
      model: params.model || "",
    });
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    errorMessage = "Failed to load cars from API. Using demo data instead.";
    // Используем mock данные в случае ошибки
    allCars = getMockCars({
      manufacturer: params.manufacturer || "toyota",
      year: params.year || 2022,
      fuel: params.fuel || "",
      limit: params.limit || 10,
      model: params.model || "",
    });
  }

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {errorMessage && (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Notice</h2>
            <p>{errorMessage}</p>
          </div>
        )}

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars.map((car, index) => (
                <CarCard key={`${car.make}-${car.model}-${index}`} car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(params.limit || 10) / 10}
              isNext={(params.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>No results</h2>
            <p>No cars found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}