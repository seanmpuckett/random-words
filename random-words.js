#!/usr/bin/env node

// Javascript source for random-words transipled by SAI
//

"use strict";

var prototype=new function(){
this.Constructor=function(){};
this.__tobelocked=[];
this.__tobefrozen=[];
this.__contracts=[];
this.__unverified=true;
this.isof={};
return this;
}();
var $AI=require("sai-library");
// Generated code follows
var __context={"name":"random-words","loader":"SAI.GetSourceFromPaths","path":"random-words.sai","mtime":"2018-02-18T23:19:11.740Z","fetched":"2018-02-19T00:01:38.781Z"};
var _FS = require('fs');
var _ReadFile = _FS.readFileSync;
var _Floor = Math.floor;
var _Random = Math.random;
var _ARGV = process.argv;
var _Exit = process.exit;
var _WATCHDOG = 100;
var isa = prototype.isa = 'RW';
prototype.isof['RW'] = {
  version: '0.0.0-unspecified',
  isa: isa,
  context: __context,
  type: "main"
};
prototype.__tobelocked = prototype.__tobelocked.concat(["'Instantiate'", "isa"]);
prototype.__tobefrozen = prototype.__tobefrozen.concat(["isof"]);
var $1g = function() {
  var $ = this;
  return {
    wordcount: 100,
    truncate: undefined,
    window: 3,
    frequency: false,
    weighted: 'AnalyzeUnweighted',
    minimum: undefined,
    markovWord: undefined
  };
}
for (var i in $1g()) {
  prototype[i] = undefined;
};
var $2g = prototype.Constructor || function() {};
prototype.Constructor = function() {
  $2g.call(this);
  var t = $1g();
  for (var i in t)
    if (t[i] !== undefined) this[i] = t[i];
};
var $3g = prototype['Instantiate'] || function() {};
prototype['Instantiate'] = function(p) {
  var $_d, $_c, $_b, $7, $6, $5, _results, $4, _source, $2, $1, $0, _argv, $ = this; {
    $.markovWord = $AI.create_op('MarkovWord', [undefined]);
    _argv = $AI.clone_op(_ARGV);
    if (($0 = (('node' === $AI.slice_op((_argv[0]), undefined, (0 - (4))))))) {
      _argv.shift();;
    }
    if (($1 = (('sai-run' === $AI.slice_op((_argv[0]), undefined, (0 - (7))))))) {
      _argv.shift();;
    }
    _argv.shift();
    if (($2 = ((_argv.length < 1)))) {
      $AI.debug_op('random-words -- Generate new, unique words from a seed set of words' + '\n' + '' + '\n' + 'USAGE' + '\n' + '  random-words [seed.txt]   - print a markov chain generated list of random words' + '\n' + '' + '\n' + 'OPTIONS' + '\n' + '  -c, --count [number]      - maximum number of unique words to generate (default ' + $.wordcount + ')' + '\n' + '  -f, --frequency           - show frequency counts for each unique word' + '\n' + '  -i, --influence           - each input line may have a number, the influence of words on that line' + '\n' + '  -l, --limit [number]      - limit output to how many most frequent words (default all)' + '\n' + '  -m, --minimum [number]    - minimum length of word to generate (default, and lowest, is window size)' + '\n' + '  -w, --window [number]     - size of the markov analysis window in characters, (2+, default ' + $.window + ')' + '\n' + '' + '\n' + 'EXAMPLE' + '\n' + '  random-words -c 50 countries.txt' + '\n' + '' + '\n' + 'NOTE' + '\n' + '  Results are printed to STDOUT, separated by spaces. STDIN is not accepted, you must' + '\n' + '  supply a file. Duplicates, and words that appear in the orginal text are not included' + '\n' + '  in the output. If the probability of generating unique words is low, it may take a while' + '\n' + '  to generate a large set of unique words.' + '\n' + '');
      _Exit();
    }
    var $7;
    while ($7 = (_argv.shift())) {
      switch ($6 = ($7)) {
        case ('-c'):
        case ('--count'):
          $.wordcount = ($AI.number_op(_argv.shift()));
          break;
        case ('-w'):
        case ('--window'):
          var $3 = ($AI.number_op(_argv.shift()));
          if (!(($3 < 2))) {
            $.window = $3;
          } else {
            $AI.debug_op('Error: --window cannot be less than 2.');
            _Exit();
          }
          break;
        case ('-i'):
        case ('--influence'):
          $.weighted = 'AnalyzeWeighted';
          break;
        case ('-f'):
        case ('--frequency'):
          $.frequency = true;
          break;
        case ('-l'):
        case ('--limit'):
          $.truncate = ($AI.number_op(_argv.shift()));
          break;
        case ('-m'):
        case ('--minimum'):
          $.minimum = ($AI.number_op(_argv.shift()));
          break;
        default:
          try {
            _source = _ReadFile($7, 'utf8');
          } catch ($4) {
            $AI.debug_op('Error ' + $4.message + ' reading file.');
            _Exit();
          }
          $.markovWord.Configure($);
          $.markovWord[$.weighted](_source);
          if (!($.markovWord.success)) {
            $AI.debug_op('No input words longer than ' + $.window + ' letters, cannot produce a markov chain.');
          } else {
            _results = $AI.slice_op(($.markovWord.Generate($.wordcount)), 0, $.truncate);
            if (!(_results.length)) {
              $AI.debug_op('No unique words generated. Try increasing count or decreasing window size.');
            } else {
              if (($5 = ((_results.length < (((undefined !== ($_b = $.truncate)) ? $_b : $.wordcount) / 2))))) {
                $AI.debug_op('Few unique words generated due to high window size or low input variety.');
              }
              _results = $AI.map_op(_results, function($_v, $_k) {
                return ($AI.slice_op(($_v), undefined, 1).toUpperCase() + $AI.slice_op(($_v), 1, undefined))
              });
              $AI.debug_op(_results.join(' '));
            }
          }
          break;
      }
    }
  }
};
$AI.finalizePrototype(prototype);
if (prototype.isof[prototype.isa].type === "singleton") { prototype.Constructor(); prototype.Instantiate(); }
var result=prototype.isof[prototype.isa].type === "main" ? prototype.constructor() : prototype;
exports=result; try { module.exports=result; } catch(e) {};
return result;
