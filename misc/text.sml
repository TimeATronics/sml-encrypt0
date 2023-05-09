fun power b e =
	if e = 0
		then 1
	else
		b * power b (e-1);

fun BinToInt b i =
	if b = 0 orelse b = 1 then
		(b * power 2 i)
	else
		(((b mod 10) * (power 2 i)) + BinToInt (b div 10) (i + 1));

val test = BinToInt 100 0;
