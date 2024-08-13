import { Link, Head } from '@inertiajs/react';

export default function PortfolioItem ({title, article, link}) {
    return (
        <div className="grid grid-rows-3 items-center w-full px-12">
            
            <Link
                href={link}
                className="rounded-md px-3 py-2 font-bold text-black/50 ring-1 ring-transparent transition hover:text-orange-400 focus:outline-none focus-visible:ring-[#FF2D20] text-center"
            >
                <div className='font-bold text-lg'>{title}</div>
            </Link>
            <div className="mx-12">{article}</div>
        </div>
    )
}