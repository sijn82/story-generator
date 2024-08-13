import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PortfolioItem from '@/Components/PortfolioItem';

export default function Portfolio() {

    return (
        <div>
            <div className="text-center font-bold text-xl my-12">Portfolio Projects</div>
            <div className="text-center">
                Hey, thanks for taking a look! The number of items in this list will slowly build over time as I add more little projects.
            </div>
            <div>
                <PortfolioItem
                    title="1: Black Jack"
                    article="I was trying to think of some fun coding ideas and the first that came to mind was recreating Black Jack, potentially as one of several card games.  
                        The second was playing around with svg's so I combined the two together into this. There is still some work to do with the design, specifically on smaller screens.  
                        I always intended to allow the user to zoom into and focus on the game but at the moment on smaller screens this is a necessity for it to display properly, which I intend to fix. 
                        State persistence is another issue to be resolved as zooming in and out will currently reset the game. 
                        The design in general is also more a culmination of having some fun rather than following any sort of best practise and that's how I think a lot of these portfolio pieces will go. 
                        If I was to try and explain my inspiration for this design I would probably say a blend of 1950's/1970's and Scooby Doo.
                        I will say though, that I put a lot more effort into making the game as bug free as possible."
                    link={route("tvset.show")}
                />
            </div>
        </div>
    )
        
    
}