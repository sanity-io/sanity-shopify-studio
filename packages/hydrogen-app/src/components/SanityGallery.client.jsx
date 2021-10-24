import sanityImageUrl from '../utils/sanityImageUrl';

export default function SanityGallery(props) {
  const {images} = props;

  if (!images?.length) {
    return null;
  }

  return (
    <ul className="grid lg:grid-cols-2 gap-10">
      {images.map((image, index) => {
        return (
          <li key={index} className="relative">
            <img
              className="w-full bg-white rounded-md object-cover"
              src={sanityImageUrl(image, {width: 1000})}
            />
          </li>
        );
      })}
    </ul>
  );
}
