import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PortfolioItem from '@/Components/PortfolioItem';
import Paragraph from '@/Components/Paragraph';

export default function Portfolio() {

    return (
        <div className='max-w-screen-lg mx-auto'>
            <div className='px-3 md:px-12 mx-3 md:mx-12 mb-12'>
                <div className="text-center font-bold text-3xl py-9 text-zinc-500">Portfolio Projects</div>
                <Paragraph 
                    text="Hey, thanks for taking a look and apologies for the current lack of 'wow factor'. As you can probably tell this site was quickly assembled so you had somewhere to go. I have prioritised creating a variety of portfolio projects before I work on a more polished theme."
                />
                <Paragraph 
                    text="The list below will continue to grow and I'm really enjoying the excuse to keep coming up with more ideas.  Rather than just show you a link to my repo I'm trying to turn each piece into an article where I break down my thought process but naturally there are code examples in there too."
                />
            </div>

            {/* <div className="px-12 mx-12 my-6">    
                As a side note, after building the Black Jack game I prioritised expanding my AWS experience; setting this site up in an ECS2 instance with an RDS MYSQL database and S3 bucket for storage.  
                I'm also using Github Actions for automated deployment.  Now that the infrastructure is in place and you have something to look at, I'm looking forward to adding the "wow".
            </div> */}
            <div className='mx-6'>
                <PortfolioItem 
                    title="AWS"
                    article="While not technically a portfolio project, one of my goals for this site was to host it all in AWS to expand my knowledge.  This site (which is built with Laravel, React and Tailwind) is running in an ECS2 instance with an RDS MYSQL database and S3 bucket for assets and storage.  I'm also using Github Actions for automated deployment."
                    number={0.5}
                    link={null}
                />
                <PortfolioItem
                    title="Black Jack"
                    article="This is the first of what I hope will become a series of games.  I also used it as an opportunity to play around with svg's.  The design needs a second pass but I'm pretty happy with the how the game plays."
                    link={route("blackjack.show")}
                    number={1}
                />
                <PortfolioItem 
                    title="The Farmer Was Replaced"
                    article="This is a coding game where you automate a drone using a language very similar to python.  So similar in fact that it has been recommended as a fun way to familiarise yourself with the language while solving increasingly complex challenges. One of those challenges is to automate the drone to navigate a randomly generated maze until it finds the treasure."
                    link={route("farmer.show")}
                    number={2}
                />
                <PortfolioItem 
                    title="AI Story Generator"
                    article="The goal for this project was to play around with Laravel Prompts and Open AI. I quite liked the idea of making a text based adventure on the command line where you selected from a choice of scenarios and then picked your player character from another choice of AI generated options."
                    link={route("story-generator.show")}
                    number={3}
                />
                <PortfolioItem
                    title="Follow The White Rabbit"
                    article="Trust Pilot have an interesting challenge where you're given a list of 100,000 words, the anagram of a secret phrase and the MD5 hash of the secret phrase.  The task is to create an algorithm which solves the puzzle and there are 3 levels of difficulty.  So far I have solved the easy and medium md5 hashes with only the difficult solution left to go."
                    link={route("follow-white-rabbit.show")}
                    number={4}
                />
            </div>
        </div>
    )
        
    
}