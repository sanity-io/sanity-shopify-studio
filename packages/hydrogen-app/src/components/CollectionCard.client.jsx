import {Link} from '@shopify/hydrogen/client';

import sanityImageUrl from '../utils/sanityImageUrl';

const CollectionCard = (props) => {
  const {collection} = props;

  const collectionUrl = `/collections/${collection?.slug}`;

  // TODO: create generic SanityImage wrapper

  return (
    <div className="col-span-2 bg-white">
      {/* Image */}
      <div className="relative">
        <Link to={collectionUrl}>
          <img
            alt=""
            className="w-full bg-white object-fill"
            src={sanityImageUrl(collection.image, {width: 500})}
          />
        </Link>
      </div>
      {/* Title */}
      <Link to={collectionUrl}>
        <div className="font-medium mt-2">{collection?.title}</div>
      </Link>
    </div>
  );
};

export default CollectionCard;
