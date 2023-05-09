var shiftChar =
  function(ch, shftAmt) {
    return (function(_x2) {
        try {
          return (function() {
              if (_x2 !== " ") throw "FAIL";
              return " ";
            })();
        } catch(_x3) {
          if (_x3 !== "FAIL") throw _x3;
          return (function() {
              return chr(
                  _SML._checkOverflow(
                    _SML._checkOverflow(
                      _SML._checkOverflow(
                        _SML._checkOverflow(ord($Char.toUpper(ch)) - 65)
                          +
                          shftAmt
                      )
                        %
                        26
                    )
                      +
                      65
                  )
                );
            })();
        }
      })(ch);
  };
var encrypt =
  function(str, shftAmt) {
    return $String.implode(
        map(
          function(_x5) {
            return (function() {
                var x = _x5;
                return shiftChar(x, shftAmt);
              })();
          }
        )($String.explode(str))
      );
  };
var decrypt =
  function(str, shftAmt) {
    return encrypt(str, _SML._checkOverflow(shftAmt * -1));
  };
var inRange =
  function(start, stop, x) {
    return (function(_x8) {
        try {
          return (function() {
              if (_x8 !== true) throw "FAIL";
              return x
                  <=
                  stop;
            })();
        } catch(_x9) {
          if (_x9 !== "FAIL") throw _x9;
          return (function() {
              if (_x8 !== false) throw _SML.Match;
              return false;
            })();
        }
      })(x >= start);
  };
var indexedFilter =
  function(lst, pred) {
    return (function() {
        var _x11 =
          $List.foldl(
            function(x, _id10879) {
              var acc = _id10879[0];
              var idx = _id10879[1];
              return (function(_x12) {
                  try {
                    return (function() {
                        if (_x12 !== true) throw "FAIL";
                        return [
                            _colon_colon(x, acc), _SML._checkOverflow(idx + 1)
                          ];
                      })();
                  } catch(_x13) {
                    if (_x13 !== "FAIL") throw _x13;
                    return (function() {
                        if (_x12 !== false) throw _SML.Match;
                        return [acc, _SML._checkOverflow(idx + 1)];
                      })();
                  }
                })(pred(x, idx));
            }
          )(nil, 0)(lst);
        var lst$ = _x11[0];
        var _x14 = _x11[1];
        return $List.rev(lst$);
      })();
  };
var slice =
  function(lst, start, stop) {
    return indexedFilter(
        lst,
        function(_id10880, idx) { return inRange(start, stop, idx); }
      );
  };
var bin =
  function(_x17) {
    return (function() {
        var n = _x17;
        return (function() {
            var g$ =
              function(_x19) {
                return (function() {
                    var _id10582 = _x19;
                    return function(_x20) {
                        return (function() {
                            var _id10583 = _x20;
                            return (function() {
                                var _x21 = _SML._tuplifyArgs(arguments);
                                try {
                                  return (function() {
                                      var _x23 = _x21[0];
                                      if (_x23 !== 0) throw "FAIL";
                                      var acc = _x21[1];
                                      return acc;
                                    })();
                                } catch(_x22) {
                                  if (_x22 !== "FAIL") throw _x22;
                                  return (function() {
                                      var num = _x21[0];
                                      var acc = _x21[1];
                                      return g$(_SML._checkOverflow(num / 2))(
                                          _colon_colon(
                                            _SML._checkOverflow(num % 2),
                                            acc
                                          )
                                        );
                                    })();
                                }
                              }).apply(void 0, [_id10582, _id10583]);
                          })();
                      };
                  })();
              };
            return g$(n)(nil);
          })();
      })();
  };
var xor = function(a, b) { return _less_greater(a, b); };
var btoint =
  function(_x26) {
    return (function() {
        var a = _x26;
        return (function(_x27) {
            try {
              return (function() {
                  if (_x27 !== true) throw "FAIL";
                  return 1;
                })();
            } catch(_x28) {
              if (_x28 !== "FAIL") throw _x28;
              return (function() {
                  if (_x27 !== false) throw _SML.Match;
                  return 0;
                })();
            }
          })(a);
      })();
  };
var power =
  function(_x30) {
    return (function() {
        var _id10587 = _x30;
        return function(_x31) {
            return (function() {
                var _id10588 = _x31;
                return (function(b,
                    e) {
                    return (function(_x32) {
                        try {
                          return (function() {
                              if (_x32 !== true) throw "FAIL";
                              return 1;
                            })();
                        } catch(_x33) {
                          if (_x33 !== "FAIL") throw _x33;
                          return (function() {
                              if (_x32 !== false) throw _SML.Match;
                              return _SML._checkOverflow(
                                  b
                                    *
                                    power(b)(_SML._checkOverflow(e - 1))
                                );
                            })();
                        }
                      })(e === 0);
                  }).apply(void 0, [_id10587, _id10588]);
              })();
          };
      })();
  };
var BinToInt =
  function(_x35) {
    return (function() {
        var _id10589 = _x35;
        return function(_x36) {
            return (function() {
                var _id10590 = _x36;
                return (function(b,
                    i) {
                    return (function(_x37) {
                        try {
                          return (function() {
                              if (_x37 !== true) throw "FAIL";
                              return _SML._checkOverflow(b * power(2)(i));
                            })();
                        } catch(_x38) {
                          if (_x38 !== "FAIL") throw _x38;
                          return (function() {
                              if (_x37 !== false) throw _SML.Match;
                              return _SML._checkOverflow(
                                  _SML._checkOverflow(
                                    _SML._checkOverflow(b % 10)
                                      *
                                      power(2)(i)
                                  )
                                    +
                                    BinToInt(_SML._checkOverflow(b / 10))(
                                      _SML._checkOverflow(i + 1)
                                    )
                                );
                            })();
                        }
                      })(
                        (function(_x39) {
                          try {
                            return (function() {
                                if (_x39 !== true) throw "FAIL";
                                return true;
                              })();
                          } catch(_x40) {
                            if (_x40 !== "FAIL") throw _x40;
                            return (function() {
                                if (_x39 !== false) throw _SML.Match;
                                return b
                                    ===
                                    1;
                              })();
                          }
                        })(b === 0)
                      );
                  }).apply(void 0, [_id10589, _id10590]);
              })();
          };
      })();
  };
var it = console.log("Message: ");
var str =
  encrypt(
    $Option.valOf(
      (function() {
        var _x43 = $TextIO.inputLine;
        var _x44 = $TextIO.stdIn;
        return _SML._isTuple(_x44)
            ? _x43.apply(void 0, _x44)
            : _x43(_x44);
      })()
    ),
    5
  );
var it = console.log("Key: ");
var keystr =
  $Option.valOf(
    (function() {
      var _x47 = $TextIO.inputLine;
      var _x48 = $TextIO.stdIn;
      return _SML._isTuple(_x48)
          ? _x47.apply(void 0, _x48)
          : _x47(_x48);
    })()
  );
var oldlis = explode(str);
var lis = $List.take(oldlis, _SML._checkOverflow($List.length(oldlis) - 1));
var oldkeylis = explode(keystr);
var keylis =
  $List.take(oldkeylis, _SML._checkOverflow($List.length(oldkeylis) - 1));
var ordlist =
  map(
    function(_x54) {
      return (function() {
          var x = _x54;
          return ord(x);
        })();
    }
  )(lis);
var ordkey =
  map(
    function(_x56) {
      return (function() {
          var x = _x56;
          return ord(x);
        })();
    }
  )(keylis);
var binlist =
  map(
    function(_x58) {
      return (function() {
          var x = _x58;
          return bin(x);
        })();
    }
  )(ordlist);
var binkey =
  map(
    function(_x60) {
      return (function() {
          var x = _x60;
          return bin(x);
        })();
    }
  )(ordkey);
var it = console.log("\n");
var key =
  map(
    function(_x63) {
      return (function() {
          var x = _x63;
          return $List.nth(slice(x, 4, 4), 0);
        })();
    }
  )(binkey);
var final =
  map(
    function(_x65) {
      return (function() {
          var x = _x65;
          return $ListPair.map(function(y, z) { return btoint(xor(y, z)); })(
              x,
              key
            );
        })();
    }
  )(binlist);
var final2 =
  map(
    function(_x67) {
      return (function() {
          var x = _x67;
          return map(
              function(_x68) {
                return (function() {
                    var y = _x68;
                    return $Option.valOf($Char.fromString($Int.toString(y)));
                  })();
              }
            )(x);
        })();
    }
  )(final);
var final3 =
  map(
    function(_x70) {
      return (function() {
          var x = _x70;
          return $Option.valOf($Int.fromString(implode(x)));
        })();
    }
  )(final2);
var ActualFinal =
  implode(
    map(
      function(_x72) {
        return (function() {
            var x = _x72;
            return chr(BinToInt(x)(0));
          })();
      }
    )(final3)
  );
var main = function() { return $TextIO.console.log(ActualFinal); };
var _x74 = main();
