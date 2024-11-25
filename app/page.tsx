import { CustomFilter, Hero, SearchBar } from "@/components";
import Image from "next/image";
import { fetchCars } from "@/utils";
import CarCard from "@/components/CarCard";

export default async function Home() {

  const allCars = await fetchCars();

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  console.log(allCars)

  return (
    
      <main className="overflow-hidden">
       <Hero />
       <div 
        className="mt-12 padding-x padding-y max-width"
        id="discover">
          <div className="home__text">
          <h1 className="text-4xl font-extrabold">
            Car Catalogue
          </h1>
          <p>Explore the cars you might like</p>
          </div>
          <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
          <CustomFilter title='fuel'/>
          <CustomFilter title='year'/>
          </div>
          </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car}/>
                ))}

            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">
              Oops, no results
              <p>{allCars?.message}</p>
            </h2>
          </div>
        )}

       </div>
      </main>
  );
}
