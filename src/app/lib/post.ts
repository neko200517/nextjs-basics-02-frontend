import { PostType } from '@/app/types';

// 全てのデータを取得する(日付を降順にソート)
export async function getAllPostData(): Promise<PostType[]> {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-post/`),
    { next: { revalidate: 3 } }
  );

  const data = (await res.json()) as PostType[];

  const sortedData = [...data].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return sortedData;
}

// 全てのデータのIDを取得する
export async function getAllPostIds(): Promise<{ id: string }[]> {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-post/`)
  );
  const data = await res.json();

  return data.map((post: PostType) => ({
    id: String(post.id),
  }));
}

// 特定のデータを取得する
export async function getPostDataById(id: string): Promise<PostType> {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/detail-post/${id}/`),
    { next: { revalidate: 3 } }
  );

  return await res.json();
}
