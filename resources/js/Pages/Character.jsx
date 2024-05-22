import { Link, Head } from '@inertiajs/react';

export default function Character({ auth, character }) {
    return (
        <div>
            <div key={character.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-4">
                <div className="p-6 text-gray-900">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">{character.profile.name}</h2>
                    <p className="text-gray-600 mt-2"><span className="font-semibold text-gray-800">Age: </span>{character.profile.age}</p>
                    <p className="text-gray-600 mt-2"><span className="font-semibold text-gray-800">Profession: </span>{character.profile.profession}</p>
                    <p className="text-gray-600 mt-2"><span className="font-semibold text-gray-800">Appearance: </span>{character.profile.appearance}</p>
                    <p className="text-gray-600 mt-2"><span className="font-semibold text-gray-800">Personality: </span>{character.profile.personality}</p>
                </div>
                <div className="p-6 text-gray-900">
                    <h1 className="py-6 font-semibold text-center text-xl text-gray-800 leading-tight">Story</h1>
                    <div key={character.story.id}>
                        <h3 className="font-semibold text-lg text-gray-800 leading-tight">{character.story.scenario.title}</h3>
                        <p className="text-gray-600 mt-2">{character.story.scenario.description}</p>
                    </div>
                </div>
                <h1 className="py-6 font-semibold text-center text-xl text-gray-800 leading-tight">NPC's</h1>
                {
                    character.story?.npcs?.map((npc) => (
                        <div key={npc.id} className="p-6 text-gray-900">
                            
                            <div key={npc.id}>
                                <h3 className="font-semibold text-lg text-gray-800 leading-tight">{npc.profile.name}</h3>
                                <p className="text-gray-600 mt-2"><span className="font-semibold text-gray-800">Age: </span>{npc.profile.age}</p>
                                <p className="text-gray-600 mt-2"><span className="font-semibold text-gray-800">Profession: </span>{npc.profile.profession}</p>
                                <p className="text-gray-600 mt-2"><span className="font-semibold text-gray-800">Appearance: </span>{npc.profile.appearance}</p>
                                <p className="text-gray-600 mt-2"><span className="font-semibold text-gray-800">Personality: </span>{npc.profile.personality}</p>
                            </div>
                        </div>
                    ))
                }
                
            </div>
        </div>
    )
}