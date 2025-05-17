'use client';
import Button from '@/src/components/button';
import "@/styles/button.css";
import { deleteBook, upQuantity } from '@/src/redux/slice/basketSlice';
import { AppDispatch, RootState } from '@/src/redux/store';
import Image from 'next/image';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
    const basketState = useSelector((state: RootState) => (state.basket));
    const dispatch = useDispatch<AppDispatch>();
    const basketBooks = basketState.basket.find((item) => (item.tokenProfile === basketState.tokenActive))

    const renderStars = (ratings: number) => {
        const totalStars = 5;

        return (
            <div className="flex">
                {[...Array(totalStars)].map((_, i) => (
                    <Image key={i} src={i < Math.floor(ratings) ? "/img/star-goold.png" : "/img/star-white.png"}
                        alt={i < Math.floor(ratings) ? "gold star" : "white star"}
                        width={12} height={12}
                    />
                ))}
            </div>
        );
    };

    const totalPrice = useMemo(() => {
        return basketBooks?.books.reduce((sum, book) => sum + book.price * book.quantity, 0) || 0;
    }, [basketBooks]);

    return (
        <>
            <h1 className='text-[24px] text-[#1C2A39] mb-[20px]'>SHOPPING CART</h1><div className=''>
                <div className='text-[10px] text-[#5C6A79] grid [grid-template-columns:410px_260px_245px_175px] mb-[30px]'>
                    <span className='item'>ITEM</span>
                    <span className='quantity'>QUANTITY</span>
                    <span className='price'>PRICE</span>
                    <span className='delivery'>DELIVERY</span>
                </div>
                {basketBooks?.books.map(item => (
                    <div key={item.id} className='grid [grid-template-columns:410px_260px_245px_120px_auto] items-center mb-[77px]'>
                        <div className='w-[410px] flex gap-[25px]'>
                            <Image src={(item.cover).replace(/^http:/, 'https:')} alt="book" width={102} height={145} />
                            <div className="w-[190px] pt-[39px]">
                                <span className="mb-[8px] text-[16px] text-[#1C2A39] line-clamp-1">{item.title}</span>
                                <span className="line-clamp-1 openSans mb-[11px]">{item.author}</span>
                                <div className='flex h-[11px] items-center mt-[3px]'>
                                    {item.averageRating ? renderStars(item.averageRating) : null}
                                    <span className="openSans ml-[6px]">{item.averageRating ? `${item.ratingsCount} review` : ""}</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex w-[176px] p-[10px] text-[#5C6A79] text-[16px] items-center justify-between border border-[#EEEDF5]'>
                            <Image onClick={() => dispatch(upQuantity({ id: item.id, changeType: 'minus' }))} className='cursor-pointer' src={'/img/minus.png'} alt="minus" width={24} height={24} />
                            <span className='text-[#5C6A79] '>{item.quantity}</span>
                            <Image onClick={() => dispatch(upQuantity({ id: item.id, changeType: 'plus' }))} className='cursor-pointer' src={'/img/pluse.png'} alt="plus" width={24} height={24} />
                        </div>
                        <span className='text-[18px] text-[#1C2A39]'>{item.currency ? `${item.currency} ${(item.price * item.quantity).toFixed(2)}` : "Free"} </span>
                        <span className='text-[12px] text-[#5C6A79] '>Shipping: delivery</span>
                        {item.quantity === 0 &&
                            <Image onClick={() => dispatch(deleteBook(item))} className='ml-[60px] cursor-pointer' src={'/svg/trashcan.svg'} alt="trashcan" width={32} height={32} />}
                    </div>
                ))}
                <div>
                    <h1>{`TOTAL PRICE: RUB ${totalPrice}`}</h1>
                    <Button className={'booksBtn'} text={'CHECKOUT'} mt="20px" />
                </div>
            </div>
        </>

    )
}

export default Cart