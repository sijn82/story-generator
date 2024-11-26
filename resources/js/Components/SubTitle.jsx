export default function SubTitle({title, small = false, indent = ''})
{
    return (
        <div className={`font-bold ${small ? 'text-xl' :'text-2xl'} ${indent} text-zinc-500 my-6`}> {title} </div>
    );
}