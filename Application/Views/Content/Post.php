<div id="layout">

    <?php foreach ($blocks as $block): ?>

        <?php if (array_key_exists("main-block-title", $block)): ?>

            <h1><?php echo $block["main-block-title"]; ?></h1>

        <?php elseif (array_key_exists("block-text", $block)): ?>

            <p><?php echo $block["block-text"]["value"]; ?></p>

        <?php elseif (array_key_exists("block-image", $block)): ?>

            <img src="<?php echo $block["block-image"]["value"]; ?>" class="img-fluid">

        <?php endif; ?>

        

    <?php endforeach; ?>

</div>