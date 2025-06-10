import react from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import c1 from '../../public/c1.jpg';
import c2 from '../../public/c2.jpg';
import c3 from '../../public/c3.jpg';


function Carousel() {
    return (
        <div>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={1}
                navigation={false}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                // style={{ height: '450px' }}
                autoplay={{
                    delay: 1000,          // 1 second
                    disableOnInteraction: false
                }}
                loop={true}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide> <img src={c1}></img> </SwiperSlide>
                <SwiperSlide><img src={c2}></img></SwiperSlide>
                <SwiperSlide><img src={c3}></img></SwiperSlide>
                <SwiperSlide> <img src={c1}></img> </SwiperSlide>
                <SwiperSlide><img src={c2}></img></SwiperSlide>
                <SwiperSlide><img src={c3}></img></SwiperSlide>



            </Swiper>
        </div>
    );
}



export default Carousel;