import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stories, characters }) {

    console.log(stories); 
    console.log(characters);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Choose your character to continue...</div>
                    </div>
                    <div>
                        <h1 className="py-6 font-semibold text-center text-xl text-gray-800 leading-tight">Characters</h1>
                        {characters?.map((character) => (
                            <Link href={route('character.show', {id: character.id})}>
                                <div key={character.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-4">
                                <div className="p-6 text-gray-900">
                                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">{character.profile.name}</h2>
                                    <p className="text-gray-600 mt-2"><span className="font-semibold text-gray-800">Age: </span>{character.profile.age}</p>
                                    <p className="text-gray-600 mt-2"><span className="font-semibold text-gray-800">Profession: </span>{character.profile.profession}</p>
                                    <p className="text-gray-600 mt-2"><span className="font-semibold text-gray-800">Appearance: </span>{character.profile.appearance}</p>
                                    <p className="text-gray-600 mt-2"><span className="font-semibold text-gray-800">Personality: </span>{character.profile.personality}</p>
                                </div>
                            </div>
                            </Link>
                            
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
