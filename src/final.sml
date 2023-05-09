fun shiftChar (ch : char, shftAmt : int) : char =
	case ch of #" " => #" "
	|  _ => chr (((ord (Char.toUpper ch) - 65 + shftAmt) mod 26) + 65);

fun encrypt (str : string, shftAmt : int) : string =
	String.implode(map (fn x => shiftChar (x, shftAmt)) (String.explode(str)));

fun decrypt (str : string, shftAmt : int) : string =
	encrypt (str, shftAmt * ~1);

(* End of Definition of Caesar Cipher *)

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

print "Message: ";
val str = encrypt(Option.valOf(TextIO.inputLine TextIO.stdIn), 5) : string;
print "Key: ";
val keystr = Option.valOf(TextIO.inputLine TextIO.stdIn) : string;

val oldlis = explode str : char list;
val lis = List.take(oldlis, List.length(oldlis) - 1);
val oldkeylis = explode keystr : char list;
val keylis = List.take(oldkeylis, List.length(oldkeylis) - 1);

val ordlist = map(fn x => ord x) lis;
val ordkey = map(fn x => ord x) keylis;

val binlist=map(fn x => bin x) ordlist;
val binkey = map(fn x => bin x) ordkey;
print "\n";

val key = map(fn x => List.nth(slice(x,4,4), 0)) binkey;

val final = map(fn x => ListPair.map(fn (y,z) => btoint(xor(y, z))) (x, key)) binlist;
val final2 = map(fn x => map(fn y => Option.valOf(Char.fromString(Int.toString(y)))) x) final;
val final3 = map(fn x => Option.valOf(Int.fromString(implode(x)))) final2;
val ActualFinal = implode(map(fn x => chr (BinToInt x 0)) final3);
(*val OutputText = ActualFinal ^ "\n";
*)
fun main () =
	TextIO.print ActualFinal;

val _ = main ();

