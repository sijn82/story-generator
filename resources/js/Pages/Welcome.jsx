import { Link, Head } from '@inertiajs/react';
import React from 'react';
import Typewriter from '@/Components/Typewriter';
import ConfettiExplosion from 'react-confetti-explosion';

export default function Welcome({ auth }) {

    // const handleImageError = () => {
    //     document.getElementById('screenshot-container')?.classList.add('!hidden');
    //     document.getElementById('docs-card')?.classList.add('!row-span-1');
    //     document.getElementById('docs-card-content')?.classList.add('!flex-row');
    //     document.getElementById('background')?.classList.add('!hidden');
    // };

    const [isExploding, setIsExploding] = React.useState(false);



    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50">
                <header className="items-center">
                    <nav className=" flex flex-1 justify-end">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-md px-3 py-2 font-bold text-black/50 ring-1 ring-transparent transition hover:text-orange-400 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2 font-bold text-black/50 ring-1 ring-transparent transition hover:text-green-400 focus:outline-none focus-visible:ring-[#FF2D20]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md px-3 py-2 font-bold text-black/50 ring-1 ring-transparent transition hover:text-orange-400 focus:outline-none focus-visible:ring-[#FF2D20]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        
                        <main className="mt-6">
                            <div className=" flex justify-center gap-1">
                                
                                <h1 className="text-4xl font-bold leading-tight lg:text-5xl flex justify-center items-center">
                                    <Typewriter
                                        text="Sijn.co.uk" 
                                        textDelay={200} 
                                        additionalText="Lab Days" 
                                        additionalTextDelay={100} 
                                        setCompleted={setIsExploding}
                                    />
                                    {isExploding && <ConfettiExplosion />}
                                </h1>
                            
                                <div>
                               
                                </div>
                                
                            </div>
                        </main>

                    </div>
                </div>
            </div>
        </>
    );
}
