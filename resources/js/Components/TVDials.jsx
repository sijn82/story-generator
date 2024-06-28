
export default function TVDials({turnedOn, setTurnedOn, startGame, setStartGame, zoom, setZoom}) {
    return (
        <div id="dials" className="justify-between flex h-full items-center px-8">
            <div>
                <h2 className={`text-center font-bold mb-1 border border-1 border-red-900 bg-orange-800 transition-all duration-1000 ${turnedOn && 'text-white'}`}>On</h2>
                <div id="dial-1" className="rounded-full h-16 aspect-square border border-2 border-yellow-700 bg-lime-950 items-center flex" onClick={() => setTurnedOn(turnedOn => !turnedOn )}>
                    <hr width="100%" align="left" className={`transition-all duration-1000 border-yellow-700 ${turnedOn ? 'rotate-90' : ''}`} />
                </div>
            </div>
            <div>
                <h2 className={`text-center font-bold mb-1 border border-1 border-red-900 bg-orange-800 transition-all duration-1000 ${startGame && 'text-white'}`}>Start</h2>
                <div id="dial-2" className="rounded-full h-16 aspect-square border border-2 border-yellow-700 bg-lime-950 items-center flex" onClick={() => setStartGame(startGame => !startGame )}>
                    <hr width="100%" align="left" className={`transition-all duration-1000 border-yellow-700  ${startGame ? 'rotate-90' : ''}`} />
                </div>
            </div>
            <div>
                <h2 className={`text-center font-bold mb-1 border border-1 border-red-900 bg-orange-800 transition-all duration-1000 ${zoom && 'text-white'}`}>Zoom</h2>
                <div id="dial-3" className="rounded-full h-16 aspect-square border border-2 border-yellow-700 bg-lime-950 items-center flex" onClick={() => setZoom(zoom => !zoom)}>
                    <hr width="100%" align="left" className={`transition-all duration-1000 border-yellow-700 ${zoom ? 'rotate-90' : ''}`} />
                </div>
            </div>
        </div>
    );
}