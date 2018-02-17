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
var __context={"name":"random-words","loader":"SAI.GetSourceFromPaths","path":"random-words.sai","mtime":"2018-02-17T00:57:14.495Z","fetched":"2018-02-17T01:08:45.762Z"};
var _FS = require('fs');
var _ReadFile = _FS.readFileSync;
var _Floor = Math.floor;
var _Random = Math.random;
var _Exit = process.exit;
var _WATCHDOG = 100;
var isa = prototype.isa = 'RW';
prototype.isof['RW'] = {
  version: '0.0.0-unspecified',
  isa: isa,
  context: __context,
  type: "main"
};
prototype.__tobelocked = prototype.__tobelocked.concat(["'Instantiate'", "'AddWord'", "'GetWord'", "'Finalize'", "'AnalyzeUnweighted'", "'AnalyzeWeighted'", "'Generate'", "isa"]);
prototype.__tobefrozen = prototype.__tobefrozen.concat(["isof"]);
var $1g = function() {
  var $ = this;
  return {
    wordcount: 100,
    truncate: undefined,
    window: 3,
    frequency: false,
    weighted: false,
    minimum: undefined,
    leader: '',
    corpus: [],
    markov: {},
    totals: {}
  };
}
for (var i in $1g()) {
  prototype[i] = "uninitialized instance attribute";
};
var $2g = prototype.Constructor || function() {};
prototype.Constructor = function() {
  $2g.call(this);
  var t = $1g();
  for (var i in t) this[i] = t[i];
};
var $3g = prototype['Instantiate'] || function() {};
prototype['Instantiate'] = function(p) {
  var $_d, $_c, $_b, $7, $6, $5, _results, $4, _source, $3, $2, $1, $0, _argv, $ = this; {
    $.Analyzer = $.AnalyzeUnweighted;
    _argv = process.argv;
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
          $.window = ($AI.number_op(_argv.shift()));
          if (($3 = (($.window < 2)))) {
            $AI.debug_op('Error: --window cannot be less than 2.');
            _Exit();
          }
          break;
        case ('-i'):
        case ('--influence'):
          $.Analyzer = $.AnalyzeWeighted;
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
          $.Analyzer(_source);
          if (!($.corpus.length)) {
            $AI.debug_op('No input words longer than ' + $.window + ' letters, cannot produce a markov chain.');
          } else {
            _results = $AI.slice_op(($.Generate()), 0, $.truncate);
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
var $4g = prototype['AddWord'] || function() {};
prototype['AddWord'] = function(p, _weight) {
  var $_b, $12, $11, $10, _predicted, _current, $8, _word = p,
    $ = this; {
    _word = '' + $.leader + _word + '_';
    var $10 = 0,
      $9 = (_word.length - $.window);
    for (; $10 < $9; $10 += 1) {
      _current = $AI.slice_op((_word), $10, $.window);
      _predicted = $AI.slice_op((_word), ($10 + $.window), 1);
      if (undefined === $.markov[_current]) $.markov[_current] = {};
      $.markov[_current][_predicted] = (_weight + ((undefined !== ($_b = $.markov[_current][_predicted])) ? $_b : 0));
    }
  }
};
var $5g = prototype['GetWord'] || function() {};
prototype['GetWord'] = function(p) {
  var $_d, $_c, $15, $14, _predicted, _selection, _current, _word, $13, $ = this; {
    _word = $.leader;
    do {
      _current = $AI.slice_op((_word), undefined, (0 - ($.window)));
      _selection = _Floor(($.totals[_current] * _Random()));
      _predicted = $AI.reduce_op($.markov[_current], function(_sum, $_v, $_k) {
        if (($15 = ((_selection >= 0)))) {
          _selection = (_selection - $_v);
          if (($14 = ((_selection < 0)))) {
            _sum = $_k;
          }
        }
        return _sum;
      }, 'BAD_MARKOV');
      _word += _predicted;
    } while (!((_predicted === '_')));
    _word = $AI.slice_op((_word), $.window, (0 - (1)));
    return _word;
  }
};
var $6g = prototype['Finalize'] || function() {};
prototype['Finalize'] = function(p) {
  var $21, $20, $19, $16, $ = this; {
    var $17 = $AI.kviterate_op($.markov),
      $18 = $17.next();
    if (!$18.done)
      for (; !$18.done; $18 = $17.next()) {
        $19 = $18.value[1];
        $20 = $18.value[0];
        $.totals[$20] = $AI.reduce_op($19, function(_sum, $_v, $_k) {
          return (_sum + $_v);
        }, 0);;
      }
  }
};
var $7g = prototype['AnalyzeUnweighted'] || function() {};
prototype['AnalyzeUnweighted'] = function(p) {
  var $_d, $_c, $27, $26, $25, $22, _source = p,
    $ = this; {
    $.markov = {};
    $.leader = '_'.repeat($.window);
    $.corpus = $AI.filter_op((((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = _source).toLowerCase()))) ? $_d : $_c)).replace(/[^a-z\-]/g, ' ')))) ? $_d : $_c)).split(/\s+/)))) ? $_d : $_c)), function($_v, $_k) {
      return (($_v.length >= $.window));
    });
    var $23 = $AI.kviterate_op($AI.filter_op(($.corpus), function($_v, $_k) {
        return (($_v.length > $.window));
      })),
      $24 = $23.next();
    if (!$24.done)
      for (; !$24.done; $24 = $23.next()) {
        $25 = $24.value[1];
        $26 = $24.value[0];
        $.AddWord($25, 1);;
      }
    $.Finalize();
  }
};
var $8g = prototype['AnalyzeWeighted'] || function() {};
prototype['AnalyzeWeighted'] = function(p) {
  var $_d, $_c, $_b, $39, $38, $35, $34, $31, $30, $29, _word, _weight, _line, _valid, $28, _source = p,
    $ = this; {
    $.markov = {};
    _valid = [];
    $.leader = '_'.repeat($.window);
    $.corpus = $AI.map_op($AI.map_op(((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = _source).toLowerCase()))) ? $_d : $_c)).replace(/[^a-z\-0-9]/g, ' ')))) ? $_d : $_c)).split(/[\r\n]/)))) ? $_d : $_c), function($_v, $_k) {
      return $_v.split(/\s+/)
    }), function($_v, $_k) {
      return $AI.sort_op(($_v), function(a, b) {
        var aa, bb;
        aa = ($AI.number_op(a));
        bb = ($AI.number_op(b));
        if (aa < bb) return 1;
        if (aa > bb) return -1;
        return 0;
      })
    });
    var $36 = $AI.kviterate_op($.corpus),
      $37 = $36.next();
    if (!$37.done)
      for (; !$37.done; $37 = $36.next()) {
        _line = $37.value[1];
        $38 = $37.value[0];
        _weight = 1;
        var $32 = $AI.kviterate_op(_line),
          $33 = $32.next();
        if (!$33.done)
          for (; !$33.done; $33 = $32.next()) {
            _word = $33.value[1];
            $34 = $33.value[0];
            if (($29 = (($AI.number_op(_word))))) {
              _weight = $29;
            } else if (($31 = ((_word.length >= $.window)))) {
              _valid.push(_word);
              if (($30 = ((_word.length > $.window)))) {
                $.AddWord(_word, _weight);
              }
            };
          };
      }
    $.corpus = ((undefined !== ($_b = _valid)) ? $_b : {});
    $.Finalize();
  }
};
var $9g = prototype['Generate'] || function() {};
prototype['Generate'] = function(p) {
  var $_d, $_c, $43, $42, _duplicate, _tally, _results, $40, $ = this; {
    _results = [];
    _tally = $AI.reduce_op($.corpus, function(_sum, $_v, $_k) {
      _sum[$_v] = 1;
      return _sum;
    }, {});
    $.leader = '_'.repeat($.window);
    _duplicate = (_WATCHDOG * $.wordcount);
    var $42;
    while ($42 = (((_results.length < $.wordcount) && (_duplicate > 0)))) {
      var $41 = $.GetWord();
      if (!((_tally[$41] || ($41.length < $.minimum)))) {
        _results.push($41);
      } else {
        _duplicate--;
      }
      _tally[$41] = (_tally[$41] || 0) + 1;
    }
    _results = $AI.sort_op((_results), function(a, b) {
      var aa, bb;
      aa = _tally[a];
      bb = _tally[b];
      if (aa < bb) return 1;
      if (aa > bb) return -1;
      return 0;
    });
    if (($43 = ($.frequency))) {
      _results = $AI.map_op(_results, function($_v, $_k) {
        return '' + $_v + '(' + _tally[$_v] + ')'
      });
    }
    return _results;
  }
};
$AI.finalizePrototype(prototype);
if (prototype.isof[prototype.isa].type === "singleton") { prototype.Constructor(); prototype.Instantiate(); }
var result=prototype.isof[prototype.isa].type === "main" ? prototype.constructor() : prototype;
exports=result; try { module.exports=result; } catch(e) {};
return result;
