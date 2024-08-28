import { Link, Head } from '@inertiajs/react';

export default function PortfolioItem ({title, article, link}) {

    return (
        <div className="w-full px-12 py-6 border-2">
            <div className='mx-12'>
                <Link
                    href={link}
                    className="rounded-md px-3 font-bold text-black/50 ring-1 ring-transparent transition hover:text-orange-400 focus:outline-none focus-visible:ring-[#FF2D20]"
                >
                    <div className='font-bold text-lg'>{title}</div>
                </Link>
            </div>
        
            <div className="mx-12">
                {article.split('\n').map((paragraph, index) => (
                    <p className="my-6" key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
    )
}