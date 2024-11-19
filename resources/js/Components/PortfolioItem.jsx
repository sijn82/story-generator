import { Link, Head } from '@inertiajs/react';

export default function PortfolioItem ({title, article, link, number}) {

    return (
        <div className="w-full my-12 relative bg-zinc-100 border-2 border-lime-200 px-3">
            <div className='top-4 left-4 absolute text-zinc-500 font-bold border-2 border-lime-200 p-3 w-12 text-center'>{number}</div>
            <div className='mx-12'>
                <Link
                    href={link}
                    className={`rounded-md px-3 font-bold text-zinc-500 ring-1 ring-transparent transition ${link ? "hover:text-orange-400" : ""} focus:outline-none focus-visible:ring-[#FF2D20]`}
                >
                    <div className='font-bold text-2xl ml-6'>{title}</div>
                </Link>
            </div>
        
            <div className="text-zinc-700 max-w-prose md:text-lg mx-auto pb-3">
                {article.split('\n').map((paragraph, index) => (
                    <p className="mb-3" key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
    )
}