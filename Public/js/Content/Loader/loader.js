let gParams = 
{
    inProcess : false,
    quantity : 10,
    currentPosition : 0,
    url : "",
    layout : "",
}

export let loader = { params : gParams, run : runLoader };

function runLoader()
{
    $(gParams.layout).scroll(function()
    {
        if ($(gParams.layout).scrollTop() + $(gParams.layout).height() -  gParams.currentPosition * 100 < $(document).height() ||  gParams.inProcess) 
            return;
    
        load();
    });

    load();
}

function load()
{
    $.ajax(
        {
            url: gParams.url,
            method: "post",
            data: 
            { 
                    "currentPos" : gParams.currentPosition,
                    "quantity" : gParams.quantity,
            },
            beforeSend: () => { gParams.inProcess = true; }
        }
    ).done(loadedData);
}

function loadedData(data)
{
    console.log("Loading data...");
    
    data = JSON.parse(data);

    console.log(data);

    if (data.length == 0)
        return;

    $.each(data, (index, data) =>
    {
        console.log(data);

        let content = JSON.parse(data.Content);

        let headerPost = `
        
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
                        <div class="btn-control btn-edit">
                            <img src="/Public/img/dotted.png"/>
                        </div>
                    </div>
                                
                </div>

                <div class="post-wrapper" data-index="` + data["id_Post"] + `">
        
        `;

        let contentPost = `<div class="post-title"><h2>` + content[0]["title-block"]["value"]["text"] + `</h2></div><div class="post-content">`;

        for (let i = 1; i < content.length; ++i)
        {
            let data = content[i];

            let key = Object.keys(data)[0];

            if (!data["isPinned"])
                continue;

            console.log(data);

            if (data.hasOwnProperty("title-block"))
            {
                contentPost += `
                
                <div class="post-title">
                    <h2>` + data["title-block"]["value"]["text"] + `</h2>
                </div>
                
                `;
            }
            else if (data.hasOwnProperty("text-block"))
            {

                contentPost += `
                
                <div class="post-content-text">
                    <p>` + data["text-block"]["value"]["text"] + `</p>
                </div>
                
                `;

            }
            else if (data.hasOwnProperty("media-block"))
            {
                let value = data["media-block"]["value"];

                contentPost += `
                
                <div class="post-content-image">
                    <img src="` + value["files"][0]["url"] + `" class="` + (value["files"][0]["isUsedSubstrate"] ? "img-substrate" : "img-fluid") + `"/>
                </div>
                
                `;
            }
        };

        $(gParams.layout).append(headerPost + contentPost + `

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
                    
        `);
    
        gParams.inProcess = false;
        gParams.currentPosition +=  this.quantity;
    });
    
    console.log("End load data.");
}


