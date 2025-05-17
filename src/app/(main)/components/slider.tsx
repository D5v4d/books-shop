'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

function Slider() {
  const bannerImg = ['/img/banner-one.png', '/img/banner-two.png', '/img/banner-three.png'];
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % bannerImg.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [bannerImg.length]);

  const sliderActive = (item: number) => {
    setActiveBanner(item)
  }

  return (
    <>
      <Image src={bannerImg[activeBanner]} alt="banner" width={1120} height={702} priority />
      <Image src="/img/promo-one.png" alt="promo-one" width={149} height={204} className='absolute mt-[79px] ml-[1150px]' />
      <Image src="/img/promo-two.png" alt="promo-two" width={134} height={273} className='absolute mt-[359px] ml-[1287px]' />
      <div className=" mt-[17px] space-x-2 w-[56px]">
        {bannerImg.map((item, index) => (
          <button key={item} className={`cursor-pointer w-3 h-3 rounded-full ${activeBanner === index ? 'bg-[#9E98DC]' : 'bg-[#EFEEF6]'}`}
            onClick={() => (sliderActive(index))}>
          </button>
        ))}
      </div>
    </>
  );
}

export default Slider;