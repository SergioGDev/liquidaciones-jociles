import { {{pascalCase name}}ContextType } from './{{pascalCase name}}Context';

type {{pascalCase name}}Action = { type: 'exampleActionA'; payload: {{pascalCase name}}ContextType } | { type: 'exampleActionB' };

const {{camelCase name}}Reducer = (state: {{pascalCase name}}ContextType, action: {{pascalCase name}}Action): {{pascalCase name}}ContextType => {
    switch (action.type) {
        case 'exampleActionA':
            // Put here the new state after the action
            return { ...state, ...action.payload };
            
        case 'exampleActionB':
            // Put here the new state after the action
            return { ...state };

        default:
            return state;
  }
};

export default {{camelCase name}}Reducer;
