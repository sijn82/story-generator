export const convert_file_to_lazy_collection = `
    public function convert_file_to_lazy_collection($wordListFilePath): LazyCollection
    {
        if (Storage::disk('public')->exists($wordListFilePath)) {
            // convert txt file into lazy collection
            $wordListFile = File::lines("storage/" . $wordListFilePath);
            return $wordListFile;
        }

        return new LazyCollection();
    }
`
export const strip_out_words_not_in_anagram = `
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
`
export const reduce_list_for_final_word_to_characters_remaining_in_anagram = `
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
`

export const generate_secret_phrase = `
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
`