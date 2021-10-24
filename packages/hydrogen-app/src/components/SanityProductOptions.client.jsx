import ProductOptionsColor from './ProductOptionsColor.client';
import ProductOptionsDefault from './ProductOptionsDefault.client';
import ProductOptionsDescription from './ProductOptionsDescription.client';
import ProductOptionsImage from './ProductOptionsImage.client';
import ProductOptionsMaterial from './ProductOptionsMaterial.client';
import ProductOptionsSelect from './ProductOptionsSelect.client';

export default function SanityProductOptions(props) {
  const {options} = props;

  return (
    <>
      {options.map(({name, template, values}) => {
        return (
          <fieldset key={name} className="my-5">
            <legend className="text-xs text-gray-700 uppercase">{name}</legend>

            <div>
              {/* Template: default */}
              {!template && (
                <ProductOptionsDefault optionName={name} values={values} />
              )}

              {/* Template: color */}
              {template === 'color' && (
                <ProductOptionsColor optionName={name} values={values} />
              )}

              {/* Template: description */}
              {template === 'description' && (
                <ProductOptionsDescription optionName={name} values={values} />
              )}

              {/* Template: material */}
              {template === 'material' && (
                <ProductOptionsMaterial optionName={name} values={values} />
              )}

              {/* Template: select */}
              {template === 'select' && (
                <ProductOptionsSelect optionName={name} values={values} />
              )}

              {/* TODO: Add your other templates here */}
            </div>
          </fieldset>
        );
      })}
    </>
  );
}
