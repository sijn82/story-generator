<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\LazyCollection;

ini_set('max_execution_time', 180); // 1800 = 30 mins

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
    private $wordListCollection;
    private $anagram;
    private $easyPhraseMDHash;
    private $mediumPhraseMDHash;
    private $difficultPhraseMDHash;
    private $possiblePhrases;

    public function __construct()
    {
        $this->wordListFilePath = "whiterabbit/wordlist.txt";
        // remove any spaces from the initial anagram phrase and convert into an array
        $this->anagram = str_split(str_replace(" ", "", "poultry outwits ants"));
        $this->possiblePhrases = [];

        $this->easyPhraseMDHash = "e4820b45d2277f3844eac66c903e84be";
        $this->mediumPhraseMDHash = "23170acc097c24edb98fc5488ab033fe";
        $this->difficultPhraseMDHash = "665e5bcb0c20062fe8abaaf4628bb154";
    }

    public function convert_file_to_lazy_collection($wordListFilePath): LazyCollection
    {

        if (Storage::disk('public')->exists($wordListFilePath)) {
            // convert txt file into lazy collection
            $wordListFile = File::lines("storage/" . $wordListFilePath);
            return $wordListFile;
        }

        return [];
    }

    public function strip_out_words_not_in_anagram($wordListFull, $anagram): LazyCollection
    {
        $filteredWordList = $wordListFull->reject(function ($word) use ($anagram) {
            // check if the word could be created using the characters from the anagram
            $anagramArray = $anagram;

            foreach (str_split($word) as $character) {
                if (in_array($character, $anagramArray)) {
                    // we want to remove the character from the anagram
                    // so if the word contains 2 instances of the character but
                    // the anagram only contains 1 it doesn't pass the check.
                    $key = array_search($character, $anagramArray);
                    unset($anagramArray[$key]);
                } else {
                    return true;
                }
            }
        });

        return $filteredWordList;
    }

    public function remove_characters_of_selected_word_from_anagram($word, $anagram): Array
    {
        foreach (str_split($word) as $character) {
            $key = array_search($character, $anagram);
            unset($anagram[$key]);
        }

        return $anagram;

    }

    public function check_md5_hash_of_possible_phrase($phrase, $hash): Bool
    {
        if (md5($phrase) === $hash) {
            return true;
        }

        return false;
    }

    public function reduce_list_for_third_word_to_characters_remaining_in_anagram($wordList, $anagram): LazyCollection
    {
        return $filteredWordList = $wordList->reject(function ($word) use ($anagram) {
            return count(str_split($word)) !== count($anagram);
        });
    }

    public function remove_unlikely_word_list_options($wordList)
    {
        // single character words to keep
        return $filteredCollection = $wordList->filter(function ($word) {
            return count(str_split($word)) > 1 || in_array($word, ["a", "i", "u"]);
        });
    }

    public function anagram_solver() // : wip but ultimately a String
    {
        \Log::debug('Step 1');

        $this->wordListCollection = $this->convert_file_to_lazy_collection($this->wordListFilePath);

        // \Log::debug($this->wordListCollection->count());
        // \Log::debug($this->wordListCollection->unique()->count());
        $baseWordList = $this->strip_out_words_not_in_anagram($this->wordListCollection->unique(), $this->anagram);
        // $newFilteredWordList = $this->remove_unlikely_word_list_options($baseWordList);

        // \Log::debug($newFilteredWordListCollection->count());
        \Log::debug('Step 2');
        // return [];

        // Now we can strip out any words which include a character that isn't included in the anagram
        // $baseWordList = $this->strip_out_words_not_in_anagram($this->wordListCollection->unique(), $this->anagram);
        // return $filteredWordList;

        // now we only have words which might be part of the anagram phrase
        // so it's time to try and solve the puzzle

        

        // On the basis that the anagram contains 2 spaces and 3 words,
        // I am going to intitially assume the phrase does too.

        foreach ($baseWordList as $firstWord) {

            \Log::debug('Step 3');
            // set/reset the anagram
            // $anagramCharacters = $this->anagram;
            // set/reset a list of words to keep reducing
            // $filteredWordList = $this->strip_out_words_not_in_anagram($newFilteredWordListCollection, $this->anagram);

            // remove the characters of the selected word from the anagram
            $anagramCharactersRemainingAfterFirstWord = $this->remove_characters_of_selected_word_from_anagram($firstWord, $this->anagram);

            \Log::debug('Step 4');
            // reduce the list further to remove the characters from the first word
            $filteredWordListAfterFirstWord = $this->strip_out_words_not_in_anagram($baseWordList, $anagramCharactersRemainingAfterFirstWord);

            \Log::debug('Step 5');
            // now we want to pick another word, remove characters from the anagram and continue
            // to do so until we run out of available words or anagram characters

            // \Log::debug("Anagram characters remaining (After First Word): " . count($anagramCharactersRemainingAfterFirstWord));
            // \Log::debug("Filtered word list count (After First Word): " . $filteredWordListAfterFirstWord->count());

            foreach ($filteredWordListAfterFirstWord as $secondWord) {

                \Log::debug('Step 6');

                // remove the characters of the selected word from the anagram
                $anagramCharactersRemainingAfterSecondWord = $this->remove_characters_of_selected_word_from_anagram($secondWord, $anagramCharactersRemainingAfterFirstWord);
                
                \Log::debug('Step 7');
                // reduce the list further to remove the characters from the second word
                $filteredWordListAfterSecondWord = $this->strip_out_words_not_in_anagram($filteredWordListAfterFirstWord, $anagramCharactersRemainingAfterSecondWord);

                \Log::debug('Step 8');
                // \Log::debug("Anagram characters remaining (After Second Word): " . count($anagramCharactersRemainingAfterSecondWord));
                // \Log::debug("Filtered word list count (After Second Word): " . $filteredWordListAfterSecondWord->count());
                \Log::debug($firstWord . " " . $secondWord);
                // \Log::debug($filteredWordListAfterSecondWord->count());
                if (count($filteredWordListAfterSecondWord->toArray()) > 0) {
                    \Log::debug('Step 9');
                    // return ['filteredWordListCount' => $filteredWordList->count(), 'anagramCharactersRemaining' => $anagramCharactersRemaining];
                    $filteredWordListBeforeThirdWord = $this->reduce_list_for_third_word_to_characters_remaining_in_anagram($filteredWordListAfterSecondWord, $anagramCharactersRemainingAfterSecondWord);
                    \Log::debug('Step 10');
                    foreach ($filteredWordListBeforeThirdWord as $thirdWord) {
                        \Log::debug('Step 11');
                        // remove the characters of the selected word from the anagram
                        $anagramCharactersRemainingAfterThirdWord = $this->remove_characters_of_selected_word_from_anagram($thirdWord, $anagramCharactersRemainingAfterSecondWord);
                        \Log::debug('Step 12');
                        \Log::debug($firstWord . " " . $secondWord . " " . $thirdWord);
                        // it can only be a valid phrase if there are no more anagram characters remaining
                        if (empty($anagramCharactersRemainingAfterThirdWord)) {
                            \Log::debug('Step 13');
                            $this->possiblePhrases[] = $firstWord . " " . $secondWord . " " . $thirdWord;
                        }

                        // return [
                        //     'filteredWordListCount' => $filteredWordList->count(), 
                        //     'anagramCharactersRemaining' => $anagramCharactersRemaining, 
                        //     'phrase' => $firstWord . " " . $secondWord . " " . $thirdWord
                        // ];
                    }

                }
            }

        }

        // if we've got this far before timing out and have some phrases to check
        // loop over them until we run out of phrases or we return a match
        foreach ($this->possiblePhrases as $phrase) {
            $result = $this->check_md5_hash_of_possible_phrase($phrase, $this->easyPhraseMDHash);
            if ($result) {
                return $phrase;
            }
        }

        return [
            'originalCount' => $this->wordListCollection->count(), 
            'filteredCount' => $filteredWordList->count(), 
            'remainingAnagramCharacters' => $anagramCharactersRemainingAfterThirdWord,
            'possiblePhrases' => $this->possiblePhrases
        ];
    }

}