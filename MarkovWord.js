#!/usr/bin/env node

// Javascript source for MarkovWord transpiled by SAI
//

"use strict";

var prototype=new function() {
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
var __context={"name":"MarkovWord","loader":"SAI.GetSourceFromPaths","path":"MarkovWord.sai","mtime":"2018-03-15T01:09:16.413Z","fetched":"2018-03-15T23:05:40.829Z"};
var _Floor = Math.floor;
var _Random = Math.random;
var _WATCHDOG = 100;
var isa = prototype.isa = 'MarkovWord';
var $bindfail = function(m) {
  throw new Error("SAI: A call to " + m + " on object " + isa + " has come unbound from any instance of that object. (If this is not in error, mark the declaration of " + m + " as unbound.)");
}
prototype.isof['MarkovWord'] = {
  version: '0.0.0-unspecified',
  isa: isa,
  context: __context,
  type: "main"
};
prototype.__tobelocked = prototype.__tobelocked.concat(["success", "window", "Configure", "Finalize", "AnalyzeUnweighted", "AnalyzeWeighted", "Generate", "AddWord", "GetWord", "isa"]);
prototype.__tobefrozen = prototype.__tobefrozen.concat(["isof"]);
var $1g = function() {
  var $ = this;
  return {
    window: 3,
    frequency: false,
    minimum: 0,
    settings: ['window', 'frequency', 'minimum'],
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
      return (($.corpus.length > 0));
    }
  },
  set: undefined
});
Object.defineProperty(prototype, "window", {
  configurable: true,
  enumerable: true,
  get: function(p) {
    var $0, $ = this; {
      return ($._window);
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
  var $7, $6, $5, $4, $3, $2, _options = p,
    $ = this['Configure'] ? this : $bindfail('Configure'); {
    var $5 = $AI.kviterate_op($AI.select_op(_options, $.settings));
    var $6 = $5.next();
    if (!$6.done)
      do {
        $3 = $6.value[1];
        $4 = $6.value[0];
        $[$4] = $3;
        $6 = $5.next();
      } while (!$6.done);
  }
};
var $7g = prototype['Finalize'] || function() {};
prototype['Finalize'] = function(p) {
  var $12, $11, $10, $9, $8, $ = this['Finalize'] ? this : $bindfail('Finalize'); {
    var $11 = $.markov,
      $10 = undefined;
    if (undefined === $11) $11 = {};
    for ($10 in $11) {
      $9 = $11[$10];
      $.totals[$10] = $AI.reduce_op_fast($9, function(s, i) {
        return (undefined === s) ? i : s + i;
      }, undefined);;
    }
  }
};
var $8g = prototype['AnalyzeUnweighted'] || function() {};
prototype['AnalyzeUnweighted'] = function(p) {
  var $_d, $_c, $22, $21, $20, $19, $18, $17, $16, $15, $14, $13, _source = p,
    $ = this['AnalyzeUnweighted'] ? this : $bindfail('AnalyzeUnweighted'); {
    $.corpus = $AI.filter_op(((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = _source).toLowerCase()))) ? $_d : $_c)).replace(/[^a-z\-]/g, ' ')))) ? $_d : $_c)).split(/\s+/)))) ? $_d : $_c), function($14, $15) {
      return ($14.length >= $.window);
    });
    var $20 = $AI.kviterate_op($AI.filter_op($.corpus, function($16, $17) {
      return ($16.length > $.window);
    }));
    var $21 = $20.next();
    if (!$21.done)
      do {
        $18 = $21.value[1];
        $19 = $21.value[0];
        $.AddWord($18, 1);
        $21 = $20.next();
      } while (!$21.done);
    $.Finalize();
  }
};
var $9g = prototype['AnalyzeWeighted'] || function() {};
prototype['AnalyzeWeighted'] = function(p) {
  var $_d, $_c, $_b, $38, $37, $36, $35, $34, $33, $32, $31, $30, $29, $28, _word, _weight, _line, $27, $26, $25, $24, _valid, $23, _source = p,
    $ = this['AnalyzeWeighted'] ? this : $bindfail('AnalyzeWeighted'); {
    _valid = [];
    $.corpus = $AI.sort_op($AI.map_op($AI.map_op(((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = ((undefined === ($_c = (($_d = _source).toLowerCase()))) ? $_d : $_c)).replace(/[^a-z\-0-9]/g, ' ')))) ? $_d : $_c)).split(/[\r\n]/)))) ? $_d : $_c), function($24, $25) {
      return $24.split(/\s+/);
    }), function($26, $27) {
      return $26;
    }), function(a, b) {
      var aa, bb;
      aa = ($AI.number_op(a));
      bb = ($AI.number_op(b));
      if (aa < bb) return 1;
      if (aa > bb) return -1;;
      return 0;
    });
    var $36 = $.corpus,
      $35;
    if (undefined === $36) $36 = [];
    var $37 = $36.length;
    for ($35 = 0; $35 < $37; $35++) {
      _line = $36[$35];
      _weight = 1;
      var $32 = _line,
        $31;
      if (undefined === $32) $32 = [];
      var $33 = $32.length;
      for ($31 = 0; $31 < $33; $31++) {
        _word = $32[$31];
        if ($29 = (($AI.number_op(_word)))) {
          _weight = $29;
        } else if ($30 = ((_word.length >= $.window))) {
          _valid.push(_word);
          if ($28 = ((_word.length > $.window))) {
            $.AddWord(_word, _weight);
          }
        };
      };
    }
    $.corpus = ((undefined !== ($_b = _valid)) ? $_b : {});
    $.Finalize();
  }
};
var $10g = prototype['Generate'] || function() {};
prototype['Generate'] = function(p) {
  var $_d, $_c, $47, $46, $45, $44, $43, _word, _duplicate, $42, $41, $40, _tally, _results, $39, _wordcount = p,
    $ = this['Generate'] ? this : $bindfail('Generate'); {
    _results = [];
    _tally = $AI.reduce_op_fast($.corpus, function($42, $40, $41) {
      $42[$40] = 1;;
      return $42;
    }, {});
    _duplicate = (_WATCHDOG * _wordcount);
    var $43;
    while ($43 = (((_results.length < _wordcount) && (_duplicate > 0)))) {
      _word = $.GetWord();
      if (!((_tally[_word] || (_word.length < $.minimum)))) {
        _results.push(_word);
      } else {
        _duplicate--;
      }
      _tally[_word] = (_tally[_word] || 0) + 1;
    }
    _results = $AI.sort_op(_results, function(a, b) {
      var aa, bb;
      aa = _tally[a];
      bb = _tally[b];
      if (aa < bb) return 1;
      if (aa > bb) return -1;;
      return 0;
    });
    if ($47 = ($.frequency)) {
      $46 = _results;
      _results = $AI.map_op($46, function($44, $45) {
        return '' + $44 + '(' + _tally[$44] + ')';
      });
    }
    return (_results);
  }
};
var $11g = prototype['AddWord'] || function() {};
prototype['AddWord'] = function(p, _weight) {
  var $_b, $52, $51, $50, $49, _predicted, _current, $48, _word = p,
    $ = this['AddWord'] ? this : $bindfail('AddWord'); {
    _word = '' + $.leader + _word + '_';
    var $49 = 0,
      $50 = (_word.length - $.window),
      $51 = 1;
    if ($51 <= 0) throw new Error("SAI Runtime: COUNT STEP value should be positive.");
    for (; $49 < $50; $49 = $49 + $51) {
      _current = $AI.slice_op(_word, $49, $.window);
      _predicted = $AI.slice_op(_word, ($49 + $.window), 1);
      if (undefined === $.markov[_current]) $.markov[_current] = {};
      $.markov[_current][_predicted] = (_weight + ((undefined !== ($_b = $.markov[_current][_predicted])) ? $_b : 0));;
    }
  }
};
var $12g = prototype['GetWord'] || function() {};
prototype['GetWord'] = function(p) {
  var $_d, $_c, $58, $57, $56, $55, $54, _predicted, _selection, _current, _word, $53, $ = this['GetWord'] ? this : $bindfail('GetWord'); {
    _word = $.leader;
    do {
      _current = $AI.slice_op(_word, undefined, (0 - ($.window)));
      _selection = _Floor(($.totals[_current] * _Random()));
      _predicted = $AI.reduce_op_fast($.markov[_current], function($58, $56, $57) {
        if ($55 = ((_selection >= 0))) {
          _selection = (_selection - $56);
          if ($54 = ((_selection < 0))) {
            $58 = $57;
          }
        };
        return $58;
      }, 'BAD_MARKOV');
      _word += _predicted;
    } while (!((_predicted === '_')));
    _word = $AI.slice_op(_word, $.window, (0 - (1)));
    return (_word);
  }
};
$AI.finalizePrototype(prototype);
if (prototype.isof[prototype.isa].type === "singleton") { prototype.Constructor(); prototype.Instantiate(); }
var result=prototype.isof[prototype.isa].type === "main" ? prototype.constructor() : prototype;
exports=result; try { module.exports=result; } catch(e) {};
return result;
