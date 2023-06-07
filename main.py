import random


def insert_ordered_words(array, words_to_insert):
    num_words = len(words_to_insert)
    indices = random.sample(range(len(array)), num_words)
    sorted_indices = sorted(indices, reverse=True)

    for index, word in zip(sorted_indices, reversed(words_to_insert)):
        array.insert(index, word)


# Example usage
words = ["apple", "banana", "cat", "dog", "elephant", "fish", "gorilla"]
words_to_insert = ["orange", "peach", "mango"]

insert_ordered_words(words, words_to_insert)
print(words)
