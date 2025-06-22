<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Inclusione della libreria
echo file_exists('hotdocs/PHPMailer.php') ? '✅ File trovato' : '❌ File mancante';
require 'hotdocs/PHPMailer.php';
require 'hotdocs/SMTP.php';
require 'hotdocs/Exception.php';

$mail = new PHPMailer(true);

try {
    // Impostazioni SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'stauluca2000@gmail.com';         
    $mail->Password   = 'prbh wwty hvxc cuky';            
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Mittente e destinatario
    $mail->setFrom('stauluca2000@gmail.com', 'Bolletta Chiara');
    $mail->addAddress('stauluca2000@gmail.com');          

    // Raccoglie i dati dal form
    $nome = htmlspecialchars($_POST['nome']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    // Oggetto e corpo
    $mail->Subject = '📨 Nuova richiesta dal sito Bolletta Chiara';
    $body  = "Hai ricevuto una nuova richiesta:\n\n";
    $body .= "👤 Nome: $nome\n";
    $body .= "📧 Email: $email\n";
    $mail->Body = $body;

    // Aggiunge allegato, se presente
    if (isset($_FILES['allegato']) && $_FILES['allegato']['error'] === UPLOAD_ERR_OK) {
        $mail->addAttachment($_FILES['allegato']['tmp_name'], $_FILES['allegato']['name']);
    }

    // Invia l'email
    $mail->send();
    header("Location: grazie.html");
    exit();

} catch (Exception $e) {
    echo "❌ Errore nell'invio: {$mail->ErrorInfo}";
}
?>
