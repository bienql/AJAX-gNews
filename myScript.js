$(document).ready(function() {
    $(window).on("load", 2000, function() {
        $(".loading_screen").fadeIn("slow");
        $(".loading_screen").fadeOut("slow");
    });

    let endpoint = 'https://gnews.io/api/v4/top-headlines?token=c12e0605975c6e694f15f963cc4028c8&lang=en';
  
    fetch(endpoint)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        var content = '';
        data["articles"].forEach(function(element) {
            
            content += "<div class='row'>";
            content += "<div class='col-md-4'><img class='img-responsive' width='100%' src='" + element.image + "'></div>"
            content += "<div class='col-md-8'><a href='" + element.url + "' target='_blank'>"+ element.title + "</a>";
            content += "<br><i>" + element.publishedAt + "</i>";
            content += "<p>" + element.description + "</div></div>";
        });
        $("#newsfeed").html(content);
        $("#mynewslogo").on("click", function() {
            $("#newsfeed").html(content);
        })
    });

    
    $("#search_icon").on("click", function() {
        $(".modal").slideToggle("slow");
    });

    $("#close_search").on("click", function() {
        $(".modal").slideUp("slow");
        $(".modal").slideUp("slow");
        $("#published_date_from").val('');
        $("#published_date_to").val('');
        $("#topic").val('Choose a topic...');
        $("#country").val('Choose a country...');
    });

    $("#search_button").on("click", function() {
        $(".loading_screen").fadeIn("slow");
        $(".loading_screen").fadeOut("slow");

        var search_string = '&q=' + $("#searchbox").val();
        var published_date_from = '&from=' + $("#published_date_from").val() + 'T00:00:00Z';
        var published_date_to = '&to=' + $("#published_date_to").val() + 'T00:00:00Z';
        var topic = '';
        if($("#topic option:selected").text() != "Choose a topic..."){
            var topic = '&topic=' + $("#topic option:selected").text();
        }
        var country = '';
        if($("#country option:selected").text() != "Choose a country..."){
            var country = '&country=' + $("#country option:selected").text().substring(0,2);
        }
        
        var search_result = 'https://gnews.io/api/v4/top-headlines?token=c12e0605975c6e694f15f963cc4028c8&lang=en&in=title,content&&' + search_string + published_date_from + published_date_to + topic + country;
        fetch(search_result)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            var content = '';
            data["articles"].forEach(function(element) {            
                content += "<div class='row'>";
                content += "<div class='col-md-4'><img class='img-responsive' width='100%' src='" + element.image + "'></div>"
                content += "<div class='col-md-8'><a href='" + element.url + "' target='_blank'>"+ element.title + "</a>";
                content += "<br><i>" + element.publishedAt + "</i>";
                content += "<p>" + element.description + "</div></div>";
            });
            $('#newsfeed').html(content);
            
        });
    });

    $("#advanced_search").on("change", function() {
        if(this.checked) {
            $("#advanced_search_field").css("display", "inline-block");
        }
        else {
            $("#advanced_search_field").css("display", "none");
        }
    });

    $(document).keyup(function(e) {
        if (e.which == 13) $("#search_button").click();    // enter
        if (e.which == 27) $("#close_search").click();   // esc
      });
});

