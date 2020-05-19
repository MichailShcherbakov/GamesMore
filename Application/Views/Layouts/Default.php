<!DOCTYPE html>
<html lang="ru">

<head>

	<meta charset="UTF-8">

	<title><?php echo $TITLE; ?></title>

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" crossorigin="anonymous"/>
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap&subset=cyrillic" rel="stylesheet">

	<link rel="shortcut icon" href="/Public/img/favicon.png" type="image/png">

	<?php foreach($STYLES as $key): ?>
		<link rel="stylesheet" href="/Public/css/<?php echo $key; ?>.css">
	<?php endforeach; ?>

</head>

<body data-theme="<?php echo $theme; ?>">
	
	<div class="header-layout">

		<div class="layout-spacer"></div>

		<div class="layout-header-column">
			<a class="header-logo">gamesmore</a>
		</div>

		<div class="layout-header-center">
			<div class="layout-user-toolbar">

				<?php if (isset($user)): ?>

					<div class="btn-user">
						<img src="/Public/img/avatars/<?php echo $user["Avatar"]; ?>" draggable="false"/>
					</div>

					<div class="btn-user-toolbar">
						<img src="/Public/img/themes/<?php echo $theme; ?>/triangle-x16.png" draggable="false"/>
					</div>

					<div tabindex="1" class="popup-user-toolbar">
                        
						<div class="popup-user-toolbar-title">
							<p>Профиль</p>
						</div>

						<div class="popup-user-toolbar-menu">
						
							<div class="popup-user-toolbar-menu-item">
								<img src="/Public/img/avatars/<?php echo $user["Avatar"]; ?>" draggable="false"/>
								<p><?php echo $user["Username"]; ?></p>
							</div>

							<div class="popup-user-toolbar-menu-item">
								<img src="/Public/img/file.png" draggable="false"/>
								<p>Черновик</p>
							</div>

							<div class="popup-user-toolbar-menu-item">
								<img src="/Public/img/small-bookmark.png" draggable="false"/>
								<p>Закладки</p>
							</div>

							<div class="popup-user-toolbar-menu-item">
								<img src="/Public/img/gear.png" draggable="false"/>
								<p>Настройки</p>
							</div>
						
							<div id="btn-logout" class="popup-user-toolbar-menu-item popup-user-toolbar-menu-item-exit">
								<img src="/Public/img/logout.png" draggable="false"/>
								<p>Выход</p>
							</div>

						</div>

					</div>

				<?php else: ?>

					<div class="btn-auth">
						<img src="/Public/img/themes/<?php echo $theme; ?>/user-white-x32.png">
						<p>Войти</p>
					</div>
					
				<?php endif; ?>

			</div>
		</div>

		<div class="layout-header-column"></div>

		<div class="layout-spacer"></div>

	</div>

	<div class="main-layout">

		<div class="layout-spacer"></div>

		<div class="layout-column-left">

			<div class="layout-left">
				<div class="menu">
					<a class="menu-item"><p>Популярное</p></a>
					<a class="menu-item"><p>Свежее</p></a>
					<a class="menu-item"><p>Сообщения</p></a>
					<a class="menu-item"><p>Рейтинг</p></a>
				</div>
			</div>

		</div>

		<div class="layout-center">

			<div class="layout-page">

				<?php echo $CONTENT; ?>

			</div>

		</div>

		<div class="layout-column-right"></div>

		<div class="layout-spacer"></div>

	</div>

	<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.13.0/umd/popper.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

	<?php foreach($SCRIPTS as $key): ?>
		<script type="module" src="/Public/js/<?php echo $key; ?>.js"></script>
	<?php endforeach; ?>

</body>

</html>