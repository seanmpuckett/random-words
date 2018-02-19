#!/usr/bin/env node

// Javascript source for MarkovWord transipled by SAI
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
var __context={"name":"MarkovWord","loader":"SAI.GetSourceFromPaths","path":"MarkovWord.sai","mtime":"2018-02-18T23:56:39.628Z","fetched":"2018-02-19T00:01:38.892Z"};
var _Floor = Math.floor;
var _Random = Math.random;
var _WATCHDOG = 100;
var isa = prototype.isa = 'MarkovWord';
prototype.isof['MarkovWord'] = {
  version: '0.0.0-unspecified',
  isa: isa,
  context: __context,
  type: "main"
};
prototype.__tobelocked = prototype.__tobelocked.concat(["success", "window", "'Configure'", "'Finalize'", "'AnalyzeUnweighted'", "'AnalyzeWeighted'", "'Generate'", "'AddWord'", "'GetWord'", "isa"]);
prototype.__tobefrozen = prototype.__tobefrozen.concat(["isof"]);
var $1g = function() {
  var $ = this;
  return {
    window: 3,
    frequency: false,
    minimum: 0,
    leader: '',
    corpus: [],
    markov: {},
    totals: {},
    _window: undefined
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
Object.defineProperty(prototype, "success", {
  configurable: true,
  enumerable: true,
  get: function(p) {
    var $ = this; {
      return ($.corpus.length > 0);
    }
  },
  set: undefined
});
Object.defineProperty(prototype, "window", {
  configurable: true,
  enumerable: true,
  get: function(p) {
    var $0, $ = this; {
      return $._window;
    }
  },
  set: function(p) {
    var $_d, $_c, $1, _w = p,
      $ = this; {
      $._window = _w;
      $.leader = '_'.repeat(_w);
      $.corpus = [];
      $.markov = {};
      $.totals = {};
    }
  }
});
var $6g = prototype['Configure'] || function() {};
prototype['Configure'] = function(p) {
  var $7, $6, $5, $2, _options = p,
    $ = this; {
    var $3 = $AI.kviterate_op($AI.select_op(_options, ['window', 'frequency', 'minimum'])),
      $4 = $3.next();
    if (!$4.done)
      for (; !$4.done; $4 = $3.next()) {
        $5 = $4.value[1];
        $6 = $4.value[0];
        $[$6] = $5;;
      }
  }
};
var $7g = prototype['Finalize'] || function() {};
prototype['Finalize'] = function(p) {
  var $13, $12, $11, $8, $ = this; {
    var $9 = $AI.kviterate_op($.markov),
      $10 = $9.next();
    if (!$10.done)
      for (; !$10.done; $10 = $9.next()) {
        $11 = $10.value[1];
        $12 = $10.value[0];
        $.totals[$12] = $AI.reduce_op($11, function(_sum, $_v, $_k) {
          return (_sum + $_v);
        }, 0);;
      }
  }
};
var $8g = prototype['AnalyzeUnweighted'] || function() {};
prototype['AnalyzeUnweighted'] = function(p) {
  var $_d, $_c, $19, $18, $17, $14, _source = p,
    $ = this; {
    $.markov = {};
    $.leader = '_'.repeat($.window);
    $.corpus = $AI.filter_op((((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = _source).toLowerCase()))) ? $_d : $_c)).replace(/[^a-z\-]/g, ' ')))) ? $_d : $_c)).split(/\s+/)))) ? $_d : $_c)), function($_v, $_k) {
      return (($_v.length >= $.window));
    });
    var $15 = $AI.kviterate_op($AI.filter_op(($.corpus), function($_v, $_k) {
        return (($_v.length > $.window));
      })),
      $16 = $15.next();
    if (!$16.done)
      for (; !$16.done; $16 = $15.next()) {
        $17 = $16.value[1];
        $18 = $16.value[0];
        $.AddWord($17, 1);;
      }
    $.Finalize();
  }
};
var $9g = prototype['AnalyzeWeighted'] || function() {};
prototype['AnalyzeWeighted'] = function(p) {
  var $_d, $_c, $_b, $35, $34, $33, $29, $28, $27, $23, $22, $21, _word, _weight, _line, _valid, $20, _source = p,
    $ = this; {
    $.markov = {};
    _valid = [];
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
    var $34 = $.corpus;
    if (undefined === $34) $34 = [];
    var $32 = $34.length;
    if ($32) {
      var _line, $33 = 0;
      for (; $33 < $32; $33++) {
        _line = $34[$33];
        _weight = 1;
        var $28 = _line;
        if (undefined === $28) $28 = [];
        var $26 = $28.length;
        if ($26) {
          var _word, $27 = 0;
          for (; $27 < $26; $27++) {
            _word = $28[$27];
            if (($21 = (($AI.number_op(_word))))) {
              _weight = $21;
            } else if (($23 = ((_word.length >= $.window)))) {
              _valid.push(_word);
              if (($22 = ((_word.length > $.window)))) {
                $.AddWord(_word, _weight);
              }
            }
          }
        }
      }
    }
    $.corpus = ((undefined !== ($_b = _valid)) ? $_b : {});
    $.Finalize();
  }
};
var $10g = prototype['Generate'] || function() {};
prototype['Generate'] = function(p) {
  var $_d, $_c, $38, $37, _word, _duplicate, _tally, _results, $36, _wordcount = p,
    $ = this; {
    _results = [];
    _tally = $AI.reduce_op($.corpus, function(_sum, $_v, $_k) {
      _sum[$_v] = 1;
      return _sum;
    }, {});
    _duplicate = (_WATCHDOG * _wordcount);
    var $37;
    while ($37 = (((_results.length < _wordcount) && (_duplicate > 0)))) {
      _word = $.GetWord();
      if (!((_tally[_word] || (_word.length < $.minimum)))) {
        _results.push(_word);
      } else {
        _duplicate--;
      }
      _tally[_word] = (_tally[_word] || 0) + 1;
    }
    _results = $AI.sort_op((_results), function(a, b) {
      var aa, bb;
      aa = _tally[a];
      bb = _tally[b];
      if (aa < bb) return 1;
      if (aa > bb) return -1;
      return 0;
    });
    if (($38 = ($.frequency))) {
      _results = $AI.map_op(_results, function($_v, $_k) {
        return '' + $_v + '(' + _tally[$_v] + ')'
      });
    }
    return _results;
  }
};
var $11g = prototype['AddWord'] || function() {};
prototype['AddWord'] = function(p, _weight) {
  var $_b, $43, $42, $41, _predicted, _current, $39, _word = p,
    $ = this; {
    _word = '' + $.leader + _word + '_';
    var $41 = 0,
      $40 = (_word.length - $.window);
    for (; $41 < $40; $41 += 1) {
      _current = $AI.slice_op((_word), $41, $.window);
      _predicted = $AI.slice_op((_word), ($41 + $.window), 1);
      if (undefined === $.markov[_current]) $.markov[_current] = {};
      $.markov[_current][_predicted] = (_weight + ((undefined !== ($_b = $.markov[_current][_predicted])) ? $_b : 0));
    }
  }
};
var $12g = prototype['GetWord'] || function() {};
prototype['GetWord'] = function(p) {
  var $_d, $_c, $46, $45, _predicted, _selection, _current, _word, $44, $ = this; {
    _word = $.leader;
    do {
      _current = $AI.slice_op((_word), undefined, (0 - ($.window)));
      _selection = _Floor(($.totals[_current] * _Random()));
      _predicted = $AI.reduce_op($.markov[_current], function(_sum, $_v, $_k) {
        if (($46 = ((_selection >= 0)))) {
          _selection = (_selection - $_v);
          if (($45 = ((_selection < 0)))) {
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
$AI.finalizePrototype(prototype);
if (prototype.isof[prototype.isa].type === "singleton") { prototype.Constructor(); prototype.Instantiate(); }
var result=prototype.isof[prototype.isa].type === "main" ? prototype.constructor() : prototype;
exports=result; try { module.exports=result; } catch(e) {};
return result;
