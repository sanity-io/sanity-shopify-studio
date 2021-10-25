import {useProduct} from '@shopify/hydrogen/client';

import sanityImageUrl from '../utils/sanityImageUrl';

const ProductOptionsImage = (props) => {
  const {optionName, values} = props;

  const {setSelectedOption, selectedOptions} = useProduct();

  return (
    <div className="flex items-start flex-wrap mt-1">
      {values.map(({image, value}) => {
        const checked = selectedOptions[optionName] === value;
        const id = `option-${optionName}-${value}`;

        return (
          <div className="w-1/2" key={id}>
            <label htmlFor={id}>
              <input
                className="sr-only"
                type="radio"
                id={id}
                name={`option[${optionName}]`}
                value={value}
                checked={checked}
                onChange={() => setSelectedOption(optionName, value)}
              />
              <div
                className={`p-2 border cursor-pointer text-xs uppercase w-full ${
                  checked ? 'bg-gray-900 text-white' : 'text-gray-900'
                }`}
              >
                {value}

                {/* Image */}
                {image && (
                  <img
                    alt=""
                    className="object-cover w-24 h-24"
                    src={sanityImageUrl(image.image, {width: 200})}
                  />
                )}
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ProductOptionsImage;
