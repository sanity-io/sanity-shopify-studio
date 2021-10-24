import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import sanityImageUrl from '../utils/sanityImageUrl';

const GalleryCarousel = (props) => {
  const {images} = props;

  const [viewportRef, embla] = useEmblaCarousel({loop: true});

  return (
    <div>
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {images.map((image, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__inner">
                  <img
                    className="w-full"
                    src={sanityImageUrl(image, {width: 1000})}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCarousel;
