<?php
$test = mail("l.staurenghi@konsulto.it", "Test invio da PHP", "Se stai leggendo questa email, il server funziona correttamente.");
echo $test ? "✅ Email inviata! Il server supporta mail()." : "❌ Invio fallito. Probabile blocco della funzione mail() su questo hosting.";
?>
