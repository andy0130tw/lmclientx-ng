angular.module('app.MarkupArea', [])

.filter('markup', function(){
    return function(value){
        if(!value) return value;
        var src = value;
        src = src.replace(/&/g, '&amp;');
        src = src.replace(/</g, '&lt;');
        src = src.replace(/>/g, '&gt;');

        src = src.replace(/^(#{1,6})(?!#)(.+)$/mg, function(match, p1, p2){
            var cnt = p1.length;
            if(p2.length > cnt){
                var end = p2.substr(p2.length-cnt);
                if(end == p1){
                    p2 = p2.substr(0, p2.length-cnt);
                }
            }
            return '<h'+cnt+'>' + p2 + '</h'+cnt+'>';
        });

        src = src.replace(/([^>])\n/g, '$1 <br />\n');
        src = src.replace(/\*\*\s*(.+?)\s*\*\*/g, '<strong>$1</strong>');
        src = src.replace(/--\s*(.+?)\s*--/g, '<del>$1</del>');
        src = src.replace(/__\s*(.+?)\s*__/g, '<u>$1</u>');
        return src;
    };
})
    
.filter('autolink', function(){
    return function(text){
        var LINKY_URL_REGEXP = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/,
            MAILTO_REGEXP    = /^mailto:/;

        if (!text) return text;
        var match;
        var raw = text;
        var html = [];
        var url;
        var i;
        while ((match = raw.match(LINKY_URL_REGEXP))) {
            // We can not end in these as they are sometimes found at the end of the sentence
            url = match[0];
            // if we did not match ftp/http/mailto then assume mailto
            if (match[2] == match[3]) url = 'mailto:' + url;
            i = match.index;
            addText(raw.substr(0, i));
            addLink(url, match[0].replace(MAILTO_REGEXP, ''));
            raw = raw.substring(i + match[0].length);
        }
        addText(raw);
        return html.join('');

        function addText(text) {
            if (!text) {
                return;
            }
            html.push(text);
        }

        function addLink(url, text) {
            html.push('<a class="external-link" target="_blank" ');
            html.push('href="');
            html.push(url);
            html.push('"><i class="fa fa-share"></i>&nbsp;');
            addText(text);
            html.push('</a>');
        }
    }
});