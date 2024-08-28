import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PortfolioItem from '@/Components/PortfolioItem';

export default function Portfolio() {

    return (
        <div className='max-w-screen-lg mx-auto'>
            <div className="text-center font-bold text-xl my-12">Portfolio Projects</div>
            <div className="px-12 mx-12 my-3">
                Hey, thanks for taking a look! Apologies for the lack of "wow factor", as you can probably tell this page was quickly assembled so you had somewhere to go. 
                The number of items in this list will slowly build over time as I add more projects but for now you can click the link to check out Black Jack.  
            </div>
            <div className="px-12 mx-12 my-6">    
                As a side note, after building the Black Jack game I prioritised expanding my AWS experience; setting this site up in an ECS2 instance with an RDS MYSQL database and S3 bucket for storage.  
                I'm also using Github Actions for automated deployment.  Now that the infrastructure is in place and you have something to look at, I'm looking forward to adding the "wow".
            </div>
            <div>
                <PortfolioItem
                    title="Black Jack"
                    article="I was trying to think of some fun coding ideas and the first that came to mind was recreating Black Jack, potentially as one of several card games.  The second was playing around with svg's so I combined the two together into this. There is still some work to do with the design, specifically on smaller screens. I always intended to allow the user to zoom into and focus on the game but at the moment on smaller screens this is a necessity for it to display properly, and it doesn't work at all on mobile which I intend to fix.
                        State persistence is another issue to be resolved as zooming in and out will currently reset the game. The design in general is also more a culmination of having some fun rather than following any sort of best practise and that's how I think a lot of these portfolio pieces will go. If I was to try and explain my inspiration for this design I would probably say a blend of 1950's/1970's and Scooby Doo. I will say though, that I put a lot more effort into making the game as bug free as possible."
                    link={route("tvset.show")}
                />
            </div>
        </div>
    )
        
    
}