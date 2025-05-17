'use client';
import { useState } from 'react'
import Image from 'next/image';
import LoginForm from "./Login";
import { ReduxProvider } from '../redux/redux-provider';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { upActiveLogin } from '../redux/slice/authorizationSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [active, setActive] = useState('BOOKS');
  const authorizationActive = useSelector((state: RootState) => (state.authorization));
  const navItems = ['BOOKS', 'AUDIOBOOKS', 'STATIONERY & GIFTS', 'BLOG'];

  const basketState = useSelector((state: RootState) => (state.basket));
  const basketBooks = basketState.basket.find((item) => (item.tokenProfile === basketState.tokenActive))

  const authorization = () => {
    if (authorizationActive.tokenProfile !== "") {
      router.push('/profile')
      return
    }
    dispatch(upActiveLogin());
  }

  return (
    <header className='w-[1120px] h-[116px]  mx-auto flex justify-between items-center'>
      <Link href="/"><h1 className='font-bold text-2xl color'>Bookshop</h1></Link>
      <nav>
        <ul className="flex gap-10 text-[10px] font-bold w-[375px]">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => setActive(item)}
                className={`cursor-pointer ${active === item
                  ? 'text-black font-black'
                  : 'text-[#5C6A79]'
                  }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className='flex justify-between w-[120]'>
        <ReduxProvider>
          <Image
            src="/svg/user.svg"
            alt="User фото"
            width={12}
            height={17}
            className='cursor-pointer'
            onClick={authorization}
          />
          {authorizationActive.active ? <LoginForm /> : ""}
          <div onClick={() => (router.push('/cart'))} className='cursor-pointer'>
            <Image
              src="/svg/shop-bag.svg"
              alt="Cart"
              width={13}
              height={17}
            />
            <div className='w-[13px] h-[13px] bg-[#FF353A] rounded-full text-[10px] text-white flex items-center justify-center absolute mt-[-9px] ml-[4px] pt-[1px]'>{basketBooks?.books.length}</div>
          </div>
        </ReduxProvider>
      </div>
    </header>
  )
}

export default Header