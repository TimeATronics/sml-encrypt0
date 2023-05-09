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
