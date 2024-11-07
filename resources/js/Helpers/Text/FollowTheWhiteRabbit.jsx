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
`
export const reduce_list_for_third_word_to_characters_remaining_in_anagram = `
    public function reduce_list_for_third_word_to_characters_remaining_in_anagram($wordList, $anagram): Collection
    {
        return $filteredWordList = $wordList->reject(function ($word) use ($anagram) {
            return count(str_split($word)) !== count($anagram);
        });
    }
`

export const anagram_solver = `
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
`