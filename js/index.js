/**
 * Created by jimmy-jiang on 2016/10/13.
 */
$(function(){

    async.parallel({
        basic: function (callback) {
            loadBasicInfoData(function (result) {
                callback(null, result);
            });
        },
        announcement: function (callback) {
            loadTopAnnouncement(function (result) {
                callback(null, result);
            });
        },
    }, function (err, results) {
        var val;
        for(var item in results){
            var fn=null;
            val=results[item]
            switch (item){
                case 'basic':
                    fn=fillInBasicInfoData;
                    break;
                case 'announcement':
                    fn=fillInTopAnnouncement;
                    break;
                default :

                    break;
            }
            fn && fn.call(val);
        }
    });

    function loadBasicInfoData(){
        $.getJSON('json/basicinfo.json',null,function(result){
            var $item=$('.item-box-main:eq(0)').find('.field-val');
            $item.eq(0).text(result.name);
            $item.eq(1).text(result.gender);
            $item.eq(2).text(result.job);
        });
    }

    function loadTopAnnouncement(){
        $.getJSON('json/announcement.json',null,function(result){
            var len=result.length,
                str='';
            for(var i=0;i<len;i++){
                str+='<li><div class="title">'+result[i].title+'</div>'+
                    '<p class="content">'+result[i].content+'</p></li>'
            }
            $('.announcement-ul').html(str);
        });
    }

    function fillInBasicInfoData(data){

    }

    function fillInTopAnnouncement(data){

    }
});