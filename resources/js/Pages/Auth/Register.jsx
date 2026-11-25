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
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className='flex flex-col sm:flex-row gap-2 bg-[#173488] rounded-3xl overflow-hidden'>
                <div className='sm:w-[50%] flex flex-col w-full  justify-center items-center py-4 sm:py-0'>
                    <h1 className='text-4xl text-white'>Welcome</h1>
                    <p className='text-white mt-2'>Your Gateway to Effortless Shopping</p>
                    <img src={ecommerceimage} className='hidden sm:block sm:w-full'/>
                </div>
                 <div className='py-8 sm:w-[50%] w-full px-8 rounded-l-3xl sm:rounded-r-none bg-white rounded-r-3xl '>
                    <img src={demologo} className='w-20 mx-auto'/>
                    <form onSubmit={submit}>    
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
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
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
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
