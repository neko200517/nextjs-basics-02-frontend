'use client';

import useSWR from 'swr';
import { TaskType } from '../types';
import { Task } from './Task';
import StateContextProvider from '../context/StateContext';
import TaskForm from './TaskForm';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-task/`;

export function TaskList({ tasks }: { tasks: TaskType[] }) {
  const { data, error, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: tasks,
  });

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const sortedData = [...data].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return (
    <StateContextProvider>
      <TaskForm taskCreated={mutate} />
      <ul>
        {sortedData &&
          sortedData.map((task) => (
            <Task key={task.id} task={task} taskDeleted={mutate} />
          ))}
      </ul>
    </StateContextProvider>
  );
}
