import {useProduct} from '@shopify/hydrogen/client';

import sanityImageUrl from '../utils/sanityImageUrl';

const ProductOptionsGrid = (props) => {
  const {optionName, values} = props;

  const {setSelectedOption, selectedOptions} = useProduct();

  return (
    <div className="flex items-start flex-wrap mt-1">
      {values.map((value) => {
        const name = value?.value;
        const checked = selectedOptions[optionName] === name;
        const id = `option-${optionName}-${name}`;

        return (
          <div className="w-1/2" key={id}>
            <label htmlFor={id}>
              <input
                className="sr-only"
                type="radio"
                id={id}
                name={`option[${optionName}]`}
                value={name}
                checked={checked}
                onChange={() => setSelectedOption(optionName, name)}
              />
              <div
                className={`p-2 border cursor-pointer text-xs uppercase w-full ${
                  checked ? 'bg-gray-900 text-white' : 'text-gray-900'
                }`}
              >
                {name}

                {/* Image + description */}
                {value?.image && (
                  <img
                    alt=""
                    className="object-cover w-24 h-24"
                    src={sanityImageUrl(value?.image, {width: 200})}
                  />
                )}
                {value?.description && (
                  <div className="mt-1 opacity-50">{value?.description}</div>
                )}
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ProductOptionsGrid;
