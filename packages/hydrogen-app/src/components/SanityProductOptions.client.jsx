import ProductOptionsColor from './ProductOptionsColor.client';
import ProductOptionsGrid from './ProductOptionsMaterial.client';
import ProductOptionsSelect from './ProductOptionsSelect.client';

export default function SanityProductOptions(props) {
  const {options} = props;

  return (
    <>
      {options.map(({layout, name, values}) => {
        return (
          <fieldset key={name} className="my-5">
            <legend className="text-xs text-gray-700 uppercase">{name}</legend>

            <>
              {/* Template: default (select) */}
              {!layout && (
                <ProductOptionsSelect optionName={name} values={values} />
              )}

              {/* Template: color swatch */}
              {layout === 'swatchColor' && (
                <ProductOptionsColor optionName={name} values={values} />
              )}

              {/* Template: grid (large) */}
              {layout === 'grid' && (
                <ProductOptionsGrid optionName={name} values={values} />
              )}

              {/* Add your other templates here */}
            </>
          </fieldset>
        );
      })}
    </>
  );
}
