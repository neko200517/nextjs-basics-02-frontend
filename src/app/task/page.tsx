import { Metadata } from 'next';
import { getAllTaskData } from '../lib/task';
import { ReturnLink } from '../components/ReturnLink';
import { TaskList } from '../components/TaskList';

export const metadata: Metadata = {
  title: 'Task Page',
};

export default async function TaskPage() {
  const staticTasks = await getAllTaskData();
  return (
    <>
      <TaskList tasks={staticTasks} />
      <ReturnLink href='/main'>Back to main page</ReturnLink>
    </>
  );
}
