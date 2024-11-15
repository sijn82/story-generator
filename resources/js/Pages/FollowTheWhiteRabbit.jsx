import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {convert_file_to_lazy_collection, strip_out_words_not_in_anagram, reduce_list_for_final_word_to_characters_remaining_in_anagram, generate_secret_phrase} from '@/Helpers/Text/FollowTheWhiteRabbit';

export default function FollowTheWhiteRabbit()
{
    return (
        <div className='max-w-screen-lg mx-auto'>
            <div className='text-center font-bold text-zinc-500 text-2xl my-6'> Follow The White Rabbit </div>
            <div className='px-3 md:px-12 mx-3 md:mx-12'>
                <div>
                    <div className='font-bold text-lg text-zinc-500 my-6'> Task </div>
                    <div className='text-zinc-600 mb-3'>
                        <img className="my-6 border-lime-300 border-2" src="http://d1fftu7568zsov.cloudfront.net/follow_the_white_rabbit_task.png" alt="" />
                    </div>
                    <div className='text-zinc-600 mb-3'>
                        This is their backend challenge, and as Laravel is my go to backend framework, I set up a new controller and got to work.  
                        Knowing that there are three levels of difficulty I made a couple of assumptions.  
                        Firstly, as the anagram is made of three words, the easiest phrase at least, would likely be the same.  
                        Secondly, as the anagram didn't include an apostrophy the easiest phrase probably wouldn't either, and would be made up of words using characters without diacritic marks like accents and umlauts.  
                        Which led me to a third assumption, that the hardest phase may be more than 3 words and will likely contain at least one word which contains a diacritic mark or apostrophy.
                    </div>
                    <div className='font-bold text-lg text-zinc-500 my-6'> Solution </div>
                    <div className='text-zinc-600 mb-3'>
                        The first thing I wanted to do was reduce the word count from nearly 100,000 words into something more manageable.  
                        The wordlist contained duplicates, individual characters not typically used as words and words which included letters not present in the anagram, so these were the first entries I stripped out after converting the text file into a lazy collection.
                        I also discovered that using the collection method unique on a lazy collection caused a huge performance drop off during the foreach loop, so I converted it into a regular collection after doing this.
                    </div>
                    <div>
                        <div className='my-6 border-lime-300 border-2 text-xs m-auto'>
                            <SyntaxHighlighter language="php" style={docco}>
                                {convert_file_to_lazy_collection}
                            </SyntaxHighlighter>
                        </div>
                        <div className='my-6 border-lime-300 border-2 text-xs m-auto'>
                            <SyntaxHighlighter language="php" style={docco}>
                                {strip_out_words_not_in_anagram}
                            </SyntaxHighlighter>
                        </div>
                        <div className='text-zinc-600 mb-3'>
                            At this point the wordlist count was down to about 1650 words and ready to be looped over.  
                            I figured if I looped over each word as the first word and then repeated the process for the second and third words I could test every possiblility.
                            Each time it moved onto the next word I checked to see which characters of the anagram were remaining and further reduced the wordlist before looping.
                            Unlike the previous two words, the third word needed to use up all of the remaining characters of the anagram so I filtered the list even further to only include words which could do so.  If this emptied the wordlist we could discard this attempt and move onto the next possible phrase.

                        </div>
                        <div className='my-6 border-lime-300 border-2 text-xs m-auto'>
                            <SyntaxHighlighter language="php" style={docco}>
                                {reduce_list_for_final_word_to_characters_remaining_in_anagram}
                            </SyntaxHighlighter>
                        </div>
                        <div className='text-zinc-600 mb-3'>
                            Once I had a three word phrase it was time to turn it into an MD5 hash and compare it. 
                            I wanted to start from the easiest hash and work towards the hardest solution so rather than try the phrase with all 3 possible answers I only check one at a time.  
                            I wont give away the correct phrases here as it would spoil the fun of doing it yourself but I can say that my solution calculated the easiest phrase in 48 seconds and the medium phrase in 115 seconds. I was surprised but quite pleased to discover that I didn't need to make any tweaks to the code in order to complete the medium challenge but it failed to find a match on the hardest difficulty.
                        </div>
                        <div className='text-zinc-600 mb-3'>
                            The code below isn't the whole class as I wanted to keep the code examples down to enhance the narrative.  
                            It also includes the tweaks I made to the code to optionally include a fourth word as I tried to complete the hardest challenge.  Prior to settling on this approach I experimented with a recursive function but the time taken to allow a fourth word increased the duration dramatically, so when I allowed as many as required to use up all the anagram characters or clear the word list was unusable.
                        </div>
                        <div className='my-6 border-lime-300 border-2 text-xs m-auto'>
                            <SyntaxHighlighter language="php" style={docco}>
                                {generate_secret_phrase}
                            </SyntaxHighlighter>
                        </div>
                        <div className='font-bold text-lg text-zinc-500 my-6'> The Hardest Difficulty </div>
                        <div className='text-zinc-600 mb-3'>
                            After failing to find the hardest hash with the initial approach I reintroduced the words which were apostrophised and/or included diacritic marks. This added another 1000+ words into the loop and a few more considerations when comparing the word to the anagram.
                            Naturally, this also increased the time taken to find the easier and medium challenges, to 87 and 220 seconds respectively and led me down a few failed experiments to improve performance.  
                        </div>
                        <div className='text-zinc-600 mb-3'>
                            On the topic of performance, I believe saving the wordlist to a database would have had a positive impact as it reduces how much is saved to memory during the process but for some reason decided this was outside the scope of the challenge.  
                            That said, I might actually save it to the database* just to see what difference it makes because I rarely encounter such a great opportunity to directly test performance.  
                            
                        </div>
                        <div className='text-zinc-600 mb-3'>
                            <span className='italic text-xs'> *Though probably only locally as I'm not sure I want to pay the AWS RDS fees for production testing!</span>
                        </div>
                        <div className='text-zinc-600 mb-3'>
                            Finally I allowed a fourth word into the phrase and ran the code again.  
                            Initially increasing the maximum duration time (PHP execution time) to 2 hrs but this wasn't sufficient, so I wrote a new function to start from where it had left off and ran it again. 
                            At this point I had decided to persevere until the code completed and I either had the solution or confirmation a rethink was required.  
                            Thankfully, after more than 8 hrs it did return the answer and after a few tweaks to the code I had the time taken down to 7536 seconds (or just over 2 hours and 5 mins).
                            While this is noticably quicker all it really comes down to is optimising the list I was looping over at each stage.
                        </div>
                        <div className='text-zinc-600 mb-3'>
                            I really enjoyed this challenge and would love to see how others approached it in PHP/Laravel and whether they found a much more performant solution but this is as far as I intend to go.  It's time to find a new challenge :)
                        </div>
                        <div className='text-zinc-600 mb-12'>
                        <img className="my-6 border-lime-300 border-2" src="http://d1fftu7568zsov.cloudfront.net/follow_the_white_rabbit_completed.png" alt="" />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}