'use client';

import { createContext, useState } from 'react';

type StateContextType = {
  selectedTask: { id: number; title: string };
  setSelectedTask: Function;
};

const defultSelectedValue = { id: 0, title: '' };

export const StateContext = createContext<StateContextType>({
  selectedTask: defultSelectedValue,
  setSelectedTask: () => {},
});

export default function StateContextProvider(props: {
  children: React.ReactNode;
}) {
  const [selectedTask, setSelectedTask] = useState(defultSelectedValue);

  return (
    <StateContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
}
