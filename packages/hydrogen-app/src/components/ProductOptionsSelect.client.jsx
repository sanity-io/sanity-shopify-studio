import {useProduct} from '@shopify/hydrogen/client';

const ProductOptionsSelect = (props) => {
  const {optionName, values} = props;

  const {setSelectedOption} = useProduct();

  // TODO: use controlled select
  return (
    <select
      className="border border-black mt-1 p-2 w-full"
      onChange={(event) => {
        const value = event.target.value;
        setSelectedOption(optionName, value);
      }}
    >
      {values.map(({value}) => {
        const id = `option-${optionName}-${value}`;
        return <option key={id}>{value}</option>;
      })}
    </select>
  );
};

export default ProductOptionsSelect;
