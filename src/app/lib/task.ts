import { TaskType } from '@/app/types';

// 全てのデータを取得する(日付を降順にソート)
export async function getAllTaskData(): Promise<TaskType[]> {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-task/`),
    { next: { revalidate: 3 } }
  );

  const data = (await res.json()) as TaskType[];

  const sortedData = [...data].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return sortedData;
}

// 全てのデータのIDを取得する
export async function getAllTaskIds(): Promise<{ id: string }[]> {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-task/`)
  );
  const data = await res.json();

  return data.map((task: TaskType) => ({
    id: String(task.id),
  }));
}

// 特定のデータを取得する
export async function getTaskDataById(id: string): Promise<TaskType> {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/detail-task/${id}/`),
    { next: { revalidate: 3 } }
  );

  return await res.json();
}
