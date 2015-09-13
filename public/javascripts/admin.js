/**
 * Created by Jihann on 2015/9/12.
 */
jQuery(function() {
   jQuery('.del').click(function(e) {
       if (!confirm('你确定要删除吗？')) {
           return false;
       }
       var target = jQuery(e.target);
       var id = target.data('id'); //取得当前行数据id
       var $tr = jQuery('.item-id-' + id); //当前当前行元素
       jQuery.ajax({
          type: 'DELETE',
          url: '/admin/delete?id=' + id
       }).done(function(results) {
            if (results.success === 1) {
                if ($tr.length > 0) {
                    $tr.remove();
                }
            }
       });
   });
});