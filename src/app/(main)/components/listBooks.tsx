'use client';
import { entitiesBooks, ListBooksProps } from '@/src/types/listBooks';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux/store';
import { fetchBooks, upData } from '@/src/redux/slice/listBooksSlice';
import "@/styles/button.css";
import Button from '@/src/components/button';
import { addToBasket, deleteBook } from '@/src/redux/slice/basketSlice';

const ListBooks = ({ data }: ListBooksProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [maxResult, setmaxResult] = useState(6);
  const booksState = useSelector((state: RootState) => state.booksReducer);

  const bas = useSelector((state: RootState) => (state.basket));
  const books = bas.basket.find((item) => (item.tokenProfile === bas.tokenActive))

  useEffect(() => {
    if (!booksState.ids.length && data) {
      dispatch(upData(data));
    }
  }, [data, dispatch, booksState.ids.length]);

  const addBooks = () => {
    const newResult = maxResult + 6;
    setmaxResult(newResult);
    dispatch(fetchBooks({ categoria: booksState.filter, startIndex: maxResult }));
  };

  const renderStars = (ratings: number) => {
    const totalStars = 5;

    return (
      <div className="flex">
        {[...Array(totalStars)].map((_, i) => (
          <Image
            key={i}
            src={i < Math.floor(ratings) ? "/img/star-goold.png" : "/img/star-white.png"}
            alt={i < Math.floor(ratings) ? "gold star" : "white star"}
            width={12}
            height={12}
          />
        ))}
      </div>
    );
  };

  const buyBook = (item: entitiesBooks) => {
    const bookForBasket = {
      id: item.id,
      title: item.volumeInfo?.title || '',
      author: item.volumeInfo?.authors?.join(', ') || 'Unknown Author',
      price: item.saleInfo?.listPrice?.amount || 0,
      cover: item.volumeInfo?.imageLinks?.smallThumbnail || '/img/books.png',
      currency: item.saleInfo?.listPrice?.currencyCode || 'USD',
      averageRating: item.volumeInfo?.averageRating || 0,
      ratingsCount: item.volumeInfo?.ratingsCount || 0,
      quantity: 1,
    };

    dispatch(addToBasket(bookForBasket));
  };

  return (
    <div className='flex flex-wrap gap-x-[76px] gap-y-[96px] w-[924px] z-1 ml-[-60px] mt-[46px]'>
      {Object.values(booksState.entities).map((item) => {
        const isInBasket = books?.books.some(basketItem => basketItem.id === item.id);

        return (
          <div key={item.id} className='w-[424px] flex gap-[36px]'>
            <Image src={
              (item.volumeInfo?.imageLinks?.smallThumbnail || '/img/books.png').replace(/^http:/, 'https:')
            } alt="book" width={212} height={300} priority />
            <div className="w-[190px] pt-[45px]">
              <span className="line-clamp-1 openSans">{item.volumeInfo?.authors?.join(', ')}</span>
              <span className="mt-[4px] text-[16px] font-bold text-[#1C2A39] line-clamp-1">{item.volumeInfo?.title}</span>
              <div className='flex h-[11px] items-center mt-[3px]'>
                {item.volumeInfo?.averageRating ? renderStars(item.volumeInfo.averageRating) : null}
                <span className="openSans ml-[6px]">{item.volumeInfo?.ratingsCount ? `${item.volumeInfo?.ratingsCount} review` : ""}</span>
              </div>
              <p className="openSans mt-[16px] mb-[16px] h-[44px] line-clamp-3">{item.volumeInfo?.description}</p>
              <span className="block font-bold text-[13px] text-[#1C2A39] h-[16px]">{item.saleInfo?.listPrice?.amount} {item.saleInfo?.listPrice?.currencyCode}</span>

              {isInBasket ? (
                <Button onClick={() => dispatch(deleteBook(item))} className={"booksBtn booksCart"} text="IN THE CART" mt="16px" />
              ) : (
                <Button onClick={() => buyBook(item)} className={"booksBtn"} text="BUY NOW" mt="16px" />
              )}
            </div>
          </div>
        );
      })}

      <Button className={"booksBtn"} text="LOAD MORE" mt={"16px"} ml={"385px"} onClick={addBooks}/>
    </div>
  );
};

export default ListBooks;
