<?php
//header('Access-Control-Expose-Headers: Access-Control-Allow-Origin');
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');


foreach ($_POST as $key => $value) {
	if ($value != null) {
		$user_fields[$key] = filter_var($value, FILTER_SANITIZE_STRING);
	}
}
$mail_enviado = false;

if ($user_fields) {
	$mensaje = "<h1>Nuevo Contacto</h1>";
	$mensaje .= "<hr />
	<dl>
		<dt>Nombre:</dt>
		<dd>".$user_fields['nombre']."</dd>
		<dt>Email:</dt>
    <dd>".$user_fields['email']."</dd>
    <dt>Teléfono:</dt>
		<dd>".$user_fields['telefono']."</dd>
		";
		if ($user_fields['empresa'] != '') {
			$mensaje .= "
			<dt>Empresa:</dt>
			<dd>".$user_fields['empresa']."</dd>";
		}
	  if ($user_fields['mensaje'] != '') {
	    $mensaje .= "
	    <dt>Mensaje:</dt>
	    <dd>".$user_fields['mensaje']."</dd>";
	  }

	$codigohtml = "<html><head><title>Nuevo contacto</title></head><body>".$mensaje."</body></html>";
	$mensaje .="<hr />";
	$mensaje = utf8_decode($mensaje);
	$destinatario = "lucas@ombustudio.com.ar";
	//$destinatario = "consultas@autostock-sa.com.ar";
	$asunto = "Nuevo contacto de ".$user_fields['nombre'];
	$cabeceras = "From: " . utf8_decode($user_fields['nombre']) . "<" . utf8_decode($user_fields['email']) . ">\r\nContent-type: text/html\r\n";

	if ($_POST['ant'] == '') {
		$mail_enviado = mail($destinatario, $asunto, $codigohtml, $cabeceras);
	} else {
		echo "Bot detected";
	}
}

if ($mail_enviado) {
	echo 'Mail enviado';
} else {
	echo 'Mail no enviado';
}

?>