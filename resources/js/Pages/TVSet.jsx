
import React, { useState } from 'react';
import Typewriter from '@/Components/Typewriter';
import { Button } from '@mui/base';
import BlackJack from '@/Components/BlackJack';

export default function TVSet({ auth, tvShow, deck }) {

    const [turnedOn, setTurnedOn] = useState(false); 
    const [startGame, setStartGame] = useState(false);
    const [zoom, setZoom] = useState(false);

    return (
        <div className="h-screen flex flex-col" >
            <div className="flex h-full border border-2 m-5 p-5">
                {
                    zoom ? 
                    <div className="flex h-full w-screen">
                        <div id="internal" className="p-12 bg-green-950 w-full">
                            <div id="screen" className={`h-full rounded-3xl border border-2 ${turnedOn ? 'bg-cyan-100' : 'bg-black'}`}>
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
                                        <BlackJack deck={deck} zoom={true}/>
                                    </>
                                    :
                                    <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    :
                    <div id="outer-case" className="h-full aspect-square m-auto border border-2 rounded-lg p-10 bg-orange-800">
                        <div id="outer-case-inner" className="grid h-full border border-2 grid-rows-10 bg-orange-900">
                            <div id="internal" className="row-span-7 p-12 bg-green-950">
                                <div id="screen" className={`h-full rounded-3xl border border-2 transition-all duration-1000 ${turnedOn ? 'bg-cyan-100' : 'bg-black'}`}>
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
                                            <BlackJack deck={deck}/>
                                        </>
                                        :
                                        <></>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div id="bottom-grill" className={`row-span-3 border-t border-t-2 bg-[url('storage/images/crosshatch.svg')]`}>
                                <div id="dials" className="justify-between flex h-full items-center px-8">
                                    <div>
                                        <h2 className={`text-center font-bold mb-1 border border-1 border bg-orange-800 transition-all duration-1000 ${turnedOn && 'text-white'}`}>On</h2>
                                        <div id="dial-1" className="rounded-full h-16 aspect-square border border-2 bg-lime-950 items-center flex" onClick={() => setTurnedOn(turnedOn => !turnedOn )}>
                                            <hr width="100%" align="left" className={`transition-all duration-1000 ${turnedOn ? 'rotate-90' : ''}`} />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className={`text-center font-bold mb-1 border border-1 border bg-orange-800 transition-all duration-1000 ${startGame && 'text-white'}`}>Start</h2>
                                        <div id="dial-2" className="rounded-full h-16 aspect-square border border-2 bg-lime-950 items-center flex" onClick={() => setStartGame(startGame => !startGame )}>
                                            <hr width="100%" align="left" className={`transition-all duration-1000 ${startGame ? 'rotate-90' : ''}`} />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className={`text-center font-bold mb-1 border border-1 border bg-orange-800 transition-all duration-1000 ${zoom && 'text-white'}`}>Zoom</h2>
                                        <div id="dial-3" className="rounded-full h-16 aspect-square border border-2 bg-lime-950 items-center flex" onClick={() => setZoom(zoom => !zoom)}>
                                            <hr width="100%" align="left" className={`transition-all duration-1000 ${zoom ? 'rotate-90' : ''}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                }
                
            </div>
        </div>
    );
};