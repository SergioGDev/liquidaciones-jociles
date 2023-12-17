import { PropsWithChildren, useReducer } from 'react';
// import { ItemType } from './{{ camelCase name }}Context.types';
import { {{ pascalCase name }}Context } from './{{ pascalCase name }}Context';

export const {{ pascalCase name }}ContextProvider = ({ children }: PropsWithChildren) => {
    const [
        // itemList,
        dispatch
    ] = useReducer(
        {{ pascalCase name }}ContextReducer,
        initial{{ pascalCase name }}ContextState
    );

    // const addItem = (item: ItemType) => dispatch({ type: "addItem", payload: item });
    // const removeItem = (id: number) =>
    //     dispatch({ type: "removeItem", payload: id });

    const providerValues = {
        // ...itemList,
        // addItem,
        // removeItem,
    }

    return (
        <{{ pascalCase name }}Context.Provider value={ providerValues }>
            {children}
        </{{ pascalCase name }}Context.Provider>
    )
}