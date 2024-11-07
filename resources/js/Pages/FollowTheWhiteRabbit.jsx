import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {convert_file_to_lazy_collection, strip_out_words_not_in_anagram, reduce_list_for_third_word_to_characters_remaining_in_anagram, anagram_solver} from '@/Helpers/Text/FollowTheWhiteRabbit';

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
                        Secondly, that as the anagram didn't include an apostrophy the easiest phrase probably wouldn't either, and would be made up of words using characters without diacritic marks like accents and umlauts.  
                        Which leads me to a third and currently still unproven assumption, that the hardest phase may be more than 3 words and will likely contain at least one word which contains a diacritic mark or apostrophy.
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
                                {reduce_list_for_third_word_to_characters_remaining_in_anagram}
                            </SyntaxHighlighter>
                        </div>
                        <div className='text-zinc-600 mb-3'>
                            Once I had a three word phrase it was time to turn it into an MD5 hash and compare it. 
                            I wanted to start from the easiest hash and work towards the hardest solution so rather than try the phrase with all 3 possible answers I only check one at a time.  
                            I wont give away the correct phrases here as it would spoil the fun of doing it yourself but I can say that my solution calculated the easiest phrase in 87 seconds and the medium phrase in 220 seconds. I was surprised but quite pleased to discover that I didn't need to make any tweaks to the code in order to complete the medium challenge but it failed to find a match on the hardest difficulty.
                        </div>
                        <div className='text-zinc-600 mb-3'>
                            The code below isn't the whole class as I wanted to keep the code examples down to enhance the narrative.  
                            Also now that I am onto the hardest challenge I will need to make changes to some of the functions and probably stop relying on the hardcoded three word approach but this code accurately shows my chain of thought, even if it has more repetition than I would like.
                        </div>
                        <div className='my-6 border-lime-300 border-2 text-xs m-auto'>
                            <SyntaxHighlighter language="php" style={docco}>
                                {anagram_solver}
                            </SyntaxHighlighter>
                        </div>
                        <div className='font-bold text-lg text-zinc-500 my-6'> Next Steps </div>
                        <div className='text-zinc-600 mb-3'>
                            Initially I am curious to know whether the three word approach is still valid for the hardest solution and I merely need to allow for words which include apostrophies and diacritic marks.  To try this theory out I will create a function to pinpoint these words and ensure they are not stripped out of the wordlist and when comparing to the anagram. Then if I still fail to find the solution I will change my approach to continue looping while there are characters remaining in the anagram and possible matches in the wordlist.  
                            Though the amount of new possible phrases this could create means it will run for a lot longer and it already takes a while.
                        </div>
                        <div className='text-zinc-600 mb-12'>
                            Finally I will tweak the output to find all three phrases and record the time taken for each one.  It will be interesting to see if my final solution is quicker or slower to find the first two phrases, though I assume it will be slower as there will be more words to process and I'm curious to know how much slower.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}