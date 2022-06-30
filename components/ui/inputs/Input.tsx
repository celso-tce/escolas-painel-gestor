import React from 'react';
import Lodash from 'lodash';

type BaseInputProps = {
  type?: 'text' | 'password';
  name?: string; // apenas realmente útil caso não seja um ManagedInput
  defaultValue?: string; // deve ser usado APENAS caso não seja um ManagedInput
  htmlId?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
};

type ManagedInputProps = BaseInputProps & {
  value: string;
  onChange: (value: string) => void;
  debounceTimeMs?: number;
}

type InputProps = BaseInputProps | ManagedInputProps;

const Input: React.FC<InputProps> = (props) => {
  const type = props.type ?? 'text';
  const disabledCss = props.disabled ? 'bg-gray-400' : '';
  const extraCss = props.className ?? '';

  const inputProps: React.ComponentProps<'input'> = {
    type: type,
    defaultValue: props.defaultValue,
    id: props.htmlId,
    name: props.name,
    className: `border-0 px-2 py-2 placeholder-slate-300 text-slate-600 bg-white rounded
      text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all
      duration-150 ${disabledCss} ${extraCss}`,
    placeholder: props.placeholder,
    disabled: props.disabled,
    ref: props.inputRef,
  };

  const isManaged = 'value' in props;

  if (isManaged) {
    return <_ManagedInput {...props} inputProps={inputProps} />
  }

  return (
    <input {...inputProps} />
  );
};

const _ManagedInput: React.FC<ManagedInputProps & { inputProps: React.ComponentProps<'input'> }> =
  (props) =>
{
  const [internalText, setInternalText] = React.useState(props.value);

  const onChangeTextHandler = React.useMemo(() => {
    if (props.debounceTimeMs) {
      return Lodash.debounce(props.onChange, props.debounceTimeMs);
    }
    else {
      return props.onChange;
    }
  }, [props.debounceTimeMs, props.onChange]);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newText = e.target.value;

    if (props.debounceTimeMs)
      setInternalText(newText);

    onChangeTextHandler(newText);
  }, [props.debounceTimeMs, onChangeTextHandler]);

  return (
    <input
      {...props.inputProps}
      value={props.debounceTimeMs ? internalText : props.value}
      onChange={props.disabled ? undefined : onChange}
    />
  );
};

export default React.memo(Input);
