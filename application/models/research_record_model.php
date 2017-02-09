<?php
if (! defined('BASEPATH'))
    exit('No direct script access allowed');

// 会员
class research_record_model extends content_model
{
    function __construct ()
    {
        parent::__construct();

        $this->table = 'zy_research_record';
    }

    public function get_current_all_research($uId){
        $result = $this->db->query("SELECT a.id AS research_record_id,a.goodsId,a.startResearchTime,a.endResearchTime,a.status,b.goodsName FROM zy_research_record a JOIN zy_goods b ON a.uId=$uId AND b.id=a.goodsId AND a.status!=0 AND a.status !=3 ORDER BY a.id ASC ;")->result_array();
        return $result;
    }



}
