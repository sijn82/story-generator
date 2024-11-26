export default function Quote({text, italics})
{
    return (
        <div className={`text-zinc-700 my-3 max-w-prose md:text-lg mx-auto ${italics ? 'italic' : ''}`}>
            {'"' + text + '"'}
        </div>
    );
}