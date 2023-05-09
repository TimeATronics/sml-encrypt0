fun inRange(start, stop, x) =
    x >= start andalso x <= stop;
fun indexedFilter(lst, pred) =
  let
    val (lst', _) =
      List.foldl 
        (fn (x, (acc, idx)) => 
           if pred(x, idx) then (x :: acc, idx + 1)
           else (acc, idx + 1))
        ([], 0)
        lst
  in
    List.rev lst'
  end;

fun slice(lst, start, stop) =
  indexedFilter(lst, fn (_, idx) => inRange(start, stop, idx));

(* End of definition of slice fun *)

fun bin n = let fun g' 0 acc = acc | g' num acc = g' (num div 2) (num mod 2 :: acc) in g' n [] end;

(* End of definition of int->bin fun *)

fun xor(a:int,b:int):bool=a<>b;
fun btoint(a:bool):int=if a then 1 else 0;
(* End of definition of xor fun *)

fun power b e =
	if e = 0
		then 1
	else
		b * power b (e-1);

(* End of definition of power fun *)

fun BinToInt b i =
	if b = 0 orelse b = 1 then
		(b * power 2 i)
	else
		(((b mod 10) * (power 2 i)) + BinToInt (b div 10) (i + 1));

(* End of definition of BinaryToDecimal fun *)

val str = "ABCDE" : string;
val keystr = "BCDEFGH" : string;

val lis = explode str : char list;
val keylis = explode keystr : char list;

val ordlist = map(fn x => ord x) lis;
val ordkey = map(fn x => ord x) keylis;

val binlist=map(fn x => bin x) ordlist;
val binkey = map(fn x => bin x) ordkey;

val key = map(fn x => List.nth(slice(x,4,4), 0)) binkey;

val final = map(fn x => ListPair.map(fn (y,z) => btoint(xor(y, z))) (x, key)) binlist;
(* final is the XORRED input in the form of list of lists of int *)
(* ListPair.map is used to map two lists at once *)
'
val final2 = map(fn x => map(fn y => Option.valOf(Char.fromString(Int.toString(y)))) x) final;
(* final2 is list of list of char of the individual ints from final *)
(* from[DataType] converts to SOME (option) data type
	thus, Option.valOf is used.
	Also, no straightforward int -> char exists;
	so, int -> string -> char is done
*)

val final3 = map(fn x => Option.valOf(Int.fromString(implode(x)))) final2;
(* final3 is list of binary numbers *)
(* Implode makes string from char list
	which is converted to int (SOME option type)
	thus, Option.valOf is used again
*)

val ActualFinal = implode(map(fn x => chr (BinToInt x 0)) final3);
(* ActualFinal is final3 converted to ASCII string *)
(* It uses BinToInt to convert Binary to Decimal *)

TextIO.print "Input: ";
TextIO.print str;
print "\n";
TextIO.print "Key: ";
TextIO.print keystr;
print "\n";
TextIO.print "Output: ";
TextIO.print ActualFinal;
print "\n";

(* Decryption: *)

val inputstr = "_\]Z[" : string;
val inputlist = explode inputstr;
val inputbin = map(fn x => bin (ord x)) inputlist;
val unxor = map(fn x => ListPair.map(fn (y,z) => btoint(xor(y, z))) (x, key)) inputbin;
val unxor2 = map(fn x => map(fn y => Option.valOf(Char.fromString(Int.toString(y)))) x) unxor;
val unxor3 = map(fn x => Option.valOf(Int.fromString(implode(x)))) unxor2;
val InputFinal = implode(map(fn x => chr (BinToInt x 0)) unxor3);

TextIO.print "Input back from Output: ";
TextIO.print InputFinal;
print "\n";

