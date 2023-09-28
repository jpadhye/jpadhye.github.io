jQuery.gitUser = function (username, callback) {
    jQuery.getJSON('https://api.github.com/users/' + username + '/repos?per_page=100', callback) //Change per_page according to your need.
}

jQuery.fn.getRepos = function (username) {
    this.html("<h2 style=\"color:#FFF;\">Hold on tight, digging out projects...</h2><br>");

    const target = this;
    $.gitUser(username, function (data) {
        const repos = data; // JSON Parsing
        //alert(repos.length); //Only for checking how many items are returned.
        sortByForks(repos); //Sorting by forks. You can customize it according to your needs.
        const list = $('<div/>');
        target.empty().append(list);
        $(repos).each(function () {
            checkfork = this.fork;
            if ((this.name != (username.toLowerCase() + '.github.com')) && (checkfork != true)) { //Check for username.github.com repo and for forked projects
                list.append('<div><div class="projects-card"><div class="projects-card-container"><h4><b><a href="'
                    + (this.homepage ? this.homepage : this.html_url) + '">' + this.name + '</a><em> - '
                    + (this.language ? ('(' + this.language + ')') : '') + '</em><br>Forks: ' + this.forks
                    + ' | Watchers: ' + this.watchers + '</div>');
            }
        });
    });

    function sortByForks(repos) {
        repos.sort(function (a, b) {
            return b.forks - a.forks; //Descending order for number of forks based sorting.
        });
    }
};