import {useProduct} from '@shopify/hydrogen/client';

const ProductOptionsDefault = (props) => {
  const {optionName, values} = props;

  const {setSelectedOption, selectedOptions} = useProduct();

  return (
    <div className="flex items-center flex-wrap gap-1 mt-1">
      {values.map(({value}) => {
        const checked = selectedOptions[optionName] === value;
        const id = `option-${optionName}-${value}`;

        return (
          <label key={id} htmlFor={id}>
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
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default ProductOptionsDefault;
