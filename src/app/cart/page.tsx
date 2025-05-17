import { ReduxProvider } from "@/src/redux/redux-provider";
import Cart from "./components/cart";


export const metadata = {
  title: "Сart",
  description: "Корзина",
  openGraph: {
    title: "Сart",
    description: "Корзина",
    url: "http://localhost:3000/cart",
    type: "website",
  },
  alternates: {
    canonical: "http://localhost:3000/cart",
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