fun shiftChar (ch : char, shftAmt : int) : char =
	case ch of #" " => #" "
	|  _ => chr (((ord (Char.toUpper ch) - 65 + shftAmt) mod 26) + 65);

fun encrypt (str : string, shftAmt : int) : string =
	String.implode(map (fn x => shiftChar (x, shftAmt)) (String.explode(str)));

fun decrypt (str : string, shftAmt : int) : string =
	encrypt (str, shftAmt * ~1);

val str = "Hey there";
val encStr = encrypt(str, 4);
val decStr = decrypt(encStr, 4);

TextIO.print encStr;
print "\n";
TextIO.print decStr;
