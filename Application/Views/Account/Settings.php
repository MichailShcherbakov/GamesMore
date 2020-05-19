<div class="page-header">
    <div class="page-header-layout">

        <div class="user-logo-layout">

            <div class="user-avatar">
                <img src="/Public/img/avatars/<?php echo $user["Avatar"]; ?>"/>
            </div>

            <div class="user-control-buttons">

                <div class="btn-control btn-settings">
                    <img src="/Public/img/themes/<?php echo $theme; ?>/settings-x32.png"/>
                </div>

                <div class="btn-control">
                    <img src="/Public/img/comment.png" draggable="false"/>
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

<div class="page-tabs-layout">

    <div id="tab-posts" class="tab-layout">
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

<div class="page-content-layout">

    <div class="page-content-block page-content-block--settings--dark-mode">
        <p>Темная тема</p>
        <input class="btn-dark-mode" type="checkbox" <?php echo $theme == "white" ? "" : "checked" ?>>
    </div>

</div>