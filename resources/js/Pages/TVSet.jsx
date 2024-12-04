
import React, { useState } from 'react';
import Typewriter from '@/Components/Typewriter';
import { Button } from '@mui/base';
import BlackJack from '@/Components/BlackJack';
import TVDials from '@/Components/TVDials';
import ReactGA from 'react-ga4';

export default function TVSet({ auth, tvShow, deck, high_scores }) {

    const [turnedOn, setTurnedOn] = useState(false); 
    const [startGame, setStartGame] = useState(false);
    const [zoom, setZoom] = useState(false);
    ReactGA.send({hitType: "pageview", page: window.location.pathname, title: "TV Set Loaded"});

    return (
        <div className="h-screen flex flex-col" >
            
                {
                    zoom ? 
                    <div className="flex h-full w-screen">
                        <div id="internal" className="lg:p-12 lg:bg-[#B6BAB3] w-full">
                            <div id="screen" className={`h-full tall:rounded-[12em] medium:rounded-[3em] lg:rounded-[8em] border border-2 ${turnedOn ? 'bg-cyan-100' : 'bg-black'}`}>
                                <div id="tv-show" className="h-full font-bold text-4xl flex justify-center items-center">
                                    {turnedOn && !startGame ?
                                    <>
                                        <Typewriter
                                            text="Black Jack" 
                                            additionalText="Start Game" 
                                            textDelay={300} 
                                            additionalTextDelay={100}
                                            // setCompleted=
                                        />
                                        {/* <Button onClick={() => setStartGame(startGame => !startGame )}>Start Game</Button> */}
                                    </>
                                    :
                                    turnedOn && startGame ?
                                    <>
                                        <BlackJack deck={deck} zoom={true} setZoom={setZoom} highScores={high_scores}/>
                                    </>
                                    :
                                    <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    :
                    <div className="flex h-full border border-2 p-5 bg-[url('https://sijn-portfolio.s3.eu-west-2.amazonaws.com/chevrons.svg')]">
                        <div id="outer-case" className={`h-full relative aspect-square m-auto border border-2 border-red-900 rounded-lg p-12 bg-[url('https://sijn-portfolio.s3.eu-west-2.amazonaws.com/woodeffect.svg')]`}>
                            {/* <div className='absolute top-0 font-bold bg-white text-red-500 sm:text-lime-500 md:text-yellow-500 lg:text-cyan-500 xl:text-purple-500 2xl:text-pink-500'>
                                    WHAT COLOUR AM I?
                            </div> */}
                            <div id="left-case-trim" className="absolute inset-y-0 left-6 w-0.5 bg-gray-400"></div>
                            
                            <div id="outer-case-inner" className="grid h-full border border-2 border-red-900 grid-rows-10 bg-orange-900">
                                <div id="internal" className="row-span-7 tall:p-12 medium:p-8 p-6 bg-[#B6BAB3]">
                                    <div id="screen" className={`h-full tall:rounded-[12em] medium:rounded-[3em] rounded-[2em] border border-2 transition-all duration-1000 ${turnedOn ? 'bg-cyan-100' : 'bg-black'}`}>
                                        <div id="tv-show" className="h-full font-bold text-4xl flex justify-center items-center">
                                            {turnedOn && !startGame ?
                                            <>
                                                <Typewriter
                                                    text="Black Jack" 
                                                    additionalText="Start Game" 
                                                    textDelay={300} 
                                                    additionalTextDelay={100}
                                                    // setCompleted=
                                                />
                                                {/* <Button onClick={() => setStartGame(startGame => !startGame )}>Start Game</Button> */}
                                            </>
                                            :
                                            turnedOn && startGame ?
                                            <>
                                                <BlackJack deck={deck} highScores={high_scores}/>
                                            </>
                                            :
                                            <></>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div id="bottom-grill" className={`row-span-3 border-t border-t-2 border-red-900 bg-[url('https://sijn-portfolio.s3.eu-west-2.amazonaws.com/crosshatch.svg')]`}>
                                    <TVDials 
                                        turnedOn={turnedOn} 
                                        setTurnedOn={setTurnedOn} 
                                        startGame={startGame} 
                                        setStartGame={setStartGame} 
                                        zoom={zoom} 
                                        setZoom={setZoom}
                                    />
                                </div>
                            </div>
                            <div id="right-case-trim" className="absolute inset-y-0 right-6 w-0.5 bg-gray-400"></div>
                        </div>
                    </div>
                }
                
            </div>
        
    );
};