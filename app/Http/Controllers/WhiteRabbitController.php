<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\LazyCollection;
use Illuminate\Support\Collection;
use App\Http\Controllers\PossiblePhrases;

ini_set('max_execution_time', 900); // 1800 = 30 mins

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
        // $this->possiblePhrases = new PossiblePhrases();

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

        return new LazyCollection();
    }

    public function unusual_words()
    {
        $unusual_characters = ['é', 'ô', 'ä', 'á'];
        $unusual_words = ["shi'ite", "who'd", "who'l", "who're", "who've", "xi'an", "y'al", "you'd", "you'l", "you're", "you've"];
    }

    public function strip_out_words_not_in_anagram($wordList, $anagram): Collection
    {
        $filteredWordList = $wordList->reject(function ($word) use ($anagram) {
            // check if the word could be created using the characters from the anagram
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

    public function reduce_list_for_third_word_to_characters_remaining_in_anagram($wordList, $anagram): Collection
    {
        return $filteredWordList = $wordList->reject(function ($word) use ($anagram) {
            return count(str_split($word)) !== count($anagram);
        });
    }

    public function remove_unlikely_word_list_options($wordList)
    {
        // single character words to keep
        return $filteredCollection = $wordList->reject(function ($word) {
            return count(str_split($word)) === 1 && !in_array($word, ["a", "i", "u"]);
          
        });
    }

    public function conditionally_add_an_apostrophy($word): String
    {
        if (substr($word, -1) === 's') {
          return substr_replace($word, "'s", -1);
        }

        return $word;
    }

    public function testPhrases()
    {

        // return new LazyCollection();

        $failedPhrases = [];
        foreach ($this->possiblePhrases->phrases() as $phrase) {
            $words = explode(" ", $phrase);
            $words[0] = $this->conditionally_add_an_apostrophy($words[0]);
            $result = $this->check_md5_hash_of_possible_phrase($words[0] . " " . $words[1] . " " . $words[2], $this->difficultPhraseMDHash);
            if ($result) {
                return $words;
            }
            $failedPhrases[] = $words[0] . " " . $words[1] . " " . $words[2];
        }

        foreach ($this->possiblePhrases->phrases() as $phrase) {
            $words = explode(" ", $phrase);
            $words[1] = $this->conditionally_add_an_apostrophy($words[1]);
            $result = $this->check_md5_hash_of_possible_phrase($words[0] . " " . $words[1] . " " . $words[2], $this->difficultPhraseMDHash);
            if ($result) {
                return $words;
            }
            $failedPhrases[] = $words[0] . " " . $words[1] . " " . $words[2];
        }

        foreach ($this->possiblePhrases->phrases() as $phrase) {
            $words = explode(" ", $phrase);
            $words[2] = $this->conditionally_add_an_apostrophy($words[2]);
            $result = $this->check_md5_hash_of_possible_phrase($words[0] . " " . $words[1] . " " . $words[2], $this->difficultPhraseMDHash);
            if ($result) {
                return $words;
            }
            $failedPhrases[] = $words[0] . " " . $words[1] . " " . $words[2];
        }

        return ['status' => "Difficult phrase not found", 'failed_phrases' => $failedPhrases];
    }

    public function anagram_solver(): Array // The phrase and time taken to find it
    {
        $startTimer = microtime(true);

        $baseWordList = $this->convert_file_to_lazy_collection($this->wordListFilePath);

        $reducedWordList = $this->remove_unlikely_word_list_options($baseWordList->unique());

        // Now we can strip out any words which include a character that isn't included in the anagram
        $wordListCollection = $this->strip_out_words_not_in_anagram(collect($reducedWordList->values()->all()), $this->anagram);

        // On the basis that the anagram contains 2 spaces and 3 words,
        // I am going to intitially assume the phrase does too.

        foreach ($wordListCollection as $firstWord) {

            // remove the characters of the selected word from the anagram
            $anagramCharactersRemainingAfterFirstWord = $this->remove_characters_of_selected_word_from_anagram($firstWord, $this->anagram);
            // reduce the list further to remove the characters from the first word
            $filteredWordListAfterFirstWord = $this->strip_out_words_not_in_anagram($wordListCollection, $anagramCharactersRemainingAfterFirstWord);

            // now we want to pick another word, remove characters from the anagram and continue
            // to do so until we run out of available words or anagram characters
            foreach ($filteredWordListAfterFirstWord as $secondWord) {

                // remove the characters of the selected word from the anagram
                $anagramCharactersRemainingAfterSecondWord = $this->remove_characters_of_selected_word_from_anagram($secondWord, $anagramCharactersRemainingAfterFirstWord);
                // reduce the list further to remove the characters from the second word
                $filteredWordListAfterSecondWord = $this->strip_out_words_not_in_anagram($filteredWordListAfterFirstWord, $anagramCharactersRemainingAfterSecondWord);

                if ($filteredWordListAfterSecondWord->count() > 0) {

                    $filteredWordListBeforeThirdWord = $this->reduce_list_for_third_word_to_characters_remaining_in_anagram($filteredWordListAfterSecondWord, $anagramCharactersRemainingAfterSecondWord);

                    foreach ($filteredWordListBeforeThirdWord as $thirdWord) {
                        
                        // remove the characters of the selected word from the anagram
                        $anagramCharactersRemainingAfterThirdWord = $this->remove_characters_of_selected_word_from_anagram($thirdWord, $anagramCharactersRemainingAfterSecondWord);

                        // it can only be a valid phrase if there are no more anagram characters remaining
                        if (empty($anagramCharactersRemainingAfterThirdWord)) {

                            $phrase = $firstWord . " " . $secondWord . " " . $thirdWord;
                            $result = $this->check_md5_hash_of_possible_phrase($phrase, $this->mediumPhraseMDHash);
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
            'status' => "No matches, I knew it wouldn't be that easy",
            'timeTaken' => $timeTaken . " seconds"
        ];
    }

}