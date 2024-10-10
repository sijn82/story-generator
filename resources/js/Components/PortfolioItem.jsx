import { Link, Head } from '@inertiajs/react';

export default function PortfolioItem ({title, article, link, number}) {

    return (
        <div className="w-full px-3 md:px-12 mb-6 pb-3 relative bg-zinc-100 border-2 border-lime-200">
            <div className='top-4 left-4 absolute text-zinc-500 font-bold border-2 border-lime-200 p-2'>{number}</div>
            <div className='mx-12'>
                <Link
                    href={link}
                    className={`rounded-md px-3 font-bold text-zinc-500 ring-1 ring-transparent transition ${link ? "hover:text-orange-400" : ""} focus:outline-none focus-visible:ring-[#FF2D20]`}
                >
                    <div className='font-bold text-xl'>{title}</div>
                </Link>
            </div>
        
            <div className="mx-3 md:mx-12 text-zinc-600">
                {article.split('\n').map((paragraph, index) => (
                    <p className="mb-3" key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
    )
}