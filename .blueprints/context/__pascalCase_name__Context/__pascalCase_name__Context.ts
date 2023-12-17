import { createContext } from 'react';
import { {{ pascalCase name }}ContextProps } from './{{ camelCase name }}Context.types';

export const {{pascalCase name}}Context = createContext<{{pascalCase name}}ContextProps>({} as {{pascalCase name}}ContextProps);