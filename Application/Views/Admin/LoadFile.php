<h3 class="text-center">Gallery</h3>


<div class="container">

    <div class="row row-cols-3">

            <?php foreach($arrayImages as &$image): ?>

                <div class="col">
                    <img src="data:image/jpeg;base64,<?php echo base64_encode($image); ?>" class="img-fluid" style="margin: 5px;"/>
                </div>

            <?php endforeach; ?>

    </div>

</div>