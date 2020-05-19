<div class="page-header">
    <div class="page-header-layout">

        <div class="user-logo-layout">

            <div class="user-avatar">
                <img src="/Public/img/avatars/<?php echo $user["Avatar"]; ?>" draggable="false"/>
            </div>

            <div class="user-control-buttons">

                <div class="btn-control btn-settings">
                    <img src="/Public/img/themes/<?php echo $theme; ?>/settings-x32.png" draggable="false"/>
                </div>

                <div class="btn-control">
                    <img src="/Public/img/themes/<?php echo $theme; ?>/comment-x32.png" draggable="false"/>
                    <p>Написать</p>
                </div>

            </div>

        </div>

        <div class="user-name-layout">
            <p><?php echo $user["Username"]; ?></p>
        </div>

        <div class="user-date-registration-layout">
            <p>Зарегистрировался 31 мар в 17:55</p>
        </div>

    </div>
</div>

<div class="page-tabs">
    <div class="page-tabs-layout">

        <div id="tab-posts" class="tab-layout tab-is-active">
            <div class="tab-layout-title">
                <p>Статьи</p>
            </div>
        </div>

        <?php if (isset($numberDrafts) && $numberDrafts > 0): ?>

            <div id="tab-drafts" class="tab-layout">

                <div id="" class="tab-layout-title">
                    <p>Черновики</p>
                </div>

                <span><?php echo $numberDrafts ?></span>
            </div>

        <?php endif; ?>


        <div class="tab-layout">
            <div class="tab-layout-title">
                <p>Уведомления</p>
            </div>
        </div>

        <div class="tab-layout">
            <div class="tab-layout-title">
                <p>Информация</p>
            </div>
        </div>

    </div>
</div>

<div class="page-content">
    <div class="page-content-layout">

        <div class="page-content-block page-content-block--proposal">
            <p class="font-weight-6">Увы, тут пока пусто</p>
            <p>Если у вас есть интересная идея для статьи, не стесняйтесь и скорее <br><a class="btn-create-post" href="/writing/">начинайте писать</a></p>
        </div>

    </div>
</div>