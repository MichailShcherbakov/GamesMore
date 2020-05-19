<div class="layout-post">
				
					<div class="post-toolbar">

						<div class="post-toolbar-layout-left">

							<div class="post-type">
								<img src="/Public/img/gamepad.png"/>
								<p>Индустрия игр</p>
							</div>

							<div class="post-author-name">
								<p>Антон Самитов</p>
							</div>

							<div class="post-time-publication">
								<p>41 минуту назад</p>
							</div>
						
						</div>

						<div class="post-toolbar-layout-right">
							<div class="btn-control">
								<img src="/Public/img/dotted.png"/>
							</div>
						</div>
						
					</div>

					<div class="post-title">
						<h2>Sony отложила The Last of Us Part II и Marvel's Iron Man VR на неопределённый</h2>
					</div>

					<div class="post-content">

						<div class="post-content-text">
							<p>О новых датах релиза сообщат позже.</p>
						</div>

						<div class="post-content-image">
							<img src="/Public/img/3.jpg" class="img-fluid"/>
						</div>

					</div>

					<div class="post-footer">
						<div class="post-footer-layout">

							<div class="post-footer-layout-left">

								<div class="btn-comments">
									<img src="/Public/img/speech-bubble.png"/>
									<p>305</p>
								</div>


								<div class="btn-bookmarks">
									<img src="/Public/img/bookmark.png"/>
									<p>130</p>
								</div>

							</div>

							<div class="post-footer-layout-right">

							</div>

						</div>
					</div>

				</div>
<!--
<?php foreach($posts as $post): ?>

    <div class="post">

        <?php $blocks = json_decode($post["content"], true); ?>

        <div class="header-post">

            <h4 class="block-title"><?php echo $blocks[1]["main-block-title"]; ?></h4>

            <?php foreach($blocks as $index => $block): ?>

                <?php if (array_key_first($block) != "main-block-title" && 
                            array_key_exists("isPinned", $block[array_key_first($block)]) &&
                            $block[array_key_first($block)]["isPinned"]): ?>

                    <?php if (array_key_first($block) == "block-image"): ?>

                        <img src="<?php echo $block[array_key_first($block)]["value"]; ?>" class="img-fluid"/>

                    <?php elseif (array_key_first($block) == "block-text"): ?>

                        <p class="block-text"><?php echo $block[array_key_first($block)]["value"]; ?></p>

                    <?php endif; ?>

                <?php endif; ?>

            <?php endforeach; ?>

        </div>

        <div class="post-footer container">
            
            <div class="row">

                <div class="col-2 d-flex align-items-center btn-comments">
                    <img src="./Public/img/speech-bubble.png">
                    <div>167</div>
                </div>

                <div class="col-2 d-flex align-items-center btn-bookmark">
                    <img src="./Public/img/bookmark.png">
                    <div>167</div>
                </div>
                    
                <div class="col-2 ml-auto d-flexalign-items-center btn-votes">
                    <div>167</div>
                </div>
                    
            </div>

        </div>


    </div>

<?php endforeach; ?>

-->