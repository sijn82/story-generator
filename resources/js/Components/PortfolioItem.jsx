import { Link, Head } from '@inertiajs/react';

export default function PortfolioItem ({title, article, link, number}) {

    return (
        <div className="w-full px-3 md:px-12 border-2 mb-6 pb-3 relative">
            <div className='top-2 left-2 absolute text-black/50 font-bold border-2 p-2'>{number}</div>
            <div className='mx-12'>
                <Link
                    href={link}
                    className={`rounded-md px-3 font-bold text-black/50 ring-1 ring-transparent transition ${link ? "hover:text-orange-400" : ""} focus:outline-none focus-visible:ring-[#FF2D20]`}
                >
                    <div className='font-bold text-lg'>{title}</div>
                </Link>
            </div>
        
            <div className="mx-3 md:mx-12">
                {article.split('\n').map((paragraph, index) => (
                    <p className="mb-3" key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
    )
}