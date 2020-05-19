<!DOCTYPE html>
<html lang="ru">

<head>

	<meta charset="UTF-8">

	<title><?php echo $TITLE; ?></title>

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" crossorigin="anonymous"/>

	<?php foreach($STYLES as $key): ?>

		<link rel="stylesheet" href="/Public/css/<?php echo $key; ?>.css">

	<?php endforeach; ?>
	
</head>

<body>

    <div class="container">

        <div class="row">

            <div class="col-3 menu-panel">
                <ul class="menu">
                    <li><a href="/admin/posts/">Posts</a></li>
                </ul>
            </div>

            <div class="col-9">
                <?php echo $CONTENT; ?>
            </div>

        </div>

    </div>

    
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.13.0/umd/popper.min.js" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" crossorigin="anonymous"></script>
    <script src="/Public/js/main.js"></script>
    <script src="/Public/js/Textarea.js"></script>
    <script src="/Public/js/PostEditor.js"></script>

</body>

</html>