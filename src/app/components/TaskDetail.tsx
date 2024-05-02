'use client';

import useSWR from 'swr';
import { TaskType } from '../types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TaskDetail({
  staticTask,
  id,
}: {
  staticTask: TaskType;
  id: string;
}) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/detail-task/${id}`,
    fetcher,
    {
      fallbackData: staticTask,
    }
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <p className='mb-4'>
        {'ID : '}
        {data.id}
      </p>
      <p className='mb-4 text-xl font-bold'>{data.title}</p>
      <p className='mb-12'>{data.created_at}</p>
    </>
  );
}
