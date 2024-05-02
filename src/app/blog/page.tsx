import { Metadata } from 'next';
import { getAllPostData } from '../lib/post';
import { Post } from '../components/Post';
import { ReturnLink } from '../components/ReturnLink';

export const metadata: Metadata = {
  title: 'Blog Page',
};

export default async function BlogPage() {
  const fileterdPosts = await getAllPostData();
  return (
    <>
      <ul>
        {fileterdPosts &&
          fileterdPosts.map((post) => <Post key={post.id} post={post} />)}
      </ul>
      <ReturnLink href='/main'>Back to main page</ReturnLink>
    </>
  );
}
