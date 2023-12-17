import React, { useEffect, useState } from "react";
import styles from "./FormControlInputText.module.scss";

import { FormControlInputTextProps } from "./formControlInputText.types";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const FormControlInputText = ({
  name,
  className,
  sx,
  label,
  placeholder,
  type = "text",
  defaultValue,
  readOnly,
  error,
  shrink,
  required,
  minLength,
  maxLength,
  min,
  max,
  pattern,
  onChange,
  onBlur,
  endAdornmentOnClick,
  EndAdornmentIcon,
  formHelperType,
  formHelperLeft,
  formHelperRight,
}: FormControlInputTextProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, setValue, trigger, watch } = useFormContext();

  useEffect(() => {
    defaultValue && setValue(name, defaultValue);
  });

  // Events
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    trigger(name);
    onChange && onChange(event);
  };

  const handleOnBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    trigger(name);
    onBlur && onBlur(event);
  };

  // EndAdornments component
  const PasswordAdornment = (
    <InputAdornment position="end">
      <IconButton onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  const EndAdornment = EndAdornmentIcon && (
    <InputAdornment position="end">
      <IconButton
        onClick={(event) => endAdornmentOnClick && endAdornmentOnClick(event)}
      ></IconButton>
    </InputAdornment>
  );

  return (
    <FormControl
      variant="standard"
      error={error}
      className={className}
      sx={{ ...sx, display: "block" }}
    >
      {label && (
        <InputLabel shrink={shrink} required={required}>
          {label}
        </InputLabel>
      )}
      <Input
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={readOnly}
        type={type === "password" && showPassword ? "text" : type}
        {...register(name, {
          required: required && `${label} is required`,
          minLength: minLength && {
            value: minLength,
            message: `${label} must be at least ${minLength} characters`,
          },
          maxLength: maxLength && {
            value: maxLength,
            message: `${label} must be at most ${maxLength} characters`,
          },
          min: min && {
            value: min,
            message: `${label} must be at least ${min}`,
          },
          max: max && {
            value: max,
            message: `${label} must be at most ${max}`,
          },
          pattern: pattern && {
            value: pattern,
            message: `${label} is not valid`,
          },
          onChange: (event) => handleOnChange(event),
          onBlur: (event) => handleOnBlur(event),
        })}
        endAdornment={type === "password" ? PasswordAdornment : EndAdornment}
        sx={{ width: "100%" }}
      />
      <FormHelperText
        component={"div"}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {formHelperType === undefined && <div>&nbsp;</div>}
        {formHelperType && (
          <div>{formHelperLeft ? formHelperLeft : <span>&nbsp;</span>}</div>
        )}
        {(formHelperType === "DESCRIPTION_AND_LENGTH" ||
          formHelperType === "JUST_LENGTH") && (
          <div className={styles.wordsCounter}>
            {watch(name) ? watch(name).length : 0} /{maxLength ? maxLength : 0}
          </div>
        )}
        {formHelperType === "TWO_DESCRIPTIONS" && <div>{formHelperRight}</div>}
      </FormHelperText>
    </FormControl>
  );
};
