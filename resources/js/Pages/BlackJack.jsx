import Title from "@/Components/Title";
import SubTitle from "@/Components/SubTitle";
import Paragraph from "@/Components/Paragraph";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { wood_effect_svg, calculate_current_total } from "@/Helpers/Text/BlackJack";
import CardHand from "@/Components/CardHand";
import Card from "@/Components/Card";
import { Link } from "@inertiajs/react";
import ReactGA from 'react-ga4';

export default function BlackJack()
{

    ReactGA.send({hitType: "pageview", page: window.location.pathname, title: "The Black Jack Article"});

    return (
        <div className='max-w-screen-lg mx-auto'>
            <Title title="Black Jack" />
            <div className='px-3 md:px-12 mx-3 md:mx-12 mb-12'>
                <div>
                    <SubTitle title="Task" />
                    <Paragraph 
                        text="I was trying to think of some fun coding ideas and the first that came to mind was recreating Black Jack, potentially as one of several card games.  
                        The second was playing around with svg's so I combined the two together into this."
                    />
                    <SubTitle title="SVG's" small={true} indent="ml-6" />
                    <Paragraph 
                        text="Some of my goals have been waiting patiently in the background for far too long and svg's are certainly one of them.  
                        For whatever reason utilising them hasn't come up in my day to day work life other than using a customer/designer's prebuilt logo.
                        So I decided to shoehorn them into this project by playing the game on a 1950's tv set. 
                        I also realised I would need some kind of card suit design to build the deck and as I'd been having fun with them, threw in a snazzy background."
                    />
                    <Paragraph 
                        text="I would also like to mention that all of my svg's were inspired by examples I found in articles online. Such as the wood effect being based upon this (https://css-tricks.com/creating-patterns-with-svg-filters/#aa-pine-wood). I would reference more here but so far I have been unable to find them all again.  I do plan on another svg project involving animations and I hope to update this at a later date, so as not to take credit for other people's work."
                    />
                    <div className="">
                        <SubTitle title="TV Set" small={true} indent="ml-10"/>
                        <Paragraph 
                            text="I wasn't looking to make a direct recreation but merely a version inspired by.
                            That said, an earlier version of this svg had a much more mahogany feel but it was lost and never replicated after an over zealous computer wipe."
                        />
                        <div className="grid grid-cols-2 gap-12 my-6 justify-items-center max-h-64">
                            <div>
                                <img src="https://d1fftu7568zsov.cloudfront.net/1950-tv-set.jpg" alt="" />
                            </div>
                            <div>
                                <img className="w-auto h-4/6"  src="https://d1fftu7568zsov.cloudfront.net/svg-1950-tv.png" alt="" />
                            </div>

                        </div>
                        <Paragraph 
                            text="The code below is for the wood effect svg and I found the trick to increasing saturation was to use feBlend along with the feColourMatrix.  
                            I spent far too long trying to recreate the mahogany effect and even pulled Copilot in to help as I had a subscription at the time but I remained unsatisfied with the results. Copilot seemed confident in its suggestions but was practically useless, which surprised me as I'd hoped it was a perfect use case."
                        />
                        <div className='my-6 border-lime-300 border-2 text-xs'>
                            <SyntaxHighlighter language="xml" style={docco}>
                                {wood_effect_svg}
                            </SyntaxHighlighter>
                        </div>
                        <SubTitle title="Cards" small={true} indent="ml-10"/>
                        <Paragraph 
                            text="Another key consideration were the cards themselves.  
                            I considered spending a lot longer on the design but ultimately decided upon something simple.  
                            Also, while the suit wasn't directly necessary to play Black Jack I still felt as though it was an important component."
                        />
                        <div className="grid grid-cols-4 justify-items-center my-8">
                            <Card 
                                card={{
                                    card_deck_id: 1, 
                                    created_at: "2024-07-24T09:43:27.000000Z", 
                                    id: 1, 
                                    in_play: true, 
                                    name: "A",
                                    suit: "Hearts",
                                    updated_at: "2024-07-24T09:43:27.000000Z",
                                    value: 11
                                }} showCard={true} setHand={() => {}} zoom={false}
                            />
                            <Card 
                                card={{
                                    card_deck_id: 1, 
                                    created_at: "2024-07-24T09:43:27.000000Z", 
                                    id: 2, 
                                    in_play: true, 
                                    name: "A",
                                    suit: "Spades",
                                    updated_at: "2024-07-24T09:43:27.000000Z",
                                    value: 11
                                }} showCard={true} setHand={() => {}} zoom={false}
                            />
                            <Card 
                                card={{
                                    card_deck_id: 1, 
                                    created_at: "2024-07-24T09:43:27.000000Z", 
                                    id: 3, 
                                    in_play: true, 
                                    name: "A",
                                    suit: "Diamonds",
                                    updated_at: "2024-07-24T09:43:27.000000Z",
                                    value: 11
                                }} showCard={true} setHand={() => {}} zoom={false}
                            />
                            <Card 
                                card={{
                                    card_deck_id: 1, 
                                    created_at: "2024-07-24T09:43:27.000000Z", 
                                    id: 4, 
                                    in_play: true, 
                                    name: "A",
                                    suit: "Clubs",
                                    updated_at: "2024-07-24T09:43:27.000000Z",
                                    value: 11
                                }} showCard={true} setHand={() => {}} zoom={false}
                            />
                        </div>
                        <SubTitle title="Black Jack" indent="ml-6"/>
                        <Paragraph 
                            text="When deciding upon which card game I wanted to make, Black Jack stood out as a simple one player game (which could be expanded to include other players once I introduce more comprehensive state management) and actions that could be clearly defined for the dealer.  
                            They would always pull another card until they reached 17+ or went bust."
                        />
                        <Paragraph 
                            text="The most complicated part of this logic was re-evaluating Aces, so that the card would be worth 11 unless that led to the player going bust.  
                            At which point it would set an ace in the player's hand to 1 and recalculate."
                        />
                        <div className='my-6 border-lime-300 border-2 text-xs'>
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {calculate_current_total}
                            </SyntaxHighlighter>
                        </div>
                        <Paragraph 
                            text="While the gameplay came together pretty easily, I quickly felt hamstring by the design.  
                            This was due to the initial decision to play the game on a tv set which narrowed the available space considerably."
                        />
                        <Paragraph 
                            text="However as I had been building the game while using a large monitor, and never really intended on making it mobile friendly, (despite using a mobile-first/utility-first CSS framework in TailwindCSS) - the extent of the problem was glossed over for too long."
                        />
                        <Paragraph 
                            text="I had always wanted to give the player an option to focus on the game and included a 'zoom' dial from the start.  
                            What I hadn't realised was that even on laptop screens it had become something of a necessity."
                        />
                        <Paragraph 
                            text="I've made some improvements since but in truth I need to give the whole design a second pass. 
                            Ideally so that it can offer the experience I originally desired for larger screens but also impresses on smaller screens including mobile devices."
                        />
                        <Paragraph 
                            text="If you've got this far then please give the game a go! It works well on larger screens and is pretty fun.  I've also added a highscore's table you can get onto if you cash out and make the top ten :)"
                        />
                        <Link
                            href={route("tvset.show")}
                            className={`rounded-md px-3 font-bold text-zinc-500 ring-1 ring-transparent transition hover:text-orange-400 focus:outline-none focus-visible:ring-[#FF2D20] text-center`}
                        >
                            <div className='font-bold text-2xl ml-6'>--- Play The Game ---</div>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
}