import {useProduct} from '@shopify/hydrogen/client';

const ProductOptionsColor = (props) => {
  const {optionName, values} = props;

  const {setSelectedOption, selectedOptions} = useProduct();

  return (
    <div className="space-y-1">
      {values.map(({color, value}) => {
        const checked = selectedOptions[optionName] === value;
        const id = `option-${optionName}-${value}`;

        return (
          <div key={id}>
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

              <div className="flex items-center">
                {/* Swatch */}
                <div
                  className={`border border-2 flex-grow-0 h-8 rounded-full w-8 ${
                    checked ? 'border-black' : 'border-white'
                  }`}
                  style={{background: color?.hex}}
                />

                <div className="p-2 cursor-pointer text-xs uppercase w-full">
                  {value}
                </div>
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ProductOptionsColor;
