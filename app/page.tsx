import { fetchCars } from "@/utils";
import { HomeProps } from "@/types";

import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  
  // Преобразуем параметры в правильные типы
  const yearParam = params.year ? parseInt(params.year as unknown as string) : 2022;
  const limitParam = params.limit ? parseInt(params.limit as unknown as string) : 10;
  
  const allCars = await fetchCars({
    manufacturer: params.manufacturer || "",
    year: yearParam,
    fuel: params.fuel || "",
    limit: limitParam,
    model: params.model || "",
  });

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

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars.map((car, index) => (
                <CarCard key={`${car.make}-${car.model}-${index}`} car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(limitParam || 10) / 10}
              isNext={(limitParam || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message || "No cars found. Try adjusting your search criteria."}</p>
          </div>
        )}
      </div>
    </main>
  );
}