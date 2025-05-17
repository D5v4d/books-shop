import { ReduxProvider } from "@/src/redux/redux-provider";
import ProfileData from "./components/profile";

export const metadata = {
  title: "Profile",
  description: "Личный кабинет.",
  openGraph: {
    title: "Profile",
    description: "Личный кабинет.",
    url: "http://localhost:3000/profile",
    type: "website",
  },
  alternates: {
    canonical: "http://localhost:3000/profile",
  },
};

export default async function Profile() {
    return (
        <ReduxProvider>
            <main className='w-[1120px] mx-auto'>
                <ProfileData></ProfileData>
            </main>
        </ReduxProvider>
    );
}