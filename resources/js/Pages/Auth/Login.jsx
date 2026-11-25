import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ecommerceimage from '../../../../public/online-shopping.svg'
import demologo from '../../../../public/demologo.png'
import saitlogo from '../../../../public/sait_white_logo.png'
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';



export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className='flex flex-col sm:flex-row gap-2 bg-[#173488] rounded-3xl overflow-hidden'>

            <div className='sm:w-[50%] flex-col w-full flex justify-center items-center py-4 sm:py-0'>
                <h1 className='text-4xl text-white'>Welcome</h1>
                <p className='text-white mt-2'>Your Gateway to Effortless Shopping</p>
                <img src={ecommerceimage} className='hidden sm:block sm:w-full'/>
            </div> 


            <div className='py-8 sm:w-[50%] w-full px-8 rounded-l-3xl rounded-r-3xl sm:rounded-r-none bg-white'>
                <img src={demologo} className='w-20 mx-auto'/>

                <form onSubmit={submit} className='flex flex-col'>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div> */}

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
                <Link
                            href={route('register')}
                            className="underline text-sm ml-auto text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Don't have an Account?
                        </Link>
            </form>

            <div className='flex flex-col'>
              <p className='text-center mt-8 font-semibold text-[#173488]'>Powered By</p>
              <a href='https://www.sait.com.np/' target="_blank" className='mx-auto'>
                <img src={saitlogo} className='w-28'/>
              </a>
              <p className='text-center font-semibold text-[#173488]'>Reach Us</p>
              <div className='flex gap-1 mx-auto'>
                <a target="_blank" href='https://www.facebook.com/saitsolutionpokhara'><FaFacebook className='text-blue-600'/></a>
                <a target="_blank" href='https://www.instagram.com/saitsolutionpokhara/'><FaInstagram className='text-red-600' /></a>
                <a target="_blank" href='https://www.linkedin.com/company/saitsolutionnepal/'><FaLinkedinIn className='text-blue-600'/></a>
                <a target="_blank" href='https://www.youtube.com/@saitsolution'><FaYoutube className='text-red-600'/></a>
              </div>
            </div>


            </div>


            </div>


            


        </GuestLayout>
    );
}
