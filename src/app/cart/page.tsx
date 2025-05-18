import { ReduxProvider } from "@/src/redux/redux-provider";
import Cart from "./components/cart";


export const metadata = {
  title: "Сart",
  description: "Корзина",
  openGraph: {
    title: "Сart",
    description: "Корзина",
    url: "https://books-shop-henna.vercel.app/cart",
    type: "website",
  },
  alternates: {
    canonical: "https://books-shop-henna.vercel.app/cart",
  },
};


export default async function ShoppingCart() {
    return (
        <ReduxProvider>
            <main className='w-[1120px] mx-auto'>
                <section className='font-bold'>
                    <Cart />
                </section>
            </main>
        </ReduxProvider>
    );
}