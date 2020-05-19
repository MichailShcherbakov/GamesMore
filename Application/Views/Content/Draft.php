<div class="draft">

    <div class="content-header-info">

        <div class="content-header-layout-left">

			<a class="btn-community">
				<img src="/Public/img/gamepad.png"/>
				<p>Игры</p>
			</a>

			<a class="btn-author-name">
				<p>Антон Самитов</p>
			</a>

			<div class="time-publication">
				<p>41 минуту назад</p>
            </div>
            
            <a class="views">
				<img src="/Public/img/paint-bucket-gray.png"/>
				<p>15 000</p>
			</a>
						
		</div>

		<div class="content-header-layout-right">

			<div class="btn-control btn-edit">
			    <img src="/Public/img/dotted.png"/>
			</div>
						
		</div>

    </div>

    <div class="content-block content-block--main-title">
        <h1><?php echo $content[0]["title-block"]["value"]["text"]; ?></h1>
    </div>

    <?php foreach ($content as $key => $value): ?>

            <?php if (array_key_exists("isPinned", $value) && $value["isPinned"]): ?>

                <?php if (array_key_exists("text-block", $value)) : ?>

                    <div class="content-block content-block--text">
                        <p><?php echo $value["text-block"]["value"]["text"]; ?></p>
                    </div>

                <?php elseif (array_key_exists("media-block", $value)) : ?>

                    <div class="content-block content-block--media">
                        <img src="<?php echo $value["media-block"]["value"]["files"][0]["url"]; ?>" 
                            class="img-fluid <?php echo $value["media-block"]["value"]["files"][0]["isUsedSubstrate"] ? "img-substrate" : ""; ?>"/>
                    </div>

                <?php endif; ?>

                <?php break; ?>

            <?php endif; ?>
    
    <?php endforeach; ?>

    <div class="content-toolbar-block">

        <a class="btn-comments">
            <img src="/Public/img/speech-bubble.png"/>
            <p>546</p>
            <p>комментариев</p>
        </a>

        <div class="btn-bookmarks">
            <img src="/Public/img/bookmark.png"/>
            <p>В закладки</p>
        </div>

    </div>

    <?php $isFirst = true; ?>
    <?php $isPinnedFound = true; ?>

    <?php foreach ($content as $key => $value): ?>

        <?php if ($isFirst): ?>
            <?php $isFirst = false; ?>
            <?php continue; ?>
        <?php endif; ?>
        
        <?php if (array_key_exists("isPinned", $value) && $value["isPinned"] && $isPinnedFound): ?>
            <?php $isPinnedFound = false; ?>
            <?php continue; ?>
        <?php endif; ?>

        <?php if (array_key_exists("text-block", $value)) : ?>

            <div class="content-block content-block--text">
                <p><?php echo reset($value)["value"]["text"]; ?></p>
            </div>

        <?php elseif (array_key_exists("title-block", $value)) : ?>
            
            <div class="content-block content-block--title">
                <<?php echo reset($value)["value"]["type"]; ?>>
                    <?php echo reset($value)["value"]["text"]; ?>
                </<?php echo reset($value)["value"]["type"]; ?>>
            </div>

        <?php elseif (array_key_exists("media-block", $value)) : ?>

            <div class="content-block content-block--media">

                <img src="<?php echo $value["media-block"]["value"]["files"][0]["url"]; ?>" 
                    class="img-fluid <?php echo $value["media-block"]["value"]["files"][0]["isUsedSubstrate"] ? "img-substrate" : ""; ?>"/>

             </div>

        <?php endif; ?>

    <?php endforeach; ?>

</div>