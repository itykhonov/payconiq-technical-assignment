import React, { FC } from 'react';
import Select, { OnChangeValue } from 'react-select';

export interface IOption {
  value: string;
  label: string;
}

export interface IProps {
  filterValue: IOption | null;
  setSelectValue: (filterValue: IOption) => void;
  options: IOption[];
  placeholder?: string;
}

export const SelectElement: FC<IProps> = ({
  filterValue,
  setSelectValue,
  options,
  placeholder
}: IProps) => {
  const selectedValue =
    options.length === 1
      ? options[0]
      : (filterValue && options.find((o) => o.value === filterValue.value)) ||
        null;
  const onChangeFilter = (selectedOption: OnChangeValue<IOption, boolean>) => {
    setSelectValue({
      value: (selectedOption as IOption).value,
      label: (selectedOption as IOption).label
    });
  };

  return (
    <Select
      className="select"
      isSearchable={false}
      isMulti={false}
      options={options}
      onChange={onChangeFilter}
      value={selectedValue}
      placeholder={placeholder}
    />
  );
};
