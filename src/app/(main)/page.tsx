import Filter from "./components/filter";
import ListBooks from "./components/listBooks";
import Slider from "./components/slider";
import { ReduxProvider } from "@/src/redux/redux-provider";

export const metadata = {
  title: "Bookshop",
  description: "Широкий выбор книг по архитектуре. Купите онлайн с доставкой.",
  openGraph: {
    title: "Bookshop",
    description: "Широкий выбор книг по архитектуре. Купите онлайн с доставкой.",
    url: "http://localhost:3000",
    type: "website",
  },
  alternates: {
    canonical: "http://localhost:3000",
  },
};

async function fetchBooksArchitectur() {
  const url = `http://localhost:3000/api/googleBooks?subject=Architecture&startIndex=0`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.status}`);
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
}

export default async function BooksPage() {
  const data = await fetchBooksArchitectur();

  return (
    <ReduxProvider>
      <main>
        <section className='flex flex-col items-center relative'>
          <Slider />
        </section>
        <section className="mt-[134px] flex">
          <Filter />
          <ListBooks data={data} />
        </section>
      </main>
    </ReduxProvider>

  );
}