/**
 * Created by Jihann on 2015/9/14.
 */
jQuery(function() {
    jQuery('.comment').click(function(e) {
        var target = jQuery(this);
        var toId = target.data('tid');
        var commentId = target.data('cid');
        if (jQuery('#toId').length > 0) {
            jQuery('#toId').val(toId);
        } else {
            jQuery('<input>').attr({
                type: 'hidden',
                id: 'toId',
                name: 'comment[tid]',
                value: toId
            }).appendTo('#commentForm');
        }
        if (jQuery('#commentId').length > 0) {
            jQuery('#commentId').val(commentId);
        } else {
            jQuery('<input>').attr({
                type: 'hidden',
                id: 'commentId',
                name: 'comment[cid]',
                value: commentId
            }).appendTo('#commentForm');
        }
    });
});