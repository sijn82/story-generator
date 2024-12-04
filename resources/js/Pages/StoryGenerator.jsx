import Title from '@/Components/Title';
import SubTitle from '@/Components/SubTitle';
import Paragraph from '@/Components/Paragraph';
import Quote from '@/Components/Quote';
import ReactGA from 'react-ga4';

export default function StoryGenerator()
{

    ReactGA.send({hitType: "pageview", page: window.location.pathname, title: "Story Generator Article"});

    return (
        <div className='max-w-screen-lg mx-auto'>
            <Title title="Story Generator" />
            <div className='px-3 md:px-12 mx-3 md:mx-12 mb-12'>
                <div>
                    <SubTitle title="Task" />
                    <Paragraph 
                        text="This task originated as part of my 'lab days' development at work, where I decided to take a look at some Laravel packages we weren't currently using to see if they might be useful in future.  
                        I'd also been working with OpenAI on some recent tickets including a switch to a new model after 'text-davinci-003' was deprecated. 
                        I'd noticed that while our new model was faster, the responses seemed more generic. I wanted to take a closer look into how creative the new model could be."
                    />
                    <Paragraph 
                        text="As reponses are limited in length and also factor in the length of the prompt, I wanted to generate the story through a series of prompts which would use previous responses to hopefully keep them relevant without passing in everything that had come before it.  
                        I also wanted the user to gradually build up the story, making choices along the way similar in style to a 'choose your own adventure' narrative."
                    />
                    <SubTitle title="Solution" />
                    <SubTitle title="AI Prompts" small={true} indent={true} />
                    <Quote 
                        text="Act as an AI supporting fiction writers in crafting extraordinary stories. 
                        Generate 3 story scenarios for an interactive roleplaying game using the provided JSON schema. 
                        The scenarios should be unique and interesting, including a title and a brief description. 
                        For inspiration, think about the tales you might find in a fantasy, science fiction, or Lovecraftian horror story."
                        italics={true}
                    />
                    <Quote 
                        text="Act as an AI supporting fiction writers in crafting extraordinary characters. 
                        Generate 3 character profiles using the provided JSON schema. 
                        The characters should be unique and interesting. 
                        Include a brief description of their physical appearance and a brief summary of their personality traits. 
                        Along with their age, profession and full name. With this artistic objective in mind, think about the characters you might find in a fantasy, science fiction, or Lovecraftian horror story with the following description: $story->scenario->description."
                        italics={true}
                    />
                    <SubTitle title="Laravel Prompts" small={true} indent={true} />
                    <div>
                        <img className="my-6 p-4 border-lime-300 border-2" src="http://d1fftu7568zsov.cloudfront.net/generate_scenarios_1.png" alt="" />
                        <img className="my-6 p-4 border-lime-300 border-2" src="http://d1fftu7568zsov.cloudfront.net/selected_scenario_1.png" alt="" />
                        <img className="my-6 p-4 border-lime-300 border-2" src="http://d1fftu7568zsov.cloudfront.net/generate_characters.png" alt="" />
                        <img className="my-6 p-4 border-lime-300 border-2" src="http://d1fftu7568zsov.cloudfront.net/selected_character.png" alt="" />
                    </div>
                    <SubTitle title="Initial Conclusions" />
                    <Paragraph 
                        text="While this was still in a very early phase it quickly became apparent that the model (gpt-3.5-turbo-instruct) had a limited pool of inspiration and regularly returned no response at all even with the JSON schema provided.  
                        Story generation was much more reliable than character generation but I didn't get a chance to work out why before having to move away from OpenAI and switching to a new model/provider.  
                        I opted for Hugging Face as the new provider and Mistral-Small-Instruct-2409 for the model on a free tier."
                    />
                    <Paragraph 
                        text="After a couple of issues getting the new model to work with the same JSON schema, I was pleasantly surprised to find that it actually returned quicker, more reliable results.  
                        However it still suffered from a lack of variety and two new quirks; returning a description that was just the title again and sometimes returning the exact same response if you sent the same prompt again too quickly.  
                        This happened with both prompts but waiting 5-10 minutes before trying again seemed to fix the problem."
                    />
                    <SubTitle title="Next Steps" />
                    <Paragraph 
                        text="Laravel Prompts is a small and easily explored package and this quickly became more about experimenting with AI models.  With this in mind I'd like to take this away from the command line and start playing with streamed responses on the frontend."
                    />
                </div>
            </div>
        </div>
    )
}