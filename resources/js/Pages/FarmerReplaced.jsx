import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { start_maze, navigate_route, next_step, calculate_initial_routes, calculate_directions_available } from '@/Helpers/Text/FarmerWasReplaced';
import Title from '@/Components/Title';
import SubTitle from '@/Components/SubTitle';
import Paragraph from '@/Components/Paragraph';

export default function FarmerReplaced() {

    return (
        <div className='max-w-screen-lg mx-auto'>
            <Title title="The Farmer Was Replaced" />
            <div className='px-3 md:px-12 mx-3 md:mx-12 mb-12'>
                <div>
                    <SubTitle title="Task" />
                    <Paragraph 
                        text="The challenge is essentially to navigate the drone around a randomly generated maze.  
                        An important side note is that the maze will not generate looping paths, so following a path will eventually lead to a dead end.  
                        With this in mind I decided upon a solution which would have the drone calculate the initial directions available to it from its spawn position and then navigate a path until it reached the end, making a note of each junction it encountered along the way."
                    />
                    <Paragraph 
                        text="If the drone didn't encounter the treasure along the first path, it would backtrack to the previous junction and try an alternative path.  
                        If the drone returned to a junction and had already exhausted all the alternative paths, it would continue to backtrack to the next junction or return back to its starting position if they had all been explored.  
                        If it returned back to its starting positon then it would follow another direction until it encountered the treasure."
                    />
                    <Paragraph 
                        text="One final note is that a completed maze returns to a regular field, so there is a check in place as to what type of entity is below the drone and it will 'fertilize' the ground beneath until it successfully generates a new maze to navigate, creating a loop."
                    />
                    <SubTitle title="Solution" />
                </div>
                <div>
                    <div className='my-6 border-lime-300 border-2 text-xs m-auto'>
                        <SyntaxHighlighter language="python" style={docco}>
                            {start_maze}
                        </SyntaxHighlighter>
                    </div>
                    <div className='my-6 border-lime-300 border-2 text-xs'>
                        <SyntaxHighlighter language="python" style={docco}>
                            {calculate_initial_routes}
                        </SyntaxHighlighter>
                    </div>
                    <div className='my-6 border-lime-300 border-2 text-xs'>
                        <SyntaxHighlighter language="python" style={docco}>
                            {navigate_route}
                        </SyntaxHighlighter>
                    </div>
                    <div className='my-6 border-lime-300 border-2 text-xs'>
                        <SyntaxHighlighter language="python" style={docco}>
                            {next_step}
                        </SyntaxHighlighter>
                    </div>
                    <div className='my-6 border-lime-300 border-2 text-xs'>
                        <SyntaxHighlighter language="python" style={docco}>
                            {calculate_directions_available}
                        </SyntaxHighlighter>
                    </div>
                </div>
                <div>
                    <SubTitle title="Demo" />
                    <div className='flex justify-center pb-6'>
                        <video className='border-lime-300 border-2 w-full' controls src="https://d1fftu7568zsov.cloudfront.net/the_farmer_was_replaced_maze_run.mp4"></video>
                    </div>
                </div>
                <div>
                    <SubTitle title="Next Steps" />
                    <Paragraph 
                        text="The main issue I have with my current solution is that the drone attempts to move in each cardinal direction at every step before returning to its current location, causing it to jitter around the maze. 
                        The in built move function (moves the drone and) returns true if it is able to move in the direction given or false if prevented by hedgerow."
                    />
                    <Paragraph 
                        text="Ideally I would like it to make this check without actually moving but I couldn't find a way.  
                        This may be a limitation of my approach and I could reduce the checks by allowing the drone to continue forward as soon as it passes a movement check but for my first attempt at this challenge I was keen to create a solution that adhered to my initial logic before optimising.  
                        In hindsight I could also have taken the approach of making the drone head left of its current orientation whenever blocked which would also succeed in a maze that doesn't contain loops."
                    />
                    <Paragraph 
                        text="Prior to this challenge I had no experience with python but I enjoyed the experience and would like to continue learning it even though I'm not 100% sold on symantic whitespacing. 
                        That said, another project I'm keen on exploring is Godot and writing in GDScript, which also structures code blocks with indentation - so hopefully it will grow on me."
                    />
                </div>
            </div>
        </div>
    )
}