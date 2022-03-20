$('.section .widget').each(function () {
    var widget_id = $(this).attr('id');
    if (typeof(widget_id) == 'undefined') {
        return;
    }
    $(this).find('.widget-wrap3 .widget-content').append(html_tag('span', '.twinny-widget-id', widget_id));
});
