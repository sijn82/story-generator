import { useEffect, useState } from "react";
import { router } from '@inertiajs/react'

export default function GameOver({gameStatus, chipStack, highScores, auth = null}) {

    const [name, setName] = useState('');
    const [scoreSubmitted, setScoreSubmitted] = useState(false);
 

    const submitHighScore = async () => {
        router.post('highscore/store', {
            score: chipStack, 
            type: 'blackjack', 
            name: name, 
            user_id: auth?.user?.id ?? null
        });
        setScoreSubmitted(true);
    }

    const topTenWorthy = (score) => {
        // check if the current chip stack is greater than the lowest highscore
        // current lowest top ten score
        let lowestScore = Math.min(...highScores.map(highscore => highscore.score));
        return score > lowestScore;
    }

    const toggleModal = () => { 
        document.getElementById('modal').classList.toggle('hidden')
    }

    useEffect(() => {
       
    }, []);

    return (
        <div className="">
            <h1 className="font-bold text-center text-gray-600 text-3xl py-4">Game Over</h1>
            <div id="result" className="mb-4 flex w-full justify-center">
                    
                {
                    chipStack > 0 ? 
                    
                    <div className="mx-4 flex items-center justify-center border border-2 p-3 bg-white">
                        <h2 className="text-center font-bold text-gray-600"> { chipStack > 5000 ? 
                            "You beat the house!" : chipStack === 5000 ? 
                            "You left without losing a chip! Did you even play?" : 
                            "That didn't go great but you left on your terms!"}
                        </h2>
                    </div>
                    
                    :
                    <div className="mx-4 flex items-center justify-center border border-2 p-3 bg-white">
                        <h2 className="font-bold text-gray-600 text-center"> The house always wins in the end!</h2>
                        {/* <p className="font-bold text-gray-600 text-center">{gameStatus}</p> */}
                    </div>

                }
                        
            </div>
            <div className=" flex h-full justify-center">
            
                
                {
                    topTenWorthy(chipStack) && !scoreSubmitted ?
                    // <div className="mx-4 flex items-center border border-2 p-3 grid grid-rows-2 bg-white">
                    <div id="top-ten-form" className="">
                        <div className=" p-4">
                            <h2 className="text-center font-bold text-amber-500 text-xl mb-4"> New High Score!</h2>
                            <div className="flex flex-col">
                                <label className="font-bold text-gray-600">Enter your name:</label>
                                <input type="text" name="name" id="name" className="border rounded border-2 p-1" onChange={(e) => setName(e.target.value)} />
                                <button className="border border-2 p-2 mt-2 rounded bg-cyan-600 text-white mx-auto" onClick={submitHighScore}>Submit</button>
                            </div>
                        </div>
                        
                    </div> :
                    <div id="highscores">
                    <h2 className="font-bold text-gray-600 text-xl text-center mb-3">High Scores</h2>
                        {
                            highScores.length > 0 ?
                            <div className="mx-4 flex items-center border border-2 p-3 bg-white">
                                
                                <div className="grid grid-cols-2 gap-3">
                                    {
                                        highScores.map((score, index) => (
                                            <div key={score.id} className=" grid grid-cols-8 border-b-2 items-center">
                                                <h2 className="font-bold border-r-2 text-gray-600">{index + 1}</h2>
                                                <div className="grid grid-cols-2 items-center col-span-7  p-1 gap-1">
                                                    <p className="font-bold text-gray-600">{score.name}</p>
                                                    <p className="font-bold text-gray-600 text-right">{score.score}</p>
                                                </div>
                                            </div>
                                            
                                        ))
                                    }
                                </div>
                            </div> :
                            <div>
                                <h2 className="font-bold text-gray-600">Unable to retrieve highscores</h2>
                            </div>
                        }
                </div>
                }
                
            </div>
        </div>
        
        )
}
    
    