import { Metadata } from 'next';
import { getAllTaskIds, getTaskDataById } from '@/app/lib/task';
import { ReturnLink } from '@/app/components/ReturnLink';
import TaskDetail from '@/app/components/TaskDetail';

export const metadata: Metadata = {
  title: 'Task Detail Page',
};

export async function generateStaticParams() {
  return getAllTaskIds();
}

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const task = await getTaskDataById(params.id);

  return (
    <>
      <TaskDetail staticTask={task} id={params.id} />
      <ReturnLink href='/task'>Back to task page</ReturnLink>
    </>
  );
}
