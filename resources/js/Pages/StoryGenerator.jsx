export default function StoryGenerator()
{
    return (
        <div className='max-w-screen-lg mx-auto'>
            <div className='text-center font-bold text-zinc-500 text-2xl my-6'> Story Generator </div>
            <div className='px-3 md:px-12 mx-3 md:mx-12'>
                <div>
                    <div className='font-bold text-lg text-zinc-500 my-3'> Original Task </div>
                    <div className="text-zinc-600 my-3">
                        This task originated as part of my 'lab days' development at work, where I decided to take a look at some Laravel packages we weren't currently using to see if they might be useful in future.  
                        I'd also been working with OpenAI on some recent tickets including a switch to a new model after 'text-davinci-003' was deprecated. 
                        I'd noticed that while our new model was faster, the responses seemed more generic. I wanted to take a closer look into how creative the new model could be.
                    </div>
                    <div className="text-zinc-600 my-3">
                        As reponses are limited in length and also factor in the length of the prompt, I wanted to generate the story through a series of prompts which would use previous responses to hopefully keep them relevant without passing in everything that had come before it.  I also wanted the user to gradually build up the story, making choices along the way similar in style to a 'choose your own adventure' narrative.
                    </div>
                    {/* <div className="text-zinc-600 my-3">
                        We'd had issues at work in the past with occasional responses not following the requested format so when we changed to a new model I was keen to find one which accepted JSON schemas to shape the response and was pleased with the results.
                    </div> */}
                    <div className='font-bold text-lg text-zinc-500 my-3'> Original Solution </div>
                    <div className="text-zinc-600 my-3">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}