import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PortfolioItem from '@/Components/PortfolioItem';

export default function Portfolio() {

    return (
        <div className='max-w-screen-lg mx-auto'>
            <div className="text-center font-bold text-2xl py-12 text-zinc-500">Portfolio Projects</div>
            <div className="px-3 md:px-12 mx-3 md:mx-12 pb-12 text-zinc-600">
                Hey, thanks for taking a look! Apologies for the lack of "wow factor", as you can probably tell this site was quickly assembled so you had somewhere to go. I am currently prioritising adding a variety of portfolio projects before I work on a more polished theme.
                The number of items in this list will slowly build over time as I add more projects but for now you can click the links to check out Black Jack or my solution to The Farmer Was Replaced maze challenge.  
            </div>
            {/* <div className="px-12 mx-12 my-6">    
                As a side note, after building the Black Jack game I prioritised expanding my AWS experience; setting this site up in an ECS2 instance with an RDS MYSQL database and S3 bucket for storage.  
                I'm also using Github Actions for automated deployment.  Now that the infrastructure is in place and you have something to look at, I'm looking forward to adding the "wow".
            </div> */}
            <div className='mx-6'>
                <PortfolioItem 
                    title="AWS"
                    article="While not technically a portfolio project, one of my goals for this site was to host it all in AWS to expand my knowledge.  This site is running in an ECS2 instance with an RDS MYSQL database and S3 bucket for assets and storage.  I'm also using Github Actions for automated deployment."
                    number={0.5}
                    link={null}
                />
                <PortfolioItem
                    title="Black Jack"
                    article="I was trying to think of some fun coding ideas and the first that came to mind was recreating Black Jack, potentially as one of several card games.  The second was playing around with svg's so I combined the two together into this. There is still some work to do with the design, specifically on smaller screens, as I made the classic mistake of styling everything on my monitor and putting responsive design on the todo list. 
                    I always intended to allow the user to zoom into and focus on the game but at the moment on smaller screens this is a necessity for it to display properly, and it doesn't work at all on mobile which I intend to fix. State persistence is another issue to be resolved as zooming in and out will currently reset the game. 
                    The design in general is also more a culmination of having some fun rather than keeping the design clean/neutral and more likely to appeal to all, which is how I think a lot of these portfolio pieces will go. If I was to try and explain my inspiration for this design I would probably say a blend of 1950's/1970's and Scooby Doo. I will say though, that I put a lot more effort into making the game mechanics as bug free as possible."
                    link={route("tvset.show")}
                    number={1}
                />
                <PortfolioItem 
                    title="The Farmer Was Replaced"
                    article="This is a coding game I heard about where you automate a drone using a language very similar to python.  So similar in fact that it has been recommended as a fun way to familiarise yourself with the language while solving increasingly complex challenges. One of those challenges is to automate the drone to navigate a randomly generated maze until it finds the treasure.
                    Prior to this challenge I had no experience with python but I enjoyed the experience and think it's important I remain open to learning new languages, though I'm not 100% sold on symantic whitespacing."
                    link={route("farmer.show")}
                    number={2}
                />
                {/* <PortfolioItem 
                    title="AI Story Generator"
                    article="The original goal for this project was to play around with Laravel Prompts and Open AI.  From the command line you could (optionally) create an account (login details), and start making some story assets. If the user id was passed into the next steps, the assets would be saved to their account, otherwise they would go into the pool of generic assets. 
                    To begin, 3 story scenarios are generated, which include a name and a brief description. The user then selects one of the scenarios to generate 3 characters using the scenario description for inspiration.  Each character comes with a name, age, profession, personality and appearance. If the user logged into their account they could then see any stories and characters they had created. 
                    While it worked, the character generation was temperamental often requiring several attempts to return a valid response.  Frustratingly, rather than timing out or returning an error, it returned an empty object despite the json schema clearly defining what was expected.  I also found that despite giving the OpenAI model a fairly loose prompt to encourage variety, the responses were always variations of a very similar theme and character repetition was evident."
                    link={route("story-generator.show")}
                    number={3}
                /> */}
            </div>
        </div>
    )
        
    
}