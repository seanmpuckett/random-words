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
var __context={"name":"random-words","loader":"SAI.GetSourceFromPaths","path":"random-words.sai","mtime":"2018-02-17T00:36:43.913Z","fetched":"2018-02-17T00:39:15.457Z"};
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
    markov: {},
    corpus: {},
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
  var $_d, $_c, $_b, $6, $5, $4, _results, $3, $2, $1, $0, _argv, $ = this; {
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
    var $6;
    while ($6 = (_argv.shift())) {
      switch ($5 = ($6)) {
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
          $.Analyzer(_ReadFile($6, 'utf8'));
          if (!($.corpus.length)) {
            $AI.debug_op('No input words longer than ' + $.window + ' letters, cannot produce a markov chain.');
          } else {
            _results = $AI.slice_op(($.Generate()), 0, $.truncate);
            if (!(_results.length)) {
              $AI.debug_op('No unique words generated. Try increasing count or decreasing window size.');
            } else {
              if (($4 = ((_results.length < (((undefined !== ($_b = $.truncate)) ? $_b : $.wordcount) / 2))))) {
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
  var $_b, $11, $10, $9, _predicted, _current, $7, _word = p,
    $ = this; {
    _word = '' + $.leader + _word + '_';
    var $9 = 0,
      $8 = (_word.length - $.window);
    for (; $9 < $8; $9 += 1) {
      _current = $AI.slice_op((_word), $9, $.window);
      _predicted = $AI.slice_op((_word), ($9 + $.window), 1);
      if (undefined === $.markov[_current]) $.markov[_current] = {};
      $.markov[_current][_predicted] = (_weight + ((undefined !== ($_b = $.markov[_current][_predicted])) ? $_b : 0));
    }
  }
};
var $5g = prototype['GetWord'] || function() {};
prototype['GetWord'] = function(p) {
  var $_d, $_c, $14, $13, _predicted, _selection, _current, _word, $12, $ = this; {
    _word = $.leader;
    do {
      _current = $AI.slice_op((_word), undefined, (0 - ($.window)));
      _selection = _Floor(($.totals[_current] * _Random()));
      _predicted = $AI.reduce_op($.markov[_current], function(_sum, $_v, $_k) {
        if (($14 = ((_selection >= 0)))) {
          _selection = (_selection - $_v);
          if (($13 = ((_selection < 0)))) {
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
  var $20, $19, $18, $15, $ = this; {
    var $16 = $AI.kviterate_op($.markov),
      $17 = $16.next();
    if (!$17.done)
      for (; !$17.done; $17 = $16.next()) {
        $18 = $17.value[1];
        $19 = $17.value[0];
        $.totals[$19] = $AI.reduce_op($18, function(_sum, $_v, $_k) {
          return (_sum + $_v);
        }, 0);;
      }
  }
};
var $7g = prototype['AnalyzeUnweighted'] || function() {};
prototype['AnalyzeUnweighted'] = function(p) {
  var $_d, $_c, $26, $25, $24, $21, _source = p,
    $ = this; {
    $.markov = {};
    $.leader = '_'.repeat($.window);
    $.corpus = $AI.filter_op(($AI.reduce_op(((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = _source).toLowerCase()))) ? $_d : $_c)).replace(/[^a-z\-]/g, ' ')))) ? $_d : $_c)).split(/\s+/)))) ? $_d : $_c), function(_sum, $_v, $_k) {
      _sum = $AI.concat_op(_sum, $_v, true);
      return _sum;
    })), function($_v, $_k) {
      return (($_v.length >= $.window));
    });
    var $22 = $AI.kviterate_op($AI.filter_op(($.corpus), function($_v, $_k) {
        return (($_v.length > $.window));
      })),
      $23 = $22.next();
    if (!$23.done)
      for (; !$23.done; $23 = $22.next()) {
        $24 = $23.value[1];
        $25 = $23.value[0];
        $.AddWord($24, 1);;
      }
    $.Finalize();
  }
};
var $8g = prototype['AnalyzeWeighted'] || function() {};
prototype['AnalyzeWeighted'] = function(p) {
  var $_d, $_c, $38, $37, $34, $33, $30, $29, $28, _word, _weight, _line, _valid, $27, _source = p,
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
    var $35 = $AI.kviterate_op($.corpus),
      $36 = $35.next();
    if (!$36.done)
      for (; !$36.done; $36 = $35.next()) {
        _line = $36.value[1];
        $37 = $36.value[0];
        _weight = 1;
        var $31 = $AI.kviterate_op(_line),
          $32 = $31.next();
        if (!$32.done)
          for (; !$32.done; $32 = $31.next()) {
            _word = $32.value[1];
            $33 = $32.value[0];
            if (($28 = (($AI.number_op(_word))))) {
              _weight = $28;
            } else if (($30 = ((_word.length >= $.window)))) {
              _valid.push(_word);
              if (($29 = ((_word.length > $.window)))) {
                $.AddWord(_word, _weight);
              }
            };
          };
      }
    $.corpus = _valid;
    $.Finalize();
  }
};
var $9g = prototype['Generate'] || function() {};
prototype['Generate'] = function(p) {
  var $_d, $_c, $42, $41, _duplicate, _tally, _results, $39, $ = this; {
    _results = [];
    _tally = $AI.reduce_op($.corpus, function(_sum, $_v, $_k) {
      _sum[$_v] = 1;
      return _sum;
    }, {});
    $.leader = '_'.repeat($.window);
    _duplicate = (_WATCHDOG * $.wordcount);
    var $41;
    while ($41 = (((_results.length < $.wordcount) && (_duplicate > 0)))) {
      var $40 = $.GetWord();
      if (!((_tally[$40] || ($40.length < $.minimum)))) {
        _results.push($40);
      } else {
        _duplicate--;
      }
      _tally[$40] = (_tally[$40] || 0) + 1;
    }
    _results = $AI.sort_op((_results), function(a, b) {
      var aa, bb;
      aa = _tally[a];
      bb = _tally[b];
      if (aa < bb) return 1;
      if (aa > bb) return -1;
      return 0;
    });
    if (($42 = ($.frequency))) {
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
