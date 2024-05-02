import Link from 'next/link';
import { PostType } from '../types';

export function Post({ post }: { post: PostType }) {
  return (
    <div>
      <span>{post.id}</span>
      {' : '}
      <Link href={`/blog/${post.id}`}>
        <span className='cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600'>
          {post.title}
        </span>
      </Link>
    </div>
  );
}
