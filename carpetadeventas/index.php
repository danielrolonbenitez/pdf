<?php 
error_reporting(E_ALL);
ini_set('display_errors',true);
ini_set("memory_limit","64M");
require_once(dirname(__FILE__).'/html2pdf/html2pdf.class.php');
define("ROOTPDF_DIR", str_replace(DIRECTORY_SEPARATOR, '/', realpath(dirname(__FILE__))));
define("SAVEPDF_DIR", ROOTPDF_DIR.'/saves/');
define("TEMPLATEPDF_DIR", ROOTPDF_DIR.'/templates/');
define("TEMPLATES_DIR", ROOTPDF_DIR.'/templates/frontend/');
function createPDF($fileArray=null){
	$html ='';
	foreach($fileArray as $file){
		ob_start();
		include(TEMPLATEPDF_DIR.$file.'.html');
		$html .= ob_get_clean();
	}
	 try
    {
        $html2pdf = new HTML2PDF('P', 'A4', 'es');
        $html2pdf->setDefaultFont('Arial');
        $html2pdf->writeHTML($html);
        $html2pdf->Output('carpeta_de_venta.pdf','D');
    }
    catch(HTML2PDF_exception $e) {
        die($e);
    }
}
/*function generateStaticPDF($fileArray=null){
	$html ='';
	foreach($fileArray as $file){
		ob_start();
		include(TEMPLATEPDF_DIR.$file.'.html');
		$html .= ob_get_clean();
	}
	try
    {
        $html2pdf = new HTML2PDF('P', 'A4', 'es');
        $html2pdf->setDefaultFont('Arial');
        $html2pdf->writeHTML($html);
        $html2pdf->Output('carpeta_de_venta.pdf','D');
    }
    catch(HTML2PDF_exception $e) {
        die($e);
    }
}*/
if(isset($_POST['componentes'])){
	$files = array("institucional","clientes");
	foreach($_POST['componentes'] as $componente){
		$files[] = $componente;
	}
	$files[]='contacto';
	createPDF($files);
	//se carga el codigo html
	
}
?>
<?php
include(TEMPLATES_DIR.'index.html');
?>