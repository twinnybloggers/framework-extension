const ARRAY = 'array';
const OBJECT = 'object';
const SETTINGS = 'settings';
const BLOG_ID_MIN_LEN = 8;
var twinny = {
    home_url: 'https://twinnyblogger.blogspot.com',
    database: '4477438860628852525',
    dir: function ($file) {
        return chrome.runtime.getURL($file);
    },
    loc: {
        hash: window.location.hash,
        host: window.location.host,
        hostname: window.location.hostname,
        href: window.location.href,
        origin: window.location.origin,
        pathname: window.location.pathname,
        port: window.location.port,
        protocol: window.location.protocol
    },
    query: {
        theme: 'twinny=theme',
        post: 'twinny=post'
    },
    error: {
        message: '',
        notify: function ($msg = twinny.error.message) {
            twinny_notibox($msg);
            return false;
        },
        alert: function ($msg = twinny.error.message) {
            alert($msg + '\n\nSilakan lapor ke twinnybloggers@gmail.com. Terimakasih');
            return false;
        },
        set: function ($message) {
            twinny.error.message = $message;
            return twinny.error;
        },
        get: function () {
            return twinny.error.message;
        }
    },
}
String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};
String.prototype.replaceOnce = function (target, replacement) {
    var index = this.indexOf(target);
    if (-1 == index) {
        return this;
    }
    return this.substring(0, index) + replacement + this.substring(index + target.length);
};
String.prototype.remove = function (text) {
    return (this.replaceOnce(text, ''));
};
String.prototype.toCapitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.has = function (str) {
    return (this.indexOf(str) != -1);
};
String.prototype.hasNot = function (str) {
    return !this.has(str);
};
String.prototype.isIn = function ($a) {
    if (typeof($a) == 'object' || typeof($a) == 'Object') {
        for (var i in $a) {
            if (!$a.hasOwnProperty(i)) {
                continue;
            }
            if ($a[i] === this) {
                return true;
            }
        }
    } else if (typeof($a) == 'string' || typeof($a) == 'String') {
        return $a.indexOf(this) != -1;
    }
    return false;
}
String.prototype.isNotIn = function ($a) {
    return !this.isIn($a);
}
function array() {
    if (arguments.length == 0) {
        return new Object();
    }
    if (arguments.length == 1) {
        return arguments.length[0];
    }
    var a = new Array();
    for (var i = 0; i < arguments.length; ++i) {
        a.push(arguments[i]);
    }
    return a;
}
function count($a) {
    if (typeof($a) == 'object') {
        var count = 0;
        for (var i in $a) {
            if (!$a.hasOwnProperty(i)) {
                continue;
            }
            count++;
        }
        return count;
    }
    return $a.length;
}
function empty($a) {
    if (typeof($a) == 'undefined') {
        return true;
    }
    if (typeof($a) == 'array' && !$a.length) {
        return;
    }
    if (typeof($a) == 'object') {
        for (var i in $a) {
            if (!$a.hasOwnProperty(i)) {
                continue;
            }
            return false;
        }
        return true;
    }
    return !!!$a;
}
function explode($search, $object) {
    return $object.split($search);
}
function implode($glue, $object) {
    return $object.join($glue);
}
function in_array($search, $a) {
    if (is_array($a)) {
        return $a.indexOf($search) != -1;
    }
    if (is_object($a) == 'object') {
        return ($search in $a);
    }
    return false;
}
function is_string($a) {
    return (typeof($a) == 'string' || typeof($a) == 'String');
}
function is_array($a) {
    return ((typeof($a) == 'object' || typeof($a) == 'Object') && Array.isArray($a));
}
function is_object($o) {
    return ((typeof($o) == 'object' || typeof($o) == 'Object') && !is_array($o));
}
function is_function($a) {
    return (typeof($a) == 'function' || typeof($a) == 'Function');
}
function is_number($n) {
    return (typeof($n) == 'number' || typeof($n) == 'Number');
}
function is_numeric($n) {
    return (isset($n) && (is_number($n) || !isNaN($n)));
}
function isset($a) {
    if (typeof($a) == 'undefined') {
        return false;
    }
    return true;
}
function isnotset($a) {
    return !isset($a);
}
function strpos($haystack, $needle) {
    let index = $haystack.indexOf($needle)
        if (index == -1) {
            return false;
        }
        return index;
}
function ord($s = '') {
    return $s.charCodeAt(0);
}
function property_exists($object, $property) {
    return ($property in $object);
}
function str_replace($search, $replace, $object) {
    if (is_array($search)) {
        for (var i in $search) {
            if (!$search.hasOwnProperty(i)) {
                continue;
            }
            $object = $object.replaceAll($search[i], $replace);
        }
    } else {
        $object = $object.replaceAll($search, $replace);
    }
    return $object;
}
function strlen($s = '') {
    return $s.length;
}
function strtolower($s = '') {
    return $s.toLowerCase();
}
function strtoupper($s = '') {
    return $s.toUpperCase();
}
function ucfirst($s = '') {
    return $s.toCapitalize();
}
function unset($a, $key) {
    if (is_array($a) && isset($a[$key])) {
        $a.splice($key, 1);
    } else if (is_object($a) && ($key in $a)) {
        delete $a[$key];
    }
    return $a;
}
var $_GET = null;
function _GET($index = '', $value = '') {
    if (!empty($index) && !empty($value)) {
        return !(empty($_GET[$index]) || $_GET[$index] !== $value);
    }
    $_GET = new Object();
    var search = window.location.search;
    if (search) {
        search = search.substring(1);
        var list = search.split('&');
        for (var i = 0; i < list.length; i++) {
            var l = list[i].split('=');
            if (l.length > 1) {
                $_GET[l[0]] = l[1];
            }
        }
    }
}
function add_query_arg($args = new Object(), $url = location.href) {
    if (is_string($args)) {
        var args = $args.split('&');
        var $args = new Object();
        for (var i in args) {
            if (!args.hasOwnProperty(i)) {
                continue;
            }
            var a = args[i].split('=');
            $args[a[0]] = a[1];
        }
    }
    var url = new URL($url);
    var query = url.search;
    if (!empty(query)) {
        query = query.substring(1);
    }
    if (empty(query)) {
        query = new Array();
    } else {
        query = query.split('&');
    }
    for (var key in $args) {
        if (!$args.hasOwnProperty(key)) {
            continue;
        }
        var replacer = key + '=' + $args[key];
        for (var k in query) {
            if (!query.hasOwnProperty(k)) {
                continue;
            }
            if (query[k].indexOf(key + '=') === 0) {
                query[k] = replacer;
                replacer = '';
                break;
            }
        }
        if (!replacer) {
            continue;
        }
        query.push(replacer);
    }
    query = query.join('&');
    url.search = '?' + query;
    return url.href;
}
function esc_attr($a = '') {
    $a = String($a);
    return $a.replaceAll('"', '&quot;').replaceAll('\'', '&#39;')
}
function wp_parse_args($args, $defaults = array()) {
    return {
        ...$defaults,
        ...$args
    };
}
function html_tag_parse_attr_str($attr = array()) {
    if (empty($attr)) {
        $attr = array();
        return $attr;
    }
    if (!is_string($attr)) {
        return $attr;
    }
    if (false === strpos($attr, '=')) {
        if (strpos($attr, '#') === 0) {
            $attr = {
                'id': str_replace('#', '', $attr)
            };
        } else {
            $attr = {
                'class': str_replace('.', ' ', $attr)
            };
        }
        return $attr;
    }
    var all_attrs = explode('&', $attr);
    var temp_attrs = new Array();
    for (var i in all_attrs) {
        if (!all_attrs.hasOwnProperty(i)) {
            continue;
        }
        var value = all_attrs[i];
        var temp_attrs_len = count(temp_attrs);
        if (strpos(value, '=') === false) {
            if (!temp_attrs_len) {
                continue;
            }
            temp_attrs[temp_attrs_len - 1] += ('&' + value);
            continue;
        }
        temp_attrs.push(value);
    }
    $attr = array();
    for (var i in temp_attrs) {
        if (!temp_attrs.hasOwnProperty(i)) {
            continue;
        }
        value = temp_attrs[i];
        value = explode('=', value);
        if (count(value) > 2) {
            var temp_value = '';
            for (var key in value) {
                if (!value.hasOwnProperty(key)) {
                    continue;
                }
                var single_value = value[key];
                if (!key) {
                    continue;
                }
                if (temp_value) {
                    temp_value += '=';
                }
                temp_value += single_value;
            }
            value[1] = temp_value;
        }
        $attr[value[0]] = value[1];
    }
    return $attr;
}
function html_tag_attr($attr = array()) {
    var html = '';
    if (empty($attr)) {
        return html;
    }
    $attr = html_tag_parse_attr_str($attr);
    for (var key in $attr) {
        if (!$attr.hasOwnProperty(key)) {
            continue;
        }
        var value = $attr[key];
        html += ' ' + key + '="' + esc_attr(value) + '"';
    }
    return html;
}
function html_tag($name = '', $attr = array(), $content = '') {
    if (empty($name)) {
        return;
    }
    var html = '<' + $name + html_tag_attr($attr);
    if (in_array($name, array('img', 'meta', 'link', 'input', 'hr', 'br'))) {
        return (html + '/>');
    }
    return (html += '>' + $content + '</' + $name + '>');
}
function html_tag_open($name = '', $attr = array()) {
    if (empty($name)) {
        return;
    }
    return ('<' + $name + html_tag_attr($attr) + '>');
}
function html_tag_close($name = '') {
    if (empty($name)) {
        return;
    }
    return ('</' + $name + '>');
}
function html_tag_img($attr = array(), $src = '') {
    if (empty($src) && is_string($attr)) {
        $src = $attr;
    }
    if (empty($src)) {
        return '';
    }
    $attr = html_tag_parse_attr_str($attr);
    if (strpos($src, 'http') === false) {
        $src = twinny.dir('img/' + $src);
    }
    $attr['src'] = $src;
    return html_tag('img', $attr, '');
}
function html_tag_icon($code = '', $class = '') {
    if ($class) {
        $class = ' ' + $class;
        $class = $class.replaceAll('.', ' ');
    }
    return html_tag('i', 'm-ico' + $class, $code);
}
function html_tag_a($attr = array(), $content = '', $href = '') {
    $attr = html_tag_parse_attr_str($attr);
    if ($href) {
        $attr['href'] = $href;
    }
    return html_tag('a', $attr, $content);
}
function html_tag_inject($file_name, $id = '') {
    if ($id && $(document).find('#' + $id).length) {
        return;
    }
    var file = null;
    if ($file_name.indexOf('.js') != -1) {
        file = document.createElement('script');
        if ($file_name.has('https://')) {
            file.src = $file_name;
        } else {
            file.src = twinny.dir('js/' + $file_name);
        }
        file.type = 'text/javascript';
        if ($id) {
            file.id = $id;
        }
    } else {
        file = document.createElement('link');
        if ($file_name.has('https://')) {
            file.href = $file_name;
        } else {
            file.href = twinny.dir('css' + (document.dir == 'rtl' ? '-rtl' : '') + '/' + $file_name);
        }
        file.rel = 'stylesheet';
        if ($id) {
            file.id = $id;
        }
    }
    document.getElementsByTagName("head")[0].appendChild(file);
}
function html_tag_injects(scripts) {
    scripts.forEach(function (file_name) {
        html_tag_inject(file_name);
    });
}
function html_tag_form_start($attr = array()) {
    $attr = html_tag_parse_attr_str($attr);
    if (empty($attr['method'])) {
        $attr['method'] = 'POST';
    }
    if (!isset($attr['action'])) {
        $attr['action'] = '';
    }
    $attr = html_tag_attr($attr);
    var ret = ('<form' + $attr + '>');
    return ret;
}
function html_tag_form_end($submit_text = 'Send') {
    var html = '';
    var disable = strstr($submit_text, 'disabled');
    if (disable) {
        $submit_text = str_replace('disabled', '', $submit_text);
    }
    if ($submit_text) {
        var submit_attr = {
            'type': 'submit',
            'value': $submit_text
        };
        if (disable) {
            submit_attr['disabled'] = 'disabled';
        }
        html += html_tag_open('div', 'scc-submit-wrapper', false);
        html += html_tag('input', submit_attr, '', false);
        html += html_tag_close('div', false);
    }
    return (html + '</form>');
}
function html_tag_select($attr = array(), $option = array()) {
    var html = '';
    var options = new Object();
    if (empty($attr.value)) {
        $attr.value = '';
    }
    if (is_array($option)) {
        for (var i = 0; i < $option.length; i++) {
            options[esc_attr($option[i])] = $option[i].toCapitalize();
        }
    } else {
        options = $option;
    }
    for (var value in options) {
        html += html_tag('option', 'value=' + value + (value == $attr.value ? '&selected="true"' : ''), options[value]);
    }
    html = html_tag('select', $attr, html);
    return html;
}
function html_tabs($id, $tabs = [{
            'class': '',
            heading: '',
            content: '',
        }
    ]) {
    var heading = '';
    var content = '';
    $tabs.forEach(function (tab, key) {
        if (empty(tab.heading)) {
            return;
        }
        heading += html_tag_a({
            'class': 'heading ' + tab['class'],
            'data-tab': $id + key
        }, tab.heading);
        content += html_tag('div', {
            'class': 'content ' + tab['class'],
            'data-tab': $id + key
        }, tab.content);
    });
    if (heading) {
        var tabs = html_tag('div', 'id=' + $id + '&class=tabs ' + $id, html_tag('div', 'headings', heading) +
                content);
        return tabs;
    }
    var tabs = $('#' + $id);
    tabs.find('>.content').removeClass('active');
    tabs.find('>.content').first().addClass('active');
    tabs.find('> .headings >.heading').first().addClass('active');
    tabs.find('> .headings >.heading').click(function () {
        if ($(this).is('.active')) {
            return;
        }
        var tab = $(this).attr('data-tab');
        tabs.find('> .headings >.heading.active').removeClass('active');
        tabs.find('>.content').removeClass('active');
        tabs.find('>.content[data-tab="' + tab + '"]').addClass('active');
        $(this).addClass('active');
    });
}
class XMLStringElement {
    constructor($xml, $tag = null, $parent = null) {
        this.attr = new Object();
        this.xml = {
            start: '',
            inner: '',
            end: '',
            outer: ''
        };
        this.tag = $tag;
        this.attr_wrap = '"';
        this.parent = $parent;
        this.error = '';
        if (null == $tag && null == $parent) {
            this.xml.outer = this.xml.inner = $xml;
            return;
        }
        if (null == $tag) {
            this.error = 'Nama Tag Tidak Ada';
            return;
        }
        this.xml.start = $xml.substring(0, $xml.indexOf('>')) + '>';
        if (this.xml.start.hasNot('/>')) {
            this.xml.end = '</' + $tag + '>';
            if ($xml.hasNot(this.xml.end)) {
                this.error = 'Tag Akhir yang Hilang';
                return;
            }
            this.xml.inner = twinny_get_str_between_keys($xml, this.xml.start, this.xml.end);
            if (null == this.xml.inner) {
                this.error = 'HTML Bagian Dalam Tidak Ada';
                return;
            }
        }
        var xml_attr = this.xml.start;
        xml_attr = xml_attr.replaceOnce('/>', '');
        xml_attr = xml_attr.replaceOnce('>', '');
        this.xml.start = '<' + $tag + this.xml.start;
        this.xml.outer = this.xml.start + this.xml.inner + this.xml.end;
        if (empty(xml_attr)) {
            return;
        }
        if (xml_attr.hasNot('=' + this.attr_wrap)) {
            this.attr_wrap = '\'';
        }
        if (xml_attr.hasNot('=' + this.attr_wrap)) {
            return;
        }
        xml_attr = xml_attr.split('=' + this.attr_wrap);
        for (var i = 0; i < xml_attr.length - 1; i++) {
            this.attr[$.trim(xml_attr[i])] = twinny_get_str_before_split(xml_attr[i + 1], this.attr_wrap)
                xml_attr[i + 1] = twinny_get_str_after_split(xml_attr[i + 1], this.attr_wrap);
        }
    }
    getElements($selector, $return = OBJECT) {
        if ('array' == $return) {
            var result = new Array();
        } else {
            var result = new Object();
        }
        $selector = $selector.split('?');
        var tag = $selector[0];
        var full_xml = this.xml.inner;
        var exact_match_key = 'XMLStringElement';
        full_xml = full_xml.replaceAll('<' + tag + ' ', '<' + tag + exact_match_key + ' ');
        full_xml = full_xml.replaceAll('<' + tag + '>', '<' + tag + exact_match_key + '>');
        full_xml = full_xml.replaceAll('<' + tag + '/', '<' + tag + exact_match_key + '/');
        full_xml = full_xml.split('<' + tag + exact_match_key);
        if (full_xml.length < 2) {
            return result;
        }
        var attr_name = null;
        var attr_value = null;
        if ($selector.length >= 2) {
            var attr = $selector[1];
            attr = attr.split('=');
            attr_name = attr[0];
            if (attr.length > 1) {
                attr_value = attr[1];
            }
        }
        for (var i = 1; i < full_xml.length; i++) {
            var xml = full_xml[i];
            if (' ' != xml[0] && '>' != xml[0] && '/' != xml[0] && '\n' != xml[0] && '\t' != xml[0]) {
                continue;
            }
            var element = new XMLStringElement(xml, tag, this);
            if (!empty(element.error)) {
                continue;
            }
            if (null != attr_name && (!(attr_name in element.attr) || (null != attr_value && element.attr[attr_name] != attr_value))) {
                continue;
            }
            if (OBJECT != $return) {
                result.push(element);
                continue;
            }
            if ('id' in element.attr) {
                result[element.attr['id']] = element;
                continue;
            }
            if ('name' in element.attr) {
                result[element.attr['name']] = element;
            }
        }
        return result;
    }
    setAttr($name, $value) {
        if (null == this.parent) {
            return;
        }
        this.attr[$name] = $value;
        var xml_attr = this.xml.start;
        if (empty(xml_attr) || xml_attr.hasNot(' ' + $name + '=' + this.attr_wrap)) {
            var new_start = this.xml.start;
            var tag_start = '<' + this.tag;
            new_start = new_start.substring(0, new_start.indexOf(tag_start) + tag_start.length) +
                (' ' + $name + '=' + this.attr_wrap + $value + this.attr_wrap) +
                new_start.substring(new_start.indexOf(tag_start) + tag_start.length);
        } else {
            var new_start = twinny_set_str_between_keys(this.xml.start, ' ' + $name + '=' + this.attr_wrap, this.attr_wrap, $value);
        }
        var new_outer = new_start + this.xml.inner + this.xml.end;
        this.parent.setHtml(this.parent.xml.inner.replaceOnce(this.xml.outer, new_outer));
        this.xml.start = new_start;
        this.xml.outer = new_outer;
    }
    setHtml($code) {
        if (null == this.parent) {
            this.xml.inner = this.xml.outer = $code;
            return;
        }
        var new_start = this.xml.start;
        new_start = new_start.replaceOnce('/>', '>');
        var new_end = '</' + this.tag + '>';
        var new_outer = new_start + $code + new_end;
        this.parent.setHtml(this.parent.xml.inner.replaceOnce(this.xml.outer, new_outer));
        this.xml.inner = $code;
        this.xml.outer = new_outer;
        this.xml.start = new_start;
        this.xml.end = new_end;
    }
    selfRemove() {
        if (null == this.parent) {
            return;
        }
        this.parent.setHtml(this.parent.xml.inner.replaceOnce(this.xml.outer, ''));
        this.xml.inner = null;
        this.xml.outer = null;
        this.xml.start = null;
        this.xml.end = null;
        this.attr = null;
    }
    appendHtml($code) {
        this.setHtml(this.xml.inner + $code);
    }
    prependHtml($code) {
        this.setHtml($code + this.xml.inner);
    }
}
function twinny_jq_scroll_inner($child) {
    var scrollTop = $child.parent().scrollTop() + $child.position().top;
    $child.parent().animate({
        scrollTop: scrollTop
    }, 400);
}
function twinny_is_error($error) {
    return ($error == twinny.error);
}
function twinny_is_image_src(src) {
    src = src.toLowerCase();
    return (src.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
function twinny_slug_to_title(slug) {
    return slug.replace(/_/gi, ' ').replace(/-/gi, ' ').replace(/^[a-z]/, function (m) {
        return m.toUpperCase()
    });
}
function twinny_valid_font_awesome_code(icon_code) {
    var n0 = '0'.charCodeAt(0);
    var n9 = '9'.charCodeAt(0);
    var a = 'a'.charCodeAt(0);
    var z = 'z'.charCodeAt(0);
    var A = 'A'.charCodeAt(0);
    var Z = 'Z'.charCodeAt(0);
    var m = '-'.charCodeAt(0);
    var s = ' '.charCodeAt(0);
    var group = 'fa ';
    icon_code = icon_code.toLowerCase();
    if (icon_code.indexOf('fab ') != -1) {
        group = 'fab ';
    } else if (icon_code.indexOf('fas ') != -1) {
        group = 'fas ';
    } else if (icon_code.indexOf('far ') != -1) {
        group = 'far ';
    }
    for (i = 0; i < icon_code.length; i++) {
        c = icon_code.charCodeAt(i);
        if (c >= n0 && c <= n9 || c >= a && c <= z || c >= A && c <= Z || c == m || c == s) {
            continue;
        }
        icon_code = icon_code.substring(0, i) + '_' + icon_code.substring(i + 1);
    }
    icon_code = icon_code.replaceAll('_', '').replaceAll('fa-', '').replaceAll('fa ', '');
    icon_code = icon_code.split(' ');
    return group + 'fa-' + icon_code.join(' fa-');
}
function twinny_valid_icon_code(icon_code) {
    icon_code = icon_code.toLowerCase();
    $.trim(icon_code);
    if (icon_code.indexOf('fa-') != -1) {
        icon_code = twinny_valid_font_awesome_code(icon_code);
    } else {
        if (icon_code.indexOf('dashicons-') == -1) {
            icon_code = 'dashicons-' + icon_code;
        }
        if (icon_code.indexOf('dashicons ') != 0) {
            icon_code = 'dashicons ' + icon_code;
        }
    }
    if (icon_code.indexOf('icon ') != 0) {
        icon_code = 'icon ' + icon_code;
    }
    return icon_code;
}
function twinny_is_variable_name_character(character) {
    var character = character.charCodeAt(0);
    if (character >= 'a'.charCodeAt(0) && character <= 'z'.charCodeAt(0) || character >= 'A'.charCodeAt(0) && character <= 'Z'.charCodeAt(0) || character >= '0'.charCodeAt(0) && character <= '9'.charCodeAt(0) || character == '_'.charCodeAt(0)) {
        return true;
    }
    return false;
}
function twinny_is_slug_name_character(character) {
    var character = character.charCodeAt(0);
    if (character >= 'a'.charCodeAt(0) && character <= 'z'.charCodeAt(0) || character >= 'A'.charCodeAt(0) && character <= 'Z'.charCodeAt(0) || character >= '0'.charCodeAt(0) && character <= '9'.charCodeAt(0) || character == '_'.charCodeAt(0) || character == '-'.charCodeAt(0)) {
        return true;
    }
    return false;
}
function twinny_parse_json(data) {
    try {
        data = $.parseJSON(data);
    } catch (e) {
        console.log(e);
        return false;
    }
    return data;
}
function twinny_get_str_between_keys(original_string, start_key, end_key = '') {
    if (empty(original_string)) {
        return null;
    }
    if (!end_key) {
        end_key = start_key;
    }
    var start_index = original_string.indexOf(start_key);
    if (start_index == -1) {
        return null;
    }
    var end_index = original_string.indexOf(end_key, start_index + start_key.length);
    if (end_index == -1) {
        return null;
    }
    return original_string.substring(start_index + start_key.length, end_index);
}
function twinny_set_str_between_keys(original_string, start_key, end_key, value) {
    var start_index = original_string.indexOf(start_key);
    if (start_index == -1) {
        return original_string;
    }
    var end_index = original_string.indexOf(end_key, start_index + start_key.length);
    if (end_index == -1) {
        return original_string;
    }
    return original_string.substring(0, start_index + start_key.length) + value + original_string.substring(end_index);
}
function twinny_set_all_str_between_keys(original_string, start_key, end_key, value) {
    if (original_string == null) {
        original_string = '';
        return original_string
    }
    var index = 0;
    for (var i = 0; i < original_string.length; i++) {
        var start_index = original_string.indexOf(start_key, index);
        if (start_index == -1) {
            return original_string;
        }
        var end_index = original_string.indexOf(end_key, start_index + start_key.length);
        if (end_index == -1) {
            return original_string;
        }
        original_string = original_string.substring(0, start_index + start_key.length) + value + original_string.substring(end_index);
        index = end_index + end_key.length;
    }
    return original_string;
}
function twinny_get_str_between_arrays(original_text, open_keys, close_keys) {
    var found = false;
    for (var i = 0; i < open_keys.length; i++) {
        if (original_text.indexOf(open_keys[i]) != -1) {
            original_text = original_text.split(open_keys[i])[1];
            found = true;
        }
    }
    if (!found) {
        return '';
    }
    for (var i = 0; i < close_keys.length; i++) {
        original_text = original_text.split(close_keys[i])[0];
    }
    return original_text;
}
function twinny_get_str_before_split($original_text, $key) {
    var text = $original_text.split($key);
    return text[0];
}
function twinny_get_str_before_splits($original_text, $key) {
    var text = $original_text;
    for (var i = 0; i < $key.length; i++) {
        var key = $key[i];
        text = twinny_get_str_before_split(text, key);
    }
    return text;
}
function twinny_get_str_after_split($original_text, $key) {
    var start = $original_text.indexOf($key);
    if (-1 == start) {
        return $original_text;
    }
    return ($original_text.substring(start + $key.length));
}
function twinny_get_str_after_splits($original_text, $key) {
    var text = $original_text;
    for (var i = 0; i < $key.length; i++) {
        var key = $key[i];
        text = twinny_get_str_after_split(text, key);
    }
    return text;
}
function twinny_str_to_id(text) {
    return text.toLowerCase().replace(/ /gi, '-');
}
function twinny_str_is_ended(str, end) {
    return (str.lastIndexOf(end) == str.length - end.length);
}
function twinny_word_count(text) {
    text = text.trim();
    text = text.replaceAll('\n', ' ');
    text = text.replaceAll('...', ' ');
    text = text.replaceAll('.', ' ');
    text = text.replaceAll('!!!', ' ');
    text = text.replaceAll('?!', ' ');
    text = text.replaceAll('?', ' ');
    text = text.replaceAll('!', ' ');
    text = text.replaceAll('  ', ' ');
    text = text.split(' ');
    return text.length;
}
function twinny_str_to_json(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return JSON.parse(str);
}
function twinny_escape_url(text) {
    text = encodeURIComponent(text);
    return text.replaceAll('!', '%21').replaceAll('(', '%28').replaceAll(')', '%29').replaceAll('\'', '%27').replaceAll('~', '%7E');
}
function twinny_parse_nake_hostname(url) {
    url = url.replace('http://', '');
    url = url.replace('https://', '');
    url = url.replace('www.', '');
    url = url.split('/');
    url = url[0];
    url = url.split('?');
    url = url[0];
    url = url.split('#');
    url = url[0];
    return url;
}
function twinny_px_to_num($pixel) {
    return Number($pixel.replace('px', ''));
}
function twinny_included_cookie() {
    if ('cookie' in document) {
        return true;
    }
    return false;
}
function twinny_get_cookie(c_name) {
    if (!twinny_included_cookie()) {
        return '';
    }
    var i,
    x,
    y,
    ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
    return '';
}
function twinny_has_cookie() {
    if (twinny_set_cookie('test', 'ok')) {
        return true;
    }
    return false;
}
function twinny_set_cookie(c_name, value, exdays) {
    if (!twinny_included_cookie()) {
        return false;
    }
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? '' : '; expires=' + exdate.toUTCString()) + '; path=/';
    document.cookie = c_name + "=" + c_value;
    if (twinny_get_cookie(c_name) !== value) {
        return false;
    }
    return true;
}
function twinny_delete_cookie(c_name) {
    if (!twinny_included_cookie()) {
        return false;
    }
    document.cookie = c_name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    return true;
}
function twinny_has_storage() {
    if (typeof(localStorage) !== "undefined") {
        return true;
    }
    return false;
}
function twinny_set_storage(key, value) {
    if (twinny_has_storage()) {
        localStorage.setItem(key, value);
        return true;
    }
    return false;
}
function twinny_get_storage(key) {
    if (twinny_has_storage()) {
        var ret = localStorage.getItem(key);
        if (ret) {
            return ret;
        }
    }
    return '';
}
function twinny_update_option(option_name, option_value) {
    if (twinny_has_storage()) {
        return twinny_set_storage(option_name, option_value);
    } else if (twinny_has_cookie()) {
        return twinny_set_cookie(option_name, option_value);
    }
    return false;
}
function twinny_get_option(option_name) {
    if (twinny_has_storage()) {
        return twinny_get_storage(option_name);
    } else if (twinny_has_cookie()) {
        return twinny_get_cookie(option_name);
    }
    return '';
}
function twinny_add_query_arg(key, value, url) {
    if (typeof(url) == 'undefined') {
        url = document.location.href;
    }
    key = encodeURI(key);
    value = encodeURI(value);
    if (url.indexOf('?') == -1) {
        return (url + '?' + key + '=' + value);
    }
    url = url.split('?');
    url[1] = '&' + url[1];
    if (url[1].indexOf('&' + key + '=') == -1) {
        url[1] = url[1].replace('&', '');
        return (url.join('?') + '&' + key + '=' + value);
    }
    url[1] = url[1].split('&' + key + '=');
    url[1][1] = url[1][1].split('&');
    url[1][1][0] = value;
    url[1][1] = url[1][1].join('&');
    url[1] = url[1].join('&' + key + '=');
    url[1] = url[1].replace('&', '');
    return url.join('?');
}
function twinny_get_youtube_video_id(url) {
    if (url.indexOf('youtube') == -1 && url.indexOf('youtu.be') == -1) {
        return '';
    }
    return twinny_get_str_between_arrays(url, ['/embed/', 'youtu.be/', '/videos/', '/v/', '?v=', '&v='], ['#', '/', '?', '&', '.']);
}
function twinny_get_first_image(content) {
    var src = '';
    var key0 = '\u003cimg ';
    var key1 = 'src\u003d\"';
    var key2 = '\"';
    var index0 = content.indexOf(key0);
    if (index0 != -1) {
        var index1 = content.indexOf(key1, index0);
        if (index1 == -1) {
            key1 = 'src\u003d\'';
            key2 = '\'';
            index1 = content.indexOf(key1, index0);
        }
        if (index1 != -1) {
            var index2 = content.indexOf(key2, index1 + key1.length);
            if (index2 != -1) {
                src = content.substring(index1 + key1.length, index2);
            }
        }
    }
    if (!src) {
        key0 = 'data-thumbnail-src\u003d\"';
        key1 = '\"';
        index0 = content.indexOf(key0);
        if (index0 != -1) {
            index1 = content.indexOf(key1, index0 + key0.length);
            if (index0 != -1) {
                src = content.substring(index0 + key0.length, index1);
            }
        }
    }
    if (!src) {
        var key0 = 'youtube-nocookie.com/embed/';
        var key1 = 'youtube.com/embed/';
        var key2 = 'youtube.com/watch?v=';
        var key3 = 'youtu.be/';
        var key_start = key0;
        var key_end = '"';
        var start = content.indexOf(key_start);
        if (start == -1) {
            key_start = key1;
            start = content.indexOf(key_start);
            if (start == -1) {
                key_start = key2;
                start = content.indexOf(key_start);
                if (start == -1) {
                    key_start = key3;
                    start = content.indexOf(key_start);
                }
            }
        }
        if (start != -1) {
            var end = content.indexOf(key_end, start);
            if (end != -1) {
                src = content.substring(start + key_start.length, end);
                if (src.indexOf('?') != -1) {
                    src = src.substring(0, src.indexOf('?'));
                }
                if (src.indexOf('&') != -1) {
                    src = src.substring(0, src.indexOf('&'));
                }
                src = 'https://img.youtube.com/vi/' + src + '/hqdefault.jpg';
            }
        }
    }
    if (src.has('.blogspot.com/')) {
        src = src.replace('http://', '//');
    }
    return src;
}
function twinny_wait_thing($check_fn, $finish_fn, $timeout_duration = 100, $delay = 100, $timeout_fn = null) {
    if (!is_string($finish_fn) && !is_function($finish_fn)) {
        return;
    }
    var counter = 0;
    var timer = setInterval(function () {
        var appeared = false;
        if (is_function($check_fn)) {
            appeared = $check_fn();
        } else if (is_string($check_fn)) {
            appeared = $(document).find($check_fn).length;
        }
        if (appeared) {
            clearInterval(timer);
            timer = null;
            if (is_function($finish_fn)) {
                $finish_fn();
            } else if (is_string($finish_fn)) {
                window[$finish_fn]();
            }
            return;
        }
        if ((counter++) * $delay >= $timeout_duration) {
            clearInterval(timer);
            timer = null;
            if (is_function($timeout_fn)) {
                $timeout_fn();
            } else if (is_string($finish_fn)) {
                window[$timeout_fn]();
            }
        }
    }, $delay);
}
function twinny_loader_show($container = 'body') {
    if (is_string($container)) {
        $container = $(document).find($container);
    }
    if (!$container.length) {
        return;
    }
    if (!$container.find('> .twinny-loader').length) {
        $(html_tag('div', 'twinny-loader', html_tag('div', 'twinny-loader-inner', html_tag_img('gear.gif')))).appendTo($container);
    }
    $container.addClass('twinny-loader-container');
    $container.find('.twinny-loader').stop().fadeIn();
}
function twinny_loader_hide() {
    var $container = $(document).find('.twinny-loader-container');
    $container.find('> .twinny-loader').stop().fadeOut();
    $container.removeClass('twinny-load-container');
}
function twinny_notibox($message = '') {
    $(document).find('.twinny-notibox').remove();
    $(html_tag('div', '.twinny-notibox', html_tag('div', '.inner'))).appendTo($('body'));
    $(document).find('.twinny-notibox .inner').html($message);
    $(document).find('.twinny-notibox').stop().slideUp(2000, function (e) {
        $(this).remove();
    });
}
var blog = {
    id: null,
    url: null,
    name: '',
    cats: [],
    posts: {},
    pages: {},
    getId: function () {
        var blog_id = window.location.pathname;
        blog_id = blog_id.split('/blog/');
        if (blog_id.length < 2) {
            return null;
        }
        blog_id = blog_id[1];
        blog_id = blog_id.split('/');
        for (var i = 0; i < blog_id.length; i++) {
            if (empty(blog_id[i]) || !is_numeric(blog_id[i]) || blog_id[i].length < BLOG_ID_MIN_LEN) {
                continue;
            }
            blog.id = blog_id[i];
            break;
        }
        return blog.id;
    }
}
blog.getId();
function twinny_blogger_parse_json($json, $summary_len = 500, $default_thumbnail = 'https://lorempixel.com/640/300/') {
    if (typeof($json) == 'undefined') {
        return false;
    }
    if (!('feed' in $json)) {
        if ('responseText' in $json) {
            var temp = $json.responseText;
            if (temp.indexOf('({"version":') == -1) {
                return false;
            }
            var start = temp.indexOf('({"version":');
            if (temp.indexOf('}});') == -1) {
                return false;
            }
            var end = temp.indexOf('}});');
            temp = temp.substring(start + 1, end + 2);
            return twinny_str_to_json(temp);
        } else {
            return false;
        }
    }
    $json = $json.feed;
    var json = new Object();
    var imgkey = '\u003cimg ';
    json.id = $json.id.$t;
    var key = 'blog-';
    var index = json.id.indexOf(key);
    json.id = json.id.substring(index + key.length);
    json.id = json.id.replace('.comments', '');
    json.id = json.id.replace('.page', '');
    json.cate = new Array();
    if ('category' in $json) {
        for (i = 0; i < $json.category.length; i++) {
            json.cate[i] = $json.category[i].term;
        }
    }
    json.cats = json.categories = json.cate;
    json.title = '';
    if ('title' in $json) {
        json.title = $json.title.$t;
    }
    json.title_attr = esc_attr(json.title);
    json.name = json.title;
    json.subtitle = '';
    if ('subtitle' in $json) {
        json.subtitle = $json.subtitle.$t;
    }
    json.description = json.desc = json.subtitle;
    json.link = '';
    for (var i = 0; i < $json.link.length; i++) {
        var link = $json.link[i];
        if (!('rel' in link) || 'alternate' != link['rel'] || !('href' in link)) {
            continue;
        }
        json.link = link['href'];
        break;
    }
    json.url = json.href = json.link;
    json.admin = new Object();
    json.admin.name = 'Anonymous';
    json.admin.uri = '';
    json.admin.avatar = 'https://img1.blogblog.com/img/anon36.png';
    if ('name' in $json.author[0]) {
        json.admin.name = $json.author[0].name.$t;
    }
    if ('uri' in $json.author[0]) {
        json.admin.uri = $json.author[0].uri.$t;
    }
    if ('gd$image' in $json.author[0]) {
        if ($json.author[0].gd$image.src != 'https://img1.blogblog.com/img/blank.gif') {
            json.admin.avatar = $json.author[0].gd$image.src;
        }
    }
    json.total_entry = Number($json.openSearch$totalResults.$t);
    json.start_index = Number($json.openSearch$startIndex.$t);
    json.item_per_page = Number($json.openSearch$itemsPerPage.$t);
    json.entry_number = 0;
    if ('entry' in $json) {
        json.entry_number = $json.entry.length;
    }
    json.entry = new Object();
    for (var i = 0; i < json.entry_number; i++) {
        var temp = new Object();
        var entry = $json.entry[i];
        temp.id = entry.id.$t;
        key = 'post-';
        index = temp.id.indexOf(key);
        if (index == -1) {
            key = 'page-';
            index = temp.id.indexOf(key);
        }
        temp.id = temp.id.substring(index + key.length);
        if ('app$control' in entry) {
            continue;
        }
        temp.published = '';
        if ('published' in entry) {
            temp.published = entry.published.$t;
        }
        temp.cate = new Array();
        if ('category' in entry) {
            for (j = 0; j < entry.category.length; j++) {
                temp.cate[j] = entry.category[j].term;
            }
        }
        temp.title = '';
        if ('title' in entry) {
            temp.title = entry.title.$t;
        }
        temp.title_attr = esc_attr(temp.title);
        temp.content = '';
        if ('content' in entry) {
            temp.content = entry.content.$t;
        }
        temp.summary = '';
        if ('summary' in entry) {
            temp.summary = entry.summary.$t;
        }
        if (temp.content) {
            temp.summary = temp.content;
        } else if ('summary' in entry) {
            temp.summary = entry.summary.$t;
        }
        if (temp.content == '') {
            temp.content = temp.summary;
        }
        if (temp.summary) {
            temp.summary = temp.summary.replace(/<noscript\b[^>]*>(.*?)<\/noscript>/g, '');
            temp.summary = temp.summary.replace(/<script\b[^>]*>(.*?)<\/script>/g, '');
            temp.summary = temp.summary.replace(/<\S[^>]*>/g, '');
        }
        if (temp.summary.length > $summary_len) {
            temp.summary = temp.summary.substring(0, $summary_len) + '...';
        }
        temp.link = '';
        temp.parentId = '';
        temp.reply_label = 'comments';
        if ('link' in entry) {
            for (var j = 0; j < entry.link.length; j++) {
                if (entry.link[j].rel == 'alternate') {
                    temp.link = entry.link[j].href;
                }
                if (entry.link[j].rel == 'replies') {
                    temp.reply_label = entry.link[j].title;
                }
                if (entry.link[j].rel == 'related') {
                    temp.parentId = entry.link[j].href;
                    temp.parentId = temp.parentId.split('/comments/default/')[1];
                }
            }
        }
        if (empty(temp.link)) {
            continue;
        }
        temp.uri = temp.url = temp.href = temp.link;
        temp.author = new Object();
        temp.author.name = 'Anonymous';
        temp.author.uri = '';
        temp.author.avatar = 'https://img1.blogblog.com/img/anon36.png';
        var a0 = entry.author[0];
        if ('name' in a0) {
            temp.author.name = a0.name.$t;
        }
        if ('uri' in a0) {
            temp.author.uri = a0.uri.$t;
        }
        if ('gd$image' in a0) {
            if (a0.gd$image.src != 'https://img1.blogblog.com/img/blank.gif') {
                temp.author.avatar = a0.gd$image.src;
            }
        }
        temp.thumbnail = twinny_get_first_image(temp.content);
        temp.has_thumbnail = true;
        if (temp.thumbnail == '' && 'media$thumbnail' in entry) {
            temp.thumbnail = entry.media$thumbnail.url;
        }
        if (temp.thumbnail == '') {
            temp.thumbnail = $default_thumbnail;
            temp.has_thumbnail = false;
        }
        temp.format = 'standard';
        if (temp.content.indexOf('youtube.com/embed') != -1 || temp.content.indexOf('youtube-nocookie.com/embed/') != -1 || temp.content.indexOf('player.vimeo.com') != -1 || temp.content.indexOf('dailymotion.com/embed') != -1) {
            temp.format = 'video';
        } else if (temp.content.split(imgkey).length > 3) {
            temp.format = 'image';
        } else if (temp.content.indexOf('soundcloud.com/player') != -1) {
            temp.format = 'audio';
        }
        temp.reply_number = 0;
        if ('thr$total' in entry) {
            temp.reply_number = Number(entry.thr$total.$t);
        }
        temp.reply_label = temp.reply_label.replace(temp.reply_number + ' ', '');
        temp.reply_to = '';
        temp.reply_json = '';
        temp.reply_title = '';
        if ('thr$in-reply-to' in entry) {
            temp.reply_to = entry['thr$in-reply-to'].href;
            temp.reply_json = entry['thr$in-reply-to'].source;
            temp.reply_json = temp.reply_json.replace('/default/', '/summary/');
            temp.reply_json = temp.reply_json + '?alt=json-in-script';
        }
        temp.pid = '';
        temp.itemClass = '';
        temp.displayTime = '';
        if ('gd$extendedProperty' in entry) {
            for (j = 0; j < entry.gd$extendedProperty.length; j++) {
                if (entry.gd$extendedProperty[j].name == 'blogger.itemClass') {
                    temp.pid = entry.gd$extendedProperty[j].value;
                    temp.itemClass = temp.pid;
                }
                if (entry.gd$extendedProperty[j].name == 'blogger.displayTime') {
                    temp.displayTime = entry.gd$extendedProperty[j].value;
                }
            }
        }
        temp.pid = temp.pid.replace('pid-', '');
        json.entry[temp.id] = temp;
    }
    return json;
}
function twinny_blogger_resize_image(src, size = null, crop = false, must_load = false) {
    if (src.indexOf('.blogspot.com') == -1 && src.indexOf('.googleusercontent.com') == -1) {
        return src;
    }
    src = src.replace('http://', 'https://');
    var width = 0;
    var height = 0;
    var current_width = 0;
    var current_height = 0;
    var current_size = 0;
    var original_src = src;
    if (is_numeric(size)) {
        width = height = Number(size);
    } else if (is_string(size)) {
        if (size.indexOf('x') != -1) {
            var sizes = size.split('x');
            width = sizes[0];
            height = sizes[1];
            if (is_numeric(width) && is_numeric(height)) {
                width = Number(width);
                height = Number(height);
            }
        } else if (size.indexOf('w') != -1 && is_numeric(size.replace('w', ''))) {
            width = Number(size.replace('w', ''));
        } else if (size.indexOf('h') != -1 && is_numeric(size.replace('h', ''))) {
            height = Number(size.replace('h', ''));
        } else {
            console.log('STupid');
            return original_src;
        }
    }
    if (width == height && width == 0) {
        return src;
    }
    var glue = '/';
    if (src.indexOf('.googleusercontent.com') != -1) {
        glue = '=';
    }
    src = src.split(glue);
    for (var i = 0; i < src.length; i++) {
        if (src[i].length > 17) {
            continue;
        }
        if (src[i].has('-c') || src[i].has('s') || src[i].has('h') || src[i].has('w')) {
            var src_size = src[i].split('-');
            src_size = src_size[0];
            src_size = src_size.replace('c', '').replace('s', '').replace('h', '').replace('w', '');
            if (src_size != '' && !isNaN(src_size)) {
                if (src[i].has('s')) {
                    current_size = Number(src_size);
                } else if (src[i].has('h')) {
                    current_height = Number(src_size);
                } else if (src[i].has('w')) {
                    current_width = Number(src_size);
                }
                break;
            }
        }
    }
    if (i < src.length) {
        if ((width == height && height == 0 || size == null)) {}
        else if (width == height) {
            if (width < current_size && (!must_load)) {
                return original_src;
            }
            src[i] = 's' + width;
        } else if (height == 0) {
            if (width < current_width && (!must_load)) {
                return original_src;
            }
            src[i] = 'w' + width;
        } else if (width == 0) {
            if (height < current_height && (!must_load)) {
                return original_src;
            }
            src[i] = 'h' + height;
        } else {
            if ((height < current_height || width < current_width) && (!must_load)) {
                return original_src;
            }
            src[i] = 'w' + width + '-' + 'h' + height;
        }
        if (crop) {
            src[i] += '-c';
        }
    }
    src = src.join(glue);
    return src;
}
