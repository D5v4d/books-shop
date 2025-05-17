'use client';
import { fetchBooks, filterActive } from '@/src/redux/slice/listBooksSlice';
import { AppDispatch, RootState } from '@/src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import "@/styles/filter.css";


function Filter() {

  const catalog = ['Architecture', 'Art & Fashion', 'Biography', 'Business', 'Crafts & Hobbies', 'Drama', 'Fiction', 'Food & Drink', 'Health & Wellbeing', 'History & Politics', 'Humor', 'Poetry', 'Psychology', 'Science', 'Technology', 'Travel & Maps']
  const ticketsState = useSelector((state: RootState) => (state.booksReducer));

  const dispatch = useDispatch<AppDispatch>()

  return (
    <ul className='w-[416px] h-[710] bg-[#EFEEF6] pl-[158px] pt-[45px] sticky top-[134px]'>
      {catalog.map((item: string, inndex) => (
        <li
          key={inndex}
          className={
            `mb-[23px] cursor-pointer  
            ${item === ticketsState.filter ? 'text-[#1C2A39] text-[16px] font-bold  marker' : 'text-[#5C6A79] text-[12px]'}`
          }

          onClick={() => {
            if (item === ticketsState.filter) return;
            dispatch(filterActive(item));
            dispatch(fetchBooks({ categoria: item, startIndex: 0 }))
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default Filter