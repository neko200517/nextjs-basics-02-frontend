'use client';

import { FormEvent, useContext } from 'react';
import { StateContext } from '../context/StateContext';
import Cookie from 'universal-cookie';

const cookie = new Cookie();

export default function TaskForm({ taskCreated }: { taskCreated: Function }) {
  const { selectedTask, setSelectedTask } = useContext(StateContext);

  const create = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/tasks/`, {
      method: 'POST',
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    setSelectedTask({ id: 0, title: '' });
    taskCreated();
  };

  const update = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/tasks/${selectedTask.id}/`,
      {
        method: 'PUT',
        body: JSON.stringify({ title: selectedTask.title }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    setSelectedTask({ id: 0, title: '' });
    taskCreated();
  };

  return (
    <>
      <form
        className='flex mb-12'
        onSubmit={selectedTask.id === 0 ? create : update}
      >
        <input
          className='text-black px-2 py-1 mr-2'
          type='text'
          onChange={(e) =>
            setSelectedTask({ ...selectedTask, title: e.target.value })
          }
          value={selectedTask.title}
        />
        <button className='cursor-pointer bg-gray-500 px-2' type='submit'>
          {selectedTask.id === 0 ? 'CREATE' : 'UPDATE'}
        </button>
      </form>
    </>
  );
}
