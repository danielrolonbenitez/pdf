$(document).ready(function() {
			
            $('input[type="checkbox"]').click(function(event) {
            	
            		if($(this).val()==5){
                     $('input[value="3"]').removeAttr('checked');
            		}

                    if($(this).val()==3){
                       $('input[value="5"]').removeAttr('checked');
            		}

            });






			var validated = '';
			$('.reset').click(function(){
				reset();
			});
			localstorage();
			$('.next').click(function(e){
			  e.preventDefault();
			  var nextId = $(this).parents('.tab-pane').next().attr("id");
			  
			  $('a[data-target=#'+nextId+']').tab('show');
			  return false;
			});

			$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
			  //update progress
			  console.log($(e.target));
			  var step = $(e.target).data('step');
			  var percent = (parseInt(step) / 2) * 100;
			  
			  $('.progress-bar').css({width: percent + '%'});
			  $('.progress-bar').text("Paso " + step + " de 2");
			  //e.relatedTarget // previous tab
			  return false;
			});

			$('.first').click(function(){
				
				$('.row.index').addClass('hidden');
				$('#myWizard').removeClass('hidden');
				$('a.first').tab('show');
			});
			
			$('#armar').click(function(){
				//var $inputEmail = $('form input[type="email"]');
				$('input').removeClass('invalid');
				$('.error-msg').text('');
				validated = validate();
				if(validated.success){
					$('#armar').tab('show');
					console.log(JSON.stringify($("form").serializeArray()));
					localStorage.setItem('prohygieneFormFields',JSON.stringify($("form").serializeArray()));
				}else{
					//alert('algunos campos no cumplen los requisitos');
						validated.fields.forEach(function(field){
						$('#'+field.field).addClass('invalid');
						$('#'+field.field).next().text(field.message);
					});
				}
				return false;
			});
		});
		function reset(){
			document.getElementById("carpeta").reset();
				$('[data-target=#step1]').tab('show');
				setTimeout(1000);
				$('#myWizard').addClass('hidden');
				$('.row.index').removeClass('hidden');
				localstorage();
		}
		function isEmail(email){
			return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );
		}
		function validate(){
			var field = '';
			var validator = {"success":true,"fields":[]};
			var $form = $('form');
			var $inputEmail = $('input[type="email"]');
			if($inputEmail.prop('required')){
				field = $inputEmail.attr('id');
				if($inputEmail.val()!=''){
					if(isEmail($inputEmail.val())){					
					}else{
						validator.success = false;
						validator.fields.push({"field":field,"status":"invalid","message":"Email Invalido"});
					}
				}else{
					validator.success = false;
					validator.fields.push({"field":field,"status":"invalid","message":"Completar Campo"});
				}
			}
			$('input[type="text"],textarea').each(function(index){
				field = $(this).attr('id');
				if($(this).prop('required')){
					if($(this).val()!=''){
						if($(this).data('validate') == 'numbers'){
							var reg = new RegExp('^[0-9]+$');
							if(!reg.test($(this).val())){
								validator.success = false;
								validator.fields.push({"field":field,"status":"invalid","message":"Solamente Numeros"});
							}
						}
					}else{
						validator.success = false;
						validator.fields.push({"field":field,"status":"invalid","message":"Completar Campo"});
					}
				}
			});
			//console.log(validator);
			return validator;
		}
		function localstorage(){
			var formFields = JSON.parse(localStorage.getItem('prohygieneFormFields'));   
				if(formFields  !== null){
					$.each(formFields, function() {
						if(this.name != 'componentes[]'){
						$('[name="'+this.name+'"]').val(this.value);
						}
					 });
				}
		}