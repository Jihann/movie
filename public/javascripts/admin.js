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
          url: '/admin/movie/delete?id=' + id
       }).done(function(results) {
            if (results.success === 1) {
                if ($tr.length > 0) {
                    $tr.remove();
                }
            }
       });
   });

   jQuery('#douban').blur(function() {
       var _this = jQuery(this);
       var id = _this.val();
       if (id) {
           jQuery.ajax({
               type: 'GET',
               url: 'https://api.douban.com/v2/movie/subject/' + id,
               cache: true,
               dataType: 'jsonp',
               crossDomain: true,
               jsonp: 'callback',
               success: function(data) {
                   jQuery('#inputTitle').val(data.title);
                   jQuery('#inputDirector').val(data.directors[0].name);
                   jQuery('#inputCountry').val(data.countries[0]);
                   jQuery('#inputPoster').val(data.images.large);
                   jQuery('#inputYear').val(data.year);
                   jQuery('#inputSummary').val(data.summary);
               }
           });
       }
   });
});