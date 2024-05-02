import { Metadata } from 'next';
import { getAllPostIds, getPostDataById } from '@/app/lib/post';
import { ReturnLink } from '@/app/components/ReturnLink';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Blog Detail Page',
};

export async function generateStaticParams() {
  return getAllPostIds();
}

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostDataById(params.id);

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <p className='m-4'>
          {'ID : '}
          {post.id}
        </p>
        <p className='mb-4 text-xl font-bold'>{post.title}</p>
        <p className='mb-12'>{post.created_at}</p>
        <p className='px-10'>{post.content}</p>
      </Suspense>
      <ReturnLink href='/blog'>Back to blog page</ReturnLink>
    </>
  );
}
