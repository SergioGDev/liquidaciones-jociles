/* eslint-disable @typescript-eslint/no-explicit-any */
import { Theme } from "@emotion/react";
import { SvgIconProps, SxProps } from "@mui/material";
import { ReactNode } from "react";

// Props for the component
export type FormControlInputTextProps = {
  name: string;
  className?: string;
  sx?: SxProps<Theme>;
  label?: string;
  placeholder?: string;
  type?: FormControlInputTextType;
  defaultValue?: string | number;
  readOnly?: boolean;
  error?: boolean;
  shrink?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  EndAdornmentIcon?: React.ElementType<SvgIconProps>;
  endAdornmentOnClick?: (event: any) => void;
  formHelperType?: FormHelperType;
  formHelperLeft?: ReactNode;
  formHelperRight?: ReactNode;
};

type FormControlInputTextType = "text" | "number" | "password";
type FormHelperType =
  | "JUST_DESCRIPTION"
  | "JUST_LENGTH"
  | "DESCRIPTION_AND_LENGTH"
  | "TWO_DESCRIPTIONS";
