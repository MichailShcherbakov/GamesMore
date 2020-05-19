$(document).ready(function()
{

	let authMenu = `
		<div class="auth-container">
			<h5>Вход на GameMore</h5>
			<div class="row btn-social">
				<div class="col d-flex align-self-center">
					<img src="/Public/img/google.png"/>
					<div>Google</div>
				</div>
			</div>
			<div class="row btn-social">
				<div class="col d-flex align-self-center">
					<img src="/Public/img/vk.png"/>
					<div>Вконтакте</div>
				</div>
			</div>
			<div id="AuthEmail" class="row btn-social">
				<div class="col d-flex align-self-center">
					<img src="/Public/img/email.png"/>
					<div>Через почту</div>
				</div>
			</div>
			<div class="d-flex">
				<div class="row btn-social" style="margin-right: 8px; margin-top: 0;">
					<div class="col d-flex align-self-center">
						<img src="/Public/img/facebook.png"/>
						<div>Facebook</div>
					</div>
				</div>
				<div class="row btn-social" style="margin-left: 8px; margin-top: 0;">
					<div class="col d-flex align-self-center">
						<img src="/Public/img/twitter.png"/>
						<div>Twitter</div>
					</div>
				</div>
			</div>
		</div>
	`;

    $(document).on("click", ".btn-auth", function()
    {
		$("body").css("overflow", "hidden");

		$("body").append(`
		
			<div class="auth-form">
				<div class="auth-form-background"></div>
				<div class="container">
					<div class="row h-100">
						<div class="d-flex align-self-center form-container">
							<div class="btn-exit-form">
								<img src="/Public/img/close.png">
							</div>
							<div class="auth-form-art">
								<img src="/Public/img/art.jpg"/>
							</div>
							<div class="auth">
								` + authMenu + `
							</div>
						</div>
					</div>
				</div>
			</div>
		`);

    });

	$(document).on("click", "#AuthEmail", function()
	{
		$(".auth").empty();
		$(".auth").append(`
			<div class="auth-toolbar">
				<div class="btn-back-form">
					<img src="/Public/img/back.png">
					<p>К авторизации</p>
				</div>
			</div>
			<div class="login-form">
				<h5>Ввойти через почту</h5>
				<p>или <a>зарегистрироваться</a></p>
				<input type="email" placeholder="Почта" class="auth-email" />
				<input type="password" placeholder="Пароль" class="auth-password" />
				<button class="btn-login">Войти</button>
			</div>
		`);
	});

	$(document).on("click", ".auth-form-background", function()
	{
		$(".auth-form").remove();
		$("body").css("overflow", "overlay");
	});

	$(document).on("click", ".btn-login", function()
	{
		$("body").css("overflow", "overlay");

		$.ajax(
		{
			url: "/login/",
			method: "POST",
			data: 
			{
				"email" : $(".auth-email").val(),
				"password" : $(".auth-password").val()
			},
			success: function(data)
			{
				console.log(data);
				window.location.replace(window.location);
			}
		}).done(function(data)
		{
			console.log(data);
		});
	});

	$(document).on("click", ".btn-back-form", function()
	{
		$(".auth").empty();
		$(".auth").append(authMenu);
	});

	$(document).on("click", ".btn-exit-form", function()
	{
		$(".auth-form").remove();
		$("body").css("overflow", "overlay");
	});
});