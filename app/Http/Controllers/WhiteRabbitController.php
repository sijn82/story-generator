<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\LazyCollection;
use Illuminate\Support\Collection;
use App\Http\Controllers\PossiblePhrases;

ini_set('max_execution_time', 300); // 1800 = 30 mins (still not enough! Let's try an hour I guess... fine 2hrs then... it took over 8 hrs!!!)

// Challenge:
// You've made an important decision. Now, let's get to the matter.

// We have a message for you. But we hid it. Unless you know the secret phrase, it will remain hidden.

// Can you write the algorithm to find it?

// Here is a couple of important hints to help you out:

// An anagram of the phrase is: "poultry outwits ants"
// There are three levels of difficulty to try your skills with
// The MD5 hash of the easiest secret phrase is "e4820b45d2277f3844eac66c903e84be"
// The MD5 hash of the more difficult secret phrase is "23170acc097c24edb98fc5488ab033fe"
// The MD5 hash of the hard secret phrase is "665e5bcb0c20062fe8abaaf4628bb154"
// Here is a list of english words, it should help you out.

class WhiteRabbitController extends Controller 
{
    private $wordListFile;
    private $anagram;
    private $possiblePhrases;
    private $unusualCharacters;
    private $easyPhraseMDHash;
    private $mediumPhraseMDHash;
    private $difficultPhraseMDHash;

    public function __construct()
    {
        $this->wordListFilePath = "whiterabbit/wordlist.txt";
        // remove any spaces from the initial anagram phrase and convert into an array
        $this->anagram = str_split(str_replace(" ", "", "poultry outwits ants"));
        $this->possiblePhrases = [];
        // found by running the unusual_words function (now hard coded for further use)
        $this->unusualCharacters = ['é', 'ó', 'ü', 'á', 'è', 'ö', 'ñ', 'â', 'û', 'ä', 'ê', 'ç', 'ô', 'å', 'í', 'Å',];
        // the 3 possible answers we're looking for
        $this->easyPhraseMDHash = "e4820b45d2277f3844eac66c903e84be";
        $this->mediumPhraseMDHash = "23170acc097c24edb98fc5488ab033fe";
        $this->difficultPhraseMDHash = "665e5bcb0c20062fe8abaaf4628bb154";
    }

    // Temporary functions

    // A one off function to help me see which unusual characters I need to handle
    public function unusual_words()
    {
        $baseWordList = $this->convert_file_to_lazy_collection($this->wordListFilePath);

        $unusual_characters = [];

        $unusual_words = $baseWordList->reject(function ($word) use($unusual_characters) {
            // dont worry about pluralised words for now
            // as I want to focus on the most unusual words/characters
            if (str_ends_with($word, "'s")) {
                return true;
            } elseif (preg_match('/^[A-Z]+$/i', $word)) {
                return true;
            } else {
                // \Log::debug($word);
            }
        });

        foreach ($unusual_words as $word) {
            foreach ($this->mb_str_split($word) as $character) {
                if (!preg_match('/^[A-Z]+$/i', $character)) {
                    if ($character !== "'" && !in_array($character, $unusual_characters)) {
                        \Log::debug($character);
                        $unusual_characters[] = $character;
                    }
                }
            }
        }
        // \Log::debug($unusual_characters);
        return $unusual_words;
    }

    // function taken from https://stackoverflow.com/questions/42122138/php-str-split-every-n-characters-with-accents
    public function mb_str_split($string, $split_length = 1)
    {
        if ($split_length == 1) {
            return preg_split("//u", $string, -1, PREG_SPLIT_NO_EMPTY);
        } elseif ($split_length > 1) {
            $return_value = [];
            $string_length = mb_strlen($string, "UTF-8");
            for ($i = 0; $i < $string_length; $i += $split_length) {
                $return_value[] = mb_substr($string, $i, $split_length, "UTF-8");
            }
            return $return_value;
        } else {
            return false;
        }
    }

    // no longer needed but helped to brute force the hard solution before optimising my solution
    public function start_from_where_we_left_off($wordlist, $lastWord = 'a'): Collection
    {
        return $wordlist->reject(function ($word) use ($lastWord) {
            return strcasecmp($word, $lastWord) < 0;
        });
    }

    // Main functions

    public function convert_file_to_lazy_collection($wordListFilePath): LazyCollection
    {

        if (Storage::disk('public')->exists($wordListFilePath)) {
            // convert txt file into lazy collection
            $wordListFile = File::lines("storage/" . $wordListFilePath);
            return $wordListFile;
        }

        return new LazyCollection();
    }

    public function remove_unlikely_word_list_options($wordList, $anagram, $removeDiacriticMarks): LazyCollection
    {
        return $filteredCollection = $wordList->reject(function ($word) use ($anagram, $removeDiacriticMarks) {
            // single character words to keep (this may need to be removed if we fail to find the phrase)
            if (count(str_split($word)) === 1 && !in_array($word, ["a", "i", "u"])) {
                return true;
            } 
            // if true we are treating the anagram as absolute truth regarding characters
            // we will not allow accented, umlauted words etc or apostrophies
            if ($removeDiacriticMarks) {
                foreach (str_split($word) as $character) {
                    if (in_array($character, $anagram)) {
                        // we want to remove the character from the anagram
                        // so if the word contains 2 instances of the character but
                        // the anagram only contains 1 it doesn't pass the check.
                        $key = array_search($character, $anagram);
                        unset($anagram[$key]);
                    } else {
                        return true;
                    }
                }
            };
          
        });
    }

    public function strip_out_words_not_in_anagram($wordList, $anagram, $unusualCharacters): Collection
    {
        $filteredWordList = $wordList->reject(function ($word) use ($anagram, $unusualCharacters) {
            // check if the word could be created using the characters from the anagram
            foreach (str_split($word) as $character) {
                if (in_array($character, $anagram)) {
                    // we want to remove the character from the anagram
                    // so if the word contains 2 instances of the character but
                    // the anagram only contains 1 it doesn't pass the check.
                    $key = array_search($character, $anagram);
                    unset($anagram[$key]);
                } elseif (in_array($character, $unusualCharacters)) {
                    // we need to add a switch statement to check instead replacing the diacriticv mark with the anagram chacter equivalent
                    $character = $this->convert_character_for_anagram_check($character);
                    $key = array_search($character, $anagram);
                    unset($anagram[$key]);
                } elseif ($character === "'") {
                    // ignore it and continue
                } else {
                    return true;
                }
            }
        });

        return $filteredWordList;
    }

    public function convert_character_for_anagram_check($character): String
    {
        switch ($character) {
            case 'á':
            case 'â':
            case 'ä':
            case 'å':
            case 'Å':
                return 'a';
            case 'é':
            case 'è':
            case 'ê':
                return 'e';
            case 'í':
                return 'i';
            case 'ó':
            case 'ö':
            case 'ô':
                return 'o';
            case 'ü':
            case 'û':
                return 'u';
            case 'ñ':
                return 'n';
            case 'ç':
                return 'c';
        }
    }

    public function reduce_anagram_and_filter_wordlist($word, $anagram, $wordlist, $finalWord = false): Array
    {
        // remove the characters of the selected word from the anagram
        $anagramCharactersRemaining = $this->remove_characters_of_selected_word_from_anagram($word, $anagram);
        
        // if this is for the final word we can filter out even more words from the list,
        // otherwise treat it normally
        if ($finalWord) {
            $filteredWordList = $this->reduce_list_for_final_word_to_characters_remaining_in_anagram($wordlist, $anagramCharactersRemaining);
        } else {
            // reduce the list further to remove the characters from the current word
            $filteredWordList = $this->strip_out_words_not_in_anagram($wordlist, $anagramCharactersRemaining, $this->unusualCharacters);
        }
    
        return [$anagramCharactersRemaining, $filteredWordList];
    }

    public function remove_characters_of_selected_word_from_anagram($word, $anagram): Array
    {
        foreach (str_split($word) as $character) {
            if (in_array($character, $anagram)) {
                $key = array_search($character, $anagram);
                unset($anagram[$key]);
            } elseif (in_array($character, $this->unusualCharacters)) {
                // we need to add a switch statement to check instead replacing the diacriticv mark with the anagram chacter equivalent
                $character = $this->convert_character_for_anagram_check($character);
                $key = array_search($character, $anagram);
                unset($anagram[$key]);
            } else {
                // it's an apostrophy so we can ignore it and continue
            } 
        }

        return $anagram;
    }

    public function reduce_list_for_final_word_to_characters_remaining_in_anagram($wordList, $anagram): Collection
    {
        return $filteredWordList = $wordList->reject(function ($word) use ($anagram) {
            // ignore apostrophies from the count check
            $word = str_replace("'", "", $word);
            // if the count doesn't match we can immediately reject the word
            if (count(str_split($word)) !== count($anagram)) {
                return true;
            }
            // otherwise try removing all the characters of the word from the remaining characters
            // of the anagram, if there are no characters left we could have the right word.
            $anagram = $this->remove_characters_of_selected_word_from_anagram($word, $anagram);
            return count($anagram) !== 0;
        });
    }

    public function check_md5_hash_of_possible_phrase($phrase, $hash): Bool
    {
        if (md5($phrase) === $hash) {
            return true;
        }

        return false;
    }

    // Find and return the secret phrase along with the time taken to solve it
    public function generate_secret_phrase($threeWordPhraseOnly = false, $removeDiacriticMarks = true): Array
    {
        // I want to know how long each hash takes to crack
        $startTimer = microtime(true);
        // the phrase we're looking for is a combination of words in this file
        $baseWordList = $this->convert_file_to_lazy_collection($this->wordListFilePath);
        // the more we remove at this stage the quicker the code will solve the puzzle
        $reducedWordList = $this->remove_unlikely_word_list_options($baseWordList->unique(), $this->anagram, $removeDiacriticMarks);
        // Now we can strip out any words which include a character that isn't included in the anagram
        // And convert to a regular collection as unique caused major performance issues which this resolves
        $wordListCollection = $this->strip_out_words_not_in_anagram(collect($reducedWordList->values()->all()), $this->anagram, $this->unusualCharacters);

        // On the basis that the anagram contains 2 spaces and 3 words,
        // I am going to intitially assume the phrase does too.

        foreach ($wordListCollection as $firstWord) {

            [
                $anagramCharactersRemainingAfterFirstWord, 
                $filteredWordListAfterFirstWord
            ] = $this->reduce_anagram_and_filter_wordlist($firstWord, $this->anagram, $wordListCollection);

            // now we want to pick another word, remove characters from the anagram and continue
            // to do so until we run out of available words or anagram characters
            foreach ($filteredWordListAfterFirstWord as $secondWord) {

                [
                    $anagramCharactersRemainingAfterSecondWord, 
                    $filteredWordListAfterSecondWord
                ] = $this->reduce_anagram_and_filter_wordlist(
                        $secondWord, 
                        $anagramCharactersRemainingAfterFirstWord, 
                        $filteredWordListAfterFirstWord, 
                        $threeWordPhraseOnly // this further reduces the list to only include words which use up the remaining anagram characters
                    );

                foreach ($filteredWordListAfterSecondWord as $thirdWord) {

                    if ($threeWordPhraseOnly) {
                        $phrase = $firstWord . " " . $secondWord . " " . $thirdWord;
                        $this->possiblePhrases[] = $phrase;
                        //$result = $this->check_md5_hash_of_possible_phrase($phrase, $this->easyPhraseMDHash);
                        $result = $this->check_md5_hash_of_possible_phrase($phrase, $this->mediumPhraseMDHash);

                        if ($result) {
                            $stopTimer = microtime(true);
                            $timeTaken = $stopTimer - $startTimer;
                            return ['phrase' => $phrase, 'timeTaken' => $timeTaken . " seconds"];
                        }

                    } else {

                        [
                            $anagramCharactersRemainingAfterThirdWord, 
                            $filteredWordListAfterThirdWord
                        ] = $this->reduce_anagram_and_filter_wordlist(
                                $thirdWord, 
                                $anagramCharactersRemainingAfterSecondWord, 
                                $filteredWordListAfterSecondWord, 
                                !$threeWordPhraseOnly // if we're not restricted to 3 word phrases, then treat this as the final word
                            );
                        
                        foreach ($filteredWordListAfterThirdWord as $fourthWord) {

                            $phrase = $firstWord . " " . $secondWord . " " . $thirdWord . " " . $fourthWord;
                            $this->possiblePhrases[] = $phrase;
                            $result = $this->check_md5_hash_of_possible_phrase($phrase, $this->difficultPhraseMDHash);

                            if ($result) {
                                $stopTimer = microtime(true);
                                $timeTaken = $stopTimer - $startTimer;
                                return ['phrase' => $phrase, 'timeTaken' => $timeTaken . " seconds"];
                            }

                        }
                    }
                }   
            }
        }

        $stopTimer = microtime(true);
        $timeTaken = $stopTimer - $startTimer;

        return [
            'possiblePhrasesCount' => count($this->possiblePhrases),
            'possiblePhrases' => $this->possiblePhrases, // useful to check for debugging purposes
            'status' => "No matches, I knew it wouldn't be that easy",
            'timeTaken' => $timeTaken . " seconds"
        ];

    }

}