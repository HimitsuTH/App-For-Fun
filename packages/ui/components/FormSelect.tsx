import { type JSX } from "react";
import styled from "styled-components";
import Select from 'react-select'
import { Control, Controller } from 'react-hook-form'
import { Category } from "../store/slices/category.slice";

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

const customStyles = {
  control: (baseStyles:any, state:any) => ({
    ...baseStyles,
    borderColor: state.isFocused ? 'blue' : 'gray',
    boxShadow: state.isFocused ? '0 0 0 1px blue' : 'none',
    '&:hover': {
      borderColor: 'darkgray',
    },
  }),
  option: (baseStyles:any, state:any) => ({
    ...baseStyles,
    backgroundColor: state.isSelected ? 'lightblue' : state.isFocused ? 'lightgray' : 'white',
    color: state.isSelected ? 'white' : 'black',
    '&:active': {
      backgroundColor: 'darkblue',
    },
  }),
};

export function InputSelect(props: {
  name: string;
  control: Control<any,any>
  options: {value: string, label: string}[]
  errors: any
}): JSX.Element {

    const { name } = props

    console.log('props.errors----category--',props.errors)


  return (
      <div style={{display: 'flex', flexDirection: 'column', width: '100%', padding:'0.5rem'}}>
        <label style={{ marginBottom: '0.5rem'}}>{name[0].toUpperCase() + name.slice(1)}</label>

         <Controller
            name={name}
            control={props.control}
            render={({ field }) => <Select
              {...field}
              maxMenuHeight={170}
              menuPlacement="auto"
              options={props.options || []}
            //   styles={customStyles(props)}
            //   noOptionsMessage={() => (
            //     <span>{t('DEFAULT_SELECT_NO_OPTION_MESSAGE')}</span>
            //   )}
            //   isLoading={props.isLoading}
              loadingMessage={() => <span>Loading ...</span>}
              components={{
                IndicatorSeparator: () => null,
                // DropdownIndicator,
              }}
            //   onChange={(data)=> console.log('data category--------->', data)}
            //   instanceId={field.name}
            //   placeholder={props.placeholder || (t('DEFAULT_SELECT_PLACEHOLDER') + ' ' + props.label)}
            //   defaultValue={props.defaultValue}
            //   isDisabled={props.disabled}
            />
            }
          />
          {props.errors[name] && <p style={{ color: 'red', marginTop: '0.5rem' }}>{props.errors[name].message}</p>}
      </div>
  );
}
