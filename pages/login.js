import Title from '@/components/Title';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { getError } from '@/utils/error';
import { useRouter } from 'next/router';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    <>
      <Title title='Đăng nhập' />
      <form
        className='mx-auto max-w-sm p-5 bg-white flex flex-col gap-7'
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className='font-semibold text-xl'>Đăng Nhập</h1>
        <div>
          <input
            {...register('email', {
              required: 'Vui lòng nhập email của bạn',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Vui lòng nhập đúng định dạng email',
              },
            })}
            className='w-full'
            // type='email'
            id='email'
            autoFocus
            placeholder='Email'
          />
          {errors.email && (
            <div className='text-red-500 mt-2 ml-1'>{errors.email.message}</div>
          )}
        </div>
        <div>
          <input
            {...register('password', {
              required: 'Vui lòng nhập mật khẩu',
              minLength: {
                value: 6,
                message: 'Mật khẩu phải có ít nhất 6 ký tự',
              },
            })}
            className='w-full'
            type='password'
            id='password'
            autoFocus
            placeholder='Mật khẩu'
          />
          {errors.password && (
            <div className='text-red-500 mt-2 ml-1'>
              {errors.password.message}
            </div>
          )}
        </div>
        <div>
          <button className='primary-button w-full'>Đăng nhập</button>
        </div>
        <div>
          {`Bạn chưa có tài khoản ở T1.FIT ? `}

          <Link href='/register' className='underline'>
            Đăng ký
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
