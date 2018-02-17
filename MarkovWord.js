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
var __context={"name":"MarkovWord","loader":"SAI.GetSourceFromPaths","path":"MarkovWord.sai","mtime":"2018-02-17T23:02:32.214Z","fetched":"2018-02-17T23:02:37.084Z"};
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
prototype.__tobelocked = prototype.__tobelocked.concat(["window", "'Configure'", "'AddWord'", "'GetWord'", "'Finalize'", "'AnalyzeUnweighted'", "'AnalyzeWeighted'", "'Generate'", "isa"]);
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
  prototype[i] = "uninitialized instance attribute";
};
var $2g = prototype.Constructor || function() {};
prototype.Constructor = function() {
  $2g.call(this);
  var t = $1g();
  for (var i in t)
    if (t[i] !== undefined) this[i] = t[i];
};
Object.defineProperty(prototype, "window", {
  configurable: true,
  enumerable: true,
  get: function(p) {
    var $ = this; {
      return $._window;
    }
  },
  set: function(p) {
    var $_d, $_c, $0, _w = p,
      $ = this; {
      $._window = _w;
      $.leader = '_'.repeat(_w);
      $.corpus = [];
      $.markov = {};
      $.totals = {};
    }
  }
});
var $5g = prototype['Configure'] || function() {};
prototype['Configure'] = function(p) {
  var $6, $5, $4, $1, _options = p,
    $ = this; {
    var $2 = $AI.kviterate_op($AI.select_op(_options, ['window', 'frequency', 'minimum'])),
      $3 = $2.next();
    if (!$3.done)
      for (; !$3.done; $3 = $2.next()) {
        $4 = $3.value[1];
        $5 = $3.value[0];
        $[$5] = $4;;
      }
  }
};
var $6g = prototype['AddWord'] || function() {};
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
var $7g = prototype['GetWord'] || function() {};
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
var $8g = prototype['Finalize'] || function() {};
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
var $9g = prototype['AnalyzeUnweighted'] || function() {};
prototype['AnalyzeUnweighted'] = function(p) {
  var $_d, $_c, $26, $25, $24, $21, _source = p,
    $ = this; {
    $.markov = {};
    $.leader = '_'.repeat($.window);
    $.corpus = $AI.filter_op((((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = _source).toLowerCase()))) ? $_d : $_c)).replace(/[^a-z\-]/g, ' ')))) ? $_d : $_c)).split(/\s+/)))) ? $_d : $_c)), function($_v, $_k) {
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
var $10g = prototype['AnalyzeWeighted'] || function() {};
prototype['AnalyzeWeighted'] = function(p) {
  var $_d, $_c, $_b, $38, $37, $34, $33, $30, $29, $28, _word, _weight, _line, _valid, $27, _source = p,
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
    $.corpus = ((undefined !== ($_b = _valid)) ? $_b : {});
    $.Finalize();
  }
};
var $11g = prototype['Generate'] || function() {};
prototype['Generate'] = function(p) {
  var $_d, $_c, $41, $40, _word, _duplicate, _tally, _results, $39, _wordcount = p,
    $ = this; {
    _results = [];
    _tally = $AI.reduce_op($.corpus, function(_sum, $_v, $_k) {
      _sum[$_v] = 1;
      return _sum;
    }, {});
    _duplicate = (_WATCHDOG * _wordcount);
    var $40;
    while ($40 = (((_results.length < _wordcount) && (_duplicate > 0)))) {
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
    if (($41 = ($.frequency))) {
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
