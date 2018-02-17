# random-words

Generate new, unique words from a seed set of words

## USAGE

    random-words [seed.txt]
    
print a markov chain generated list of random words

## OPTIONS

### -c, --count [number]      

maximum number of unique words to generate (default 100)

### -f, --frequency
    
show frequency counts for each unique word

### -i, --influence
    
each input line may have a number, the influence of words on that line

### -l, --limit [number]
    
limit output to how many most frequent words (default all)

### -m, --minimum [number]

minimum length of word to generate (default, and lowest, is window size)

### -w, --window [number]

size of the markov analysis window in characters, (2+, default 3)


## EXAMPLE

    random-words -c 50 elements.txt

    Francient Plutetium Borgium Berkel Siliconium Platinium Pallium 
    Arsenium Chlorium Ancium Actinum Radolinium Sodine Amercury Meitnericium 
    Iodium Prosium Cericium Strogen Kryptonium Brominum Einsten Thorine 
    Thalladium Merium Selevium Bromethium Thorus Tanium Alumine Lantaluminum 
    Dysprotactinium Amerium Seaboron Bromium Magnese Anthallium Fermanganese 
    Antium Lawrencient Manganesium Nitron Zircon Lantium Dyspromethium 
    Actine Alum Rhodine Rutherfornium Titantimony


## NOTES

Results are printed to STDOUT, separated by spaces. 

STDIN is not accepted, you must supply a file. 

Duplicates, and words that appear in the orginal text are not included in the output. 

If the probability of generating unique words is low, it may take a while to generate a large set of unique words.

Project is written in SAI and transpiled to Javascript. For more about this, see npm/sai-language

